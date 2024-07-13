import express from 'express';
import { Request, Response } from 'express';
import client from './redis/client';

const app = express();
app.use(express.json());


app.get('/', async (_req: Request, res: Response) => {
  try {
    const cached = await client.get('posts');

    if (cached) {
      return res.status(200).json(JSON.parse(cached));
    }

    const result = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await result.json();

    await client.set('posts', JSON.stringify(data));
    await client.expire('posts', 10); // cache expire in 10 seconds

    return res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const cached = await client.hmget(`post`, id);

    if (cached.length < 0) {
      return res.status(200).json(JSON.parse(cached[0]!));
    }

    const result = await fetch('https://jsonplaceholder.typicode.com/posts/' + id);
    const data = await result.json();

    await client.hmset('post', {
      [id]: JSON.stringify(data),
    });

    return res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});