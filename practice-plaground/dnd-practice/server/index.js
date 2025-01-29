const express = require('express')
const mongoose = require("mongoose");
const cors = require('cors')
require('dotenv').config()
const User = require('./User.model')

const app = express()
app.use(express.json())
app.use(cors())

app.get('/users', async (req, res) => {
    const users = await User.find()
    res.json(users)
})

app.get('/users/:id', async (req, res) => {
    const body = req.body
    const user = await User.findByIdAndUpdate(req.params.currentId, {
        index: body.newIndex,
    }, {new: true})

    for(let i= body.newIndex+1; i<=body.oldIndex; i++){
        const user = await User.findOneAndUpdate(i, {
            index: i+1,
        }, {new: true})
    }

    const users = await User.find()

    res.json(user)
})

const PORT = process.env.PORT || 5000
mongoose.connect(process.env.MONGO_URI).then(() =>{
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
})
