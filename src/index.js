const { Telegraf } = require('telegraf');
const dotenv = require('dotenv');
const express = require('express');
const commands = require('./commands');

if (!process.env.HEROKU) dotenv.config();
const {
  TELEGRAM_TOKEN,
  URL,
  WEBHOOK_PATH,
} = process.env;

module.exports = () => {
  console.log(URL);
  const app = express();
  const bot = new Telegraf(TELEGRAM_TOKEN);

  Object.values(commands).forEach(command => bot.command(command.name, command.handler));
  bot.start(ctx => ctx.reply('Holiiiii'));

  if (process.env.HEROKU) {
    app.use(bot.webhookCallback(`/${WEBHOOK_PATH}`));
    bot.telegram.setWebhook(`${URL}/${WEBHOOK_PATH}`)
      .then(() => console.log('Ya me han cazao con el gancho de red, lo que hay que ver'));

    app.get('/', (req, res) => res.send('¿Qué miras?'));

    app.listen(process.env.PORT || 8000, () => console.log('Chochi al habla... Vamos que no tengo todo el día'));
  } else {
    bot.launch()
      .then(() => console.log('Venga, vamos, que es gerundio'));
  }
};
