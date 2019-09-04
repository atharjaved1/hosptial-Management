var mongoose = require('mongoose'); 
 
var moment = require('moment'); 

const tokenSaleSchema = mongoose.Schema({
    token_number:{
        type:Number,
        require:true
    },
    token_price:{
        type:Number,
        default:800,  
    },
    patientname: {    
        type: String,
        require: true
    },
    enterdate:{
        type: Date, 
        default:Date.now 
    },
    rollid:{
        type:String, 
        require: true
    },
    userid :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "UserRoleSchema"
    }
   
},
{
    timestamps: true
})

 
    
// tokenSaleSchema.index({token_number:1, rolltype:1},{unique:true})

//export schema
module.exports = mongoose.model('tokenSaleSchema',tokenSaleSchema)