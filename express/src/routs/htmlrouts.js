module.exports=(function(){
    const route=require("express").Router();
    

route.get('/',(req,res)=>{
   
res.sendFile("./view/home.html",{root:'./'});
})
route.get('/contact',(req,res)=>{
   
    res.sendFile("./view/contact.html",{root:'./'});
})

route.get('/about',(req,res)=>{
    
    res.sendFile("./view/about.html",{root:'./'});
})

route.get('*',(req,res)=>{
    res.send("<h1>page not found 404</h1>")
})
return route;
})();