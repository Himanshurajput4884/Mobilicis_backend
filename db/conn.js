
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const connection = async ()=>{
    try{
        await mongoose.connect(process.env.URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database Connected...")
    }
    catch(error){
        console.log("Error in database connection: ", error);
    }
}

module.exports = connection();