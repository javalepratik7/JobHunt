const User = require("../Module/User");



async function login(req, res) {
    const { email, password } = req.body
    const body = req.body
    console.log(body);
    const value = await User.matchPassword(email, password)
    // console.log("value inlogin", value);
    if (value == false) {
        console.log("user not found");
        return res.json({ message: "User not found" })
    }
    const role = await User.find({ email })
    console.log("Role::::", role[0].role);
    const roleData = role[0].role
    console.log("role data",roleData);
    return res.cookie("token", value).status(200).json({ message: "Login Successfully", cookies: value, Role: roleData })
}
module.exports = {  login }