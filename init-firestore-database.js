#!/usr/bin/env node

// Script pour initialiser la base de données Firestore avec la nouvelle structure
const { initializeApp } = require('firebase/app');
const { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs,
  query,
  where,
  Timestamp 
} = require('firebase/firestore');

// Configuration Firebase (même que dans l'app)
const firebaseConfig = {
  projectId: 'ecardio-a7d9f',
  appId: 'ecardio-a7d9f',
  storageBucket: 'ecardio-a7d9f.appspot.com',
  apiKey: 'AIzaSyBvOkBH0RbsXI0_Mi8msyWOMAJOSAGzSdk',
  authDomain: 'ecardio-a7d9f.firebaseapp.com',
  messagingSenderId: '116415606503828079289'
};

// Utilisateurs de test
const TEST_USERS = [
  {
    email: 'admin@aed-management.fr',
    password: 'AED2024!ADMIN',
    displayName: 'Administrateur Système',
    role: 'admin',
    department: 'IT',
    position: 'Administrateur',
    createdAt: new Date('2024-01-15'),
    lastLogin: new Date(),
    active: true,
    loginAttempts: 0
  },
  {
    email: 'tech@aed-management.fr',
    password: 'AED2024!TECH',
    displayName: 'Technicien Principal',
    role: 'technician',
    department: 'Technique',
    position: 'Technicien de Maintenance',
    createdAt: new Date('2024-02-01'),
    lastLogin: new Date(),
    active: true,
    loginAttempts: 0
  },
  {
    email: 'manager@aed-management.fr',
    password: 'AED2024!MGR',
    displayName: 'Responsable Maintenance',
    role: 'manager',
    department: 'Opérations',
    position: 'Manager Maintenance',
    createdAt: new Date('2024-02-15'),
    lastLogin: new Date(),
    active: true,
    loginAttempts: 0
  },
  {
    email: 'ceo@aed-management.fr',
    password: 'AED2024!CEO',
    displayName: 'Directeur Général',
    role: 'ceo',
    department: 'Direction',
    position: 'Chief Executive Officer',
    createdAt: new Date('2024-01-01'),
    lastLogin: new Date(),
    active: true,
    loginAttempts: 0
  },
  {
    email: 'support@aed-management.fr',
    password: 'AED2024!SUP',
    displayName: 'Support Client',
    role: 'support',
    department: 'Support',
    position: 'Support Technique',
    createdAt: new Date('2024-03-01'),
    lastLogin: new Date(),
    active: true,
    loginAttempts: 0
  },
  {
    email: 'cea@aed-management.fr',
    password: 'AED2024!CEA',
    displayName: 'Directeur Administratif',
    role: 'cea',
    department: 'Administration',
    position: 'Chief Administrative Officer',
    createdAt: new Date('2024-01-10'),
    lastLogin: new Date(),
    active: true,
    loginAttempts: 0
  },
  {
    email: 'cmo@aed-management.fr',
    password: 'AED2024!CMO',
    displayName: 'Directeur Médical',
    role: 'cmo',
    department: 'Médical',
    position: 'Chief Medical Officer',
    createdAt: new Date('2024-01-20'),
    lastLogin: new Date(),
    active: true,
    loginAttempts: 0
  }
];

// Clients de démonstration
const DEMO_CLIENTS = [
  {
    nom: 'Hôpital Central de Paris',
    adresse: '123 Rue de la Santé, 75014 Paris',
    telephone: '01.42.16.00.00',
    email: 'contact@hopital-central-paris.fr',
    contactPrincipal: 'Dr. Marie Dubois',
    dateCreation: new Date('2023-01-15'),
    actif: true
  },
  {
    nom: 'Clinique Saint-Michel Lyon',
    adresse: '456 Avenue des Frères Lumière, 69007 Lyon',
    telephone: '04.78.25.30.40',
    email: 'admin@clinique-saint-michel.fr',
    contactPrincipal: 'Mme Sophie Bernard',
    dateCreation: new Date('2023-03-20'),
    actif: true
  },
  {
    nom: 'Centre Médical Océan Marseille',
    adresse: '789 Boulevard de la Corniche, 13008 Marseille',
    telephone: '04.91.55.67.89',
    email: 'contact@centre-ocean-marseille.fr',
    contactPrincipal: 'Dr. Pierre Moreau',
    dateCreation: new Date('2023-05-10'),
    actif: true
  },
  {
    nom: 'Polyclinique du Nord Lille',
    adresse: '321 Rue de la République, 59000 Lille',
    telephone: '03.20.12.34.56',
    email: 'info@polyclinique-nord-lille.fr',
    contactPrincipal: 'Dr. Jean Dupont',
    dateCreation: new Date('2023-07-05'),
    actif: true
  },
  {
    nom: 'Maison de Santé Bordeaux',
    adresse: '654 Cours de l\'Intendance, 33000 Bordeaux',
    telephone: '05.56.78.90.12',
    email: 'contact@maison-sante-bordeaux.fr',
    contactPrincipal: 'Mme Claire Martin',
    dateCreation: new Date('2023-09-12'),
    actif: true
  }
];

