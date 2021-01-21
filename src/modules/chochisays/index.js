module.exports = (people, capacity) => {
  const percent = Math.floor(people/capacity*100);
  if (percent > 90) return `¿Es que la gente no se puede ir a su puta casa o qué? (${people}/${capacity})(${percent}%)`;
  if (percent > 70) return `Mira está petao, espero que baje un poco porque no pienso aguantar a tanto gilipollas (${people}/${capacity})(${percent}%)`;
  if (percent > 50) return `Esto empieza a estar más lleno que Llenilandia (${people}/${capacity})(${percent}%)`;
  if (percent > 30) return `Vale, tampoco hay mucha gente, pero me pienso quejar igual (${people}/${capacity})(${percent}%)`;
  return `¡CORRE! Ahora está perfecto, hay menos gente que en un dia de escenografía (${people}/${capacity})(${percent}%)`;
};

