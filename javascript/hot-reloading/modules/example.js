let interval;

module.exports = {
  load() {
    interval = setInterval(() => {
      console.log('The example module says this every second.');
    }, 1000);
  },

  unload() {
    clearInterval(interval);
  }
}
