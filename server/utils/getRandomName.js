const name = require("../models/randomNames.json");

function getRandomName() {
  const index = Math.floor(Math.random() * name.length);
  return name[index];
}

module.exports = getRandomName;
