import User from "../models/userModels.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";

const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  // console.log(req.body);

  if (!username || !email || !password) {
    throw new Error("All fields are required");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(8);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await user.save();
    createToken(res, user._id);

    res.status(201).json("User created successfully");
  } catch (error) {
    throw new Error("User not created");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // console.log(req.body);

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    throw new Error("Incorrect password");
  }

  createToken(res, user._id);

  return res.status(200).json("Login successful");
});

const logoutCurrentUser = asyncHandler(async (req, res) => {
  // change this if any error in logout
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

const getCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    throw new Error("User not found");
  }

  res
    .status(200)
    .json({ _id: user._id, username: user.username, email: user.email });
});

const updateCurrentUserProfile = asyncHandler(async (req, res) => {
  // const {username} = req.body;

  const user = await User.findById(req.user._id);
  console.log(user);
  

  if (!user) {
    throw new Error("User not found");
  }

  user.username = req.body.username || user.username;
  user.email = req.body.email || user.email;
  if (req.body.password) {
    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    user.password = hashedPassword;
  }

  await user.save();

  res.status(200).json("User updated");
});

export {
  createUser,
  loginUser,
  logoutCurrentUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
};
