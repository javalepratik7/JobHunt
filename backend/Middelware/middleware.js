const {verifyToken}=require("../Services/Services")
const multer = require('multer');
const path = require('path');

function mult(req,res,next) {
    console.log("request",req.body);
    console.log("request",req);
    console.log("commiing");
    next()
    
}

async function onlyLogin(req,res,next) {
    // console.log("loginonly");
    
    const cookieValue=req.body.cookie||req.body.email
    // console.log("all body",req.body.email);
    
    // console.log(req.body.cookie);
    // console.log("Cookie value",cookieValue);
    
    if (!cookieValue) {
        // console.log("login only responce is sending");
        return  res.status(200).json({ message:"Please Login", user: { message: "This is for only login" } })
    }
    const payload=verifyToken(cookieValue)
    // console.log("payload",payload);
    if (!payload) {
        return  res.status(200).json({ message:"Please Login", user: { message: "This is for only login" } })
    }
    next()
}

module.exports={onlyLogin,mult}




// Configure Multer to save files in the uploads/images directory
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/images');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext); // Save the file with a timestamp to ensure uniqueness
  }
});

const upload = multer({ storage: storage });
