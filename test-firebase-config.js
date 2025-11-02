#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Test de la configuration Firebase...');

function testFirebaseConfig() {
  const results = {
    configFiles: [],
    environments: [],
    firebaseFiles: [],
    errors: []
  };

  // 1. Vérifier les fichiers de configuration
  const configFiles = [
    'firebase.json',
    'firestore.rules', 
    'firestore.indexes.json'
  ];

  configFiles.forEach(file => {
    if (fs.existsSync(file)) {
      results.configFiles.push(`✅ ${file}`);
      
      // Vérifier le contenu
      try {
        const content = fs.readFileSync(file, 'utf8');
        if (file.endsWith('.json')) {
          JSON.parse(content); // Valider JSON
        }
      } catch (error) {
        results.errors.push(`❌ ${file}: ${error.message}`);
      }
    } else {
      results.errors.push(`❌ ${file}: Fichier manquant`);
    }
  });

  // 2. Vérifier les environnements
  const envFiles = [
    'src/environments/environment.ts',
    'src/environments/environment.prod.ts'
  ];

  envFiles.forEach(file => {
    if (fs.existsSync(file)) {
      try {
        const content = fs.readFileSync(file, 'utf8');
        
        // Vérifier la présence des clés Firebase
        const requiredKeys = ['projectId', 'apiKey', 'authDomain', 'storageBucket'];
        const hasAllKeys = requiredKeys.every(key => content.includes(key));
        
        if (hasAllKeys) {
          results.environments.push(`✅ ${file}`);
        } else {
          results.errors.push(`❌ ${file}: Clés Firebase manquantes`);
        }
      } catch (error) {
        results.errors.push(`❌ ${file}: ${error.message}`);
      }
    } else {
      results.errors.push(`❌ ${file}: Fichier manquant`);
    }
  });

  // 3. Vérifier la structure du build
  const buildPath = 'dist/aed-management';
  if (fs.existsSync(buildPath)) {
    const buildFiles = fs.readdirSync(buildPath);
    
    // Vérifier dans le sous-dossier browser pour Angular 17+
    const browserPath = path.join(buildPath, 'browser');
    if (fs.existsSync(browserPath)) {
      const browserFiles = fs.readdirSync(browserPath);
      const hasIndex = browserFiles.includes('index.html');
      const hasAssets = browserFiles.some(file => file.endsWith('.js') || file.endsWith('.css'));
      
      if (hasIndex && hasAssets) {
        results.firebaseFiles.push(`✅ Build disponible dans ${browserPath}`);
      } else {
        results.errors.push(`❌ Build incomplet dans ${browserPath}`);
      }
    } else {
      // Vérifier dans le dossier principal pour les versions antérieures
      const hasIndex = buildFiles.includes('index.html');
      const hasAssets = buildFiles.some(file => file.endsWith('.js') || file.endsWith('.css'));
      
      if (hasIndex && hasAssets) {
        results.firebaseFiles.push(`✅ Build disponible dans ${buildPath}`);
      } else {
        results.errors.push(`❌ Build incomplet dans ${buildPath}`);
      }
    }
  } else {
    results.errors.push(`❌ Build manquant - Exécuter: npm run build`);
  }

  return results;
}

function displayResults(results) {
  console.log('\n📋 Résultats du test :\n');
  
  if (results.configFiles.length > 0) {
    console.log('🔧 Fichiers de configuration Firebase :');
    results.configFiles.forEach(file => console.log(`   ${file}`));
    console.log('');
  }
  
  if (results.environments.length > 0) {
    console.log('🌍 Environnements configurés :');
    results.environments.forEach(env => console.log(`   ${env}`));
    console.log('');
  }
  
  if (results.firebaseFiles.length > 0) {
    console.log('📦 Build et fichiers :');
    results.firebaseFiles.forEach(file => console.log(`   ${file}`));
    console.log('');
  }
  
  if (results.errors.length > 0) {
    console.log('❌ Erreurs détectées :');
    results.errors.forEach(error => console.log(`   ${error}`));
    console.log('');
  }
  
  const totalChecks = results.configFiles.length + results.environments.length + results.firebaseFiles.length;
  const totalErrors = results.errors.length;
  
  if (totalErrors === 0) {
    console.log('🎉 Configuration Firebase complète et valide !');
    console.log('\n📋 Prochaines étapes :');
    console.log('   1. npm run deploy:firebase');
    console.log('   2. Ouvrir https://ecardio-a7d9f.web.app');
    console.log('   3. Tester les données de démonstration');
  } else {
    console.log(`⚠️  ${totalErrors} erreur(s) détectée(s) sur ${totalChecks + totalErrors} vérifications`);
    console.log('\n🔧 Actions recommandées :');
    console.log('   1. Corriger les erreurs listées ci-dessus');
    console.log('   2. Relancer: node test-firebase-config.js');
  }
}

// Exécuter le test
const results = testFirebaseConfig();
displayResults(results);

// Code de sortie
process.exit(results.errors.length > 0 ? 1 : 0);
