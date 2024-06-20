const router= require("express").Router()

const {getAllUser,addUser,removeUser,getOneUser,updateUser}=require("../controller/userController.js")

router.get("/getone/:id", getOneUser);
router.get("/getall", getAllUser);
router.post("/adduser",addUser);
router.delete("/remove/:id",removeUser)
router.put("/updateUser",updateUser);

module.exports=router