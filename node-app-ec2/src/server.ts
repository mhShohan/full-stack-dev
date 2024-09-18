import express from 'express'

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Route for the home page
app.get('/', (req, res) => {
  res.status(200).send({
    success: true,
    statusCode: 200,
    message: 'Server is running Successfully'
  });
});

// Route for a sample API endpoint
app.get('/health', (req, res) => {
  res.status(200).send({
    success: true,
    statusCode: 200,
    message: 'Successfully fetched! Health is Okay'
  });
});

// Start the server
app.listen(5000, () => {
  console.log(`Server running on: ${5000}`);
});