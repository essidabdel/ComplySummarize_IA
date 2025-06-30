# ComplySummarize_IA – Backend

## Présentation
Ce backend permet d'uploader un PDF, d'en extraire le texte, de le découper en parties, puis de générer un résumé automatique pour chaque partie grâce à l'API Hugging Face (modèle BART). Les utilisateurs peuvent s'inscrire, se connecter, uploader des PDF et récupérer leurs résumés.

---

## Installation

1. **Cloner le projet**
```bash
git clone <url-du-repo>
cd ComplySummarize_IA
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer les variables d'environnement**
Créer un fichier `.env` à la racine avec :
```
MONGO_URI=<votre_uri_mongodb>
JWT_SECRET=<votre_secret_jwt>
HF_API_KEY=<votre_token_huggingface>
```

4. **Lancer le serveur**
```bash
npm start
```
Le serveur tourne par défaut sur le port 5000.

---

## Routes principales

### Authentification
- `POST /api/auth/register` : Inscription (`{ email, password }`)
- `POST /api/auth/login` : Connexion (`{ email, password }`)

### Upload de PDF
- `POST /api/upload` : Upload d'un PDF (champ `pdf` en form-data, nécessite un token JWT)
  - Réponse : `{ message, filename }`

### Génération de résumé
- `POST /api/summaries` : Génère les résumés pour un PDF déjà uploadé
  - Body : `{ pdfPath: "uploads/nom_du_fichier.pdf" }`
  - Header : `Authorization: Bearer <token>`
  - Réponse : `{ summaries: [ ... ] }` (un résumé par partie)

### Récupération des résumés
- `GET /api/summaries` : Liste tous les résumés de l'utilisateur connecté

---

## Fonctionnement du résumé automatique
- Le texte du PDF est extrait puis découpé en morceaux de 500 caractères.
- Chaque morceau est envoyé à l'API Hugging Face (modèle bart-large-cnn) pour générer un résumé.
- Tous les résumés sont retournés sous forme de tableau.

---

## Configuration Hugging Face
- Créez un compte sur https://huggingface.co/
- Ajoutez ce token dans le `.env` sous `HF_API_KEY`

---

## Exemple de requête curl pour générer un résumé
```bash
curl -X POST http://localhost:5000/api/summaries \
  -H "Authorization: Bearer <VOTRE_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"pdfPath":"uploads/nom_du_fichier.pdf"}'
```

---

## Technologies utilisées
- Node.js / Express
- MongoDB (Mongoose)
- pdf-parse
- axios
- Hugging Face Inference API

---

## Auteur
Projet réalisé dans le cadre d'un POC pour la veille réglementaire automatisée. 