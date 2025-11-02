#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Déploiement avec données de démonstration...');

async function deployWithData() {
  try {
    // 1. Build de production
    console.log('📦 Build de production...');
    execSync('npm run build', { stdio: 'inherit' });

    // 2. Vérifier la configuration Firebase
    console.log('🔧 Vérification de la configuration Firebase...');
    
    if (!fs.existsSync('firebase.json')) {
      console.error('❌ Fichier firebase.json manquant');
      process.exit(1);
    }

    // 3. Déployer les règles Firestore
    console.log('🔒 Déploiement des règles Firestore...');
    try {
      execSync('firebase deploy --only firestore:rules', { stdio: 'inherit' });
    } catch (error) {
      console.warn('⚠️ Erreur lors du déploiement des règles:', error.message);
    }

    // 4. Déployer les index Firestore
    console.log('📊 Déploiement des index Firestore...');
    try {
      execSync('firebase deploy --only firestore:indexes', { stdio: 'inherit' });
    } catch (error) {
      console.warn('⚠️ Erreur lors du déploiement des index:', error.message);
    }

    // 5. Déployer l'application
    console.log('🌐 Déploiement de l\'application...');
    execSync('firebase deploy --only hosting', { stdio: 'inherit' });

    console.log('✅ Déploiement terminé avec succès !');
    
    // 6. Afficher les URLs
    console.log('\n🔗 URLs de l\'application :');
    console.log('   Production: https://ecardio-a7d9f.web.app');
    console.log('   Console Firebase: https://console.firebase.google.com/project/ecardio-a7d9f');
    
    console.log('\n📋 Prochaines étapes :');
    console.log('   1. Ouvrir l\'application en production');
    console.log('   2. Cliquer sur "Données Démo" dans le dashboard');
    console.log('   3. Vérifier que les données sont créées correctement');

  } catch (error) {
    console.error('❌ Erreur lors du déploiement:', error.message);
    process.exit(1);
  }
}

deployWithData();
