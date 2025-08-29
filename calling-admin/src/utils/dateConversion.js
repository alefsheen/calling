const moment = require("moment-jalaali");

exports.nowInUnix = () => Math.floor(Date.now() / 1000);
exports.justDateInUnix = (time) => {
  return this.date2unix(this.unix2date(time));
};

exports.unix2date = (unixNumber) =>
  unixNumber ? moment.unix(unixNumber).format("jYYYY/jMM/jDD") : unixNumber;

exports.unix2date2 = (unixNumber) =>
  unixNumber ? moment.unix(unixNumber).format("YYYY-MM-DD") : unixNumber;

exports.unix2time = (unixNumber) =>
  unixNumber ? moment.unix(unixNumber).format("HH:mm") : unixNumber;

exports.date2unix = (date) => (date ? moment(date, "YYYY-MM-DD").unix() : date);

exports.time2unix = (time) => (time ? moment(time, "HH:mm").unix() : time);

exports.dateAndTime2unix = (date) =>
  date ? moment(date, "jYYYY/jMM/jDD HH:mm").unix() : date;

exports.unix2dateAndTime = (unixNumber) =>
  unixNumber
    ? moment.unix(unixNumber).format("jYYYY/jMM/jDD HH:mm")
    : unixNumber;
