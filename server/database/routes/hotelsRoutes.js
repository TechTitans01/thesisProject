const router= require("express").Router()
const {getHotels,addHotel,getOneHotel,deleteHotel,updateHotel} = require("../controller/hotelsController.js");

router.get("/getAll",getHotels)
router.get("/getOne/:id",getOneHotel)
router.post("/addHotel",addHotel)
router.put("/updateHotel",updateHotel)
router.delete("/deleteHotel/:id",deleteHotel)
module.exports=router