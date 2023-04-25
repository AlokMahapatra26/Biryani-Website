const express = require("express");
const ejs = require("ejs");
const expressLayout = require('express-ejs-layouts');
const path = require('path');
const app = express();

//setting template engin
// app.use(expressLayout);
app.set('views', path.join(__dirname, "/resources/views"));
app.set('view engine' , 'ejs');
app.use(express.static('public'))

app.get("/" , (req,res)=>{
    res.render('index');
})

const PORT = process.env.PORT || 3005;
app.listen(PORT , ()=>{
    console.log(`server is running in port number ${PORT}`);
}) 