import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import { uploadRoutes } from './routes';
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(uploadRoutes);

const server = app.listen(3001, () => {
  console.log('Running on PORT 3001');
});

server.setTimeout(3000);
