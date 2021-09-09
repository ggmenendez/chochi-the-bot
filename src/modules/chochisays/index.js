const getAccessSentence = ({ accessType, to, total }) => {
  if (!accessType) return '#user tienes menos entradas que los toros de Gijón';
  if (/abono trimestral/i.test(accessType)) return `Vamos #user menos pereza que aún te aguanta el abono hasta el ${to}`
  if (/10 entradas/i.test(accessType)) return `Jo mama es que sólo le queda${total > 1 ? 'n' : ''} a #user ${total} entrada${total > 1 ? 's': ''} y no le sale la azul de la entrada`;
  return 'Si tú no sabes lo que tienes a mi déjame en paz';
};

const getCapacitySentence = (people, capacity) => {
  const percent = Math.floor(people/capacity*100);
  if (percent > 90) return `¿Es que la gente no se puede ir a su puta casa o qué? (${people}/${capacity})(${percent}%)`;
  if (percent > 70) return `Mira está petao, espero que baje un poco porque no pienso aguantar a tanto gilipollas (${people}/${capacity})(${percent}%)`;
  if (percent > 50) return `Esto empieza a estar más lleno que Llenilandia (${people}/${capacity})(${percent}%)`;
  if (percent > 30) return `Vale, tampoco hay mucha gente, pero me pienso quejar igual (${people}/${capacity})(${percent}%)`;
  return `¡CORRE! Ahora está perfecto, hay menos gente que en un dia de escenografía (${people}/${capacity})(${percent}%)`;
};


module.exports = {
  getAccessSentence,
  getCapacitySentence,
};
