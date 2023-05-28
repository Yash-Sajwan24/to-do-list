
module.exports.getDate = getDate;
module.exports.getDay = getDay;

function getDate(){
    let date = new Date();
    const options = {
        weekday: 'long',    
        day: 'numeric', 
        month: 'long', 
    }
    let val = date.toLocaleDateString('en-US', options) ;   
    return val;
}

function getDay(){
    let date = new Date();
    const options = {
        weekday: 'long',
    }
    let val = date.toLocaleDateString('en-US', options) ;   
    return val;
}


