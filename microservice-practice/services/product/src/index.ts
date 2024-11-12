import express, { RequestHandler } from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import { createProduct, getAllProducts, getSingleProduct } from './controllers'

const app = express()
dotenv.config()

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

// environment variables
const PORT = process.env.PORT || 4001
const serviceName = process.env.SERVICE_NAME || 'product_service'

// allowedOrigins middleware
app.use((req, res, next) => {
  const allowedOrigins = [ 'http://localhost:8081', 'http://127.0.0.1:8081' ]
  const origin = req.headers.origin || ''

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-origin', origin)
    next()
  }

  res.status(403).json({
    status: 'failure',
    statusCode: 403,
    success: false,
    message: 'Forbidden'
  })
})

// routes
app.get('/products/:id', getSingleProduct as RequestHandler)
app.get('/products', getAllProducts as RequestHandler)
app.post('/products', createProduct as RequestHandler)


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
