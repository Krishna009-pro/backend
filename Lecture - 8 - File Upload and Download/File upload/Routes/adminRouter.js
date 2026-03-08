const express = require("express");
const adminRouter = express.Router();

// Local Modules
const adminController = require("../Controller/adminController");

adminRouter.get("/add-home", adminController.getAddHome);
adminRouter.post("/add-home", adminController.postAddHome);
adminRouter.get("/admin-home-list", adminController.getAdminHomes);
adminRouter.get("/edit-home/:id", adminController.getEditHome);
adminRouter.post("/edit-home", adminController.postEditHome)
adminRouter.post("/delete-home/:id", adminController.postDeleteHome)

exports.adminRouter = adminRouter;