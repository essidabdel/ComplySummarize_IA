# Resume Generator (Frontend)

Resume Generator est une application web permettant de générer des résumés de documents PDF de manière simple et rapide. L'application propose une interface moderne avec authentification, gestion de l'historique et visualisation des résumés générés.

## Fonctionnalités principales

- **Authentification** : Connexion et création de compte utilisateur.
- **Upload de document** : Importez un fichier PDF à résumer.
- **Génération de résumé** : Le résumé du document est affiché après traitement.
- **Historique** : Consultez la liste de vos documents traités et accédez à leurs résumés.

## Installation et lancement

Assurez-vous d'avoir [Node.js](https://nodejs.org/) installé sur votre machine.

1. Installez les dépendances :
   ```bash
   npm install
   ```
2. Lancez l'application en mode développement :
   ```bash
   npm start
   ```
   L'application sera accessible sur [http://localhost:3000](http://localhost:3000).

## Scripts disponibles

- `npm start` : Démarre l'application en mode développement.
- `npm test` : Lance les tests (mode interactif).
- `npm run build` : Crée une version optimisée pour la production dans le dossier `build`.
- `npm run eject` : Éjecte la configuration Create React App (action irréversible).

## Structure des pages

- **/ (LoginPage)** : Page de connexion/inscription.
- **/menu (MenuPage)** : Upload de document PDF.
- **/loading (LoadingPage)** : Indique le traitement du document.
- **/resume (ResumePage)** : Affiche le résumé généré.
- **/history (HistoryPage)** : Liste des documents traités et accès aux résumés.

## Dépendances principales

- React
- React Router DOM

## Installation automatique

Pour installer automatiquement toutes les dépendances nécessaires, vous pouvez utiliser le script suivant :

```bash
sh install.sh
```

Ce script exécutera la commande `npm install` pour vous.

---

Développé avec [Create React App](https://github.com/facebook/create-react-app).
