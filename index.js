const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');

const date = require(__dirname + '/getdate.js');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));


let task = ["wake up early", "go to gym"];
let worklist = ["study", "make notes"];

app.get('/', function(req, res){
    let val = date.getDay();
    res.render('list', {dayToday: val, itemAdded: task});
})

app.post('/', function(req, res){
    if(req.body.submitbutton === "Work"){
        worklist.push(req.body.task);
        res.redirect('/work');
    }
    else{
        task.push(req.body.task);
        res.redirect('/');
    }
})

app.get('/work', function(req, res){
    let val = "Work List";
    res.render('list', {dayToday:val, itemAdded: worklist });
    
})

app.get('/about', function(req, res){
    res.render('about');
})


app.listen(process.env.PORT || 3000, function(){
    console.log("the server is running on port 3000");
})