async function initializeFirestoreDatabase() {
  console.log('🔥 Initialisation de la base de données Firestore...');
  
  try {
    // Initialiser Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    
    console.log('✅ Connexion à Firestore établie');
    
    // 1. Initialiser les utilisateurs
    console.log('\n👥 Création des utilisateurs...');
    const usersRef = collection(db, 'users');
    let usersCreated = 0;
    let usersExisting = 0;
    
    for (const userData of TEST_USERS) {
      // Vérifier si l'utilisateur existe déjà
      const q = query(usersRef, where('email', '==', userData.email));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        // Créer l'utilisateur
        const userToCreate = {
          ...userData,
          createdAt: Timestamp.fromDate(userData.createdAt),
          lastLogin: Timestamp.fromDate(userData.lastLogin)
        };
        
        await addDoc(usersRef, userToCreate);
        console.log(`✅ Utilisateur créé: ${userData.displayName} (${userData.email})`);
        usersCreated++;
      } else {
        console.log(`⚠️ Utilisateur existe déjà: ${userData.email}`);
        usersExisting++;
      }
    }
    
    console.log(`📊 Utilisateurs: ${usersCreated} créés, ${usersExisting} existants`);
    
    // 2. Initialiser les clients
    console.log('\n🏥 Création des clients...');
    const clientsRef = collection(db, 'clients');
    let clientsCreated = 0;
    let clientsExisting = 0;
    
    for (const clientData of DEMO_CLIENTS) {
      // Vérifier si le client existe déjà
      const q = query(clientsRef, where('email', '==', clientData.email));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        // Créer le client
        const clientToCreate = {
          ...clientData,
          dateCreation: Timestamp.fromDate(clientData.dateCreation)
        };
        
        await addDoc(clientsRef, clientToCreate);
        console.log(`✅ Client créé: ${clientData.nom}`);
        clientsCreated++;
      } else {
        console.log(`⚠️ Client existe déjà: ${clientData.nom}`);
        clientsExisting++;
      }
    }
    
    console.log(`📊 Clients: ${clientsCreated} créés, ${clientsExisting} existants`);
    
    // 3. Créer les collections vides pour la structure
    console.log('\n📋 Vérification de la structure des collections...');
    
    const collections = [
      'appareils',
      'maintenances', 
      'consommables',
      'consommables_clients',
      'mouvements_stock',
      'stock_alerts',
      'user_logs'
    ];
    
    for (const collectionName of collections) {
      const collRef = collection(db, collectionName);
      const snapshot = await getDocs(collRef);
      console.log(`📁 Collection '${collectionName}': ${snapshot.size} documents`);
    }
    
    // 4. Afficher le résumé
    console.log('\n🎉 Initialisation terminée avec succès !');
    console.log('\n📋 Structure de la base de données:');
    console.log('├── users/                    # Utilisateurs avec authentification');
    console.log('├── clients/                  # Clients (hôpitaux, cliniques)');
    console.log('├── appareils/                # Défibrillateurs AED');
    console.log('├── maintenances/             # Planification et historique');
    console.log('├── consommables/             # Stock (électrodes, batteries)');
    console.log('├── consommables_clients/     # Consommables installés');
    console.log('├── mouvements_stock/         # Historique des mouvements');
    console.log('├── stock_alerts/             # Alertes de stock');
    console.log('└── user_logs/                # Logs d\'actions utilisateurs');
    
    console.log('\n👥 Comptes de test disponibles:');
    TEST_USERS.forEach(user => {
      console.log(`📧 ${user.email} | 🔑 ${user.password} | 👤 ${user.displayName}`);
    });
    
    console.log('\n🌐 Application disponible sur: https://ecardio-a7d9f.web.app');
    console.log('📊 Console Firestore: https://console.firebase.google.com/project/ecardio-a7d9f/firestore');
    
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation:', error);
    process.exit(1);
  }
}

// Exécuter le script
if (require.main === module) {
  initializeFirestoreDatabase();
}

module.exports = { initializeFirestoreDatabase, TEST_USERS, DEMO_CLIENTS };
