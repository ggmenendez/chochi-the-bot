const { E } = require('../../../../common');

const getCredentials = (userId) => {
  const USERS = JSON.parse(process.env.USERS);
  const user = Object.entries(USERS).find(([, idPwd]) => idPwd.id === userId);

  if (user) return {
    user: user[0],
    password: user[1].pwd,
  };
  throw new Error(E.USER_NOT_FOUND);
};

module.exports = getCredentials;
