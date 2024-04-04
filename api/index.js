const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const moment = require("moment");
require('dotenv').config();

const app = express();
const cors = require("cors");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to mongoDb");
  });

app.listen(3000, () => {
  console.log("Server running on Port 3000");
});

const User = require("./models/user");
const Todo = require("./models/todo");
const { error } = require("console");

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("Email already registered");
    }
    const newUser = new User({
      name,
      email,
      password,
    });
    await newUser.save();
    res.status(202).json({ message: "User registered successfully" });
  } catch (error) {
    console.log("Error registering the user", error);
    res.status(500).json({ message: "Registration failed" });
  }
});

const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");
  return secretKey;
};
const secretKey = generateSecretKey();

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid Email" });
    }
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid Password" });
    }
    const token = jwt.sign({ userId: user._id }, secretKey);
    res.status(200).json({ token });
  } catch (error) {
    console.log("Login failed", error);
    res.status(500).json({ message: "login failesd" });
  }
});

app.post("/todos/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const { title, category } = req.body;
    const newTodo = new Todo({
      title,
      category,
      dueDate: moment().format("YYYY-MM-DD"),
    });
    await newTodo.save();
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ error: "User not found" });
    }
    user?.todos.push(newTodo._id);
    await user.save();
    res.status(200).json({ message: "Todo added successfully", todo: newTodo });
  } catch (error) {
    res.status(200).json({ message: "Todo not added" });
  }
});

app.get("/users/:userId/todos", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).populate("todos");
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }
    const date = moment().format('YYYY-MM-DD')
    res.status(200).json({ todos: user.todos ,date:date});
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.patch("/todos/:todoId/complete", async (req, res) => {
  try {
    const todoId = req.params.todoId;
    const updatedTodo = await Todo.findByIdAndUpdate(
      todoId,
      {
        status: "completed",
      },
      { new: true }
    );
    if (!updatedTodo) {
      return res.status(404).json({ error: "Task not found" });
    }
    res
      .status(200)
      .json({ message: "Todo marked as completed", todo: updatedTodo });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.get("/todos/completed/:date", async (req, res) => {
  try {
    const date = req.params.date;
    const completedTodos = await Todo.find({
      status: "completed",
      createdAt: {
        $gte: new Date(`${date}T00:00:00.000Z`),
        $lt: new Date(`${date}T23:59:59.999Z`),
      },
    }).exec();
    res.status(200).json({ completedTodos });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.get("/todos/count", async (req, res) => {
  try {
    const totalCompletedTasks = await Todo.countDocuments({
      status: "completed",
    }).exec();

    const totalPendingTasks = await Todo.countDocuments({
      status: 'pending'
    }).exec();
    res.status(200).json({totalCompletedTasks,totalPendingTasks})
  } catch (error) {
    res.status(500).json(error);
  }
});
