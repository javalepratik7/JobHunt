const mongoose=require("mongoose")
const {createHmac,randomBytes}=require("crypto")
const {createToken}=require("../Services/Services")

const schema=new mongoose.Schema({
    name:{
        type:String,
        requird:true,
    },
    email:{
        type:String,
        requird:true,
        unique:true,
    },
    mobileNo:{
        type:String,
        requird:true,
    },
    password:{
        type:String,
        requird:true,
    }, 
    file:{
        type:String,
        // requird:true,
    }, 
    role:{
        type:String,
        enum:["student","admin"],
        default:"student"
    },
    salt:{
        type:String,
    }
})

schema.pre("save",function(next){
    const thisUser=this
    if (!thisUser.isModified("password")) {
        return
    }
    const salt=randomBytes(16).toString()
    const hashedPassword=createHmac("sha256",salt).update(thisUser.password).digest("hex")

    this.salt=salt,
    this.password=hashedPassword
    next()
})

schema.static("matchPassword",
    async function(email,password){
        const user=await this.findOne({email})
        if (!user) {return false }
        const userSalt=user.salt
        const userPassword=user.password

        const hashedPassword=createHmac("sha256",userSalt).update(password).digest("hex")

        if(userPassword !==hashedPassword){
            return false
        }
        const token=createToken(user)
        console.log("Token",token);
        return token
    }
)
const User=mongoose.model("User",schema)

module.exports=User