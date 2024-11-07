// src/config/redis.ts
import { createClient } from 'redis';

const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.on('connect', () => console.log('Redis Client Connected'));

await redisClient.connect();

export { redisClient };

// src/types/todo.ts
export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

// src/services/todoService.ts
import { PrismaClient } from '@prisma/client';
import { redisClient } from '../config/redis';
import { Todo } from '../types/todo';

const prisma = new PrismaClient();
const CACHE_EXPIRATION = 3600; // 1 hour in seconds

class TodoService {
  // Get single todo with Redis caching
  async getTodo(id: string): Promise<Todo | null> {
    // Try to get from cache first
    const cachedTodo = await redisClient.get(`todo:${id}`);
    if (cachedTodo) {
      return JSON.parse(cachedTodo);
    }

    // If not in cache, get from database
    const todo = await prisma.todo.findUnique({
      where: { id }
    });

    if (todo) {
      // Store in cache
      await redisClient.setEx(
        `todo:${id}`,
        CACHE_EXPIRATION,
        JSON.stringify(todo)
      );
    }

    return todo;
  }

  // Get all todos for a user with Redis caching
  async getUserTodos(userId: string): Promise<Todo[]> {
    // Try to get from cache first
    const cachedTodos = await redisClient.get(`user:${userId}:todos`);
    if (cachedTodos) {
      return JSON.parse(cachedTodos);
    }

    // If not in cache, get from database
    const todos = await prisma.todo.findMany({
      where: { userId }
    });

    // Store in cache
    await redisClient.setEx(
      `user:${userId}:todos`,
      CACHE_EXPIRATION,
      JSON.stringify(todos)
    );

    return todos;
  }

  // Create todo and invalidate relevant caches
  async createTodo(data: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>): Promise<Todo> {
    const todo = await prisma.todo.create({
      data
    });

    // Invalidate user's todos cache
    await redisClient.del(`user:${data.userId}:todos`);

    return todo;
  }

  // Update todo and invalidate relevant caches
  async updateTodo(id: string, data: Partial<Todo>): Promise<Todo> {
    const todo = await prisma.todo.update({
      where: { id },
      data
    });

    // Invalidate specific todo cache
    await redisClient.del(`todo:${id}`);
    // Invalidate user's todos cache
    await redisClient.del(`user:${todo.userId}:todos`);

    return todo;
  }

  // Delete todo and invalidate relevant caches
  async deleteTodo(id: string): Promise<void> {
    const todo = await prisma.todo.delete({
      where: { id }
    });

    // Invalidate specific todo cache
    await redisClient.del(`todo:${id}`);
    // Invalidate user's todos cache
    await redisClient.del(`user:${todo.userId}:todos`);
  }
}

// src/controllers/todoController.ts
import { Request, Response } from 'express';
import { TodoService } from '../services/todoService';

const todoService = new TodoService();

export class TodoController {
  async getTodo(req: Request, res: Response) {
    try {
      const todo = await todoService.getTodo(req.params.id);
      if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
      }
      res.json(todo);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getUserTodos(req: Request, res: Response) {
    try {
      const todos = await todoService.getUserTodos(req.params.userId);
      res.json(todos);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async createTodo(req: Request, res: Response) {
    try {
      const todo = await todoService.createTodo(req.body);
      res.status(201).json(todo);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async updateTodo(req: Request, res: Response) {
    try {
      const todo = await todoService.updateTodo(req.params.id, req.body);
      res.json(todo);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async deleteTodo(req: Request, res: Response) {
    try {
      await todoService.deleteTodo(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}