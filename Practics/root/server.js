const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const cors=require("cors");
const port=6060;
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.get("/",(req,res)=>{
    res.send("hello");
})
app.post("/login",(req,res)=>{
    
        console.log(req.body.username);
        console.log(req.body.password);
        res.send({
            messsage:"abc",
        })
})

app.post("/signup",(req,res)=>{
    console.log(req.body.fullname)
    console.log(req.body.username)
    console.log(req.body.password)
    res.send("Signup")
})
app.listen(port,()=>{
    console.log(`Server started at ${port}`);
})