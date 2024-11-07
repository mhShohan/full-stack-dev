import todoServices from "@/services/todo.services";
import { NextFunction, Request, Response } from "express";

class TodoController {
  async getSingleTodo(req: Request, res: Response, next: NextFunction) {
    try {
      const todo = await todoServices.getSingleTodo(req.params.id);
      if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
      }

      res.json(todo);
    } catch (error) {
      next(error);
    }
  }

  async getAllTodos(req: Request, res: Response, next: NextFunction) {
    try {
      const todos = await todoServices.getAllTodos();
      res.json(todos);
    } catch (error) {
      next(error);
    }
  }

  async createTodo(req: Request, res: Response, next: NextFunction) {
    try {
      const todo = await todoServices.createTodo(req.body);
      res.status(201).json(todo);
    } catch (error) {
      next(error);
    }
  }

  async updateTodo(req: Request, res: Response, next: NextFunction) {
    try {
      const todo = await todoServices.updateTodo(req.params.id, req.body);
      res.json(todo);
    } catch (error) {
      next(error);
    }
  }

  async deleteTodo(req: Request, res: Response, next: NextFunction) {
    try {
      await todoServices.deleteTodo(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

const todoController = new TodoController();
export default todoController;