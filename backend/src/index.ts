import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { authRouter } from './routes/auth.route';

const app = express();

// middlewares
app.use(express.json());
app.use(cors({ origin: '*' }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/api/v1/auth', authRouter);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
