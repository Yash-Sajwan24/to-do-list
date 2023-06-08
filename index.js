const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// const date = require(__dirname + '/getdate.js');
// mongoose.connect("mongodb://127.0.0.1:27017/todolistDB");
mongoose.connect("mongodb+srv://yashsajwan12345:yashsajwan@cluster0.if6qlcb.mongodb.net/todolistDB");


const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const listSchema = new mongoose.Schema({
  name: String,
});

const listModel = mongoose.model("Task", listSchema);


const item1 = new listModel({
  name: "Enter the task and click on 'Add Item'",
})
const item2 = new listModel({
  name: "<-- click on the cross button to delete the task",
})

app.get("/", function (req, res) {
  // const val = date.getDay();
  listModel
    .find({})
    .then(function (items) {
      if(items.length === 0){
        listModel.insertMany([item1,item2]).then(function(){}).catch((error)=> console.log(error));
        res.redirect('/');
      }
      else{
        res.render("list", { dayToday: "Today", itemAdded: items });
      }
     
    })
    .catch(function (error) {
      console.log(error);
    });
});

const linkSchema = mongoose.Schema({
  name: String,
  items: [listSchema],
});

const linkModel = new mongoose.model("Link", linkSchema);

app.get("/:customListName", function (req, res) {
  const custom = req.params.customListName; //params if syntax

  //find return an array whereas the findOne return an obj if exists
  linkModel
    .findOne({ name: custom })
    .then(function (result) {
      if (result) {
        res.render("list", { dayToday: result.name, itemAdded: result.items });
      } else {
        const item = new linkModel({
          name: custom,
          items: [item1, item2],
        });
        item.save();
        res.redirect("/" + custom);
      }
    })
    .catch((err) => console.log(err));
});

app.post("/delete", function (req, res) {
  const del = req.body.itemDelete;//id of item to be deleted
  const check = req.body.deleteItem;//name of route or dayToday
  if (check === "Today") {
    //for it to find and delete by id it must have a callback function
    listModel
      .findByIdAndDelete({ _id: req.body.itemDelete })
      .then(function () {
        res.redirect("/");
      })
      .catch(function (error) {
        console.log(error);
      });
    
  } else {
    //remove a document from the array in mongoose and save use stack overflow
    //we will use the $pull method of mongoose
    linkModel
      .findOneAndUpdate({ name: check }, { $pull: { items: { _id: del } } })
      .then(function () {
        res.redirect('/' + check );
      })
      .catch(function (err) {
        console.log(err);
      });
  }
});

app.post("/", function (req, res) {
  const item = req.body.task; //input field
  const route = req.body.submitbutton; //submit button

  const temp = new listModel({
    name: item,
  });

  if (route === "Today") {
    listModel.insertMany([temp]);
    res.redirect("/");
  } else {
    linkModel.findOne({ name: route }).then(function (result) {
      result.items.push(temp);
      result.save();
      res.redirect("/" + route);
    });
  }
});

app.listen(process.env.PORT || 3000, function () {
  console.log("the server is running on port 3000");
});
