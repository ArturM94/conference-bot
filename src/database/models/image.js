import mongoose from 'mongoose';

export default mongoose.model(
  'image',
  new mongoose.Schema(
    {
      owner: {
        type: String,
        require: true,
      },
      imageUrl: {
        type: String,
        require: true,
      },
    },
    {
      timestamps: true,
    }
  )
);
