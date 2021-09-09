const { Telegraf } = require('telegraf');
const dotenv = require('dotenv');
const express = require('express');
const commands = require('./commands');
const { logger } = require('./providers');
const middleware = require('./middleware');

if (!process.env.HEROKU) dotenv.config();
const {
  TELEGRAM_TOKEN,
  URL,
  WEBHOOK_PATH,
} = process.env;

module.exports = () => {
  const app = express();
  const bot = new Telegraf(TELEGRAM_TOKEN);

  console.log(middleware);

  bot.use(middleware.requestLogger);

  Object.values(commands).forEach(command => bot.command(command.name, command.handler));
  bot.start(ctx => ctx.reply('Holiiiii'));

  if (process.env.HEROKU) {
    app.use(bot.webhookCallback(`/${WEBHOOK_PATH}`));
    bot.telegram.setWebhook(`${URL}/${WEBHOOK_PATH}`)
      .then(() => logger.info('Ya me han cazao con el gancho de red, lo que hay que ver'));

    app.get('/', (_, res) => res.send('¿Qué miras?'));

    app.listen(process.env.PORT || 8000, () => logger.info('Chochi al habla... Vamos que no tengo todo el día'));
  } else {
    bot.launch()
      .then(() => logger.info('Venga, vamos, que es gerundio'));
  }
};
