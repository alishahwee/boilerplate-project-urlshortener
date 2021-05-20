require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

// Basic Configuration
const port = process.env.PORT || 3000;

// Global short url counter
let urlCounter = 0;

// In-memory "database"
const shortUrls = {};

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

// Short URL get
app.get('/api/shorturl/:shorturl', (req, res) => {
  res.redirect(shortUrls[req.params.shorturl]);
});

// Short URL post
app.post('/api/shorturl', (req, res) => {
  urlCounter++;

  const jsonRes = {
    original_url: req.body?.url,
    short_url: urlCounter,
  };

  shortUrls[urlCounter] = jsonRes.original_url;
  res.json(jsonRes);
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
