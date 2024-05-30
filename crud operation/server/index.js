const express = require("express");
const cors = require("cors");
const {MongoClient}=require('mongodb')
//const mongoose = require("mongoose");
const port = process.env.port || 8080;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const uri='mongodb+srv://palash:palash123@cluster0.r9sxb7l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const database='may1';
const client= new MongoClient(uri);


app.listen(port, () => {
  console.log("server stsrted at port", port);
  client
    .connect()
    .then(() => {
      console.log("Connect with Atlas");
    })
    .catch((err) => {
      console.log(err);
    });
});


//reading data from momgodb
app.get("/", async(req, res) => {
   const client= new MongoClient(uri);
  await client.connect()
  const db=client.db(database);
  const collection=db.collection('users')
  const data=await collection.find({}).toArray();
  res.json(data);
});


//create || save data in database
app.post('/create',async(req,res)=>{
    const db = client.db(database);
    const collection = db.collection("users");
    console.log(req.body)
    const data=await collection.insertOne(req.body);
    res.json();
})

//update data at database
app.put('/update',async(req,res)=>{
    console.log(req.body)
    const {_id,...rest}=req.body
    const data = await userModel.updateOne({ _id:_id },rest);
    res.json({ success: "true",message:"Data update successfully", data: data });
})

//delete data from database
app.delete('/delete/:id',async(req,res)=>{
    const id = req.params.id
    const data=await userModel.deleteOne({_id:id})
    res.json({ success: "true",message:"Data delete successfully", data: data });
})



