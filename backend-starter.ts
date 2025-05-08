// Project Structure
/*
express-typescript-mongodb-starter/
├── src/
│   ├── config/
│   │   ├── db.ts
│   │   ├── env.ts
│   │   └── index.ts
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── user.controller.ts
│   │   └── index.ts
│   ├── middlewares/
│   │   ├── error.middleware.ts
│   │   ├── auth.middleware.ts
│   │   ├── validation.middleware.ts
│   │   └── index.ts
│   ├── models/
│   │   ├── user.model.ts
│   │   └── index.ts
│   ├── repositories/
│   │   ├── base.repository.ts
│   │   ├── user.repository.ts
│   │   └── index.ts
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── user.routes.ts
│   │   └── index.ts
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── user.service.ts
│   │   └── index.ts
│   ├── types/
│   │   ├── express.d.ts
│   │   ├── user.interface.ts
│   │   └── index.ts
│   ├── utils/
│   │   ├── logger.ts
│   │   ├── api-response.ts
│   │   ├── password.ts
│   │   └── index.ts
│   ├── app.ts
│   └── server.ts
├── tests/
│   ├── integration/
│   │   └── user.test.ts
│   └── unit/
│       └── user.service.test.ts
├── .env.example
├── .gitignore
├── .eslintrc.js
├── .prettierrc
├── jest.config.js
├── nodemon.json
├── package.json
├── tsconfig.json
└── README.md
*/

// package.json
{
  "name": "express-typescript-mongodb-starter",
  "version": "1.0.0",
  "description": "A Node.js Express MongoDB TypeScript backend starter project",
  "main": "dist/server.js",
  "scripts": {
    "start": "node dist/server.js",
    "dev": "nodemon src/server.ts",
    "build": "tsc",
    "lint": "eslint . --ext .ts",
    "format": "prettier --write \"src/**/*.ts\"",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  },
  "keywords": [
    "node",
    "express",
    "typescript",
    "mongodb",
    "api"
  ],
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "compression": "^1.7.4",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "express-validator": "^7.0.1",
    "helmet": "^7.0.0",
    "jsonwebtoken": "^9.0.1",
    "mongoose": "^7.4.3",
    "morgan": "^1.10.0",
    "winston": "^3.10.0"
  },
  "devDependencies": {
    "@types/bcryptjs": "^2.4.2",
    "@types/compression": "^1.7.3",
    "@types/cors": "^2.8.13",
    "@types/express": "^4.17.17",
    "@types/jest": "^29.5.3",
    "@types/jsonwebtoken": "^9.0.2",
    "@types/morgan": "^1.9.4",
    "@types/node": "^20.5.0",
    "@types/supertest": "^2.0.12",
    "@typescript-eslint/eslint-plugin": "^6.4.0",
    "@typescript-eslint/parser": "^6.4.0",
    "eslint": "^8.47.0",
    "eslint-config-prettier": "^9.0.0",
    "eslint-plugin-prettier": "^5.0.0",
    "jest": "^29.6.2",
    "nodemon": "^3.0.1",
    "prettier": "^3.0.2",
    "supertest": "^6.3.3",
    "ts-jest": "^29.1.1",
    "ts-node": "^10.9.1",
    "typescript": "^5.1.6"
  },
  "author": "",
  "license": "MIT"
}

