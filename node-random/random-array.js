var crypto = require('crypto');
var array = ['hello', 'world', 'how', 'are', 'you', 'doing', 'today', 'I', 'am', 'fine', 'thanks'];
var frequency = {'math': {}, 'crypto': {}};


// Using Math.random()
for(var i = 0; i < 10000; i++)
{
    var index = Math.floor(Math.random() * array.length);
    var word = array[index];

    if(typeof frequency.math[index] == "undefined")
        frequency.math[index] = 0;
    
    frequency.math[index]++;
}


// Using node crypto
for(var i = 0; i < 10000; i++)
{
    var index = crypto.randomBytes(1).readUInt8(0) % array.length;
    var word = array[index];

    if(typeof frequency.crypto[index] == "undefined")
        frequency.crypto[index] = 0;
    
    frequency.crypto[index]++;
}

console.log(frequency);
