require('dotenv').config({
  path: '/Users/seanhasenstein/Sites/wbyoc-wp-gf-api/.env'
});
const express = require('express');
const getData = require('./api');

const indvFormInfo = 'https://officialsconnection.org/wp-json/gf/v2/forms/11';
const hsCrewFormInfo = 'https://officialsconnection.org/wp-json/gf/v2/forms/12';
const indvFormEntries =
  'https://officialsconnection.org/wp-json/gf/v2/forms/11/entries?paging[page_size]=50';
const hsCrewFormEntries =
  'https://officialsconnection.org/wp-json/gf/v2/forms/12/entries?paging[page_size]=50';
const username = process.env.CONSUMER_KEY;
const password = process.env.CONSUMER_SECRET;

console.log(process.cwd());

const app = express();

app.get('/api/2019-individual-form-info', async (req, res) => {
  console.log('Getting the indiv. form info api data...');
  const results = await getData(indvFormInfo, username, password);
  res.json(results.data);
});

app.get('/api/2019-individual-entries', async (req, res) => {
  console.log('Getting the indiv. form entries api data...');
  const results = await getData(indvFormEntries, username, password);
  res.json(results.data.entries);
});

app.get('/api/2019-hs-crew-form-info', async (req, res) => {
  console.log('Getting the indiv. form info api data...');
  const results = await getData(hsCrewFormInfo, username, password);
  res.json(results.data);
});

app.get('/api/2019-hs-crew-entries', async (req, res) => {
  console.log('Getting the hs crew form entries api data...');
  const results = await getData(hsCrewFormEntries, username, password);
  res.json(results.data.entries);
});

app.listen(2019, () => {
  console.log('App running on port 2019');
});