// tsconfig.json
{
  "compilerOptions": {
    "target": "es2020",
    "module": "commonjs",
    "lib": ["es2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "moduleResolution": "node",
    "typeRoots": ["./src/types", "./node_modules/@types"],
    "sourceMap": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "tests"]
}

// .env.example
NODE_ENV=development
PORT=3000
DATABASE_URI=mongodb://localhost:27017/app
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=90d
LOG_LEVEL=info
CORS_ORIGIN=*

// .gitignore
# Logs
logs
*.log
npm-debug.log*

# Dependency directories
node_modules/

# Build output
dist/

# Environment variables
.env

# Coverage directory
coverage/

# IDE
.idea/
.vscode/
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# OS
.DS_Store
Thumbs.db

// src/server.ts
import { createServer } from 'http';
import app from './app';
import { connectDB } from './config/db';
import { logger } from './utils/logger';
import { config } from './config';

// Uncaught exception handler
process.on('uncaughtException', (err) => {
  logger.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  logger.error(`${err.name}: ${err.message}`);
  process.exit(1);
});

// Connect to database
connectDB();

// Create HTTP server
const server = createServer(app);

// Start server
const PORT = config.PORT || 3000;
const server_instance = server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT} in ${config.NODE_ENV} mode`);
});

// Unhandled rejection handler
process.on('unhandledRejection', (err: Error) => {
  logger.error('UNHANDLED REJECTION! 💥 Shutting down...');
  logger.error(`${err.name}: ${err.message}`);
  server_instance.close(() => {
    process.exit(1);
  });
});

// SIGTERM handler
process.on('SIGTERM', () => {
  logger.info('👋 SIGTERM RECEIVED. Shutting down gracefully');
  server_instance.close(() => {
    logger.info('💥 Process terminated!');
  });
});

// src/app.ts
import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import { config } from './config';
import { errorMiddleware } from './middlewares/error.middleware';
import routes from './routes';

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares(): void {
    // Security HTTP headers
    this.app.use(helmet());

    // CORS
    this.app.use(
      cors({
        origin: config.CORS_ORIGIN,
        credentials: true,
      })
    );

    // Body parser
    this.app.use(express.json({ limit: '10kb' }));
    this.app.use(express.urlencoded({ extended: true, limit: '10kb' }));

    // Request compression
    this.app.use(compression());

    // Development logging
    if (config.NODE_ENV === 'development') {
      this.app.use(morgan('dev'));
    }
  }

  private initializeRoutes(): void {
    this.app.use('/api/v1', routes);
  }

  private initializeErrorHandling(): void {
    this.app.use(errorMiddleware);
  }
}

export default new App().app;

// src/config/index.ts
import { env } from './env';

export const config = {
  NODE_ENV: env('NODE_ENV', 'development'),
  PORT: parseInt(env('PORT', '3000'), 10),
  DATABASE_URI: env('DATABASE_URI', 'mongodb://localhost:27017/app'),
  JWT_SECRET: env('JWT_SECRET', 'your-secret-key'),
  JWT_EXPIRES_IN: env('JWT_EXPIRES_IN', '90d'),
  LOG_LEVEL: env('LOG_LEVEL', 'info'),
  CORS_ORIGIN: env('CORS_ORIGIN', '*'),
};

// src/config/env.ts
/**
 * Get environment variable value
 * @param key - Environment variable key
 * @param defaultValue - Default value if environment variable is not set
 * @returns Environment variable value
 */
export const env = (key: string, defaultValue: string = ''): string => {
  return process.env[key] || defaultValue;
};

// src/config/db.ts
import mongoose from 'mongoose';
import { config } from './index';
import { logger } from '../utils/logger';

/**
 * Connect to MongoDB database
 */
export const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(config.DATABASE_URI);
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    logger.error('Error connecting to database:', error);
    process.exit(1);
  }
};

// src/utils/logger.ts
import winston from 'winston';
import { config } from '../config';

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue',
};

winston.addColors(colors);

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`
  )
);

const transports = [
  new winston.transports.Console(),
  new winston.transports.File({
    filename: 'logs/error.log',
    level: 'error',
  }),
  new winston.transports.File({ filename: 'logs/all.log' }),
];

export const logger = winston.createLogger({
  level: config.NODE_ENV === 'development' ? 'debug' : config.LOG_LEVEL,
  levels,
  format,
  transports,
});

// src/utils/api-response.ts
export class ApiResponse {
  static success<T>(data: T, message: string = 'Success') {
    return {
      status: 'success',
      message,
      data,
    };
  }

  static error(message: string = 'Error', statusCode: number = 500) {
    return {
      status: 'error',
      message,
      statusCode,
    };
  }
}

// src/utils/password.ts
import bcrypt from 'bcryptjs';

export class PasswordUtil {
  /**
   * Hash plain password
   * @param password - Plain password
   * @returns Hashed password
   */
  static async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  /**
   * Compare plain password with hashed password
   * @param password - Plain password
   * @param hashedPassword - Hashed password
   * @returns True if passwords match, false otherwise
   */
  static async compare(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}

// src/types/user.interface.ts
import { Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
  comparePassword(password: string): Promise<boolean>;
}

export interface IUserCreate {
  name: string;
  email: string;
  password: string;
  role?: 'user' | 'admin';
}

export interface IUserResponse {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

// src/types/express.d.ts
import { Express } from 'express-serve-static-core';
import { IUser } from './user.interface';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

// src/models/user.model.ts
import mongoose, { Schema } from 'mongoose';
import { IUser } from '../types/user.interface';
import { PasswordUtil } from '../utils/password';

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 8,
      select: false,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password;
      },
    },
  }
);

