const capacity = require('./capacity');
const accessCheck = require('./access-check');
const sputnikModules = require('./modules');

module.exports = {
  accessCheck,
  capacity,
  ...sputnikModules,
};
