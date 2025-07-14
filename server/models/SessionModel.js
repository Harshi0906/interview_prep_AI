import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Linked user
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true, 
  },
  skills: {
    type: [String], 
    required: true,
  },
  topicsToFocus: {
    type: String,
    required: true,
  },
  description: {
    type: String, 
  },
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question", // Linked questions
    }
  ],
  startedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

const Session = mongoose.model("Session", sessionSchema);
export default Session;
