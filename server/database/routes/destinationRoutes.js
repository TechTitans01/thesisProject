const router= require("express").Router()
const {getDestination,addDestination,updateDestination,removeDestination,getOneDestination,getOneDestinationbyname} = require("../controller/destinationontroller.js")

router.get("/getone/:id", getOneDestination);
router.get("/getonebyname/:name", getOneDestinationbyname);
router.get("/getall",getDestination);
router.post("/adddestination",addDestination);
router.put("/updatedestination/:id",updateDestination);
router.delete("/remove/:id",removeDestination)
module.exports=router