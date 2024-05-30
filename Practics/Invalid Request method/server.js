const express=require('express');
const app=express();
const cors=require('cors');
const bodyParser=require('body-parser');
const port=2222;
const fs=require("fs");

var  count=0;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
 app.get('/signup',(req,res)=>{
    count++;
    res.send(`Invalid request method - ${count}`);
 })
app.post('/signup',(req,res)=>{
    const { username, gender, age } = req.body; 
    const user = { username, gender, age };
    console.log(user);
    fs.appendFile('user.txt',JSON.stringify(user)+"\n",(err)=>{
        if(err){
            res.send("Internal server error");
        }
        else{
            res.send("From submit")
        }
    });
})

app.listen(port,()=>{
    console.log(`server started at ${port}`);
})