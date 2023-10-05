const express = require("express");
const router = express.Router();
const userController = require("../controller/usercontroller");
const conversationController = require("../controller/conversationcontroller");
const messageController = require("../controller/messagecontroller");
const fileController = require("../controller/filecontroller");
const upload = require("../utils/upload");

router.post("/adduser", userController.adduser);
router.get("/getuser", userController.getusers);
router.post("/conversation/add", conversationController.newconversation);
router.post("/conversation/broadcast", conversationController.broadcastconversations);

router.post("/message/add", messageController.newmesssage);
router.get("/message/get/:id", messageController.getmesssage);

router.post("/file/upload", upload.single("file"),fileController.uploadfile);
router.get("/file/:filename",fileController.getfile);

module.exports = router;
