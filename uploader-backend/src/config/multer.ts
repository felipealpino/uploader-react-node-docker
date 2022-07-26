import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const multerConfiguration = {
  dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'));
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'));
        file.fieldname = `${hash.toString('hex')}-${file.originalname}`;
        cb(null, file.fieldname);
      });
    },
  }),
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB
    // fileSize: 512, // fail test
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png', 'image/gif'];
    // const allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type.'));
    }
  },
};

export { multerConfiguration };
