const fetch = require('node-fetch');

module.exports = () => new Promise((resolve, reject) => {
  fetch("http://sharmamadrid.dyndns.org:6050/home/getroominformation/1", {
    "headers": { "Content-Type": "application/json", },
    "method": "GET",
  }).then(response => response.json())
    .then(resolve)
    .catch(reject);
});
