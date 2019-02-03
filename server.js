// importing 
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//set up express app
const app = express();

mongoose.Promise = global.Promise;

//connection to the data base
mongoose.connect('mongodb://127.0.0.1:27017/Vemba',{useNewUrlParser:true},(err)=>{
    if(!err){ console.log("Connection to the DB is successfull!!!") }
    else { console.log("There something wrong with DB connection : "+err) }
});


//middleware
//to get the requested data in the specific format
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//using the custom module by express app
app.use('/api', require('./vembaLibrary/routers'));
app.use('/api', require('./vembaLibrary/videolist'));
//error handling in the model
app.use((errorCode, request, response, error)=>{
    console.log(errorCode);
    response.status(422).send({error:errorCode.message});
});


// listen to request at port
app.listen(process.env.port || 3000, (err)=>{
    if(!err){ console.log("Now listening to the request..."); }
    else console.log("There is some problem in the connection : "+err);
});