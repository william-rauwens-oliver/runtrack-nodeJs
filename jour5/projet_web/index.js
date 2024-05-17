const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');

const app = express();
const port = 80;
const url = 'mongodb://localhost:27017';
const dbName = 'LaPlateforme';

// Middleware pour servir les fichiers statiques
app.use(express.static(path.join(__dirname, 'jour5', 'projet_web', 'public')));

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Route GET pour la page d'accueil
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Route GET pour la page "À propos"
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

// Route GET pour récupérer les données de la base de données MongoDB
app.get('/students-data', async (req, res) => {
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('student');
    const studentsData = await collection.find({}).toArray();
    res.json(studentsData);
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la récupération des données de la base de données :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  } finally {
    client.close();
  }
});

// Middleware pour gérer les erreurs 404
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', 'error404.html'));
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Le serveur écoute sur http://localhost:${port}`);
});
