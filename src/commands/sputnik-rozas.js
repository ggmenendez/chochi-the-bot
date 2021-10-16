const { logger } = require('../providers');
const { C } = require('../common');
const { capacity: getSputnikCapacity } = require('../modules/sputnikcc');
const { getCapacitySentence } = require('../modules/chochisays');

const { LAS_ROZAS } = C.SPUTNIK;

module.exports = {
  name: 'sputnikRozas',
  handler: async (ctx) => {
    try {
      const { People, Capacity } = await getSputnikCapacity(LAS_ROZAS.id);
      ctx.reply(getCapacitySentence(People, Capacity, LAS_ROZAS.name));
    } catch (e) {
      if (typeof e === 'string') ctx.reply(e);
      else logger.error(e);
    }
  },
};
