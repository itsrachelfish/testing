const readline = require('readline');
const fs = require('fs');

const interface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const moduleExists = function(path) {
  if(fs.existsSync(path)) {
    return true;
  } else {
    console.log(">>> Error: That module doesn't exist! Check the 'modules' folder for available files");
    return false;
  }
}

const modules = {};

interface.on('line', (text) => {
  const input = text.split(' ');
  const command = input[0];
  const file = input[1];
  const path = `./modules/${file}.js`;

  if(command == 'load') {
    if(moduleExists(path)) {
      modules[file] = require(path);
      modules[file].load();

      console.log(`>>> ${file} loaded`);
    }
  } else if(command == 'unload') {
    if(moduleExists(path)) {
      modules[file].unload();

      delete modules[file];
      delete require.cache[require.resolve(path)];

      console.log(`>>> ${file} unloaded`);
    }
  } else {
    console.log(">>> Unknown command! Use 'load' and 'unload' to control which modules are loaded.")
  }
});
