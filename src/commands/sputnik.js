const getSputnikCapacity = require('../modules/sputnikcc');

const getChochiMessage = (people, capacity) => {
  const percent = Math.floor(people/capacity*100);
  if (percent > 90) return `¿Es que la gente no se puede ir a su puta casa o qué? (${people}/${capacity})(${percent}%)`;
  if (percent > 70) return `Mira está petao, espero que baje un poco porque no pienso aguantar a tanto gilipollas (${people}/${capacity})(${percent}%)`;
  if (percent > 50) return `Me gusta ver el vaso medio lleno, pero esta vez no es algo bueno... (${people}/${capacity})(${percent}%)`;
  if (percent > 30) return `Aún me sobra alguien, pero hay que reconocer que ahora se tiene que estar bien allí (${people}/${capacity})(${percent}%)`;
  return `¡CORRE! Ahora está perfecto, hay menos gente que en un dia de escenografía (${people}/${capacity})(${percent}%)`;
};

module.exports = {
  name: 'sputnik',
  handler: async (ctx) => {
    try {
      console.log(ctx.message.chat.id);
      const { People, Capacity } = await getSputnikCapacity();
      ctx.reply(getChochiMessage(People, Capacity));
    } catch (e) {
      if (typeof e === 'string') ctx.reply(e);
    }
  },
};
