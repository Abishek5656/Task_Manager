import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,       // Ensure usernames are unique
    index: true,        // Index for faster login/search
  },
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true }); // Adds createdAt and updatedAt

const User = mongoose.model("User", userSchema);
export default User;
