
const saveuser_model = require('../models/hospital_model');
var jwt = require('jsonwebtoken');
var bcrypt=require("bcrypt-node");

const userlogin = (req, res, next) => {
    // console.log(req.body);
    
    // fetch user and test password verification
	saveuser_model.findOne({ email: req.body.email }, function(err, user) {


		if(err){
			res.status(500).json({
				message: "error",
				err
			})
		}
		else{   
            //compare
			user.comparePassword(req.body.password, function(err, isMatch) {
                if(isMatch)
                {
                    jwt.sign({user}, 'secretkey', {expiresIn: '3000s'}, (err, token)=>{
                        
                            if(err){
                                res.send(err)
                            }
                            else{
                                res.status(200).json({
                                    user,
                                    token
                                })
                            }
                    });
                }
                else {
                    res.send("Invalid Password. Please try again");
                } 
			}); 
		}

		
	});
};
 

module.exports =  {
    userlogin
}