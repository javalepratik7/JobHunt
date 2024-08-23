const jwt=require("jsonwebtoken")
const secretKey="king"

function createToken(user) {
    console.log("All info about user",user);
    
    const payload={
        name:user.name,
        email:user.email,
        mobileNo:user.mobileNo
    }
    return jwt.sign(payload,secretKey)
}

function verifyToken(token) {
    // console.log("Token",token);
    return jwt.verify(token,secretKey)
}
module.exports={createToken,verifyToken}