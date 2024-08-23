const express=require("express")
const router=express.Router()
const {home}=require("../Controller/HomeController")

router.get("/",home)
// router.post("/jobs")

module.exports=router