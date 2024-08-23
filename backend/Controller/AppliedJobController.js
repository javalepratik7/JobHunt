const appliedJob = require("../Module/AppliedJob")
const jobs = require("../Module/jobs");
const User = require("../Module/User");
const user = require("../Module/User")
const { verifyToken } = require("../Services/Services")

async function applied(req, res) {
    try {
        console.log("hello/n/n");

        const body = req.body
        console.log("boys is ", body);

        const cookie = body.cookie
        const value = verifyToken(cookie)
        console.log("value is ", value);

        const ifExist = await appliedJob.find({ whichJob: body.userItem, email: value.email })
        console.log("ifExist data", ifExist);
        // const applied=ifExist[0].email
        console.log("applied",ifExist[0]);
        
        if (ifExist[0]) {
            console.log("applied");
            return res.json({message:"already apply"})
            
        }

        // console.log("value inside applied Job",body.userItem);
        const userInfo=await user.find({ email: value.email })
        // console.log(userInfo);
        // console.log(userInfo[0].file);
        
        await appliedJob.create({ name: value.name, email: value.email, mobileNo: value.mobileNo, resume: userInfo[0].file, action: body.action, whichJob: body.userItem })
        return res.json({ message: "Applied successfully" })

    } catch (error) {
        res.json(error.errmsg)
    }
}

async function myjobs(req, res) {
    const body = req.body
    console.log(body);
    const token = body.cookie
    console.log("token  ", token);
    const value = verifyToken(token)
    const useremail = value.email
    console.log("email  ", useremail);
    // const data= await appliedJob.find({email:useremail})

    // const data = await appliedJob.aggregate([
    //     {
    //         $lookup: {
    //             from: "jobs",
    //             localField: "whichJob",
    //             foreignField: "_id",
    //             as: "inner"
    //         }
    //     }
    // ])


    const data = await appliedJob.find({ email: useremail }).populate("whichJob")

    // const info=await appliedJob.find()
    // console.log("data  ", data);
    // console.log("info  ", info);

    return res.json({ data })
}

async function profile(req, res) {
    const cookie = req.body.cookie
    const payload = verifyToken(cookie)
    const useremail = payload.email
    console.log(useremail);
    const info = await user.find({ email: useremail })
    console.log(info);
    return res.json({ message:"user is comming", info })


    //    return res.json({message:"user is comming",info})
}

async function navbar(req,res) {
    console.log(res.body);
    const cookie = req.body.cookie
    if (!cookie) {
        return res.json({message:"not found"})
    }
    const payload = verifyToken(cookie)
    const rol=await User.find({email:payload.email})
    console.log(rol[0].role);
    
    res.json({role:rol[0].role})
    
}
module.exports = { applied, myjobs, profile,navbar }