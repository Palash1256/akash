const express=require("express");
const app=express();
const multer=require('multer');
const upload =multer({dest:'./upload'});
app.listen(3030);
app.post('/fileUpload',upload.single('files'),(req,res)=>{
    console.log(req.file);
    res.send('file Uploaded');
})