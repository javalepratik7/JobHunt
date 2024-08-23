const mongoose=require("mongoose")

const jobsSchema=new mongoose.Schema({
   
    title:{
        type:String,
        requird:true,
    },
    description:{
        type:String,
        requird:true,
    },
    requirements:{
        type:String,
        requird:true,
    },
    salary:{
        type:String,
        requird:true,
    },
    location:{
        type:String,
        requird:true,
    },
    jobTitle:{
        type:String,
        requird:true,
    },
    experience:{
        type:String,
        requird:true,
    },
    noOfPosition:{
        type:String,
        requird:true,
    },
    companyName:{
        type:String,
        requird:true,
    },
    createdBy:{
        type:String,
        requird:true,
    }
})

const job=mongoose.model("job",jobsSchema)

module.exports=job