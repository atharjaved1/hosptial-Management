const tokenSale = require('../models/token_sale_model');
const queryCalulations = require('../models/hospital_model');
var moment = require('moment');

//Save User Type Detail 
const tokenSale_saveData = (req,res)=>{

    const now = new Date();
	const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	 
	tokenSale.findOne({enterdate: {$gte: today}}).sort({$natural: -1}).limit(1).exec(function(err, ress){
		if(ress==null){
			var token_number= 1;
		}else{
			var token_number= ress.token_number+1;
        }
    console.log(token_number);
    let tokenSales = new tokenSale();
    tokenSales.token_number = token_number;  
    tokenSales.patientname = req.body.patientname; 
    tokenSales.rollid = req.body.rollid;
    tokenSales.userid = req.authData.user._id;
    

    // Token Sale Query 

    tokenSales.save((err,result)=>{
        //If error then you will get error when you post the request
        if(err){
            res.send(err)
        }
        else{
            res.status(200).json({
                message:"Token sale data saved Successfully",
                result
            })
        }

    })
})
}


//Find all user type detail page route
const findallrec = (req, res, next) =>{
    tokenSale.find((err,result)=>{  
        if(err){
            res.send('err');
            console.log(err)
        }
        else{
            res.status(200).json({
                message:"Get all contacts",
                result
            })
        }
    })
}


//Find by Patient name

const findbyPateient = (req, res, next) =>{
    tokenSale.find({ patientname: req.body.patientname }, function(err, byPatientName) {
        if(err){
            res.send('err');
            console.log(err)
        }
        else{
            res.status(200).json({
                message:"Get all contacts",
                byPatientName
            })
        }
    })
}


//Find by Dispencor id
 
const dispensar = (req, res, next) =>{
    tokenSale.find({userid: req.body.userid }, function(err, dispensar){
        if(err){
            res.send('err');
            console.log(err)
        }
        else{
            res.status(200).json({
                message:"Get all contacts",
                dispensar
            })
        }
    })
}

//Find By Month
const findRecordByMonth = (req, res) => {
    let month = req.body.month;
    //console.log(month)
    tokenSale.aggregate([
        {
          $project: {
            month: { $month: "$enterdate" }
          }
        },
        {
          $match: {
            month: month
          }
        }
      ], (err, result) =>{
        console.log(result)
        if(result !=''){
            res.json({
                result
            })
        }
        else{
            res.json({
                msg : "no record found"
            })
        }
    })

}

//Find By Year
const findRecordByYear = (req, res) => {
    let year = req.body.year;

    tokenSale.aggregate([
        {
            $project : {
                year: { $year: "$createdAt" }
            }
        },
        {
            $match : {
                year : year
            }
        }
    ], (err, result) => {
        if (result != '' )
        {
            res.json({
                result
            })
        }else{
            res.json({
                msg : "no record found"
            })
        }
        // console.log(result)
    })
}

//find by between date

    const FindByBetweenDate = (req,res)=>{
    var startdate=moment(req.body.startdate).format('YYYY-MM-DD').toString();
    var endDate=moment(req.body.endDate).format('YYYY-MM-DD').toString();
    
    tokenSale.aggregate( [{
        "$match": {
            "enterdate": { "$gte": new Date(startdate), "$lte": new Date(endDate) }
        },
            },{
                $group : {
                    _id : null,
                    total : {
                        $sum : "$token_price"
                    }
                }
            }],function (err, result) {
                    if(err){
                        res.send(err);
                    }
                    else{
                        res.status(200).json({
                            message: "data get successfully",
                            result
                        })
                    }
                }
            )	
        
    
    }

    
 module.exports = {
     tokenSale_saveData,
     findallrec,
     findbyPateient,
     dispensar,
     findRecordByMonth,
     findRecordByYear,
     FindByBetweenDate
 }
 