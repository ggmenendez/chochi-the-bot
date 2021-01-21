const { capacity: getSharmaCapacity } = require('../modules/sharma');
const getChochiMessage = require('../modules/chochisays');

module.exports = {
  name: 'sharma',
  handler: async (ctx) => {
    try {
      const [{ currentOccupation, maximumOccupation }] = await getSharmaCapacity();
      ctx.reply(getChochiMessage(currentOccupation, maximumOccupation));
    } catch (e) {
      console.error(e);
      if (typeof e === 'string') ctx.reply(e);
    }
  },
};
