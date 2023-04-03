const jwt=require('jsonwebtoken')



exports.islogin=async (req,res,next)=>{
    const {token}=req.headers
    try {
        const decode= jwt.verify(token,process.env.JWTSECRET)
        if(decode){
            req.user=decode
            next()
        }
    }catch (error) {
        return res.status(401).json({ msg: error.message });
    }

}