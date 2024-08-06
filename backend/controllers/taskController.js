import Task from "../models/taskModel.js";

export const fetchTasks = async (req, res) => {
  try {
    const { userId } = req.user;
    const tasks = await Task.find({ userId });
    res.status(200).json({ tasks });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const addTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const { userId } = req.user;
    await Task.create({
      name: title,
      description,
      date: new Date(),
      userId,
      completed: false,
    });
    return res.status(201).json({ message: "Task created" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await Task.findByIdAndDelete(taskId, { new: true });
    if (task) {
      res.status(200).json({ message: "Task deleted" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

export const editTask = async (req, res) => {
  try {
    const { title, description, completed, taskId } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      {
        $set: {
          name: title,
          description,
          date: new Date().now,
          completed,
        },
      },
      { new: true }
    );

    if (!updatedTask) {
      res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task updated", task: updatedTask });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

export const fetchTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findById(taskId);
    res.status(200).json({ task });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

export const editTaskStatus = async (req, res) => {
  try {
    const { completed, taskId } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      {
        $set: {
          completed,
        },
      },
      { new: true }
    );

    if (!updatedTask) {
      res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task updated", task: updatedTask });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
