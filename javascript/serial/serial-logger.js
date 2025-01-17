const { SerialPort } = require('serialport');
const ReadLine = require('readline');

const port = new SerialPort({
  path: '/dev/ttyACM0',
  baudRate: 9600,
})

const lineReader = ReadLine.createInterface({
  input: port
});

lineReader.on('line', function (line) {
  console.log(line);
});

port.on('error', function(err) {
    console.error('Error:', err.message);
});
