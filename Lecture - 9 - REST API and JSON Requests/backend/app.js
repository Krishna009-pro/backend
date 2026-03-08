const express = require("express");
const { default: mongoose } = require("mongoose");
const cors = require("cors");
// Local Module
const { pageNotFound } = require("./Controller/errorController");
// Routers
const todoItemsRouter = require("./Routers/todoItemsRouter");

// localhost database path
const DB_PATH = "mongodb://localhost:27017/todo-app";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use("/api/todo-items", todoItemsRouter);

app.use("/", pageNotFound);

mongoose.connect(DB_PATH)
    .then(() => {
        console.log("Database connected");
        app.listen(3000, () => {
            console.log("Server running on http://localhost:3000");
        });
    })
    .catch((err) => {
        console.log(err);
    })