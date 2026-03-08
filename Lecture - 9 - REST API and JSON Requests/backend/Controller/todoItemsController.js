
const TodoItem = require("../Model/TodoItemModel");

exports.postAddItem = async (req, res, next) => {
    console.log("add-item");
    const { task, date } = req.body;
    const todoItem = new TodoItem({
        task,
        date
    });
    await todoItem.save();
    console.log(todoItem);
    res.status(201).json({
        todoItem
    })
}

exports.getTodoItems = async (req, res, next) => {
    const todoItems = await TodoItem.find();
    res.status(200).json({
        todoItems
    })
}

exports.deleteTodoItem = async (req, res, next) => {
    await TodoItem.findByIdAndDelete(req.params.id);
    res.status(200).json({
        message: "Todo item deleted successfully",
        id: req.params.id
    })
}

exports.toggleCompletedMarks = async (req, res, next) => {
    try {
        const item = await TodoItem.findByIdAndUpdate(req.params.id, {
            completed: !req.body.completed
        }, { new: true });

        console.log("Updated Item:", item);
        res.status(200).json({
            message: "Todo item updated successfully",
            id: req.params.id,
            currentMark: item.completed
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update item" });
    }
}