const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const port = 3000;
const url = 'mongodb://localhost:27017';
const dbName = 'LaPlateforme';

app.use(express.json());

app.get('/student', async (req, res) => {
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('student');
    const students = await collection.find({}).toArray();
    res.json(students);
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la récupération des étudiants :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  } finally {
    client.close();
  }
});

app.get('/student/:id', async (req, res) => {
  const id = req.params.id;
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('student');
    const student = await collection.findOne({ _id: new ObjectId(id) });
    if (!student) {
      res.status(404).json({ message: 'Étudiant non trouvé' });
    } else {
      res.json(student);
    }
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la récupération de l\'étudiant :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  } finally {
    client.close();
  }
});

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
