const jwt = require("jsonwebtoken")

function requireAuth(req,res,next)
{
    console.log("middleware In")
    next();
}
module.exports =requireAuth;