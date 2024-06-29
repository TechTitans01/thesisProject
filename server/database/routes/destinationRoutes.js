const router= require("express").Router()
const {getDestination,addDestination,updateDestination,removeDestination,getOneDestination} = require("../controller/destinationontroller.js")

router.get("/getone/:id", getOneDestination);
router.get("/getall",getDestination);
router.post("/adddestination",addDestination);
router.put("/updatedestination",updateDestination);
router.delete("/remove/:id",removeDestination)
module.exports=router