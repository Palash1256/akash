const express=require("express");
const port=5555;
const bodyParser=require("body-parser");
const cors=require("cors");
const app=express();
const multer=require("multer");
const fs=require("fs");
app.use(express.static('./public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors());

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public/images")
    },
    filename:(req,file,cb)=>{
        const name=Date.now()+"-"+file.originalname;
        cb(null,name)
    }
})
const upload=multer({storage:storage});

app.post("/fileUpload",upload.array("images",10),(req,res)=>{
    console.log(req.files);
    res.send("File Uploaded")
})

app.get("/gallery",(req,res)=>{
    const files=fs.readdirSync("./public/images");
    //console.log(files);
    const filePath=files.map((file)=>{
        return 'images/'+ file;
    })
    console.log(filePath);
    res.json(filePath);
})


app.listen(port,()=>{
    console.log(`server started at ${port}`);
})