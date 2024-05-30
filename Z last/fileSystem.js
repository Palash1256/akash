const fs=require("fs");
fs.readFile("./about.html","utf-8",(err,data)=>{
    if(err){
        console.log(err);
    }
console.log(data);
});

