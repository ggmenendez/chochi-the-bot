const { capacity: getSputnikCapacity } = require('../modules/sputnikcc');
const getChochiMessage = require('../modules/chochisays');

module.exports = {
  name: 'sputnik',
  handler: async (ctx) => {
    try {
      const { People, Capacity } = await getSputnikCapacity();
      ctx.reply(getChochiMessage(People, Capacity));
    } catch (e) {
      console.error(e);
      if (typeof e === 'string') ctx.reply(e);
    }
  },
};
