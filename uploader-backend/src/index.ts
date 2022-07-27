import { uploadRoutes } from './routes';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

require('dotenv').config();

export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(uploadRoutes);

const server = app.listen(3001, () => {
  console.log('Running on PORT 3001');
});

// https://bobbyhadz.com/blog/typescript-cannot-use-import-statement-outside-module
