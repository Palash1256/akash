const express=require("express");
const fs=require('fs');
const cors=require('cors');
const bodyparser= require('body-parser');
const htmlrouts = require("./src/routs/htmlrouts");
const app=express();

app.listen(8080);
app.use(express.static('./view'));
app.use(cors())
app.use(bodyparser.json());


// app.use(express)
app.use('/user',htmlrouts);