const express=require("express");
const app=express();
const port=3001;
const bodyParser=require("body-parser");
const cors= require("cors");
const fs=require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

//acess data from product.json
const productData = fs.readFileSync("./public/products.json", "utf-8");
const data=JSON.parse(productData);
//console.log(data[1].Price)



app.get('/',(req,res)=>{
    const query=(req.query.category)
    //console.log(req.query.category);
    if(query){
        const filteredData=data.filter((val)=>{
           return val.Category===query;
        })
        res.send(filteredData);
    }
    else{
        res.sendFile('products.json', { root: `${__dirname}/public` });
    }   
});
app.get('/product',(req,res)=>{
    const query=(req.query.category)
    console.log(req.query.category);
    if(query){
        const filteredData=data.filter((val)=>{
           return val.Category===query;
        })
        res.send(filteredData);
    }
    else{
        res.sendFile('products.json', { root: `${__dirname}/public` });
    } 
})

app.get('*',(req,res)=>{
    res.send("Error 404");
});

app.listen(port,()=>{
    console.log(`server started at ${port}`);
})