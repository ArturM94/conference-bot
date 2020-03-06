const getTime = () => {
  const time = new Date();
  time.setHours(time.getHours() + 2);
  return time;
};
// console.log(getTime());
const addZero = (el) => {
  if (el < 10) {
    // eslint-disable-next-line no-param-reassign
    el = `0${el}`;
  }
  return el;
};

const getTimeFromMsg = (obj) => {
  const a = obj.split(' ');
  let hour = a[2];
  hour = hour.split(':');
  hour[0] = +hour[0] + 3;
  hour = hour.join(':');
  return new Date(`${new Date().getFullYear()} ${a[0]} ${a[1]} ${hour}`);
};

module.exports = { getTime, addZero, getTimeFromMsg };
