import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import { configureRoutes } from './utils'

const app = express()
dotenv.config()

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

// security middleware
app.use(helmet())

const reteLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  handler: (_req, res) => {
    return res.status(429).json({
      status: 'failure',
      statusCode: 429,
      success: false,
      message: 'Too many requests, Please try again later.'
    })
  }
})

// apply to all requests of api
app.use('api', reteLimiter)

// environment variables
const PORT = process.env.PORT || 8081
const serviceName = process.env.SERVICE_NAME || 'service_name'

// routes
configureRoutes(app)

// health route
app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'success',
    statusCode: 200,
    success: true,
    message: `${serviceName} is UP now!`
  })
})


// 404 - not Found
app.use((_req, res) => {
  res.status(404).json({
    status: 'failure',
    statusCode: 404,
    success: false,
    message: '404! Not Found.'
  })
})

// global error handler
app.use((err, _req, res, _next) => {
  res.status(500).json({
    status: 'failure',
    statusCode: 500,
    success: false,
    message: 'Internal Server Error!',
    errors: err
  })
})


app.listen(PORT, () => {
  console.log(`${serviceName} running on port: ${PORT}`)
})
