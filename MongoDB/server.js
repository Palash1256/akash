const express=require("express");
const bodyParser=require("body-parser");
const {MongoClient, CURSOR_FLAGS}=require('mongodb');
const multer=require("multer");
const port=5626;
const app=express();
const cors=require('cors');

//this is for MongoDB
const uri="mongodb+srv://palash:palash123@cluster0.r9sxb7l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const Database='login_demo';
const client=new MongoClient(uri);


app.use(bodyParser.json());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.set('view engine','ejs');
app.set('views','./public/views');
app.use(cors())


//this is for fileUpload
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
//fileUpload finish


//for Display data in browser
app.get('/',async (req,res)=>{
   
    try{
        client.connect()
        .then(()=>{console.log("Mongoose Connected");})
        const db=client.db(Database);
        const collection=db.collection('users');
        const response=await collection.find({}).toArray();
        //console.log(response);
        client.close();
        res.render('index.ejs');
    }
    catch(err){
        console.log("Server error");
        console.log(err);
    }
})

 app.get('/register',(req,res)=>{
     res.sendFile('register.html',{root:"./public"});
 })

 app.post('/register',upload.single("images"),async (req,res)=>{
    //console.log(req.body);
    await client.connect();
    const db=client.db("login_demo");
    const collection=db.collection("users");
    console.log(req.body)
    const data = {
        firstName:req.body.username,
        image:req.file.filename,
        email:req.body.email,
        password:req.body.password
    }
    const response=collection.insertOne(data);
    res.send("data inserted");
 })

 app.listen(port,async()=>{
    console.log(`server started at ${port}`);

})
