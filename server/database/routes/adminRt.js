const express = require('express');
const router = express.Router();
const adminController = require('../controller/admin'); 
router.get('/get/:id', adminController.getAdmin);


module.exports = router;
