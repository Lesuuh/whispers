// const name = require("../models/randomNames.json");

// function getRandomName() {
//   const index = Math.floor(Math.random() * name.length);
//   return name[index];
// }

const { faker } = require("@faker-js/faker");

function getRandomName() {
  return {
    username: faker.internet.username(),
  };
}

module.exports = getRandomName;
