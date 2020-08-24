require('dotenv').config()

const Slimbot = require('slimbot');
const slimbot = new Slimbot(process.env.TELEGRAM_TOKEN);

// Register listeners

slimbot.on('message', message => {
  slimbot.sendMessage(message.chat.id, 'Message received');
});

// Call API

slimbot.startPolling();

