const express = require('express');
const router = express.Router();
const {getMessagesBetweenUsers,addMessage,getAllMessages}=require("../controller/messagesController.js")


router.get('/messages/:senderId/:receiverId',getMessagesBetweenUsers)

module.exports=router