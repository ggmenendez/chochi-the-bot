const { logger } = require('../../providers');

module.exports = (ctx, next) => {
  const { entities = [] } = ctx.message;
  const isCommand = entities.length && entities[0].type === 'bot_command';

  if (isCommand) {
    const { from, text: command } = ctx.message;
    logger.info(JSON.stringify({ command, from }));
  }

  next();
};
