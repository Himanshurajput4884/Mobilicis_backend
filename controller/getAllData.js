const mongoose = require("mongoose");
const dataModel = require("../model/dataSchema");

const getAllData = async(req, res)=>{
    try{
        const type = req.query.type;
        let data;
        if(type == 1){
            data = await first_type();
            console.log(data);
            if(data.length > 1){
                return res.status(201).json({status:201, data:data});
            }
        }
        else if(type == 2){
            data = await second_type();
            console.log(data);
            if(data.length > 1){
                return res.status(201).json({status:201, data:data});
            }
        }
        else if(type == 3){
            data = await third_type();
            // console.log(data);
            if(data.length > 1){
                return res.status(201).json({status:201, data:data});
            }
        }
        else if(type == 4){
            data = await fourth_type();
            console.log(data);
            if(data.length > 1){
                return res.status(201).json({status:201, data:data});
            }
        }
        else{
            data = await fifth_type();
            // console.log(data);
            if(data.length > 1){
                return res.status(201).json({status:201, data:data});
            }
        }
        return res.status(401).json({status:401, error:"Something went wrong"});
    }
    catch(error){
        console.log("Error in getEmp: ", error);
        return res.status(401).json({error: "Something went wrong"});
    }
}

const first_type = async()=>{
    try{
        const data = await dataModel.find({
            income: { $lt: 5 },
            car: { $in: ["BMW", "Mercedes"] }
          });
          return data;
    }
    catch(err){
        console.log(err);
        return [];
    }
}
const second_type = async()=>{
    try{
        const data = await dataModel.find({ gender: 'Male', phone_price: { $gt: 10000 } });
          return data;
    }
    catch(err){
        console.log(err);
        return [];
    }
}
const third_type = async()=>{
    try{
        console.log("Here");
        const data = await dataModel.find({
            "last_name": /^M/,
            $expr: { $gt: [{ $strLenCP: "$quote" }, 15] }
          });
        const res = [];
        data.map((v, i)=>{
            let last = v.last_name.toLowerCase();
            // console.log(last);
            if(v.email.indexOf(last) !== -1){
                res.push(v);
            }
        })
        console.log(res.length);
        return res;
    }
    catch(err){
        console.log(err);
        return [];
    }
}
const fourth_type = async()=>{
    try{
        const data = await dataModel.find({
            car: { $in: ["BMW", "Mercedes", "Audi"] },
            email: { $not: /\d/ }
          });
          return data;
    }
    catch(err){
        console.log(err);
        return [];
    }
}
const fifth_type = async()=>{
    try{
        const data = await dataModel.aggregate([
            { $group: { _id: "$city", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 10 }
        ]);
        // console.log(data.length);
        let set = {};
        let count = {};
        data.map((v, i)=>{
            set[v._id] = 0;
            count[v._id] = v.count;
        });
        const all_data = await dataModel.find({});
        all_data.map((v,i)=>{
            if(v.city in set){
                set[v.city] += v.income / count[v.city];
                set[v.city] = parseFloat(parseInt(set[v.city]*100)/100); 
            }
        })
        const arr = Object.keys(set).map(key => {
            return { city: key, average: set[key] };
        });
        console.log(arr);
        return arr;
    }
    catch(err){
        console.log(err);
        return [];
    }
}

module.exports = getAllData;