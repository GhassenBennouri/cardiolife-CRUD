#!/usr/bin/env node

// Script pour initialiser les données de production via Firebase Admin SDK
const admin = require('firebase-admin');

// Configuration Firebase Admin
const serviceAccount = {
  "type": "service_account",
  "project_id": "ecardio-a7d9f",
  "private_key_id": "your-private-key-id",
  "private_key": "-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-xxxxx@ecardio-a7d9f.iam.gserviceaccount.com",
  "client_id": "your-client-id",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xxxxx%40ecardio-a7d9f.iam.gserviceaccount.com"
};

// Initialiser Firebase Admin (décommentez si vous avez les clés)
/*
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://ecardio-a7d9f-default-rtdb.firebaseio.com'
});

const db = admin.firestore();
*/

// Données de démonstration
const demoData = {
  clients: [
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
      adresse: '456 Avenue Berthelot, 69007 Lyon',
      telephone: '04.78.72.00.00',
      email: 'admin@clinique-saint-michel.fr',
      contactPrincipal: 'Mme Sophie Bernard',
      dateCreation: new Date('2023-03-20'),
      actif: true
    },
    {
      nom: 'Centre Médical Océan Marseille',
      adresse: '789 Boulevard Michelet, 13008 Marseille',
      telephone: '04.91.16.00.00',
      email: 'contact@centre-ocean-marseille.fr',
      contactPrincipal: 'Dr. Pierre Moreau',
      dateCreation: new Date('2023-05-10'),
      actif: true
    },
    {
      nom: 'Polyclinique du Nord Lille',
      adresse: '321 Rue Nationale, 59000 Lille',
      telephone: '03.20.06.00.00',
      email: 'info@polyclinique-nord-lille.fr',
      contactPrincipal: 'Dr. Jean Dupont',
      dateCreation: new Date('2023-07-08'),
      actif: true
    },
    {
      nom: 'Maison de Santé Bordeaux',
      adresse: '654 Cours de l\'Intendance, 33000 Bordeaux',
      telephone: '05.56.44.00.00',
      email: 'contact@maison-sante-bordeaux.fr',
      contactPrincipal: 'Mme Claire Martin',
      dateCreation: new Date('2023-09-12'),
      actif: true
    }
  ],
  
  appareils: [
    {
      numeroSerie: 'AED001-2023-PAR',
      modele: 'LifePak CR Plus',
      marque: 'Physio-Control',
      dateAchat: new Date('2023-02-01'),
      dateMiseEnService: new Date('2023-02-15'),
      emplacement: 'Hall d\'accueil principal',
      statut: 'actif',
      garantie: {
        dateExpiration: new Date('2028-02-01'),
        fournisseur: 'Physio-Control France'
      },
      prochaineMaintenance: new Date('2024-12-15')
    },
    {
      numeroSerie: 'AED002-2023-LYO',
      modele: 'HeartStart FRx',
      marque: 'Philips',
      dateAchat: new Date('2023-04-01'),
      dateMiseEnService: new Date('2023-04-10'),
      emplacement: 'Service des urgences',
      statut: 'actif',
      garantie: {
        dateExpiration: new Date('2028-04-01'),
        fournisseur: 'Philips Healthcare'
      },
      prochaineMaintenance: new Date('2024-11-20')
    },
    {
      numeroSerie: 'AED003-2023-MAR',
      modele: 'ZOLL AED Plus',
      marque: 'ZOLL',
      dateAchat: new Date('2023-06-01'),
      dateMiseEnService: new Date('2023-06-15'),
      emplacement: 'Réception principale',
      statut: 'maintenance',
      garantie: {
        dateExpiration: new Date('2028-06-01'),
        fournisseur: 'ZOLL Medical France'
      },
      prochaineMaintenance: new Date('2024-10-30')
    },
    {
      numeroSerie: 'AED004-2023-LIL',
      modele: 'Defibtech Lifeline',
      marque: 'Defibtech',
      dateAchat: new Date('2023-08-01'),
      dateMiseEnService: new Date('2023-08-15'),
      emplacement: 'Salle d\'attente chirurgie',
      statut: 'actif',
      garantie: {
        dateExpiration: new Date('2028-08-01'),
        fournisseur: 'Defibtech Europe'
      },
      prochaineMaintenance: new Date('2024-12-01')
    },
    {
      numeroSerie: 'AED005-2023-BOR',
      modele: 'Cardiac Science G5',
      marque: 'Cardiac Science',
      dateAchat: new Date('2023-10-01'),
      dateMiseEnService: new Date('2023-10-15'),
      emplacement: 'Hall principal',
      statut: 'actif',
      garantie: {
        dateExpiration: new Date('2028-10-01'),
        fournisseur: 'Cardiac Science France'
      },
      prochaineMaintenance: new Date('2024-11-15')
    }
  ],

  consommables: [
    {
      type: 'electrodes',
      marque: 'Physio-Control',
      modele: 'QUIK-COMBO',
      numeroLot: 'LOT-2024-001-PC',
      datePeremption: new Date('2026-01-15'),
      quantiteStock: 25,
      seuilAlerte: 5,
      prixUnitaire: 45.50,
      fournisseur: 'MedSupply France',
      appareilCompatible: ['LifePak CR Plus']
    },
    {
      type: 'batterie',
      marque: 'Philips',
      modele: 'M5070A',
      numeroLot: 'BAT-2024-002-PH',
      datePeremption: new Date('2028-06-30'),
      quantiteStock: 8,
      seuilAlerte: 3,
      prixUnitaire: 125.00,
      fournisseur: 'Philips Healthcare',
      appareilCompatible: ['HeartStart FRx']
    },
    {
      type: 'electrodes',
      marque: 'ZOLL',
      modele: 'Stat-padz II',
      numeroLot: 'LOT-2024-003-ZO',
      datePeremption: new Date('2025-12-31'),
      quantiteStock: 4,
      seuilAlerte: 6,
      prixUnitaire: 52.00,
      fournisseur: 'ZOLL Medical France',
      appareilCompatible: ['ZOLL AED Plus']
    },
    {
      type: 'batterie',
      marque: 'Defibtech',
      modele: 'DBP-2800',
      numeroLot: 'BAT-2024-004-DT',
      datePeremption: new Date('2029-03-15'),
      quantiteStock: 6,
      seuilAlerte: 2,
      prixUnitaire: 110.00,
      fournisseur: 'Defibtech Europe',
      appareilCompatible: ['Defibtech Lifeline']
    },
    {
      type: 'electrodes',
      marque: 'Cardiac Science',
      modele: 'Intellisense',
      numeroLot: 'LOT-2024-005-CS',
      datePeremption: new Date('2026-08-20'),
      quantiteStock: 12,
      seuilAlerte: 4,
      prixUnitaire: 48.00,
      fournisseur: 'Cardiac Science France',
      appareilCompatible: ['Cardiac Science G5']
    }
  ]
};

