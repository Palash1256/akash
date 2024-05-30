const express=require("express");
const {MongoClient, Collection}=require("mongodb");
const bodyParser=require("body-parser");

const app=express();
const port=2030;

app.use(bodyParser.json());
app.use(express.urlencoded({extended:true   }))
//mongodb
const uri ="mongodb+srv://palash:palash123@cluster0.r9sxb7l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client=new MongoClient(uri);
const database="may1";


app.get('/',async(req,res)=>{
    try{
        const db=client.db(database);
    const collection=db.collection("users");
    const data= await collection.find({}).toArray();
    //res.send('hello')
    res.send(data);
    }
    catch(err){
        console.log(err)
    }
})

app.get('/ragister',async(req,res)=>{
    res.sendFile('ragister.html',{root:'./public'});
})

app.post('/userdata',async(req,res)=>{
    const db=client.db(database);
    const collection=db.collection('users');
    await collection.insertOne(req.body)
    res.redirect('/');
})








app.listen(port,()=>{
    console.log("Server Started at",port);
    client.connect()
    .then(()=>{
        console.log("Mongodb connected")
    })
})