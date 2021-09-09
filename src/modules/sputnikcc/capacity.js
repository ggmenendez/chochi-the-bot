const fetch = require('node-fetch');
const { E } = require('../../common');

module.exports = () => new Promise((resolve, reject) => {
  const hours = (new Date()).getHours();
  if (hours > 7 && hours < 22) {
    fetch("https://clientes.sputnikclimbing.com/ScheduleV2/GetPeopleInTheGym", {
      "headers": { "Content-Type": "application/json" },
      "body": '{"Namespace":"sputnik","GymID":121}',
      "method": "POST",
    }).then(response => response.json())
      .then(resolve)
      .catch(reject);
  } else reject(E.RESPONSES.SLEEP_TIME);
});
