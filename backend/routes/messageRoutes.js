const express = require("express");
const router = express.Router();  

const {isAuthenticated} = require("../middlewares/auth");
const {createMessage,getMessages,getConversation} = require("../controllers/messageController");

//post routes
router.route("/message/create").post(isAuthenticated,createMessage);
router.route("/messages").get(isAuthenticated,getMessages);
router.route("/conversation/:id").get(isAuthenticated,getConversation);

module.exports  = router;