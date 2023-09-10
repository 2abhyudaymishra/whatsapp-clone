const express = require("express");
const router = express.Router();
const userController = require("../controller/usercontroller");
const conversationController = require("../controller/conversationcontroller");
const messageController = require("../controller/messagecontroller");

router.post("/adduser", userController.adduser);
router.get("/getuser", userController.getusers);
router.post("/conversation/add", conversationController.newconversation);
router.post("/message/add", messageController.newmesssage);
router.get("/message/get/:id", messageController.getmesssage);
router.post("/message/broadcast", messageController.broadcastmesssage);
module.exports = router;
