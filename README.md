# Apocalipsi – Générateur de résumés PDF (Monorepo)

Ce projet regroupe :
- **Un backend Node.js/Express** (dossier `ComplySummarize_IA`) pour l'authentification, l'upload de PDF, la génération de résumés via Mistral 7B (Ollama), et la gestion de l'historique utilisateur.
- **Un frontend React** (dossier `complysummarize-frontend`) pour une interface moderne : connexion, upload, choix du mode de résumé, affichage et historique.

---

## Structure du repo

```
Apocalipsi/
  ├── ComplySummarize_IA/           # Backend Node.js/Express
  ├── complysummarize-frontend/      # Frontend React
  ├── .gitignore
  └── README.md 
```

---

## Prérequis
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Ollama](https://ollama.com/) (pour Mistral 7B)

---

## Installation & Lancement

### 1. Backend (API Node.js)
```bash
cd ComplySummarize_IA
npm install
# Configurer .env (voir ComplySummarize_IA/README.md)
# Lancer Ollama avec Mistral 7B : ollama run mistral
npm start
```

### 2. Frontend (React)
```bash
cd complysummarize-frontend
npm install
npm start
```

---

## Fonctionnalités principales
- Authentification JWT
- Upload de PDF (en français)
- Génération de résumé (rapide ou complet) via Mistral 7B (Ollama)
- Historique des résumés par utilisateur
- UI moderne, responsive, expérience fluide

---

## Documentation détaillée
- [Backend – ComplySummarize_IA/README.md](./ComplySummarize_IA/README.md)
- [Frontend – complysummarize-frontend/README.md](./complysummarize-frontend/README.md)

---

## Auteur
Projet réalisé par [HKB06](https://github.com/HKB06) – POC de veille réglementaire automatisée. 