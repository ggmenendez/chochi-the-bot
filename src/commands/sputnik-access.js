const { C, E } = require('../common');
const { logger } = require('../providers');
const { accessCheck: checkSputnikAccesses } = require('../modules/sputnikcc');
const { getCredentials } = require('../modules/credentials');
const { getAccessSentence } = require('../modules/chochisays');

module.exports = {
  name: 'sputnikAccess',
  handler: async (ctx) => {
    try {
      const userId = ctx.message.from.id;
      const credentials = getCredentials(userId);
      const [user, password] = credentials.split(' ');

      const accesses = await checkSputnikAccesses({ user, password });
      const response = getAccessSentence(accesses).replace(C.REPLACEMENTS.USER, ctx.message.from.first_name);
      ctx.reply(response);
    } catch (e) {
      if (e.message === E.USER_NOT_FOUND) {
        logger.warn(`User ${JSON.stringify(ctx.message.from)} not found`);
        ctx.reply(E.RESPONSES.USER_NOT_FOUND);
      } else {
        logger.error(e);
        ctx.reply(E.RESPONSES.DEFAULT);
      }
    }
  },
};
