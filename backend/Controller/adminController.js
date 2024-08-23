const job = require("../Module/jobs")
const AppliedJob = require("../Module/AppliedJob")
const { verifyToken } = require("../Services/Services")

async function jobs(req, res) {
    console.log("calling data");
    const body = req.body
    const token = body.email
    const payload = verifyToken(token)
    const email = payload.email
    console.log("payload", email);
    await job.create({ title: body.title, createdBy: email, description: body.description, requirements: body.requirements, salary: body.salary, location: body.location, jobTitle: body.jobTitle, experience: body.experience, noOfPosition: body.noOfPosition, companyName: body.companyName })

    return res.json({ message: "created successfully" })
}

async function AdminJob(req, res) {
    const cookie = req.body.cookie
    // console.log(cookie);
    const value = verifyToken(cookie)
    // console.log("cokie value",value.email);
    // console.log(value.email);


    const data = await job.find({ createdBy: value.email })

    res.json({ message: "ok", data })
}

async function specificJob(req, res) {
    const body = req.body
    console.log("body", body);
    const filter = { _id: body._id }
    const updateDoc = {
        $set: {
            action: body.option
        }
    };
    // console.log("filter", filter)
    // console.log("updated", updateDoc)
    if (body._id && body.option) {
        const result = await AppliedJob.updateOne(filter, updateDoc); 
        const data = await AppliedJob.find({whichJob:body.whichJob})
        console.log("inside if",data);
        
        return res.json({ message: "ok", data })
    }
    // console.log("result",result);
    console.log("whichjob",body.whichJob);
    const data = await AppliedJob.find({whichJob:body.whichJob})
    console.log("data",data);
   return res.json({ message: "ok", data })
}

module.exports = { jobs, AdminJob, specificJob }