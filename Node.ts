// src/index.ts
import express from 'express';
import dotenv from 'dotenv';
import { Database } from './config/database';
import { setupRoutes } from './routes';
import { errorHandler } from './middleware/errorHandler';
import logger from './utils/logger';

dotenv.config();

class Server {
  private app: express.Application;
  private port: number;
  private database: Database;

  constructor() {
    this.app = express();
    this.port = parseInt(process.env.PORT || '3000');
    this.database = new Database();
    this.configure();
  }

  private configure(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    setupRoutes(this.app);
    this.app.use(errorHandler);
  }

  public async start(): Promise<void> {
    try {
      await this.database.connect();
      this.app.listen(this.port, () => {
        logger.info(`Server running on port ${this.port}`);
      });
    } catch (error) {
      logger.error('Failed to start server:', error);
      process.exit(1);
    }
  }
}

const server = new Server();
server.start();

// src/config/database.ts
import mongoose from 'mongoose';
import logger from '../utils/logger';

export class Database {
  private readonly uri: string;

  constructor() {
    this.uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/express-ts';
  }

  public async connect(): Promise<void> {
    try {
      await mongoose.connect(this.uri, {
        autoIndex: true,
      });
      logger.info('Connected to MongoDB');
    } catch (error) {
      logger.error('MongoDB connection error:', error);
      throw error;
    }
  }

  public async disconnect(): Promise<void> {
    await mongoose.disconnect();
    logger.info('Disconnected from MongoDB');
  }
}

// src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../utils/httpError';
import logger from '../utils/logger';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(error.message, { stack: error.stack });

  if (error instanceof HttpError) {
    return res.status(error.statusCode).json({
      error: error.message,
      statusCode: error.statusCode,
    });
  }

  res.status(500).json({
    error: 'Internal Server Error',
    statusCode: 500,
  });
};

// src/utils/httpError.ts
export class HttpError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'HttpError';
  }
}

// src/utils/logger.ts
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

export default logger;

// src/routes/index.ts
import { Application } from 'express';
import userRoutes from './userRoutes';

export const setupRoutes = (app: Application): void => {
  app.use('/api/users', userRoutes);
};

// src/routes/userRoutes.ts
import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { UserService } from '../services/userService';
import { UserRepository } from '../repositories/userRepository';

const router = Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.get('/', userController.getAllUsers.bind(userController));
router.get('/:id', userController.getUserById.bind(userController));
router.post('/', userController.createUser.bind(userController));
router.put('/:id', userController.updateUser.bind(userController));
router.delete('/:id', userController.deleteUser.bind(userController));

export default router;

// src/controllers/userController.ts
import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { HttpError } from '../utils/httpError';

export class UserController {
  constructor(private userService: UserService) {}

  async getAllUsers(req: Request, res: Response): Promise<void> {
    const users = await this.userService.getAllUsers();
    res.json(users);
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    const user = await this.userService.getUserById(req.params.id);
    if (!user) {
      throw new HttpError('User not found', 404);
    }
    res.json(user);
  }

  async createUser(req: Request, res: Response): Promise<void> {
    const user = await this.userService.createUser(req.body);
    res.status(201).json(user);
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    const user = await this.userService.updateUser(req.params.id, req.body);
    if (!user) {
      throw new HttpError('User not found', 404);
    }
    res.json(user);
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    await this.userService.deleteUser(req.params.id);
    res.status(204).send();
  }
}

// src/services/userService.ts
import { UserRepository } from '../repositories/userRepository';
import { User } from '../models/user';
import { HttpError } from '../utils/httpError';

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async getUserById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async createUser(userData: Partial<User>): Promise<User> {
    if (!userData.email || !userData.name) {
      throw new HttpError('Name and email are required', 400);
    }
    return this.userRepository.create(userData);
  }

  async updateUser(id: string, userData: Partial<User>): Promise<User | null> {
    return this.userRepository.update(id, userData);
  }

  async deleteUser(id: string): Promise<void> {
    const deleted = await this.userRepository.delete(id);
    if (!deleted) {
      throw new HttpError('User not found', 404);
    }
  }
}

// src/repositories/userRepository.ts
import { User, UserModel } from '../models/user';
import { Types } from 'mongoose';

export class UserRepository {
  async findAll(): Promise<User[]> {
    return UserModel.find().exec();
  }

  async findById(id: string): Promise<User | null> {
    if (!Types.ObjectId.isValid(id)) {
      return null;
    }
    return UserModel.findById(id).exec();
  }

  async create(userData: Partial<User>): Promise<User> {
    const user = new UserModel(userData);
    return user.save();
  }

  async update(id: string, userData: Partial<User>): Promise<User | null> {
    if (!Types.ObjectId.isValid(id)) {
      return null;
    }
    return UserModel.findByIdAndUpdate(id, userData, { new: true }).exec();
  }

  async delete(id: string): Promise<boolean> {
    if (!Types.ObjectId.isValid(id)) {
      return false;
    }
    const result = await UserModel.findByIdAndDelete(id).exec();
    return !!result;
  }
}

// src/models/user.ts
import { Schema, model, Document } from 'mongoose';

export interface User extends Document {
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<User>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

export const UserModel = model<User>('User', userSchema);

// src/types/environment.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    PORT?: string;
    MONGODB_URI?: string;
    NODE_ENV?: 'development' | 'production' | 'test';
  }
}

// .env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/express-ts
NODE_ENV=development

// tsconfig.json
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}

// package.json
{
  "name": "express-ts-starter",
  "version": "1.0.0",
  "scripts": {
    "start": "node dist/index.js",
    "build": "tsc",
    "dev": "ts-node-dev --respawn src/index.ts",
    "lint": "eslint src/**/*.{ts,tsx}",
    "format": "prettier --write src/**/*.{ts,tsx}"
  },
  "dependencies": {
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "mongoose": "^8.0.0",
    "winston": "^3.8.2"
  },
  "devDependencies": {
    "@types/express": "^4.17.17",
    "@types/node": "^20.0.0",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "eslint": "^8.0.0",
    "prettier": "^3.0.0",
    "ts-node-dev": "^2.0.0",
    "typescript": "^5.0.0"
  }
}