import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { authRouter } from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import { resourceRouter } from './routes/resource.routes.js';
import { requestRouter } from './routes/request.route.js';
import { ApiError } from './utils/apiError.js';

const app = express();
const allowedOrigins = [
  process.env.DEVELOPMENT_ORIGIN as string,
  process.env.PRODUCTION_ORIGIN as string,
];

// middlewares
app.use(express.json());
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(cookieParser());
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/resources', resourceRouter);
app.use('/api/v1/requests', requestRouter);

// centeralized error handler
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    if (err instanceof ApiError) {
      return res.status(err.status).json({
        success: false,
        status: err.status,
        message: err.message,
        error: err.error || [],
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
      });
    }

    // fallback for unexpected errors
    if (err instanceof Error) {
      return res.status(500).json({
        success: false,
        status: 500,
        message: err.message || 'Something went wrong',
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
      });
    }
    next();
  },
);
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
