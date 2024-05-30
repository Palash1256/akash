const express=require("express");
const bodyParser=require("body-parser");
const {MongoClient, CURSOR_FLAGS}=require('mongodb');
const multer=require("multer");
const port=6060;
const app=express();


//this is for MongoDB
const uri="mongodb+srv://palash:palash123@cluster0.r9sxb7l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const Database='login_users';
const client=new MongoClient(uri);


app.use(bodyParser.json());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"))


//for Display data in browser
app.get('/',async (req,res)=>{
   
    try{
        client.connect();
        const db=client.db(Database);
        const collection=db.collection('users');
        const response=await collection.find({}).toArray();
        //console.log(response);
        client.close();
        res.json(response);
    }
    catch(err){
        console.log("Server error");
        console.log(err);
    }
})

 app.get('/register',(req,res)=>{
     res.sendFile('register.html',{root:"./public"});
 })
 


 app.post('/register',async (req,res)=>{
    //console.log(req.body);
    await client.connect();
    const db=client.db(Database);
    const collection=db.collection("users");
    console.log(req.body);
    const response=collection.insertOne(req.body);
    res.sendFile("login.html",{root:"./public"})
 })

 app.post('/login',async (req,res)=>{
    //console.log(req.body);
    await client.connect();
    const db=client.db(Database);
    const collection=db.collection("users");

    const users=await collection.findOne({email:req.body.email,password:req.body.password});
    if(users){
    res.sendFile("dashboard.html",{root:"./public"})
    }
    else{
        res.send("user not found");
    }
 })

 app.listen(port,async()=>{
    console.log(`server started at ${port}`);

})
