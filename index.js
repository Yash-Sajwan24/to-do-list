const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// const date = require(__dirname + '/getdate.js');
mongoose.connect('mongodb://127.0.0.1:27017/todolistDB');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));


// const task = ["wake up early", "go to gym"];
// const worklist = ["study", "make notes"]; 


const listSchema = new mongoose.Schema({
    name: String, 
})

const listModel = mongoose.model("Task", listSchema);

app.get('/', function(req, res){
    // const val = date.getDay();
    listModel.find({}).then(function(items){
        res.render('list', {dayToday: "Today", itemAdded: items});
    }).catch(function(error){
        console.log(error);
    })
})

app.post('/', function(req, res){
    if(req.body.submitbutton === "Work"){
        worklist.push(req.body.task);
        res.redirect('/work');
    }
    else{
        const temp = new listModel({
            name: req.body.task,
        })
        listModel.insertMany([temp]);
        res.redirect('/');
    }
})

app.get('/work', function(req, res){
    const val = "Work List";
    res.render('list', {dayToday:val, itemAdded: worklist });
    
})

app.get('/about', function(req, res){
    res.render('about');
})


app.listen(process.env.PORT || 3000, function(){
    console.log("the server is running on port 3000");
})