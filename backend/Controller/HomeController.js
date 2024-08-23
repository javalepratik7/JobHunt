const jobs=require("../Module/jobs")

async function home(req,res) {
    const data=await jobs.find({})
    // console.log(data);   
    try {
        res.status(200).json({ message: "Login ", user: { message: "This is for only login" },data })
    } catch (error) {
        res.status(500).json(error)
    }
}

// function allJobs(req,res) {
    
// }
module.exports={home}