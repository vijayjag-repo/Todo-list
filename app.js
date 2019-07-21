const express = require("express");
const app = express();
const mongoose = require('mongoose');
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine','ejs');
mongoose.connect("mongodb://localhost:27017/todolistdb",{useNewUrlParser: true});

//create items schema
const itemsSchema = {
  name: String
}

const Item = mongoose.model("Item",itemsSchema);

const item1 = new Item({
  name: "Hello"
});

const item2 = new Item({
  name: "there"
});

var collectionitems = [item1,item2];

app.get("/",function(req,res){
  var today = new Date();
  var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };
  var day = today.toLocaleDateString("en-US",options);
  Item.find({},function(err,foundItems){
    // if(foundItems.length===0){
    //   Item.insertMany(collectionitems,function(err){
    //     if(err){
    //       console.log("Error");
    //     }
    //     else{
    //       console.log("Success");
    //     }
    //   });
    //   res.redirect("/");
    // }
    // else{
    res.render("list",{listTitle: day,newlistitem: foundItems});
    // }
  });


});

app.post("/",function(req,res){
  const itemName = req.body.newitem;
  const item = new Item({
    name: itemName
  });
  item.save();
  res.redirect("/");
});

app.post("/delete",function(req,res){
  const checkeditem = req.body.checkbox;
  Item.findByIdAndRemove(checkeditem,function(err){
    if(!err){
      console.log("Successfully deleted");
      res.redirect("/");
    }

  });
});


app.listen(3000,function(){
  console.log("Server Started");
});
