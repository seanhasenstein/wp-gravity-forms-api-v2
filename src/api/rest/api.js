const axios = require("axios");

async function getData(url, username, password) {
  const data = await axios.get(url, { auth: { username, password } });
  return data;
}

module.exports = getData;
