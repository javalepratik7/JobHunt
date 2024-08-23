const express=require("express")
const router=express.Router()
const {applied,myjobs,profile,navbar}=require("../Controller/AppliedJobController")

router.post("/",applied)
router.post("/myjobs",myjobs)
router.post("/profile",profile)
router.post("/navbar",navbar)

module.exports=router