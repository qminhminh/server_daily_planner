const workController = require("../controller/workController");

const routerWork = require("express").Router();


routerWork.post("/add-task",workController.addTask);
routerWork.get("/fetch-task/:userId",workController.fetchTask);
routerWork.put("/update-task/:id",workController.updateTask);
routerWork.delete("/delete-task/:id",workController.deleteTask);

module.exports = routerWork;