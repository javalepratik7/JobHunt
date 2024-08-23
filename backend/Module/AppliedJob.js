const job=require("./jobs")

const mongoose=require("mongoose")

const appliedJobSchema=new mongoose.Schema({
    name:{
        type:String,
        requird:true,
    },
    email:{
        type:String,
        requird:true,
    },
    mobileNo:{
        type:String,
        requird:true,
    },
    resume:{
        type:String,
        requird:true
    },
    whichJob:{
        type:String,
        requird:true,
        ref:"job"
    },
    action:{
        type:String,
        enum:["reject","Accept"],
        default:"Accept"
    },
})

const appliedJobs=mongoose.model("AppliedJod",appliedJobSchema)

module.exports=appliedJobs