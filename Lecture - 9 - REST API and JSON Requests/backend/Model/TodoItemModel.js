const mongoose = require("mongoose");

const todoItemSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    date: Date,
    completed: {
        type: Boolean,
        default: false,
    },

},
    { timestamps: true }
);

const TodoItemModel = mongoose.model("TodoItems", todoItemSchema);

module.exports = TodoItemModel;