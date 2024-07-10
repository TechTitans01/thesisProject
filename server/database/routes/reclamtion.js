const router= require("express").Router()

const {getAllReclamation,getOneReclamationByEmail,sendReclamation, sendReclamtionGmail}=require("../controller/reclamation.js")

router.get("/getone/", getOneReclamationByEmail);
router.get("/getall", getAllReclamation);
router.post("/send",sendReclamation);
router.post("/send/gmail",sendReclamtionGmail);



module.exports=router