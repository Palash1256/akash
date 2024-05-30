const http=require("http");
const fs=require('fs');
const port=6565;


const server=http.createServer((req,res)=>{
    // function countLine(){
    //     var data=fs.readFileSync("./public/error.log","utf-8");
    //     var lineNumber=data.toString().split('\n').length;
    //     console.log(lineNumber);
    //     // if(lineNumber>5){
    //     //     console.log(data)
    //     //     let index = data.indexOf('\n');
    //     //     console.log(index);
    //     //     //data.splice(0,index);
    //     // }
    // }
    // countLine();
    var date=new Date();
    const log=req.url+" "+date;

    let logArray = fs.readFileSync('./public/error.log','utf-8').split('\n');
    console.log(logArray.length)
    
    if(logArray.length<=5){
        fs.appendFile("./public/error.log",log+'\n',(err)=>{
            if(err){
                res.write("<h2>Internal server error<h2/>");
                res.end();
            }
        });
    }
   

     if(logArray.length>5){
        logArray.shift();
    logArray = logArray.toString();
    logArray = logArray.replace(/,/g,'\n');
    fs.writeFile("./public/error.log",logArray,(err)=>{
             if(err){
                 res.write("<h2>Internal server error<h2/>");
                 res.end();
            }
    })
    
    }

    if(req.url=='/home'){
        res.setHeader("Conteny-Type","text/html");
        const data=fs.readFileSync("./public/home.html");
        //res.write("home page");
        res.end(data);
    }
    else if(req.url=='/about'){
        res.setHeader("Conteny-Type","text/html");
        const data=fs.readFileSync("./public/about.html");
        //res.write("home page");
        res.end(data);
    }
    else{
        res.write("<h1>Page not found</h1><h1>404</h1>")
        res.end()
    }
})

server.listen(port,()=>{
    console.log(`server started at ${port}`);
})