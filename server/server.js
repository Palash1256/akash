const http=require('http');
const fs=require('fs');

http.createServer((req,res)=>{
    console.log(req.url);
    //res.write("hello user");
    if(req.url=="/"){
        res.setHeader("Content-type","text/html");
        const data =fs.readFileSync("./home.html","utf-8");
        res.write(data);
        res.end();
    }
    else if(req.url=="/home.css"){
        res.setHeader("Content-type","text/css");
        const data=fs.readFileSync("./home.css","utf-8");
        res.write(data);
        res.end();
    }
    else{
        res.write("404");
        res.end();
    }
    //res.end();
}).listen(3030,()=>{
    console.log("server created");
});