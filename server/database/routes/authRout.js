// routes/authRoutes.js
const express = require('express');
const {login,signup, sendMail} = require("../controller/authControl")
const router = express.Router();

router.post('/signup',signup);
router.post('/login', login);
router.post("/sendmail",sendMail)

module.exports = router;
