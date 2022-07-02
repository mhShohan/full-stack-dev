require('dotenv').config()
const { createServer } = require('http')
const app = require('./app/app')


//PORT
const PORT = process.env.PORT || 6000

const server = createServer(app)

server.listen(PORT, () => console.log(`http://localhost:${PORT}`))