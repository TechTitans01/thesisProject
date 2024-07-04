const router= require("express").Router()


const {getAllUser,addUser,removeUser,getOneUser,updateUser, getOneUserByemail}=require("../controller/userController.js")
const jwt=require('../middleware/jwt.js')
router.get("/getone/:id", getOneUser);
router.get("/getoneByemail/:email",getOneUserByemail)
router.get("/getall", getAllUser);

router.post("/adduser",addUser);
router.delete("/remove/:id",removeUser)
router.put("/updateUser",updateUser);

module.exports=router