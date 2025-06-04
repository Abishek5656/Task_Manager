import User from "../models/user.model.js";
import bcrypt from "bcrypt";

// Create a new user
// export const addUser = async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     const existingUser = await User.findOne({ username });
//     if (existingUser) {
//       return res.status(400).json({ message: "Username already exists" });
//     }

//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(password, saltRounds);

//     const user = new User({ username, hashedPassword });
//     await user.save();

//     res.status(201).json({ message: "User created successfully",data: user });
//   } catch (error) {
//     res.status(500).json({ message: "Server error",data: error });
//   }
// };

export const addUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate presence of username/password
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    // Check if user exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash password (example with bcrypt)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with hashed password
    const user = new User({ username, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error("Error in addUser:", error); // <== Log the error here
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// Update user
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password } = req.body;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.findByIdAndUpdate(
      id,
      { username, hashedPassword },
      { new: true, runValidators: true }
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User updated",data: user });
  } catch (error) {
    res.status(500).json({ message: "Server error",data: error });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User deleted",data:"" });
  } catch (error) {
    res.status(500).json({ message: "Server error",data: error });
  }
};

// Get user y _id
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;  // assuming _id is passed as a URL param

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found",data:"" });
    }

    res.status(200).json({message:"", data:user});
  } catch (error) {
    res.status(500).json({ message: "Server error",data: error });
  }
};

export const getLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const userResponse = {
      _id: user._id,
      username: user.username,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    res.status(200).json({ message: "Login successful", user: userResponse });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
