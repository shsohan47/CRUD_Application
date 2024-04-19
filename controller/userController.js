const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
async function signUp(req, res) {
  try {
    // Get email, password, and confirmPassword from the request body
    // Get email, password, and confirmPassword from the request body
const { email, Password, ConfirmPassword} = req.body;

    console.log("Request Body:", req.body);


    // Check if passwords match
    if (Password !== ConfirmPassword) {
      return res.status(400).json({
        message: "Error while creating account",
        details: "Passwords do not match",
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Error while creating account",
        details: "Please enter a valid email",
      });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Error while creating the account",
        details: "Email already exists",
      });
    }

    // Hash the password
    console.log(Password)
    const hashedPassword = bcrypt.hashSync(Password, 8);

    // Create the user
    const user = await User.create({ email, Password: hashedPassword });

    // Log and send response
    console.log("User Created Successfully:", user.email);
    res.status(201).json({
      message: "User Created Successfully",
      user: user.email,
    });
  } catch (error) {
    // Log the error
    console.error("Error during sign up:", error);

    // Send a generic error response
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}


async function login(req, res) {
  try {
    //get the email and Password from the body
    const { email, Password } = req.body;
    if (!email || !Password) {
      return res.status(400).json({
        message: "email or Password Required",
      });
    }
    //Check weather it match with the existence user in data base
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Error while loggin",
        details: "User Not Found",
      });
    }
    //check the hased password match
    const passMatch = await bcrypt.compareSync(Password, user.Password);
    if (!passMatch) {
      return res.status(401).json({
        message: "Error while Logging",
        details: "Pass Didnt Match",
      });
    }
    
    //expire date of that token
    const exp = Date.now() + 1000 * 60 * 60 * 24;
    //create a jwt token
    const token = jwt.sign({ sub: user._id, exp }, process.env.Secret);

    //extract in time for showing response
    const FututreDate = new Date(exp);
    const hours = FututreDate.getHours();
    const minits = FututreDate.getMinutes();
    const sec = FututreDate.getSeconds();

    //set the cookie
    res.cookie("Authorization", token, {
      expires: new Date(exp),
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
    //response

    res.status(200).json({
      message: "Login Successfully",
      token: token,
      expire_in: {
        hours: hours,
        minits: minits,
        second: sec,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      details: err,
    });
  }
}
function checkAuth(req, res) {
    try{
  res.json({
    user: res.user,
  });
  res.sendStatus(200);
}
catch(err)
{
    res.status(500).json({
        message:"Internal Server Error"
    })
}
}

function logout(req, res) {
  try {
    res.clearCookie("Authorization");
    res.status(200).json({
      messege: "LogOuT Succesful",
    });
  } catch (err) {
    res.status(500).json({
      message: "Error when Logout",
      details: err,
    });
    console.log(err);
  }
}

module.exports = {
  signUp,
  login,
  checkAuth,
  logout,
};
