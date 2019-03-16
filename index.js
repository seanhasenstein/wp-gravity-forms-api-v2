require("dotenv").config();
const express = require("express");
const getData = require("./src/api");

const indvForm =
  "https://officialsconnection.org/wp-json/gf/v2/forms/11/entries";
const crewForm =
  "https://officialsconnection.org/wp-json/gf/v2/forms/12/entries?paging[page_size]=20";
const username = process.env.CONSUMER_KEY;
const password = process.env.CONSUMER_SECRET;

const app = express();

app.get("/api", async (req, res) => {
  console.log("Getting the api data...");

  const results = await getData(crewForm, username, password);

  res.json(results.data.entries[0]);
});

app.listen(2019, () => {
  console.log("App running on port 2019");
});
