#!/usr/bin/env node

// Script pour créer des utilisateurs de test dans Firebase Auth
// Nécessite Firebase Admin SDK configuré

const admin = require('firebase-admin');

// Configuration Firebase Admin (à remplacer par vos vraies clés)
const serviceAccount = {
  "type": "service_account",
  "project_id": "ecardio-a7d9f",
  // Ajoutez vos clés Firebase Admin SDK ici
};

// Utilisateurs de test à créer
const testUsers = [
  {
    email: 'admin@aed-management.fr',
    password: 'AED2024!ADMIN',
    displayName: 'Administrateur Système',
    role: 'admin',
    department: 'IT',
    position: 'Administrateur'
  },
  {
    email: 'tech@aed-management.fr',
    password: 'AED2024!TECH',
    displayName: 'Technicien Principal',
    role: 'technician',
    department: 'Technique',
    position: 'Technicien de Maintenance'
  },
  {
    email: 'manager@aed-management.fr',
    password: 'AED2024!MGR',
    displayName: 'Responsable Maintenance',
    role: 'manager',
    department: 'Opérations',
    position: 'Manager Maintenance'
  },
  {
    email: 'ceo@aed-management.fr',
    password: 'AED2024!CEO',
    displayName: 'Directeur Général',
    role: 'ceo',
    department: 'Direction',
    position: 'Chief Executive Officer'
  },
  {
    email: 'support@aed-management.fr',
    password: 'AED2024!SUP',
    displayName: 'Support Client',
    role: 'support',
    department: 'Support',
    position: 'Support Technique'
  }
];

async function createFirebaseUsers() {
  console.log('🔥 Création des utilisateurs Firebase...');
  
  // Pour l'instant, afficher les utilisateurs qui seraient créés
  console.log('\n👥 Utilisateurs qui seraient créés :');
  testUsers.forEach((user, index) => {
    console.log(`${index + 1}. ${user.displayName}`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Rôle: ${user.role}`);
    console.log(`   Département: ${user.department}`);
    console.log('');
  });
  
  console.log('📋 Instructions pour créer les utilisateurs :');
  console.log('1. Aller sur https://console.firebase.google.com/project/ecardio-a7d9f/authentication/users');
  console.log('2. Cliquer sur "Ajouter un utilisateur"');
  console.log('3. Créer chaque utilisateur avec les informations ci-dessus');
  console.log('4. Ou utiliser Firebase Admin SDK avec les vraies clés');
  
  console.log('\n🔑 Pour utiliser ce script avec Firebase Admin SDK :');
  console.log('1. Obtenir les clés de service Firebase Admin SDK');
  console.log('2. Remplacer serviceAccount avec les vraies valeurs');
  console.log('3. Décommenter le code d\'initialisation ci-dessous');
  console.log('4. Exécuter: node create-firebase-users.js');
  
  // Code pour créer les utilisateurs (décommenté quand les clés sont disponibles)
  /*
  try {
    // Initialiser Firebase Admin
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });

    const auth = admin.auth();
    const firestore = admin.firestore();

    for (const userData of testUsers) {
      try {
        // Créer l'utilisateur dans Firebase Auth
        const userRecord = await auth.createUser({
          email: userData.email,
          password: userData.password,
          displayName: userData.displayName,
          emailVerified: true
        });

        console.log(`✅ Utilisateur créé: ${userData.email}`);

        // Créer le profil dans Firestore
        await firestore.collection('users').doc(userRecord.uid).set({
          uid: userRecord.uid,
          email: userData.email,
          displayName: userData.displayName,
          role: userData.role,
          department: userData.department,
          position: userData.position,
          createdAt: new Date(),
          lastLogin: new Date(),
          active: true
        });

        console.log(`✅ Profil créé pour: ${userData.displayName}`);

      } catch (error) {
        if (error.code === 'auth/email-already-exists') {
          console.log(`⚠️ Utilisateur existe déjà: ${userData.email}`);
        } else {
          console.error(`❌ Erreur pour ${userData.email}:`, error.message);
        }
      }
    }

    console.log('🎉 Création des utilisateurs terminée !');

  } catch (error) {
    console.error('❌ Erreur générale:', error);
  }
  */
}

// Exporter pour utilisation dans d'autres scripts
module.exports = { testUsers, createFirebaseUsers };

// Exécuter si appelé directement
if (require.main === module) {
  createFirebaseUsers();
}
