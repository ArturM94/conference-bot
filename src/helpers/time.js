const moment = require('moment');

const getTime = () => {
  const time = moment().format('hh:mm');
  let arr = time.split(':');

  arr = Number(arr.join(''));
  return arr;
};

const addZero = (el) => {
  if (el < 10) {
    // eslint-disable-next-line no-param-reassign
    el = `0${el}`;
  }
  return el;
};

module.exports = { getTime, addZero };
