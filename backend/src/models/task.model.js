import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: true, // Index on title for faster search
  },
  textContent: {
    type: String,
    default: "",
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true, // Index to quickly query tasks by user
  },
}, { timestamps: true });


taskSchema.index({ userId: 1, isCompleted: 1 });

const Task = mongoose.model("Task", taskSchema);
export default Task;
