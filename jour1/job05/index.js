const path = require('path');

// Récupérer le chemin du fichier en cours d'exécution
const cheminFichier = __filename;

// Récupérer le nom du fichier
const nomFichier = path.basename(cheminFichier);
console.log("Nom du fichier:", nomFichier);

// Récupérer l'extension du fichier
const extensionFichier = path.extname(cheminFichier);
console.log("Extension du fichier:", extensionFichier);

// Récupérer le répertoire parent du fichier
const repertoireParent = path.dirname(cheminFichier);
console.log("Répertoire parent du fichier:", repertoireParent);
