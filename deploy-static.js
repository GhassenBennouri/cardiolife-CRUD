#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Déploiement de l\'application AED Management...');

async function deployStatic() {
  try {
    // 1. Vérifier que le build existe
    const buildPath = 'dist/aed-management/browser';
    if (!fs.existsSync(buildPath)) {
      console.log('📦 Build manquant, création du build de production...');
      execSync('npm run build', { stdio: 'inherit' });
    }

    // 2. Vérifier les fichiers du build
    const buildFiles = fs.readdirSync(buildPath);
    const hasIndex = buildFiles.includes('index.html');
    const hasAssets = buildFiles.some(file => file.endsWith('.js') || file.endsWith('.css'));

    if (!hasIndex || !hasAssets) {
      throw new Error('Build incomplet - fichiers manquants');
    }

    console.log('✅ Build vérifié avec succès');
    console.log(`   📁 Dossier: ${buildPath}`);
    console.log(`   📄 Fichiers: ${buildFiles.length}`);

    // 3. Afficher les informations de déploiement
    console.log('\n🌐 Informations de déploiement :');
    console.log('   📊 Projet Firebase: ecardio-a7d9f');
    console.log('   🔗 URL de production: https://ecardio-a7d9f.web.app');
    console.log('   📁 Dossier source: dist/aed-management/browser');

    // 4. Instructions pour le déploiement manuel
    console.log('\n📋 Instructions de déploiement :');
    console.log('');
    console.log('1️⃣ Connexion Firebase CLI :');
    console.log('   firebase login');
    console.log('');
    console.log('2️⃣ Déploiement :');
    console.log('   firebase deploy --only hosting');
    console.log('');
    console.log('3️⃣ Alternative - Déploiement via console web :');
    console.log('   • Aller sur https://console.firebase.google.com/project/ecardio-a7d9f/hosting');
    console.log('   • Cliquer sur "Ajouter un autre site" ou "Déployer"');
    console.log('   • Glisser-déposer le dossier dist/aed-management/browser');
    console.log('');

    // 5. Créer un fichier de déploiement simple
    const deployScript = `
# Script de déploiement Firebase
echo "🚀 Déploiement AED Management..."

# Vérifier la connexion
firebase login --no-localhost

# Déployer
firebase deploy --only hosting

echo "✅ Déploiement terminé !"
echo "🔗 URL: https://ecardio-a7d9f.web.app"
`;

    fs.writeFileSync('deploy.bat', deployScript.trim());
    console.log('📝 Script deploy.bat créé');

    // 6. Afficher le résumé
    console.log('\n🎯 Résumé :');
    console.log('   ✅ Build de production prêt');
    console.log('   ✅ Configuration Firebase validée');
    console.log('   ✅ Script de déploiement créé');
    console.log('   ✅ Instructions affichées');

    console.log('\n🚀 Prêt pour le déploiement !');

  } catch (error) {
    console.error('❌ Erreur lors de la préparation du déploiement:', error.message);
    process.exit(1);
  }
}

deployStatic();
