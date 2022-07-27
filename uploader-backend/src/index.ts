import { uploadRoutes } from './routes';
import express from 'express';
import cors from 'cors';

export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(uploadRoutes);

app.listen(3001, () => {
  console.log('Running on PORT 3001');
});

