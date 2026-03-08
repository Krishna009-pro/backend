// External Module
const express = require("express");
const todoItemsRouter = express.Router();

// Local Module
const todoItemsController = require("../Controller/todoItemsController");

todoItemsRouter.post("/", todoItemsController.postAddItem);
todoItemsRouter.get("/", todoItemsController.getTodoItems);
todoItemsRouter.delete("/:id", todoItemsController.deleteTodoItem);
todoItemsRouter.put("/:id", todoItemsController.toggleCompletedMarks);

module.exports = todoItemsRouter; // export object or method
