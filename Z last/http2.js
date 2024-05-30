const http=require('http');

http.createServer((req,res)=>{

    res.end();

}).listen(5050,()=>{
    console.log("Server started");
})