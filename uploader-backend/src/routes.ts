const uploadRoutes = require('express').Router();
import multer from 'multer';
import { multerConfiguration } from './config/multer';
import { uploadFile } from './helpers/uploadFile';

uploadRoutes.post('/upload_file', multer(multerConfiguration).single('file'), uploadFile);

export { uploadRoutes };
