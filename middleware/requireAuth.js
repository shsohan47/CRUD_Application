const jwt = require("jsonwebtoken")
const User = require("../models/user")

async function requireAuth(req,res,next)
{
try{
    //Read token off cookies
   const token =  req.cookies.Authorization
    //decode ythe token
    const decode = jwt.verify(token,process.env.Secret)

    //check expiration

    if(Date.now()>decode.exp)
    {
         res.status(401).json({
            message:"You login session is expired"
         });
    }
    else{
        res.status(200).json({

            message:"User authorized"
        })
    }
    //find user using decode sub
    const user = await User.findById(decode.sub)
    if(!user)
    {
        return res.sendStatus(401).json({
            message: "You are unnauthorize"
        })
    }
    //attch use to erq
    req.user = user
    //continue on
    console.log("middleware In")
    next();
}
catch(err)
{
    return res.sendStatus(401)
}
}
module.exports =requireAuth;