import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const secretKey = process.env.JWT_SECRET;

const fetchUser = (req, res, next) => {
  // get user from jwt token and add id to req object
  const token = req.header("authorization");
  if (!token) {
    return res.status(401).json({
      status: false,
      msg: "Login to access features :)",
    });
  }
  try {
    //extract payload data from the jwt by verifying jwt with the help of secret key.
    const data = jwt.verify(token, secretKey);

    req.user = data;
    next();
  } catch (error) {
    return res.status(500).json({
      status: false,
      msg: "Server issue :(",
    });
  }
};

export default fetchUser;
