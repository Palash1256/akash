const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient, CURSOR_FLAGS } = require("mongodb");
const multer = require("multer");
const port = 5626;
const app = express();
const cors= require('cors');

//this is for MongoDB
const uri =
  "mongodb+srv://palash:palash123@cluster0.r9sxb7l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const Database = "5-may-ejs";
const client = new MongoClient(uri);

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", "./public/views");
app.use(express.static("./public"));
app.use(cors())


//this is for fileUpload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});
const upload = multer({ storage: storage });
//fileUpload finish

//for Display data in browser
app.get("/", async (req, res) => {
  try {
    client.connect().then(() => {
      console.log("Mongoose Connected");
    });
    const db = client.db(Database);
    const collection = db.collection("users");
    const response = await collection.find({}).toArray();
    const imagePath = "/images/";
    res.render("home.ejs",{response,imagePath});
  } catch (err) {
    console.log("Server error");
    console.log(err);
  }
});

app.get("/register", (req, res) => {
  res.sendFile("register.html", { root: "./public" });
});

app.get("/login", (req, res) => {
  res.sendFile("login.html", { root: "./public" });
});

app.post("/register", upload.single("images"), async (req, res) => {
  //console.log(req.body);
  await client.connect();
  const db = client.db(Database);
  const collection = db.collection("users");
  console.log(req.body);
  const data = {
    username: req.body.username,
    image: req.file.filename,
    email: req.body.email,
    password: req.body.password,
  };
  const response = collection.insertOne(data);
  res.redirect('/login')
});

app.post('/login',async(req,res)=>{
  await client.connect()
  .then(()=>{console.log("Mongodb Connected for login page")})
  const db = client.db(Database);
  const collection=db.collection("users");
  const user=await collection.findOne({username:req.body.username,password:req.body.password})
  console.log(user);
  if(user){
   res.redirect('/')
  }
  else
  res.send("user not found")
})

app.listen(port, async () => {
  console.log(`server started at ${port}`);
});