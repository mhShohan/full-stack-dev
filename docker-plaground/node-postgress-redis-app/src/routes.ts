import { RequestHandler, Router } from 'express'
import todoController from './controllers/todo.controller'

const router = Router()

router.post('/todos', todoController.createTodo)
router.get('/todos/:id', todoController.getSingleTodo as RequestHandler)
router.patch('/todos/:id', todoController.updateTodo as RequestHandler)
router.delete('/todos/:id', todoController.deleteTodo as RequestHandler)
router.get('/todos', todoController.getAllTodos)

export default router