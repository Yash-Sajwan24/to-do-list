const express = require('express');
const ejs = require('ejs');
const app = express();
app.set('view engine', 'ejs');

app.get('/', function(req, res){
    let date = new Date();
    let val = date.getDay();
    let day = "";
    switch (val){
        case 0: 
            day = 'Sunday';
            break;
        case 1: 
            day = 'Monday';
            break;
        case 2: 
            day = 'Tuesday';
            break;
        case 3: 
            day = 'Wednesday';
            break;
        case 4: 
            day = 'Thursday';
            break;
        case 5: 
            day = 'Friday';
            break;
        case 6: 
            day = 'Saturday';
            break;
        default: 
            day = 'error occurred';
    }

    res.render('list', {dayToday: day});
})

app.listen(3000, function(){
    console.log("the server is running on port 3000");
})