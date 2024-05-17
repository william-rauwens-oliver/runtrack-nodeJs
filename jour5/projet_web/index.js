const express = require('express');
const path = require('path');
const app = express();

const port = 80;

app.use(express.static(path.join(__dirname, 'jour5', 'projet_web', 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', 'error404.html'));
});

app.listen(port, () => {
  console.log(`Le serveur écoute sur http://localhost:${port}`);
});
