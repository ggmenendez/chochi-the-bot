const { capacity: getSharmaCapacity } = require('../modules/sharma');
const { getCapacitySentence } = require('../modules/chochisays');

module.exports = {
  name: 'sharma',
  handler: async (ctx) => {
    try {
      const [{ currentOccupation, maximumOccupation }] = await getSharmaCapacity();
      ctx.reply(getCapacitySentence(currentOccupation, maximumOccupation));
    } catch (e) {
      console.error(e);
      if (typeof e === 'string') ctx.reply(e);
    }
  },
};
