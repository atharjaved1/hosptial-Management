const saveuser_model = require('../models/hospital_model');
var jwt = require('jsonwebtoken');
var bcrypt=require("bcrypt-node");

const userroll_saveData = (req,res)=>{

    let newusersave = new saveuser_model()
    newusersave.rolltype = req.body.rolltype; 
    newusersave.name = req.body.name;
    newusersave.email = req.body.email;
    newusersave.password = req.body.password;
    newusersave.enterdate = req.body.enterdate;

    newusersave.save((err,result)=>{
        if(err){
            res.send(err)
        }
        else{
            res.status(200).json({
                message:"User SignedUp Successfully",
                result
            })
        }

    })
}



// const userlogin = (req, res, next) => {
//     // fetch user and test password verification
// 	saveuser_model.findOne({ email: req.body.email }, function(err, user) {
// 		if(err){
// 			res.status(500).json({
// 				message: "error",
// 				err
// 			})
// 		}
// 		else{   
//             //compare
// 			user.comparePassword(req.body.password, function(err, isMatch) {
//                 if(isMatch)
//                 {
//                     jwt.sign({user}, 'secretkey', {expiresIn: '3000s'}, (err, token)=>{
                        
//                             if(err){
//                                 res.send(err)
//                             }
//                             else{
//                                 res.status(200).json({
//                                     user,
//                                     token
//                                 })
//                             }
//                     });
//                 }
//                 else {
//                     res.send("Invalid Password. Please try again");
//                 } 
// 			}); 
// 		}

		
// 	});
// };
 

const forloggedInAccess = (req, res) =>{

    jwt.verify(req.token, 'secretkey', {expiresIn: '30s'}, (err, authData) =>{
        if(err){
            res.sendStatus(403);
        }
        else{
            console.log(req.authData.user.rolltype)
            if(req.authData.user.rolltype == 'Doctor'){
                // if(db.user.find({"rolltype": /Doctor/})){
                res.send("doctor page");
                // res.redirect('../login')
            }
            else{
                res.send('dis')
            }
            res.json({
                message: 'Accessed by loggedin user',
                authData
            })
        }
    })
}

//Verify Token 
function verifyToken(req, res, next){
    //Get Auth Header value
    const bearerHeader = req.headers['authorization'];
    // check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        //siplit at space
        const bearer = bearerHeader.split(' ');
        // get token from array
        const bearerToken = bearer[1];
        //set token
        req.token = bearerToken;
        //Next middleware
        jwt.verify(req.token, 'secretkey', {expiresIn: '30s'}, (err, authData) =>{
            if(err){
                res.status(403).send(err);
            }
            else{
                req.authData=authData;
                next();
            }
        })
    } 
    else {
        res.status(403).json({
            msg : "Forbidden"
        })
    }
}

module.exports =  {
    userroll_saveData,
    forloggedInAccess,
    verifyToken
}