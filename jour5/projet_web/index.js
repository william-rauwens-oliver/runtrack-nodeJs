const express = require('express');
const path = require('path');
const app = express();

const port = 80;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

app.listen(port, () => {
  console.log(`Le serveur écoute sur http://localhost:${port}`);
});
