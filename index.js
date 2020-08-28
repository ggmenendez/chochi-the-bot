if (!process.env.HEROKU) {
  require('dotenv').config();
}

const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

const { getSputnikCapacity } = require('./modules');

bot.start(ctx => ctx.reply('Holiiiii'));
bot.hears('hi', async (ctx) => {
  console.log(ctx.message.chat.id);
  const { People, Capacity } = await getSputnikCapacity();
  const percent = Math.floor(People/Capacity*100);
  const message = `Chochi dice que en Sputnik ahora hay ${People} de ${Capacity} asquerosas personas (${percent}%)`;
  ctx.reply(message);
});

bot.launch();

