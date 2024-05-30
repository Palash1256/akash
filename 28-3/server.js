const express=require("express");
//const fs=require('fs');
const app=express();
const cors=require("cors");
const  port=8080;
app.use(cors());
app.use(express.json())

app.set('view engine','ajs');

app.get('/',(req,res)=>{
    res.render('home.ejs');
})

app.listen(port);