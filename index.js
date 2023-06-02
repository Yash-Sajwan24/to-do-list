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

const linkSchema = mongoose.Schema({
    name: String, 
    items: [listSchema],
});

const linkModel = new mongoose.model("Link", linkSchema);

app.get("/:customListName", function(req, res){
    const custom = req.params.customListName;//params if syntax

    //find return an array whereas the findOne return an obj if exists
    linkModel.findOne({name: custom}).then(function(result){
        if(result){
            res.render('list', {dayToday: result.name, itemAdded: result.items});
        }
        else{
            const item = new linkModel({
                name: custom,
                items: [],
            })
            item.save();
            res.redirect('/' + custom);
        }
    }).catch((err) => console.log(err));

    
})

app.post('/delete', function(req, res){
    //for it to find and delete by id it must have a callback function
    listModel.findByIdAndDelete({_id:req.body.itemDelete }).then(function(){
        
    }).catch(function(error){
        console.log(error);
    })
    res.redirect('/');
})

app.post('/', function(req, res){
    const item = req.body.task;//input field
    const route = req.body.submitbutton;//submit button

    const temp = new listModel({
        name: item,
    })

    if(route === "Today"){
        listModel.insertMany([temp]);
        res.redirect('/');
    }
    else{
        linkModel.findOne({name: route}).then(function(result){
            result.items.push(temp);
            result.save();
            res.redirect('/' + route);
        })
    }
})

app.get('/work', function(req, res){
    const val = "Work List";
    res.render('list', {dayToday:val, itemAdded: worklist });
    
})



app.listen(process.env.PORT || 3000, function(){
    console.log("the server is running on port 3000");
})