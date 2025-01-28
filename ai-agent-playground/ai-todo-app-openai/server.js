import express from 'express';
import dotenv from 'dotenv';
import runAssistant from './assistantAPI.js';

dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.post('/', async (req, res) => {
  const prompt = req.body.prompt;

  if (!prompt) {
    return res.status(400).json({ error: 'Please provide a prompt.' });
  }

  const result = await runAssistant(prompt);

  res.status(200).json(result);
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});