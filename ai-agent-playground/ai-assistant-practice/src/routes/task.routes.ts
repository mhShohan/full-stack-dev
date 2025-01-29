import taskController from '@/controllers/task.controllers'
import { Router } from 'express'

const taskRoutes = Router()

taskRoutes.get('/:id', taskController.getSingle)
taskRoutes.delete('/:id', taskController.delete)
taskRoutes.patch('/:id', taskController.update)
taskRoutes.get('/', taskController.getAll)
taskRoutes.post('/', taskController.create)


export default taskRoutes