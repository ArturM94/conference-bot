const User = require('./user');
const Speaker = require('./speaker');
const Schedule = require('./schedule');
const Notification = require('./notification');

module.exports = Object.assign({}, User, Speaker, Schedule, Notification);
