const moment = require('moment-timezone');
moment.tz.setDefault('Europe/Istanbul');

function formatMessage(username, text) {  
  return {
    username,
    text,
    time: ` - ${moment().format('HH:mm')}`
  };   
}

module.exports = formatMessage;