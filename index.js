var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');
var bodyParser = require('body-parser');
var path = require('path');
var bcrypt=require("bcrypt-node");
var jwt = require('jsonwebtoken');



//port number
var app = express();

const port= 5000 
 

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname,'public')));
 
// Database connection
mongoose.connection.openUri('mongodb://localhost:27017/hospital',{useNewUrlParser:true});
mongoose.connection.on('connected',() => {
    console.log("connected to db")
})
mongoose.connection.on('error',(err)=>{
    if(err){
        console.log(`Conenction failed ${err}`)
    }
})

var generalRoute = require('./routes/generalRoute');
var routes = require('./routes/hospital_route');

app.use('/', generalRoute)
app.use('/api', verifyToken, routes);

// app.post('/api/doctorpage',verifyToken, (req, res) =>{
//     jwt.verify(req.token, 'secretkey', {expiresIn: '30s'}, (err, authData) =>{
//         if(err){
//             res.sendStatus(403);
//         }
//         else{
//             res.json({
//                 message: 'doctorpage access by loggedin user',
//                 authData
//             })
//         }
//     })
// })


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
//listen port
app.listen(process.env.PORT||port,()=>{
    console.log(`Port ${port}`)
})