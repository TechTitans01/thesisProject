const express = require('express');
const router = express.Router();
const {payments}=require("../controller/payment/payemntController.js")
router.post('/create',payments)
module.exports=router