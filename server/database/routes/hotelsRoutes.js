const router= require("express").Router()
const {getHotels,addHotel,getOneHotel,deleteHotel,updateHotel,getOneHotelbyid} = require("../controller/hotelsController.js");

router.get("/getAll",getHotels)
router.get("/getonehotel/:id",getOneHotelbyid)
router.get("/getOne/:id",getOneHotel)
router.post("/addHotel",addHotel)
router.put("/updateHotel",updateHotel)
router.delete("/deleteHotel/:id",deleteHotel)
module.exports=router