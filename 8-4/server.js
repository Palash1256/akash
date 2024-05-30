const express=require("express");
const bodyParser=require("body-parser");
const cors=require("cors");
const multer=require("multer");
const fs= require("fs");
const port=1010;

const app=express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("./public"))

const storage=multer.diskStorage({
	destination:(req,file,cb)=>{
		cb(null,"public/images")
	},
    filename:(req,file,cb)=>{
        const name=Date.now()+'-'+file.originalname
        cb(null,name)
    }
})

const upload=multer({storage:storage});


app.post("/fileUpload",upload.single('image'),(req,res)=>{
    //console.log(req.file);
    res.send("<h2>File Upload<h2/>")
})

app.get("/gallery",(req,res)=>{
    const images=fs.readdirSync("./public/images");
    const filePath=images.map((file)=>{
        return '/images/'+ file;
    })
    console.log(filePath);
    res.json(filePath);
})

app.listen(port,()=>{
    console.log("port started at 1010");
})