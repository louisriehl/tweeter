const moment = require("moment");

// Returns a date string in the format of `X time ago`
module.exports = function timeDifference(date) {
  const parsedTime = moment(date);
  return parsedTime.fromNow();
};