const express = require("express");
const mysql =require("mysql");
const dotenv=require("dotenv");
const path =require("path");
const cookieParser=require('cookie-parser');
dotenv.config({path:"./.env"});
const app = express();
const db=mysql.createConnection(
    {
        host:process.env.DATABASE_HOST,
        user:process.env.DATABASE_USER,
        password:process.env.DATABASE_PASSWORD,
        database:process.env.DATABASE
    });
const publicDirectory = path.join(__dirname,'./public');
app.use(express.static(publicDirectory));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cookieParser());

app.set('view engine','hbs');
db.connect((error) =>{
    if(error)
    {
        console.log(error)
    }else
    {
        console.log("my sql connected..")

    }
})
//define route
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));
app.listen(5001,()=>{
    console.log("server is running on port 5001 ...");
})