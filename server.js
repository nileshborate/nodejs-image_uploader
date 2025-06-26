import express from 'express';
import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import path from 'path';
import { File } from './models/ImageSchema.js';

const app = express();

//CLOUDINARY_URL=cloudinary://571369474173466:rBpMOzV7UQ9qkRsjPI1TcAM9_Zk@ddg6oo9d3
// api key = 571369474173466          secret =  rBpMOzV7UQ9qkRsjPI1TcAM9_Zk

// Configuration
cloudinary.config({
  cloud_name: 'ddg6oo9d3',
  api_key: '571369474173466',
  api_secret: 'rBpMOzV7UQ9qkRsjPI1TcAM9_Zk', // Click 'View API Keys' above to copy your API secret
});

const url = 'mongodb://localhost:27017/';
mongoose
  .connect(url, {
    dbName: 'June2025-FullStack',
  })
  .then(() => console.log('MongoDB Connected.....'))
  .catch((err) => console.log('Error :', err));

app.get('/', (req, res) => {
  res.render('index.ejs', { url: null });
});

const storage = multer.diskStorage({
  //destination : ./public/uploads
  filename: function (req, file, callback) {
    const uniqueName = Date.now() + path.extname(file.originalname);
    console.log(
      'file.fieldname :',
      file.fieldname,
      ' uniqueName =',
      uniqueName
    );
    callback(null, file.fieldname + '-' + uniqueName);
  },
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), async (req, res) => {
  const file = req.file.path;

  const cloudinaryResponse = await cloudinary.uploader.upload(file, {
    folder: 'uploads',
  });

  //console.log('upload file = ', cloudinaryResponse);

  const db = await File.create({
    filename: file.originalname,
    public_id: cloudinaryResponse.public_id,
    imageUrl: cloudinaryResponse.secure_url,
  });

  res.render('index.ejs', { url: cloudinaryResponse.secure_url });
});

const port = 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
