const express = require("express");
const mongoose = require("mongoose");
const User = require("./src/model/user");
const routes = require("./src/model/router");
const bodyParser = require("body-parser");
const port = 999;


mongoose.connect(
  "mongodb+srv://palash:palash123@cluster0.r9sxb7l.mongodb.net/newData?retryWrites=true&w=majority&appName=Cluster0"
);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Database connected successfully");
});

const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine','ejs');
app.set('views','./public/views');
app.use(express.static('./public'))
app.use("/", routes);

app.listen(port, () => {
  console.log(`server started at ${port}`);
});
