const { logger } = require('../providers');
const { C } = require('../common');
const { capacity: getSputnikCapacity } = require('../modules/sputnikcc');
const { getCapacitySentence } = require('../modules/chochisays');

const { ALCOBENDAS } = C.SPUTNIK;

module.exports = {
  name: 'sputnikAlcob',
  handler: async (ctx) => {
    try {
      const { People, Capacity } = await getSputnikCapacity(ALCOBENDAS.id);
      ctx.reply(getCapacitySentence(People, Capacity, ALCOBENDAS.name));
    } catch (e) {
      if (typeof e === 'string') ctx.reply(e);
      else logger.error(e);
    }
  },
};
