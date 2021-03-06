let interval;

module.exports = {
  load() {
    interval = setInterval(() => {
      console.log('Yeah');
    }, 500);
  },

  unload() {
    clearInterval(interval);
  }
}
