const { C, E } = require('../common');
const { logger } = require('../providers');
const {
  accessCheck: checkSputnikAccess,
  getCredentials: getSputnikCredentials,
} = require('../modules/sputnikcc');
const { getAccessSentence } = require('../modules/chochisays');

module.exports = {
  name: 'sputnikaccess',
  handler: async (ctx) => {
    try {
      const userId = ctx.message.from.id;
      const credentials = getSputnikCredentials(userId);
      const { user, password } = credentials;

      const accesses = await checkSputnikAccess({ user, password });
      const response = accesses.map(access => getAccessSentence(access).replace(C.REPLACEMENTS.USER, ctx.message.from.first_name)).join('\n\n');
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
