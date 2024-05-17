const express = require('express');
const app = express();

const port = 80;

app.get('/', (req, res) => {
  res.send('Bienvenue sur la page d\'accueil de notre site !');
});

app.get('/about', (req, res) => {
  res.send('Ceci est la page de présentation de notre projet. Notre projet vise à ...');
});

app.listen(port, () => {
  console.log(`Le serveur écoute sur http://localhost:${port}`);
});
