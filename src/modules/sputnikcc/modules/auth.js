const fetch = require('node-fetch');

const LOGIN_URL = 'https://clientes.sputnikclimbing.com/account/login/';

const generateBody = (user, pass) => ({
  Email: user,
  GymID: 121,
  Namespace: 'sputnik',
  Password: pass,
  RememberMe: true,
});

const auth = async (user, pass) => {
  const body = generateBody(user, pass);
  const login = fetch(LOGIN_URL, {
    method: 'POST',
    body,
    headers
  });
};

export default auth;
