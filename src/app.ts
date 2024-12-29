/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { StatusCodes } from 'http-status-codes';
import { globalErrorHandler } from './middlewares/globalErrorHandler';
import userRouter from './app/module/user/user.route';
import BlogRouter from './app/module/blogs/blog.route';
import authRouter from './app/module/auth/auth.router';
import { AdminRoutes } from './app/module/admin/admin.route';

const app: Application = express();
// const port = 3000;

//parsers
app.use(express.json());
app.use(cors());

app.use('/api/user', userRouter);
app.use('/api/blogs', BlogRouter);
app.use('/api/auth', authRouter);
app.use('/api/admin', AdminRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World! ⚡');
});

// console.log(process.cwd());
app.use(globalErrorHandler);

app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    status: false,
    message: 'Route not found',
  });
});

export default app;
