const User= require('../model/userModel')
const jwt = require("jsonwebtoken");
const brcrypt= require('bcryptjs')




exports.createUser= async (req, res) => {
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            return res.json({ error: "Names is required" });
        }
        if (password.length < 6) {
            return res.json({ error: "Password must be more than 6" });
        }

        //exist user check
        const existUser = await User.findOne({ email: email });
        if (existUser) {
            return res.json({ error: "Email is taken" });
        }

        //Hasspass
        const hasspass= await brcrypt.hash(password,10)
        // create user
        const user = await new User({
            name: name,
            email: email,
            password: hasspass
        }).save();

        //token setup
        const token = await jwt.sign({ _id: user._id }, process.env.JWTSECRET, {
            expiresIn: "7d",
        });

        res.json({
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
                address: user.address,
            },
            token,
        });
    } catch (error) {
        return res.status(401).json({ msg: error.message });
    }
};
exports.login=async (req,res)=>{
    const {email,password}=req.body
    try {
        if (!email || !password) {
            return res.json({ error: "Required fields" });
        }
        if (password.length < 6) {
            return res.json({ error: "Password must be more than 6" });
        }

        //exist user check
        const existUser = await User.findOne({ email: email });
        console.log(existUser)
        if (!existUser) {
            return res.json({ error: "User not found" });
        }
        const match= await brcrypt.compare(password,existUser.password)
        console.log(__dirname+'/helper')

        if(!match){
            return res.json({ error: "Password wrong" });
        }

        const token = await jwt.sign({ _id: existUser._id }, process.env.JWTSECRET, {
            expiresIn: "7d",
        });

        return res.status(201).json({user:{
                name:existUser.name,
                email:existUser.email,
                role: existUser.role

            },token:token})



    }catch (error){
        return res.status(401).json({ msg: error.message });
    }
}


