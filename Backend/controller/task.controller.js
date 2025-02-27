import { Task } from "../schemas/user.schema";
import { Response } from "../services/Response";

export const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      status,
      project,
      assignedTo,
      dueDate,
      priority,
    } = req.body;
    if (
      !title ||
      !description ||
      !status ||
      !project ||
      !assignedTo ||
      !dueDate ||
      !priority
    ) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    const task = new Task({
      title,
      description,
      status,
      project,
      assignedTo,
      dueDate,
      priority,
    });
    await task.save();
    res.status(200).json({ message: "Task created Successfully" });
  } catch (error) {
    Response(res,500, "Server Error");
  }
};
