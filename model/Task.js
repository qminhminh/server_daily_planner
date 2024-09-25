const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  dayOfWeek: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  leader: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  reviewer: {
    type: String,
    required: true,
  }
}, {
  timestamps: true,  // Optional: Automatically adds `createdAt` and `updatedAt` fields
});

module.exports = mongoose.model('Task', TaskSchema);
