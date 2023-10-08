
const express = require("express");
const router = express.Router();  

const {createNotification,getNotifications,getNotification} = require("../controllers/notificationController");
const {isAuthenticated} = require("../middlewares/auth");

//post routes
router.route("/notification/create").post(isAuthenticated,createNotification);
router.route("/notifications").get(isAuthenticated,getNotifications);
router.route("/notification/:id").get(isAuthenticated,getNotification);

module.exports  = router;