const router= require("express").Router()
const {getOneStory,addStory,removeStory,updateStory,getStories}=require("../controller/storiesController.js");

router.get("/getone/:id", getOneStory);
router.get("/getall",getStories);
router.post("/addstory",addStory);
router.put("/updatestory/:id",updateStory)
router.delete("/remove/:id",removeStory)

module.exports=router