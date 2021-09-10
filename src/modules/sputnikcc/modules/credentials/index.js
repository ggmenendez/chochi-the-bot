const { E } = require('../../../../common');
const environment = process.env;

const getCredentials = (userId) => {
  if (environment[userId]) return environment[userId];
  throw new Error(E.USER_NOT_FOUND);
};

module.exports = getCredentials;
