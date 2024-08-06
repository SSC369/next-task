import mongoose from "mongoose";
const TaskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  completed: { type: Boolean, required: true },
});
export default mongoose.model("Task", TaskSchema);
