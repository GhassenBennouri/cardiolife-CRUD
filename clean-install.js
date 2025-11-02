#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🧹 Nettoyage complet des dépendances...');

// Supprimer node_modules
console.log('📦 Suppression de node_modules...');
if (fs.existsSync('node_modules')) {
  fs.rmSync('node_modules', { recursive: true, force: true });
  console.log('✅ node_modules supprimé');
}

// Supprimer package-lock.json
console.log('🔒 Suppression de package-lock.json...');
if (fs.existsSync('package-lock.json')) {
  fs.unlinkSync('package-lock.json');
  console.log('✅ package-lock.json supprimé');
}

// Supprimer le cache Angular
console.log('🗂️ Nettoyage du cache Angular...');
if (fs.existsSync('.angular')) {
  fs.rmSync('.angular', { recursive: true, force: true });
  console.log('✅ Cache Angular nettoyé');
}

// Installation propre
console.log('📥 Installation propre des dépendances...');
try {
  execSync('npm install', { 
    stdio: 'inherit',
    cwd: process.cwd()
  });
  
  console.log('✅ Installation terminée !');
  
  // Afficher les statistiques
  console.log('\n📊 Statistiques des dépendances :');
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  
  const depCount = Object.keys(packageJson.dependencies || {}).length;
  const devDepCount = Object.keys(packageJson.devDependencies || {}).length;
  
  console.log(`  📦 Dépendances de production : ${depCount}`);
  console.log(`  🛠️ Dépendances de développement : ${devDepCount}`);
  console.log(`  📊 Total : ${depCount + devDepCount}`);
  
  console.log('\n🎉 Installation optimisée terminée !');
  
} catch (error) {
  console.error('❌ Erreur lors de l\'installation :', error.message);
  process.exit(1);
}
