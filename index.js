const { Telegraf } = require('telegraf');
const express = require('express')();
if (!process.env.HEROKU) {
  require('dotenv').config();
}

const { getSputnikCapacity } = require('./modules');

const { 
  TELEGRAM_TOKEN,
  URL,
  WEBHOOK_PATH
} = process.env;


const bot = new Telegraf(TELEGRAM_TOKEN);

bot.start(ctx => ctx.reply('Holiiiii'));
bot.hears('hi', async (ctx) => {
  console.log(ctx.message.chat.id);
  const { People, Capacity } = await getSputnikCapacity();
  const percent = Math.floor(People/Capacity*100);
  const message = `Chochi dice que en Sputnik ahora hay ${People} de ${Capacity} asquerosas personas (${percent}%)`;
  ctx.reply(message);
});

express.use(bot.webhookCallback(`/${WEBHOOK_PATH}`));
bot.telegram.setWebhook(`${URL}/${WEBHOOK_PATH}`);

express.get('/', (req, res) => res.send('Qué miras?'));

express.listen(process.env.PORT || 8000, () => console.log('Chochi al habla... Vamos que no tengo todo el día'));
