require('dotenv').config()

const Slimbot = require('slimbot');
const slimbot = new Slimbot(process.env.TELEGRAM_TOKEN);
const { getSputnikCapacity } = require('./modules');


// Register listeners

slimbot.on('message', async (message) => {
  const { People, Capacity } = await getSputnikCapacity();
  const percent = Math.floor(People/Capacity*100);
  slimbot.sendMessage(message.chat.id, `Chochi dice que en Sputnik ahora hay ${People} de ${Capacity} asquerosas personas (${percent}%)`);
});

// Call API

slimbot.startPolling();

