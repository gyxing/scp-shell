const ora = require('ora');

module.exports = {
  loading: function (fn, message) {
    return async (...args) => {
      const spinner = ora(message);
      try {
        spinner.start();
        const data = await fn(...args);
        spinner.succeed();
        return data;
      } catch (err) {
        spinner.fail();
        return Promise.reject(err);
      }
    }
  },
  isEmptyObject: function(obj) {
    return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
  },
}
