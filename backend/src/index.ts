import express from 'express';
import cors from 'cors';
import 'dotenv/config';

const app = express();

// middlewares
app.use(express.json());
app.use(cors({ origin: '*' }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
