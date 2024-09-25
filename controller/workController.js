const Task = require("../model/Task");

module.exports = {


  fetchTask: async (req, res) => {
    const { userId } = req.params; // Lấy userId từ params

    try {
      const tasks = await Task.find({ userId: userId }); // Tìm các task theo userId
      res.status(200).json(tasks); // Gửi danh sách task về client
    } catch (error) {
      res.status(400).json({ error: 'Failed to load tasks', details: error.message });
    }
  },
  addTask: async(req, res) => {
    const {userId, dayOfWeek, content, time, location, leader, note, status, reviewer } = req.body;

    try {
      const task = new Task({
        userId,
        dayOfWeek,
        content,
        time,
        location,
        leader,
        note,
        status,
        reviewer,
      });
  
      await task.save();
      res.status(201).json({ message: 'Task added successfully' });
    } catch (error) {
      res.status(400).json({ error: 'Failed to add task', details: error.message });
    }
  },
  updateTask: async (req, res) => {
    const taskId = req.params.id; // Lấy ID của task từ params
    const { dayOfWeek, content, time, location, leader, note, status, reviewer } = req.body;

    try {
      // Tìm task theo ID và cập nhật thông tin
      const updatedTask = await Task.findByIdAndUpdate(taskId, {
        dayOfWeek,
        content,
        time,
        location,
        leader,
        note,
        status,
        reviewer,
      }, { new: true }); // { new: true } sẽ trả về task đã cập nhật

      if (!updatedTask) {
        return res.status(404).json({ error: 'Task not found' });
      }

      res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
    } catch (error) {
      res.status(400).json({ error: 'Failed to update task', details: error.message });
    }
  },
  deleteTask: async (req, res) => {
    const taskId = req.params.id; // Lấy ID của task từ params

    try {
      const deletedTask = await Task.findByIdAndDelete(taskId); // Tìm và xóa task theo ID

      if (!deletedTask) {
        return res.status(404).json({ error: 'Task not found' });
      }

      res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: 'Failed to delete task', details: error.message });
    }
  },
};