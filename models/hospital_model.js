var mongoose = require('mongoose');
var bcrypt= require("bcrypt-node");

SALT_WORK_FACTOR = 10;

const UserRoleSchema = mongoose.Schema({
    rolltype:{
        type:String,
        require:true
    },
    name:{
        type:String,
        require:true 
    },
    email: {    
        type: String,
        require: true,
        index:{unique:true}
    },
    password:{
        type:String,
        require:true
    },
    enterdate:{
        type:Date,
        default:Date.now
    }
})

 
//  pre save

UserRoleSchema.pre("save", function(next){
    // call all schema properties 
    var UserData = this;

    if(!UserData.isModified('password')) return next();
    //generate salt here
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
        if(err)
        return next(err);
        // hash the new password using our salt
        bcrypt.hash(UserData.password, salt, null, function(err, hash){
            if(err)
            return next(err);
            //set the hashed password on our user document
            UserData.password = hash;
            next();
        });
    });
}); 

// compare password 
 

UserRoleSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
     if (err) return cb(err);
     cb(null, isMatch);
    });
}


//export schema
module.exports = mongoose.model('UserRoleSchema',UserRoleSchema)




