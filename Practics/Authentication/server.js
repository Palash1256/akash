const express=require("express");
const  bodyParser = require('body-parser');
const port=4567;
const cors=require("cors");
const session=require("express-session")
var app=express();
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("/public/admin"));
app.use(session({
    secret:"sdf",
    resave:false,
    saveUninitialized:true,
    cookie:{secure:false}
}))

const users=[
    {username:"qqq",pass:"123",role:"admin"},
    {username:"www",pass:"123",role:"user"}
]
app.post("/login",(req,res)=>{
    console.log(req.body);
    const user=users.find(user=>{
        return user.username==req.body.username && user.pass==req.body.pass
    })
    if(user.role=="admin"){
        req.session.user=user;
        res.sendFile("admin.html",{root:"./public/admin"});
    }
    else if(user.role=="user"){
        req.session.user=user;
        res.sendFile("user.html",{root:"./public/user"});
    }
    else{
        res.send("<h1>user not found<h1>")
    }
})

app.get('/login',(req,res)=>{
    res.sendFile("login.html",{root:"./public"})
})
app.post("/logout", (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                return res.status(500).send("Error logging out");
            }
            res.redirect("/login"); // Redirect to a suitable page after logout
        });
    } else {
        res.redirect("/login");
    }
});
app.listen(port,()=>{console.log(`Server is running on ${port}`)})