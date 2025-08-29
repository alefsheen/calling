import moment from "moment-jalaali";

export const nowInUnix = () => Math.floor(Date.now() / 1000);
export const justDateInUnix = (time) => {
  return this.date2unix(this.unix2date(time));
};

export const unix2date = (unixNumber) =>
  unixNumber ? moment.unix(unixNumber).format("jYYYY/jMM/jDD") : unixNumber;

// export const unix2time = (unixNumber) =>
//   unixNumber ? moment.unix(unixNumber).format("HH:mm") : unixNumber;

export const date2unix = (date) =>
  date ? moment(date, "jYYYY-jMM-jDD").unix() : date;

// export const time2unix = (time) => (time ? moment(time, "HH:mm").unix() : time);

// export const dateAndTime2unix = (date) =>
//   date ? moment(date, "jYYYY/jMM/jDD HH:mm").unix() : date;

// export const unix2dateAndTime = (unixNumber) =>
//   unixNumber
//     ? moment.unix(unixNumber).format("jYYYY/jMM/jDD HH:mm")
//     : unixNumber;
