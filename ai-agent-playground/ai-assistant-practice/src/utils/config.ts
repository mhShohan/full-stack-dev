import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  openApiKey: process.env.OPENAI_API_KEY,
  assistantId: process.env.ASSISTANT_ID,
};
