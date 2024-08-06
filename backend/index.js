import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectToDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import tasksRoutes from "./routes/taskRoutes.js";

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);
app.use(tasksRoutes);
app.get("/", (req, res) => {
  res.send("API is working!");
});
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
connectToDB();
