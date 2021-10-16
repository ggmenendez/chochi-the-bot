const fetch = require('node-fetch');
const { E } = require('../../common');

module.exports = (gymId) => new Promise((resolve, reject) => {
  if (!gymId) reject(E.ARGUMENT_REQUIRED('gymId'));
  const hours = (new Date()).getHours();
  if (hours > 7 && hours < 23) {
    fetch("https://clientes.sputnikclimbing.com/ScheduleV2/GetPeopleInTheGym", {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Namespace: 'sputnik', GymID: gymId }),
      method: "POST",
    }).then(response => response.json())
      .then(resolve)
      .catch(reject);
  } else reject(E.RESPONSES.SLEEP_TIME);
});
