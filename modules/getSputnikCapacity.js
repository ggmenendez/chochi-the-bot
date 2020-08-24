const fetch = require('node-fetch');

module.exports = () => new Promise((resolve, reject) => {
  fetch("https://clientes.sputnikclimbing.com/ScheduleV2/GetPeopleInTheGym", {
      "headers": { "Content-Type": "application/json" },
      "body": '{"Namespace":"sputnik","GymID":121}',
      "method": "POST",
  }) 
    .then(response => response.json())
    .then(resolve);
});
