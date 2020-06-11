const functions = require('firebase-functions');
const express = require('express');
const engines = require('consolidate');
const Handlebars = require('handlebars');
const githubApi = require('./github-api');
const cors = require('cors');

require('dotenv').config();

const app = express();

app.use(cors());

app.engine('hbs', engines.handlebars);
app.set('views', './views');
app.set('view engine', 'hbs');

app.get('/', async (request, response) => {
  response.set('Access-Control-Allow-Origin', '*');
  const userList = await githubApi.getRandomUsers();
  response.render('index', { users: userList });
});

app.get('/api/user/:id', async (request, response) => {
  response.set('Access-Control-Allow-Origin', '*');
  response.json(await githubApi.getUserData(request.params.id));
});

Handlebars.registerHelper('userapi_url', () => {
  return `${process.env.HOST}/api/user/`;
});

exports.app = functions.https.onRequest(app);
