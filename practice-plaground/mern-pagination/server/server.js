const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const Post = require('./models/Post');

const app = express();

app.use(express.json());
app.use(cors());


app.use('/api/v1/posts', require('./routes/postRoutes'));

connectDB().then(() => {
    console.log('db connected');
    app.listen(4000, () => {
        console.log(`http://localhost:4000`);
    });
}).catch(() => console.log('db failed'));
