const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const port = process.env.port || 8080;
const app = express();
app.use(cors());
app.use(express.json());

//schema
const schemaData = mongoose.Schema(
  {
    name: String,
    email: String,
    mobile: String,
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("user", schemaData);
//reading data from momgodb
app.get("/", async(req, res) => {
    const data=await userModel.find({})
  res.json({success:'true',data:data});
});


//create || save data in database
app.post('/create',async(req,res)=>{
    console.log(req.body)
    const data =new userModel(req.body)
    await data.save();
    res.json({ success: "true",message:"Data Create successfully", data: data });
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












app.listen(port, () => {
  console.log("server stsrted");
  mongoose
    .connect("mongodb://localhost:27017/crudoperation")
    .then(() => {
      console.log("Connect with compass");
    })
    .catch((err) => {
      console.log(err);
    });
});
