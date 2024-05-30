const http=require('http');
const fs=require('fs');
http.createServer((req,res)=>{
let data =fs.readFileSync('./package.json');
res.setHeader("Content-type",'application/json')
    res.end(data);

}).listen(5050,()=>{
    console.log("Server started");
});