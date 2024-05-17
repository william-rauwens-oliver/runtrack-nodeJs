const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const port = 3000;
const url = 'mongodb://localhost:27017';
const dbName = 'LaPlateforme';

app.use(express.json());

// Connexion à la base de données MongoDB
async function connectToDatabase() {
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  return client.db(dbName).collection('student');
}

// Route GET pour récupérer tous les étudiants
app.get('/student', async (req, res) => {
  const collection = await connectToDatabase();
  try {
    const students = await collection.find({}).toArray();
    res.json(students);
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la récupération des étudiants :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Route GET pour récupérer un étudiant spécifique par son ID
app.get('/student/:id', async (req, res) => {
  const id = req.params.id;
  const collection = await connectToDatabase();
  try {
    const student = await collection.findOne({ _id: new ObjectId(id) });
    if (!student) {
      res.status(404).json({ message: 'Étudiant non trouvé' });
    } else {
      res.json(student);
    }
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la récupération de l\'étudiant :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Route POST pour ajouter un étudiant à la collection
app.post('/student', async (req, res) => {
  const studentData = req.body;
  const collection = await connectToDatabase();
  try {
    await collection.insertOne(studentData);
    res.status(201).json({ message: 'Étudiant ajouté avec succès' });
  } catch (error) {
    console.error('Une erreur s\'est produite lors de l\'ajout de l\'étudiant :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Route DELETE pour supprimer un étudiant de la collection
app.delete('/student/:id', async (req, res) => {
  const id = req.params.id;
  const collection = await connectToDatabase();
  try {
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      res.status(404).json({ message: 'Étudiant non trouvé' });
    } else {
      res.json({ message: 'Étudiant supprimé avec succès' });
    }
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la suppression de l\'étudiant :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
