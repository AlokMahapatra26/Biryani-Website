//impoting stuff
require('dotenv').config();
const express = require("express");
const ejs = require("ejs");
const expressLayout = require('express-ejs-layouts');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('express-flash');
const MongoStore = require('connect-mongo');



//connecting database using mongoose
const url = 'mongodb://localhost:27017/chineseHut';
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
//checking if conencted ot not
mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to mydatabase');
});
mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection error:', err);
});
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});



//Session cofing
app.use(session({
    secret : process.env.COOKIE_SECRET,
    resave : false,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/chineseHut' }),
    saveUninitialized : false,
    cookie : {maxAge : 1000 * 60 * 60 * 24} //24 hour
}));
//Express flash
app.use(flash());


//Global middleware
app.use((req , res , next)=>{
    res.locals.session = req.session;
    next();
})


//setting template engin
app.use(expressLayout);
app.set('views', path.join(__dirname, "/resources/views"));
app.set('view engine' , 'ejs');

//Assets
app.use(express.static('public'))
app.use(express.json());


//routes of our applcation 
require('./routes/web')(app);


//listening to the pory
const PORT = process.env.PORT || 5000;
app.listen(PORT , ()=>{
    console.log(`server is running in port number ${PORT}`);
}) 