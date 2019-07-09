const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine','ejs');
var items = [];
app.get("/",function(req,res){
  var today = new Date();
  var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };
  var day = today.toLocaleDateString("en-US",options);
  res.render("list",{kindOfDay: day,newlistitem: items});
});

app.post("/",function(req,res){
  var item = req.body.newitem;
  items.push(item);
  res.redirect("/");
});
app.listen(3000,function(){
  console.log("Server Started");
});
