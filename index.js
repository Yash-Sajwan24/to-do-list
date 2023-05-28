const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

let task = ["wake up early", "go to gym"];

app.get('/', function(req, res){
    let date = new Date();
    const options = {
        weekday: 'long', 
        day: 'numeric', 
        month: 'long', 
    }
    let val = date.toLocaleDateString('en-US', options) ;

    res.render('list', {dayToday: val, itemAdded: task});
})

app.post('/', function(req, res){
    task.push(req.body.task);
    res.redirect('/');
})

app.listen(process.env.PORT || 3000, function(){
    console.log("the server is running on port 3000");
})