// File to load sample data into database.
const dataModel = require("../model/dataSchema");
const fs = require("fs");
const mongoose = require("mongoose");

const connection = async ()=>{
    try{
        const db = await mongoose.connect("mongodb+srv://himanshurajput6654:himanshupassword@cluster0.wbtohp6.mongodb.net/?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database Connected...")
    }
    catch(error){
        console.log("Error in database connection: ", error);
    }
  }
  
  const load_manual = async ()=>{
    const db = await connection();
    const jsonString = fs.readFileSync("../../sample_data.json");
    const data = JSON.parse(jsonString);
    for(let i=0; i<1000; i++){
        const new_data = new dataModel({
            first_name: data[i].first_name,
            last_name: data[i].last_name,
            Id: data[i].id,
            email: data[i].email,
            gender: data[i].gender,
            income: parseFloat(data[i].income.slice(1)),
            city: data[i].city,
            car: data[i].car,
            quote: data[i].quote,
            phone_price: parseInt(data[i].phone_price),
        });
        await new_data.save()
        .then((res)=>{
            console.log("Data inserted");
        })
        .catch((err)=>{
            console.log(err);
        })
    }

  }
  
  load_manual();
  