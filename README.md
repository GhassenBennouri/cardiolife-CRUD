# AED Management System

Application de gestion des défibrillateurs AED (Automated External Defibrillator) développée avec Angular et Firebase.

## Fonctionnalités

### Gestion des Clients
- Ajout, modification et désactivation de clients
- Recherche et filtrage des clients
- Suivi des informations de contact

### Gestion des Appareils AED
- Inventaire complet des défibrillateurs
- Suivi par client et emplacement
- Gestion des statuts (actif, maintenance, hors service, en stock)
- Suivi des garanties et dates d'expiration

### Gestion des Maintenances
- Planification des maintenances préventives et correctives
- Suivi des contrôles réglementaires
- Gestion des techniciens et interventions
- Historique complet des maintenances

### Gestion du Stock
- Suivi des consommables (électrodes, batteries)
- Gestion des mouvements de stock (entrées/sorties)
- Alertes de stock faible et péremption
- Suivi des fournisseurs et prix

### Calendrier
- Vue mensuelle, hebdomadaire et liste
- Planification visuelle des maintenances
- Filtrage par statut et type de maintenance

### Dashboard
- Statistiques en temps réel
- Alertes et notifications
- Actions rapides
- Activités récentes

## Technologies Utilisées

- **Frontend**: Angular 19 avec TypeScript
- **Backend**: Firebase (Firestore, Authentication)
- **Styling**: SCSS avec design moderne et responsive
- **Architecture**: Composants standalone, services injectables

## Prérequis

- Node.js (version 18 ou supérieure)
- Angular CLI (`npm install -g @angular/cli`)
- Compte Firebase avec projet configuré

## Installation

1. **Cloner le projet**
   ```bash
   git clone <repository-url>
   cd aed-management
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configuration Firebase**
   - Créer un projet Firebase
   - Activer Firestore Database
   - Copier la configuration dans `src/environments/environment.ts`

4. **Lancer l'application**
   ```bash
   ng serve
   ```
   
   L'application sera accessible sur `http://localhost:4200`

## Structure du Projet

```bash
src/
├── app/
│   ├── components/          # Composants de l'application
│   │   ├── dashboard/       # Tableau de bord
│   │   ├── clients/         # Gestion clients
│   │   ├── appareils/       # Gestion appareils
│   │   ├── maintenance/     # Gestion maintenances
│   │   ├── stock/           # Gestion stock
│   │   └── calendrier/      # Calendrier
│   ├── models/              # Modèles de données
│   ├── services/            # Services Firebase
│   └── environments/        # Configuration
```

## Modèles de Données

### Client
- Informations de contact
- Statut actif/inactif
- Date de création

### Appareil AED
- Numéro de série, marque, modèle
- Client assigné et emplacement
- Statut et garantie
- Planification maintenance

### Maintenance
- Type (préventive, corrective, réglementaire)
- Appareil et client concernés
- Technicien et planning
- Coûts et observations

### Consommables
- Type (électrodes, batteries)
- Stock et seuils d'alerte
- Dates de péremption
- Fournisseurs et prix

## Configuration Firebase

1. **Firestore Collections nécessaires:**
   - `clients`
   - `appareils`
   - `maintenances`
   - `consommables`
   - `consommables_clients`
   - `mouvements_stock`
   - `stock_alerts`

2. **Règles de sécurité Firestore:**
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if true; // À adapter selon vos besoins de sécurité
       }
     }
   }
   ```

## Déploiement

### Build de production
```bash
ng build --configuration production
```

### Déploiement Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

## Responsive Design

L'application est entièrement responsive et s'adapte aux différentes tailles d'écran :
- Desktop (1200px+)
- Tablette (768px - 1199px)
- Mobile (< 768px)

## Design System

- **Couleurs principales**: Dégradés bleu/violet
- **Typography**: Inter font family
- **Composants**: Cards, boutons, formulaires cohérents
- **Icônes**: Emojis pour une interface conviviale

## État du Projet

**MVP Complet** - Toutes les fonctionnalités de base sont implémentées
- Interface utilisateur moderne et intuitive
- CRUD complet pour toutes les entités
- Navigation fluide entre les modules
- Design responsive

## Prochaines Améliorations

- [ ] Authentification utilisateur
- [ ] Rapports et exports PDF
- [ ] Notifications push
- [ ] Mode hors ligne
- [ ] Tests unitaires et e2e
- [ ] Internationalisation (i18n)

## Contribution

Ce projet est un MVP fonctionnel prêt pour la production. Les contributions sont les bienvenues pour les améliorations futures.

## Licence

Ce projet est sous licence MIT.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
