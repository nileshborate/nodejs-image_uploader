import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  filename: String,
  public_id: String,
  imageUrl: String,
});

export const File = mongoose.model('cloudinary', imageSchema);
