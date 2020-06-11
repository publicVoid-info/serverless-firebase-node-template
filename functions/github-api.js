const fetch = require('node-fetch');
require('dotenv').config();

const options = {
  // These properties are part of the Fetch Standard
  method: 'GET',
  headers: {
    Authorization: `token ${process.env.AUTH_TOKEN}`,
  },
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

exports.getUserData = async function (user) {
  try {
    return await (
      await fetch(
        `https://api.github.com/users/${!user ? 'github' : user}`,
        options
      )
    ).json();
  } catch (error) {
    return { result: error };
  }
};

exports.getRandomUsers = async function () {
  try {
    return await (
      await fetch(
        `https://api.github.com/users?since=${getRandomInt(0, 60000000)}`,
        options
      )
    ).json();
  } catch (error) {
    return { result: error };
  }
};
