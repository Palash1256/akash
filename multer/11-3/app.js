const express = require('express');
const app = express();
const path = require('path');
app.listen(3030)
const multer = require('multer');
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        if(file.mimetype=='application/pdf'){
            cb(null,'./upload/pdf');
        }
        if(file.mimetype=='image/jpeg'){
            cb(null,'./upload/image')
        }
    },

    filename:function(req,file,cb){
        const name=Date.now()+path.extname(file.originalname);
        cb(null,name);
    }
}) 
const upload = multer(
    {
        storage:storage,
        fileFilter:function(req,file,cb){
            console.log(file.mimetype)
            if(file.mimetype=='image/JPG' || file.mimetype=='image/jpeg' || file.mimetype=='application/pdf'){
                cb(null,true);
            }
            else{
                cb(new Error("Invalide file type"))
            }
        },
        limits:{fileSize:2*2024*2024}
    });

app.post('/fileUpload',upload.array('images',10),(req,res)=>{
    console.log(req.files)
    res.send('file uploaded');
})