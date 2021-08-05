const arvish = require('arvish');
const _ = require('lodash');
const shellHistory = require('shell-history');
const conf = require('./conf');

const getPluginItems = async ({ inputStr }) => {
  if (inputStr && inputStr.startsWith(conf.prefix)) {
    const command = inputStr.split(conf.prefix)[1].trim();

    const historyItems = arvish.matches(command, shellHistory()).slice(0, conf.logCnt).map((commandLog) => {
      return {
        title: commandLog,
        subtitle: `Execute '${commandLog}' on your terminal`,
        arg: commandLog,
      };
    });

    const items = _.uniqBy([
      {
        title: command,
        subtitle: `Execute '${command}' on your terminal`,
        arg: command,
      },
      ...historyItems
    ], 'title');

    return {
      items
    };
  }

  return {
    items: [],
  };
};

module.exports = getPluginItems;