async function initializeProductionData() {
  console.log('🚀 Initialisation des données de production...');
  
  // Pour l'instant, on affiche les données qui seraient créées
  console.log('\n📊 Données qui seraient créées :');
  console.log(`   👥 Clients: ${demoData.clients.length}`);
  console.log(`   🏥 Appareils: ${demoData.appareils.length}`);
  console.log(`   📦 Consommables: ${demoData.consommables.length}`);
  
  console.log('\n📋 Instructions pour activer ce script :');
  console.log('   1. Obtenir les clés de service Firebase Admin SDK');
  console.log('   2. Remplacer les valeurs dans serviceAccount');
  console.log('   3. Décommenter le code d\'initialisation Firebase');
  console.log('   4. Exécuter: node init-production-data.js');
  
  console.log('\n🔗 Pour obtenir les clés :');
  console.log('   https://console.firebase.google.com/project/ecardio-a7d9f/settings/serviceaccounts/adminsdk');
  
  // Code pour créer les données (décommenté quand les clés sont disponibles)
  /*
  try {
    // Créer les clients
    console.log('👥 Création des clients...');
    const clientIds = [];
    for (const client of demoData.clients) {
      const docRef = await db.collection('clients').add(client);
      clientIds.push(docRef.id);
      console.log(`   ✅ Client créé: ${client.nom}`);
    }
    
    // Créer les appareils (associés aux clients)
    console.log('🏥 Création des appareils...');
    for (let i = 0; i < demoData.appareils.length; i++) {
      const appareil = { ...demoData.appareils[i] };
      appareil.clientId = clientIds[i % clientIds.length]; // Associer aux clients
      
      await db.collection('appareils').add(appareil);
      console.log(`   ✅ Appareil créé: ${appareil.numeroSerie}`);
    }
    
    // Créer les consommables
    console.log('📦 Création des consommables...');
    for (const consommable of demoData.consommables) {
      await db.collection('consommables').add(consommable);
      console.log(`   ✅ Consommable créé: ${consommable.marque} ${consommable.modele}`);
    }
    
    console.log('🎉 Données de production initialisées avec succès !');
    
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation:', error);
  }
  */
}

// Exporter les données pour utilisation dans l'application
module.exports = { demoData, initializeProductionData };

// Exécuter si appelé directement
if (require.main === module) {
  initializeProductionData();
}
