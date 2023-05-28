
module.exports = getDate;

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

