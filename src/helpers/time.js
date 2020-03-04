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

module.exports = { getTime, addZero };
