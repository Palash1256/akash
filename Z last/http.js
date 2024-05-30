    const { response } = require('express');
const  fs= require('fs');
const http=require('http'); 
const server = http.createServer((req,res)=>{
console.log(req.url);
    if(req.url=='/'){
            res.setHeader("Content-type","text/html");
            const data= fs.readFileSync('./index.html','utf-8');
            res.write(data);
            // res.write("<h1>This is responce from server</h1>");
            // res.write("home page");
            // res.write("<h1> hello client</h1>");
            res.end();
    }

    else if(req.url=='/about'){
            res.setHeader("Content-type","text/html");
            const data= fs.readFileSync('./about.html','utf-8');
           // res.write(data);
            // res.write("<h1>This is responce from server</h1>");
            // res.write("about page");
            // res.write("<h1> hello client</h1>");
            res.end(data);
        }
    else if(req.url=='/style.css'){
            res.setHeader("Content-type","text/css");
            const data= fs.readFileSync('./style.css','utf-8');
            res.write(data);
            // res.write("<h1>This is responce from server</h1>");
            // res.write("about page");
            // res.write("<h1> hello client</h1>");
            res.end();
        }
    else if(req.url=='./sample.js'){
        res.setHeader('Content-type',"image/jpg");
        const data=fs.readFileSync('./sample.jpg')
    }

    else{
            res.setHeader("Content-type","text/html");
            res.write("<h1>This is responce from server</h1>");
            res.write("404");
            res.write("<h1> page not found</h1>");
            res.end();
            }
});
server.listen(8080,()=>{
    console.log("server started");
})