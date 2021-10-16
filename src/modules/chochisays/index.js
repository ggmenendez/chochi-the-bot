const getAccessSentence = ({ accessType, to, total }) => {
  if (!accessType) return '#user tienes menos entradas que los toros de Gijón';
  if (/abono trimestral/i.test(accessType)) return `Vamos #user menos pereza que aún te aguanta el abono hasta el ${to}`
  if (/10 entradas/i.test(accessType)) return `Jo mama es que sólo le queda${total > 1 ? 'n' : ''} a #user ${total} entrada${total > 1 ? 's': ''} y no le sale la azul de la entrada`;
  return 'Si tú no sabes lo que tienes a mi déjame en paz';
};

const getCapacitySentence = (people, capacity, gymName) => {
  const percent = Math.floor(people/capacity*100);
  let sentence;
  if (percent > 90) sentence = '¿Es que la gente no se puede ir a su puta casa o qué?';
  else if (percent > 70) sentence = 'Mira está petao, espero que baje un poco porque no pienso aguantar a tanto gilipollas';
  else if (percent > 50) sentence = 'Esto empieza a estar más lleno que Llenilandia';
  else if (percent > 30) sentence = 'Vale, tampoco hay mucha gente, pero me pienso quejar igual';
  else '¡CORRE! Ahora está perfecto, hay menos gente que en un dia de escenografía';

  sentence = `(${gymName}) ${sentence} (${people}/${capacity})(${percent}%)`;
  return sentence;
};


module.exports = {
  getAccessSentence,
  getCapacitySentence,
};
