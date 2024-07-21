const express = require('express');
const router = express.Router();
const {getMessagesBetweenUsers,addMessage,getAllMessages,removemessage}=require("../controller/messagesController.js")


router.get('/messages/:senderId/:receiverId',getMessagesBetweenUsers)
router.delete('/messages/:id',removemessage)

module.exports=router