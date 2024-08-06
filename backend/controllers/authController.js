import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const register = async (req, res, next) => {
  try {
    const { password, email, username } = req.body;
    //check that is there a same username exits
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) {
      return res.status(400).json({ message: "Username is already used!" });
    }

    //check that is there a same email exists
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.status(400).json({ message: "Email is already registered!" });
    }

    //create hashed pass
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await User.create({
      email,
      username,
      password: hashedPassword,
    });

    const user = await User.findOne({ email });
    const secretKey = process.env.JWT_SECRET;
    const payload = {
      username,
      email,
      userId: user._id,
    };
    const jwtToken = await jwt.sign(payload, secretKey);

    res.status(201).json({ jwtToken, message: "Register Successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //authentication for user
    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Email is not registered!" });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(400).json({ message: "Incorrect Password :(" });

    const secretKey = process.env.JWT_SECRET;
    const payload = {
      username: user.username,
      email,
      userId: user._id,
    };
    const jwtToken = await jwt.sign(payload, secretKey);
    res.status(200).json({ jwtToken, message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
