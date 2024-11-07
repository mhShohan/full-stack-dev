import express, { Application } from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import router from './routes'
import setupSwagger from './swagger'
import ClientServices from './clients'

const app: Application = express()
dotenv.config()

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

// environment variables
const PORT = process.env.PORT || 5000

// Initialize Swagger
setupSwagger(app);

// routes
app.use('/api/v1', router)

// health route
app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'success',
    statusCode: 200,
    success: true,
    message: `App is UP now!`
  })
})

// not Found
app.use((_req, res) => {
  res.status(404).json({
    status: 'failure',
    statusCode: 404,
    success: false,
    message: '404! Not Found.'
  })
})

// error handler
app.use((err, _req, res, _next) => {
  console.log(err.stack)

  res.status(500).json({
    status: 'failure',
    statusCode: 500,
    success: false,
    message: 'Internal Server Error!',
    errors: err
  })
})

const clientServices = new ClientServices()
clientServices.redisConnect().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
  })
})


