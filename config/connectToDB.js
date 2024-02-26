
const mongoose = require("mongoose")

async function connectToDB ()
{
    try{
        await mongoose.connect(process.env.db) 
        console.log("connected Succefully");
    }catch(err)
    {
        console.log("error:", err)
    }
    
}

module.exports = connectToDB;