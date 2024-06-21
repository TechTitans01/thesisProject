// routes/authRoutes.js
const express = require('express');
const {login,signin} = require("../controller/authControl")
const jwtMiddleware=require("../middleware/jwt");
const router = express.Router();

router.post('/signin1' ,signin);
router.post('/login', login);

module.exports = router;
