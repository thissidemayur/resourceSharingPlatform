import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { authRouter } from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import { resourceRouter } from './routes/resource.routes.js';

const app = express();

// middlewares
app.use(express.json());
app.use(cors({ origin: '*' }));
app.use(cookieParser());
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/resources', resourceRouter);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
