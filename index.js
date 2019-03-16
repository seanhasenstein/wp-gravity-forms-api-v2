require("dotenv").config();
const getData = require("./src/api");

// const indvForm19 =
//   "https://officialsconnection.org/wp-json/gf/v2/forms/11/entries";
const crewForm19 =
  "https://officialsconnection.org/wp-json/gf/v2/forms/12/entries";
const username = process.env.CONSUMER_KEY;
const password = process.env.CONSUMER_SECRET;

async function go() {
  const data = await getData(crewForm19, username, password);
  console.log(data);
}

go();
