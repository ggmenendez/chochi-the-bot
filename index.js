if (!process.env.HEROKU) {
  require('dotenv').config();
}
const { Telegraf } = require('telegraf');
const express = require('express')();

const { getSputnikCapacity } = require('./modules');

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

bot.start(ctx => ctx.reply('Holiiiii'));
bot.hears('hi', async (ctx) => {
  console.log(ctx.message.chat.id);
  const { People, Capacity } = await getSputnikCapacity();
  const percent = Math.floor(People/Capacity*100);
  const message = `Chochi dice que en Sputnik ahora hay ${People} de ${Capacity} asquerosas personas (${percent}%)`;
  ctx.reply(message);
});

express.use(bot.webhookCallback('/chochipath'));
bot.telegram.setWebhook('https://chochi-the-bot.herokuapp.com/chochipath');

express.get('/', (req, res) => res.send('Qué miras?'));

express.listen(process.env.PORT || 8000, () => console.log('Chochi al habla... Vamos que no tengo todo el día'));
