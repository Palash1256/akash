const express=require("express");
const app=express();
const session=require("express-session");
const path=require('path');
const cors=require('cors');
const bodyParser=require("body-parser");
const { userInfo } = require("os");

app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(session({
    secret:'secret',
    resave:false,
    saveUninitialized:true
}))
const users=[
    {username:"abc",pass:"abc",role:"admin"},
    {username:"xyz",pass:"xyz",role:"user"}
]
app.get("/login",(req,res)=>{
    res.sendFile('login.html',{root:'./public/user'})
    
})
app.post('/login',(req,res)=>{
    // console.log(req.body)
    const user=users.find(user=>{
        return user.username==req.body.username && user.pass==req.body.pass
    })
    console.log(user)
    if(user.role=="admin"){
        req.session.user=user;
        res.sendFile('dashboard.html',{root:'./public/admin'})
    }
    else if(user.role=="user"){
        req.session.user=user;
        res.sendFile("home.html",{root:'./public/user'})
    }
    else{
        res.send("User not found");
    }
})


app.listen(2020,()=>{
    console.log("server started at 2020")
});