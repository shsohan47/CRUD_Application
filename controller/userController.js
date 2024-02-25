const User = require("../models/user")

async function signUp(req,res)
{
    try{
    //get the email and password from the req body
    const{email,Password,ConfirmPassword} = req.body
        //handle exception
        if(Password !=ConfirmPassword)
        {
            return res.status(400).json({
                message : "Error while creating account",
                details: "Password didn't match"
            })
        }
        //Handle the email field
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email))
        {
            return res.status(400).json({
                message : "Error while creating account",
                details: "Please Enter a valid email"
            })
        }
    //create a user data using it
   const user =  await User.create({email,Password,ConfirmPassword})
    //response
    res.json({
        message: "User Created Successfully",
        user: user.email

    })
}
catch(err)
{
    res.status(500).json({
        message: "internal Server Error",
        details: err
    })
}

}

// function login(req,res)
// {

// }

// function logout(req,res)
// {

// }

module.exports = {
    signUp
}