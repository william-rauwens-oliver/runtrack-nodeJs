const express = require('express');
const fs = require('fs');
const router = express.Router();
const dataFilePath = './data.json';

const readData = () => {
    try {
        const data = fs.readFileSync(dataFilePath);
        return JSON.parse(data);
    } catch (err) {
        throw new Error('Erreur lors de la lecture dans le fichier');
    }
};

const writeData = (data) => {
    try {
        fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
    } catch (err) {
        throw new Error('Erreur lors de lécriture dans le fichier');
    }
};

// [GET]
router.get('/tasks', (req, res) => {
    try {
        const data = readData();
        res.status(200).json(data.tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// [POST]
router.post('/tasks', (req, res) => {
    const { title, description, status } = req.body;
    if (!title || !description || !status) {
        return res.status(400).json({ message: 'Le titre, la description et le statut sont requis' });
    }

    try {
        const data = readData();
        const newTask = {
            id: (data.tasks.length + 1).toString(),
            title,
            description,
            status
        };
        data.tasks.push(newTask);
        writeData(data);
        res.status(201).json(newTask);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// [PUT]
router.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;
    if (!title || !description || !status) {
        return res.status(400).json({ message: 'Le titre, la description et le statut sont requis' });
    }

    try {
        const data = readData();
        const taskIndex = data.tasks.findIndex(task => task.id === id);
        if (taskIndex !== -1) {
            data.tasks[taskIndex] = { id, title, description, status };
            writeData(data);
            res.status(200).json(data.tasks[taskIndex]);
        } else {
            res.status(404).json({ message: 'Tâche introuvable' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// [DELETE]
router.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    try {
        const data = readData();
        const taskIndex = data.tasks.findIndex(task => task.id === id);
        if (taskIndex !== -1) {
            const deletedTask = data.tasks.splice(taskIndex, 1);
            writeData(data);
            res.status(200).json(deletedTask[0]);
        } else {
            res.status(404).json({ message: 'Tâche introuvable' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
