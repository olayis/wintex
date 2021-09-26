import express from 'express';
import path from 'path';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

const router = express.Router();

// // Temporarily create uploads folder to be used before uploading to cloudinary if not already present
// if (!fs.existsSync('./uploads')) {
//   fs.mkdirSync('./uploads');
// }

// Multer setup
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './uploads');
  },
  filename(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(
      null,
      `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`
    );
  },
});

const checkFileType = (file, cb) => {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Please upload images only.');
  }
};

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async function (localFilePath) {
  try {
    const result = await cloudinary.uploader.upload(localFilePath);

    fs.unlinkSync(localFilePath);

    return {
      message: `Image uploaded to ${result.url} successfully on Cloudinary`,
      url: result.url,
    };
  } catch (error) {
    fs.unlinkSync(localFilePath);
    console.error(error);
    return {
      message: 'Image failed to upload to Cloudinary',
    };
  }
};

router.post('/', upload.single('image'), async (req, res, next) => {
  const localFilePath = req.file.path;

  const result = await uploadToCloudinary(localFilePath);

  res.send(result.url);
});

export default router;
