const { logger } = require('../providers');
const { capacity: getSputnikCapacity } = require('../modules/sputnikcc');
const { getCapacitySentence } = require('../modules/chochisays');

module.exports = {
  name: 'sputnik',
  handler: async (ctx) => {
    try {
      const { People, Capacity } = await getSputnikCapacity();
      ctx.reply(getCapacitySentence(People, Capacity));
    } catch (e) {
      if (typeof e === 'string') ctx.reply(e);
      else logger.error(e);
    }
  },
};
