import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export async function uploadFile(req: Request, res: Response) {
  try {
    const file = req.file;
    console.log('🚀 ~ file', file);
    return res
      .status(StatusCodes.OK)
      .send({ success: true, data: { message: `File ${file?.originalname} was successfully uploaded` } });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ success: false, data: { message: error.message } });
  }
}