// Hash user password before saving
userSchema.pre('save', async function (next) {
  // Only run this function if password was modified
  if (!this.isModified('password')) return next();

  // Hash the password
  this.password = await PasswordUtil.hash(this.password);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return await PasswordUtil.compare(password, this.password);
};

export const User = mongoose.model<IUser>('User', userSchema);

// src/repositories/base.repository.ts
import { Document, Model, FilterQuery, UpdateQuery } from 'mongoose';

export abstract class BaseRepository<T extends Document> {
  constructor(protected model: Model<T>) {}

  async findAll(filter: FilterQuery<T> = {}): Promise<T[]> {
    return this.model.find(filter);
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findById(id);
  }

  async findOne(filter: FilterQuery<T>): Promise<T | null> {
    return this.model.findOne(filter);
  }

  async create(data: Partial<T>): Promise<T> {
    return this.model.create(data);
  }

  async update(id: string, data: UpdateQuery<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<T | null> {
    return this.model.findByIdAndDelete(id);
  }
}

// src/repositories/user.repository.ts
import { IUser } from '../types/user.interface';
import { User } from '../models/user.model';
import { BaseRepository } from './base.repository';

export class UserRepository extends BaseRepository<IUser> {
  constructor() {
    super(User);
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return this.model.findOne({ email }).select('+password');
  }
}

// src/services/user.service.ts
import { IUser, IUserCreate, IUserResponse } from '../types/user.interface';
import { UserRepository } from '../repositories/user.repository';
import { AppError } from '../utils/app-error';

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async getAllUsers(): Promise<IUserResponse[]> {
    const users = await this.userRepository.findAll();
    return users as unknown as IUserResponse[];
  }

  async getUserById(id: string): Promise<IUserResponse> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new AppError('User not found', 404);
    }
    return user as unknown as IUserResponse;
  }

  async createUser(userData: IUserCreate): Promise<IUserResponse> {
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new AppError('Email already in use', 400);
    }
    const user = await this.userRepository.create(userData);
    return user as unknown as IUserResponse;
  }

  async updateUser(
    id: string,
    userData: Partial<IUserCreate>
  ): Promise<IUserResponse> {
    const user = await this.userRepository.update(id, userData);
    if (!user) {
      throw new AppError('User not found', 404);
    }
    return user as unknown as IUserResponse;
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.userRepository.delete(id);
    if (!user) {
      throw new AppError('User not found', 404);
    }
  }
}

// src/utils/app-error.ts
export class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// src/services/auth.service.ts
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/user.repository';
import { config } from '../config';
import { AppError } from '../utils/app-error';
import { IUser, IUserCreate, IUserResponse } from '../types/user.interface';

interface TokenPayload {
  id: string;
  role: string;
}

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  private generateToken(user: IUser): string {
    const payload: TokenPayload = {
      id: user.id,
      role: user.role,
    };

    return jwt.sign(payload, config.JWT_SECRET, {
      expiresIn: config.JWT_EXPIRES_IN,
    });
  }

  async register(userData: IUserCreate): Promise<{
    user: IUserResponse;
    token: string;
  }> {
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new AppError('Email already in use', 400);
    }

    const user = await this.userRepository.create(userData);
    const token = this.generateToken(user);

    return {
      user: user as unknown as IUserResponse,
      token,
    };
  }

  async login(email: string, password: string): Promise<{
    user: IUserResponse;
    token: string;
  }> {
    const user = await this.userRepository.findByEmail(email);
    if (!user || !(await user.comparePassword(password))) {
      throw new AppError('Invalid email or password', 401);
    }

    const token = this.generateToken(user);

    return {
      user: user as unknown as IUserResponse,
      token,
    };
  }

  async verifyToken(token: string): Promise<IUser> {
    try {
      const decoded = jwt.verify(token, config.JWT_SECRET) as TokenPayload;
      const user = await this.userRepository.findById(decoded.id);

      if (!user) {
        throw new AppError('User not found', 404);
      }

      return user;
    } catch (error) {
      throw new AppError('Invalid token', 401);
    }
  }
}

