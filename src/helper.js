const ora = require('ora');

if (String.prototype.padStart === void 0) {
  String.prototype.padStart = String.prototype.padStart ? String.prototype.padStart : function (targetLength, padString) {
    targetLength = Math.floor(targetLength) || 0;
    if (targetLength < this.length) return String(this);
    padString = padString ? String(padString) : " ";
    let pad = "";
    let len = targetLength - this.length;
    let i = 0;
    while (pad.length < len) {
      if (!padString[i]) {
        i = 0;
      }
      pad += padString[i];
      i++;
    }
    return pad + String(this).slice(0);
  };
}

function f(label = '') {
  return (label + '').padStart(2, '0')
}

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
  dateFormat: function(date = new Date()) {
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    const d = date.getDate();
    const h = date.getHours();
    const min = date.getMinutes();
    const s = date.getSeconds();
    return y + f(m) + f(d) + f(h) + f(min) + f(s);
  }
}
