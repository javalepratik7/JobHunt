const express = require("express")
const router = express.Router()
const { login } = require("../Controller/userController")
const User = require("../Module/User")
const path = require("path")
const multer = require("multer")
const nodemailer =require("nodemailer")

const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    console.log("loggin")
    cd(null, "../frontend/src/Components/images")
  },
  filename: (req, file, cd) => {
    const ext = path.extname(file.originalname);
    cd(null, Date.now() + ext)
  }
});

const upload = multer({ storage: storage })

// POST /signin route
router.post('/signin', upload.single('profileImage'), async (req, res) => {
  const { email, password } = req.body;
  const { name, mobileNo, role } = req.body
  console.log(email, password);
  console.log("files",req.file);
  
  const alreadyExist=await User.find({email})

  if (alreadyExist[0]) {
    // console.log("alreadyExist",!alreadyExist);
    return res.json({ message: 'User Already exist!' });
  }

  // sending mail to user
  const transporter=nodemailer.createTransport({
    service:"gmail",
    port:465,
    secure:true,
    auth:{
     user: 'javalepratik47@gmail.com',
     pass: 'vmvk kmpk zqxg bmlt'
    },
  })

  const info=await transporter.sendMail({
    from:"JobHunt<javalepratik47@gmail.com>",
    to:email,
    subject:"Thank You for signin on our webdite",
    text:"Welcome to JobHunt! We are excited to have you on board As this is your first time signing in, please take a moment to create your account. This will allow you to access all of the features of our website, including the ability to apply for jobs, view your applications, and manage your profile. To create your account, simply click on the Create Account link on our homepage. You will be prompted to enter your name, email address, and password. Once you have entered this information, click on the  Once your account has been created, you can sign in using your email address and password. We hope you find JobHunt to be a valuable resource in your job search. If you have any questions, please do not hesitate to contact us.  Sincerely, JobHunt Team", // plain text body
    html:`<p>Dear ${name},

            <br></br><br></br>
            Welcome to JobHunt
            <br></br><br></br>
            As this is your first time signing in, please take a moment to create your account. This will allow you to access all of the features of             our website, including the ability to apply for jobs, view your applications, and manage your profile.
            <br></br>
            Once your account has been created, you can sign in using your email address and password.
            <br></br>
            We hope you find JobHunt to be a valuable resource in your job search. If you have any questions, please do not hesitate to contact us.
            <br></br><br></br>
            Sincerely,
            <br></br><br></br>
            Best regerds,
            <br></br>
            JobHunt Team
           </p>`, // html body
  })
  console.log(info.messageId);
  

  const file = req.file ? req.file.filename : null; // Get the file path
  try {
    // Create a new user document

    const newUser = new User({
      email,
      password,
      file,
      name,
      mobileNo,
      role
    });
    await newUser.save();

    res.json({ message: 'User signed in successfully!', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error signing in user', error });
  }
});

router.post("/login", login)
module.exports = router