// src/controllers/user.controller.ts
import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';
import { ApiResponse } from '../utils/api-response';
import { catchAsync } from '../utils/catch-async';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  getAllUsers = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const users = await this.userService.getAllUsers();
      res.status(200).json(ApiResponse.success(users, 'Users retrieved successfully'));
    }
  );

  getUserById = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const user = await this.userService.getUserById(req.params.id);
      res.status(200).json(ApiResponse.success(user, 'User retrieved successfully'));
    }
  );

  createUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const user = await this.userService.createUser(req.body);
      res.status(201).json(ApiResponse.success(user, 'User created successfully'));
    }
  );

  updateUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const user = await this.userService.updateUser(req.params.id, req.body);
      res.status(200).json(ApiResponse.success(user, 'User updated successfully'));
    }
  );

  deleteUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      await this.userService.deleteUser(req.params.id);
      res.status(204).json();
    }
  );
}

// src/utils/catch-async.ts
import { Request, Response, NextFunction } from 'express';

type AsyncFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

export const catchAsync = (fn: AsyncFunction) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

// src/controllers/auth.controller.ts
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
import { ApiResponse } from '../utils/api-response';
import { catchAsync } from '../utils/catch-async';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  register = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { user, token } = await this.authService.register(req.body);
      res.status(201).json(
        ApiResponse.success(
          { user, token },
          'User registered successfully'
        )
      );
    }
  );

  login = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { email, password } = req.body;
      const { user, token } = await this.authService.login(email, password);
      res.status(200).json(
        ApiResponse.success(
          { user, token },
          'User logged in successfully'
        )
      );
    }
  );
}

// src/middlewares/validation.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain } from 'express-validator';
import { AppError } from '../utils/app-error';

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Run all validations
    for (const validation of validations) {
      const result = await validation.run(req);
      if (!result.isEmpty()) break;
    }

    // Check for validation errors
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    const extractedErrors: Record<string, string> = {};
    errors.array().forEach((err) => {
      if ('path' in err && err.path && typeof err.msg === 'string') {
        extractedErrors[err.path] = err.msg;
      }
    });

    const errorMessage = Object.keys(extractedErrors).length > 0
      ? Object.values(extractedErrors)[0]
      : 'Validation error';

    return next(new AppError(errorMessage, 400));
  };
};

// src/middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
import { AppError } from '../utils/app-error';

const authService = new AuthService();

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(new AppError('Authentication required', 401));
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return next(new AppError('Authentication required', 401));
    }

    // Verify token
    const user = await authService.verifyToken(token);
    req.user = user;
    next();
  } catch (error) {
    next(new AppError('Authentication failed', 401));
  }
};

export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError('Authentication required', 401));
    }

    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }

    next();
  };
};

// src/middlewares/error.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { config } from '../config';
import { logger } from '../utils/logger';
import { AppError } from '../utils/app-error';
import { ApiResponse } from '../utils/api-response';

/**
 * Error middleware
 */
export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  // Log error
  logger.error(`${err.name}: ${err.message}`);

  // Default error
  let statusCode = 500;
  let message = 'Something went wrong';
  let stack: string | undefined;

  // Handle known errors
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  // Include stack trace in development
  if (config.NODE_ENV === 'development') {
    stack = err.stack;
  }

  // Send response
  res.status(statusCode).json({
    ...ApiResponse.error(message, statusCode),
    ...(stack && { stack }),
  });
};

// src/routes/user.routes.ts
import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validation.middleware';
import { body, param } from 'express-validator';

const router = Router();
const userController = new UserController();

// Validation schemas
const createUserValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  body('role').optional().isIn(['user', 'admin']).withMessage('Invalid role'),
];

const updateUserValidation = [
  body('name').optional().notEmpty().withMessage('Name cannot be empty'),
  body('email').optional().isEmail().withMessage('Valid email is required'),
  body('password')
    .optional()
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  body('role').optional().isIn(['user', 'admin']).withMessage('Invalid role'),
];

const userIdValidation = [
  param('id')
    .notEmpty()
    .withMessage('User ID is required')
    .isMongoId()
    .withMessage('Invalid user ID'),
];

router
  .route('/')
  .get(authenticate, authorize('admin'), userController.getAllUsers)
  .post(
    authenticate,
    authorize('admin'),
    validate(createUserValidation),
    userController.createUser
  );

router
  .route('/:id')
  .get(
    authenticate,
    validate(userIdValidation),
    userController.getUserById
  )
  .patch(
    