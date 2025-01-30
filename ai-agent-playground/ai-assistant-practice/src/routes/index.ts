import { Router } from 'express';
import taskRoutes from './task.routes';
import assistantAPI from '@/api/assistantAPI';

const router = Router();

router.use('/task', taskRoutes);

router.post('/assistant', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    res.status(400).json({
      message: 'Prompt is required!',
    });
  }

  const data = await assistantAPI.newAssistant(prompt);

  res.status(200).json({
    data,
  });
});

export default router;
