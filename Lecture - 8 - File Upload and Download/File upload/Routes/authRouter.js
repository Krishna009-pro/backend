const express = require("express");
const authRouter = express.Router();

const authController = require("../Controller/authController");

authRouter.get("/login", authController.getLogin);
authRouter.post("/login", authController.postLogin);
authRouter.post("/logout", authController.postLogout);
authRouter.get("/register", authController.getSignup);
authRouter.post("/register", authController.postSignup);

exports.authRouter = authRouter;