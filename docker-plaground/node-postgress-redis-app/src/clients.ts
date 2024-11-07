import { PrismaClient } from '@prisma/client'
import { createClient } from 'redis';

// Create a new Redis client
const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.on('connect', () => console.log('Redis Client Connected'));

// Create a new Prisma client
export const prisma = new PrismaClient()

/**
 * ClientService class
 * - This class is responsible for managing the Prisma and Redis clients
 * - It provides methods to connect and disconnect from the clients
 * - It also provides the Prisma and Redis clients as properties
 */
class ClientService {
  prisma = prisma
  redisClient = redisClient

  constructor() {
    this.prisma = prisma
    this.redisClient = redisClient
  }

  async redisConnect() {
    await this.redisClient.connect();
  }

  async redisDisconnect() {
    await this.redisClient.disconnect();
  }
}

export default ClientService
