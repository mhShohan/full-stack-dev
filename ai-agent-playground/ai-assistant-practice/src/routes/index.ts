import { Router } from 'express'
import taskRoutes from './task.routes'

const router = Router()

router.use('/task', taskRoutes)

export default router