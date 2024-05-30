const http = require("http");
const fs = require("fs");
const port = 6565;

let logarray=fs.readFileSync('./public/error.log','utf-8').split('\n')
console.log(logarray)


const server = http.createServer((req, res) => {
  console.log(req.url);

  if (req.url == "/home") {
    res.setHeader("Content-Type", "text/html");
    const data = fs.readFileSync("./public/home.html");
    res.end(data);
  } else if (req.url == "/about") {
    res.setHeader("Content-Type", "text/html");
    const data = fs.readFileSync("./public/about.html");
    //res.write("home page");
    res.end(data);
  } 
  else if(req.url=='/history'){
    res.setHeader('Content-type','text/plain')
    const data= fs.readFileSync('./public/error.log','utf-8')
    res.end(data)
  }
  else if(req.url=="/style.css"){
    res.setHeader("Content-type","text/css");
    const data=fs.readFileSync("./public/style.css");
    res.end(data)
  }
  else {
    fs.appendFileSync('./public/error.log',req.url+"\n",'utf-8')
    res.write("<h1>Page not found</h1><h1>404</h1>");
    res.end();
  }
});

server.listen(port, () => {
  console.log(`server started at ${port}`);
});
