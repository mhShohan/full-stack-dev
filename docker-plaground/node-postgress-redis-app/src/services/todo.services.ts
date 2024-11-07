import ClientService from "@/clients";
import { TodoCreateDTO, TodoCreateDTOSchema, TodoUpdateDTOSchema } from "@/validationSchemas";
import { Todo } from "@prisma/client";

const cacheExpires = parseInt(process.env.REDIS_CACHE_EXPIRATION || '60');

class TodoServices extends ClientService {
  /**
   * Create a new todo
   * @param payload 
   * @returns 
   */
  async createTodo(payload: TodoCreateDTO): Promise<Todo> {

    const { data, error } = TodoCreateDTOSchema.safeParse(payload);
    if (error) {
      throw new Error('Title is required');
    }

    const todo = await this.prisma.todo.create({
      data: {
        title: data.title,
      }
    });

    // Invalidate todo cache from redis
    await this.redisClient.del(`todos`);
    return todo;
  }

  /**
   * Get all todos
   * @returns 
   */
  async getAllTodos(): Promise<Todo[]> {
    // Try to get from cache first
    const cachedTodos = await this.redisClient.get(`todos`);
    if (cachedTodos) {
      return JSON.parse(cachedTodos);
    }

    // If not in cache, get from database
    const todos = await this.prisma.todo.findMany({});

    // Store in cache
    await this.redisClient.setEx(
      `todos`,
      cacheExpires,
      JSON.stringify(todos)
    );

    return todos;
  }

  /**
   * Get single todo
   * @param id 
   * @returns 
   */
  async getSingleTodo(id: string): Promise<Todo | null> {
    // Try to get from cache first
    const cachedTodo = await this.redisClient.get(`todo:${id}`);
    if (cachedTodo) {
      return JSON.parse(cachedTodo);
    }

    // If not in cache, get from database
    const todo = await this.prisma.todo.findUnique({
      where: { id }
    });

    if (todo) {
      // Store in cache
      await this.redisClient.setEx(
        `todo:${id}`,
        cacheExpires,
        JSON.stringify(todo)
      );
    }

    return todo;
  }

  /**
   * Update todo
   * @param id 
   * @param payload 
   * @returns 
   */
  async updateTodo(id: string, payload: Partial<Todo>): Promise<Todo> {
    const { data, error } = TodoUpdateDTOSchema.safeParse(payload);
    if (error) {
      throw new Error(error.message);
    }

    const todo = await this.prisma.todo.update({
      where: { id },
      data
    });

    // Invalidate specific todo cache
    await this.redisClient.del(`todo:${id}`);
    await this.redisClient.del(`todos`);

    // set updated todo in cache
    await this.redisClient.setEx(`todo:${id}`, cacheExpires, JSON.stringify(todo));

    return todo;
  }

  /**
   * Delete todo
   * @param id 
   */
  async deleteTodo(id: string): Promise<string> {
    const todo = await this.prisma.todo.delete({
      where: { id }
    });

    // Invalidate specific todo cache
    await this.redisClient.del(`todo:${id}`);
    // Invalidate all todos cache
    await this.redisClient.del(`todos`);

    return todo.id + 'is deleted';
  }

}

const todoServices = new TodoServices()
export default todoServices