import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
const uploadRoutes = require('express').Router();

import multer from 'multer';
import { multerConfiguration } from './config/multer';
import { uploadFile } from './helper/uploadFile';

uploadRoutes.post('/upload_file', multer(multerConfiguration).single('file'), (req:Request, res:Response) => uploadFile(req, res));

export { uploadRoutes };
