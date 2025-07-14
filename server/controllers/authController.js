import bcrypt from "bcryptjs"; // For comparing hashed passwords
import jwt from "jsonwebtoken"; // For generating JWT
import User from "../models/UserModel.js"; // User model for database operations

const signupUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Validate input
    if(!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      fullName,
      email,
      password : hashedPassword,
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1D' }
    );
    
    //Return user data without password
    res.status(201).json({
      _id : newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      token,
    })
  } catch (error) {
    console.error("Error signing up user:", error);
    res.status(500).json({ message: "Server error" });
  }
} 

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if(!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    //Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1D' }
    );

    //Return user data and token
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      token,
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Server error" });
  }
}

const getUserProfile = async (req, res) => {
  res.status(200).json(req.user);
}

export { signupUser, loginUser, getUserProfile};