const express=require("express");
const fs=require('fs');
const app=express();
const cors=require("cors");
const  port=8080;
app.use(cors());
app.use(express.json())

app.post('/user',(req,res)=>{
    fs.writeFileSync('user.json', JSON.stringify(req.body)+'\n');
})

app.listen(port,()=>{
    console.log(`server started at ${port}`);
})
