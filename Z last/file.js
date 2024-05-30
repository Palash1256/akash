const fs=require('fs');
console.log("first");
const fileContent=fs.readFileSync("./file.txt",'utf-8');
console.log(fileContent);
console.log('second');
fs.readFile("./file.txt",'utf-8',(err,data)=>{
    console.log(err);
    console.log(data);
})
console.log("third");
fs.writeFileSync("./greet.txt","This is made by filewrite");