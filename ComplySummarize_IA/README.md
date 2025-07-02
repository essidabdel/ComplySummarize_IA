# ComplySummarize_IA – Backend

## Présentation
Ce backend permet à un utilisateur :
- d'uploader un PDF,
- d'en extraire le texte,
- de générer automatiquement un résumé global (mode rapide) ou des résumés détaillés par parties + un super résumé global (mode complet).

Le tout grâce à un modèle open source (Mistral 7B) hébergé localement via Ollama. Les utilisateurs peuvent s'inscrire, se connecter, uploader des PDF et retrouver l'historique de leurs résumés.

---

## Installation

1. **Cloner le projet**
```bash
git clone <url-du-repo>
cd ComplySummarize_IA
```

2. **Installer les dépendances Node.js**
```bash
npm install
```

3. **Installer Ollama et le modèle Mistral 7B**
- Télécharger Ollama : https://ollama.com/download
- Installer le modèle :
```bash
ollama pull mistral
```

4. **Lancer Ollama avec Mistral**
```bash
ollama run mistral
```
Laisser cette fenêtre ouverte (Ollama écoute sur http://localhost:11434)

5. **Configurer les variables d'environnement**
Créer un fichier `.env` à la racine avec :
```
MONGO_URI=<votre_uri_mongodb>
JWT_SECRET=<votre_secret_jwt>
```

6. **Lancer le serveur Node.js**
```bash
npm start
```
Le serveur tourne par défaut sur le port 5000.

---

## Structure du projet

- `controllers/` : logiques métier (auth, résumé)
- `middlewares/` : sécurité, gestion des fichiers
- `models/` : schémas Mongoose (User, Summary)
- `routes/` : routes Express (auth, summary, upload)
- `uploads/` : stockage des PDF uploadés
- `server.js` : point d'entrée du backend

---

## Routes principales

### Authentification
- `POST /api/auth/register` : Inscription (`{ email, password }`)
- `POST /api/auth/login` : Connexion (`{ email, password }`)

### Upload de PDF
- `POST /api/upload` : Upload d'un PDF (champ `pdf` en form-data, nécessite un token JWT)
  - Réponse : `{ message, filename }`

### Génération de résumé
- `POST /api/summaries` : Génère un résumé pour un PDF déjà uploadé
  - Body :
    - **Mode rapide (par défaut)** : `{ "pdfPath": "uploads/nom_du_fichier.pdf" }`
    - **Mode complet** : `{ "pdfPath": "uploads/nom_du_fichier.pdf", "mode": "complet" }`
  - Header : `Authorization: Bearer <token>`
  - Réponse :
    - **Mode rapide** :
      ```json
      {
        "globalSummary": "Résumé très court du début du document..."
      }
      ```
    - **Mode complet** :
      ```json
      {
        "summaries": [ "Résumé partie 1", "Résumé partie 2", ... ],
        "globalSummary": "Résumé global du document."
      }
      ```

### Récupération des résumés
- `GET /api/summaries` : Liste tous les résumés de l'utilisateur connecté

---

## Fonctionnement du résumé automatique

- **Mode rapide** : Prend les 3 000 premiers caractères du PDF, génère un résumé global très court (3 phrases max) en moins de 30 secondes.
- **Mode complet** : Découpe le texte en morceaux de 500 caractères, génère un résumé pour chaque chunk, puis un super résumé global à partir de tous les résumés intermédiaires.

---

## Exemples de requêtes curl

### Mode rapide (par défaut)
```bash
curl -X POST http://localhost:5000/api/summaries -H "Authorization: Bearer <VOTRE_TOKEN>" -H "Content-Type: application/json" -d "{\"pdfPath\":\"uploads/nom_du_fichier.pdf\"}"
```

### Mode complet (résumé détaillé)
```bash
curl -X POST http://localhost:5000/api/summaries -H "Authorization: Bearer <VOTRE_TOKEN>" -H "Content-Type: application/json" -d "{\"pdfPath\":\"uploads/nom_du_fichier.pdf\", \"mode\":\"complet\"}"
```

---

## Technologies utilisées
- Node.js / Express
- MongoDB (Mongoose)
- pdf-parse
- axios
- Ollama (Mistral 7B)

---

## Architecture souveraine & sécurité
- Aucun appel à une API externe : tout le traitement IA est fait localement.
- Le modèle Mistral 7B est hébergé sur le serveur interne via Ollama.
- Cette solution répond aux exigences de souveraineté et de confidentialité des données.

---

## Auteur
Projet réalisé dans le cadre d'un POC pour la veille réglementaire automatisée. 