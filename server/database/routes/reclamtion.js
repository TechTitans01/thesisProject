const router= require("express").Router()

const {getAllReclamation,getOneReclamationByEmail,sendReclamation}=require("../controller/reclamation.js")

router.get("/getone/", getOneReclamationByEmail);
router.get("/getall", getAllReclamation);
router.post("/send",sendReclamation);


module.exports=router