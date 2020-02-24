import mongoose from 'mongoose';

export default mongoose.model(
  'notification',
  new mongoose.Schema(
    {
      date: {
        type: String,
        require: true,
      },
      text: {
        type: String,
        require: true,
      },
      attachments: {
        type: String,
        require: false,
      },
      sent: {
        type: Boolean,
        default: false,
        require: true,
      },
    },
    {
      timestamps: true,
    }
  )
);
