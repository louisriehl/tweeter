const moment = require("moment");

module.exports = function timeDifference(date) {

  let parsedTime = moment(date);
  return parsedTime.fromNow();
};