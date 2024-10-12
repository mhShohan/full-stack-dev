import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'

const app = express()
dotenv.config()

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

// environment variables
const PORT = process.env.PORT || 4000
const serviceName = process.env.SERVICE_NAME || 'service_name'

// routes


// health route
app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'success',
    statusCode: 200,
    success: true,
    message: `${serviceName} is UP now!`
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
