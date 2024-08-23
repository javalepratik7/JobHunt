const express=require("express")
const router=express.Router()
const {jobs,AdminJob,specificJob}=require("../Controller/adminController")

router.post("/jobs",jobs)
router.post("/adminjob",AdminJob)
router.post("/specificJob",specificJob)

module.exports=router