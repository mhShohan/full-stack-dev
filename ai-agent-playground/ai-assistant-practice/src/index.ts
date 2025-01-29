import express, { Application } from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import router from './routes'
import mongoose from 'mongoose'
import config from './utils/config'

const app: Application = express()
dotenv.config()

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

// environment variables
const PORT = process.env.PORT || 5000

// routes 
app.use('/api/v1', router)

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

mongoose.connect(config.database_url!).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
  })
})
