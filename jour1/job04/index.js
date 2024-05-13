const fs = require('fs');

const currentDirectory = process.cwd();

fs.readdir(currentDirectory, { withFileTypes: true }, (err, files) => {
  if (err) {
    console.error('Erreur lors de la lecture du répertoire:', err);
    return;
  }

  const directories = files.filter(file => file.isDirectory());

  console.log('Dossiers présents dans le répertoire courant:');
  directories.forEach(directory => {
    console.log(directory.name);
  });
});
