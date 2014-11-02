var crypto = require('crypto');
var array = ['hello', 'world', 'how', 'are', 'you', 'doing', 'today', 'I', 'am', 'fine', 'thanks'];

var frequency = {};

for(var i = 0; i < 10000; i++)
{
    var index = crypto.randomBytes(1).readUInt8(0) % array.length;
    var word = array[index];

    console.log(index, word);

    if(typeof frequency[index] == "undefined")
        frequency[index] = 0;
    
    frequency[index]++;
}

console.log(frequency);
