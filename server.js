import express from 'express';
import mongoose from 'mongoose';

const app = express();

const url = 'mongodb://localhost:27017/';
mongoose
  .connect(url, {
    dbName: 'June2025-FullStack',
  })
  .then(() => console.log('MongoDB Connected.....'))
  .catch((err) => console.log('Error :', err));

const port = 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
