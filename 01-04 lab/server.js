const express=require("express");
const port=5626;
const bodyparser=require("body-parser");
const bodyParser = require("body-parser");
const app=express();
app.use(bodyParser.json());
const session=require("express-session");

app.use(session({
    secret:"abc",
    resave:false,
    saveUninitialized:true
    
}))
app.get('/',(req,res)=>{
    req.session.userid=123;
    res.send("HI")
})

app.listen(port,()=>{
    console.log(`server started at ${port}`);
})