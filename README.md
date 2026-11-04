# my-portfolio
# 🚀 Portfolio Full Stack — React + Node.js

![Tech Stack](https://img.shields.io/badge/React-18-61DAFB?logo=react) ![Node.js](https://img.shields.io/badge/Node.js-20-339933?logo=node.js) ![MongoDB](https://img.shields.io/badge/MongoDB-7-47A248?logo=mongodb) ![License](https://img.shields.io/badge/license-MIT-blue)

Portfolio personnel full stack moderne avec un frontend React (Vite + Tailwind CSS) et un backend Node.js (Express + MongoDB).

---

## 📁 Structure du projet

```
mon-portfolio/
├── frontend/                  # React + Vite + Tailwind CSS
│   ├── src/
│   │   ├── components/        # Navbar, Hero, About, Skills, Projects, Contact, Footer
│   │   ├── pages/             # Home, ProjectsPage
│   │   ├── hooks/             # useScrollReveal, useProjects
│   │   ├── services/          # api.js, projectService.js, contactService.js
│   │   └── assets/
│   ├── .env.example
│   └── vite.config.js
│
├── backend/                   # Node.js + Express + MongoDB
│   ├── controllers/           # projectController.js, contactController.js
│   ├── models/                # Project.js
│   ├── routes/                # projects.js, contact.js
│   ├── middleware/            # errorHandler.js
│   ├── config/                # db.js, seed.js
│   ├── server.js
│   └── .env.example
│
├── .gitignore
└── README.md
```

---

## ⚡ Installation rapide

### Prérequis

- **Node.js** ≥ 18.x — [nodejs.org](https://nodejs.org)
- **MongoDB** local ou compte [MongoDB Atlas](https://www.mongodb.com/atlas)
- **Git** — [git-scm.com](https://git-scm.com)

---

### 1. Cloner le dépôt

```bash
git clone https://github.com/votre-username/mon-portfolio.git
cd mon-portfolio
```

---

### 2. Configuration du Backend

```bash
cd backend

# Copier le fichier d'environnement
cp .env.example .env
```

Éditez `.env` avec vos valeurs :

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/portfolio
EMAIL_USER=votre@gmail.com
EMAIL_PASS=votre_app_password_gmail
CLIENT_URL=http://localhost:5173
```

> 💡 **Gmail App Password** : Rendez-vous sur [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords) pour générer un mot de passe d'application.

```bash
# Installer les dépendances
npm install

# (Optionnel) Peupler la base de données avec des projets de démo
npm run seed

# Démarrer en mode développement
npm run dev
```

Le serveur démarre sur → **http://localhost:5000**

---

### 3. Configuration du Frontend

```bash
cd frontend

# Copier le fichier d'environnement
cp .env.example .env
```

Éditez `.env` :

```env
VITE_API_URL=http://localhost:5000/api
```

```bash
# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev
```

L'application démarre sur → **http://localhost:5173**

---

## 🛠️ Scripts disponibles

### Frontend

| Commande | Description |
|---|---|
| `npm run dev` | Démarrer le serveur de développement |
| `npm run build` | Créer le build de production |
| `npm run preview` | Prévisualiser le build de production |

### Backend

| Commande | Description |
|---|---|
| `npm run dev` | Démarrer avec nodemon (rechargement auto) |
| `npm start` | Démarrer en mode production |
| `npm run seed` | Peupler MongoDB avec des données de démo |

---

## 🔌 API Endpoints

### Projets

| Méthode | Route | Description |
|---|---|---|
| `GET` | `/api/projects` | Lister tous les projets |
| `GET` | `/api/projects?featured=true` | Projets mis en avant |
| `GET` | `/api/projects?tag=React` | Filtrer par technologie |
| `GET` | `/api/projects/:id` | Détail d'un projet |
| `POST` | `/api/projects` | Créer un projet |
| `PUT` | `/api/projects/:id` | Modifier un projet |
| `DELETE` | `/api/projects/:id` | Supprimer un projet |

### Contact

| Méthode | Route | Description |
|---|---|---|
| `POST` | `/api/contact` | Envoyer un message (email) |

### Santé

| Méthode | Route | Description |
|---|---|---|
| `GET` | `/api/health` | Vérifier l'état du serveur |

---

## 🎨 Stack Technique

### Frontend
- **React 18** + **Vite** — build ultra-rapide
- **Tailwind CSS 3** — design utility-first
- **React Router v6** — navigation SPA
- **Axios** — client HTTP avec intercepteurs
- **Animations CSS** — particles canvas, scroll reveal

### Backend
- **Node.js** + **Express.js** — serveur REST
- **MongoDB** + **Mongoose** — base de données NoSQL
- **Nodemailer** — envoi d'emails (Gmail)
- **CORS** + **dotenv** — sécurité et configuration
- **Nodemon** — rechargement automatique

---

## 🌍 Déploiement

### Frontend → Vercel / Netlify

```bash
cd frontend
npm run build
# Déployer le dossier dist/
```

### Backend → Railway / Render

1. Pusher le code sur GitHub
2. Connecter le repo à Railway ou Render
3. Ajouter les variables d'environnement dans le dashboard
4. Déployer !

---

## 🔧 Personnalisation

1. **Informations personnelles** — Modifiez les composants `Hero.jsx`, `About.jsx`, `Footer.jsx`
2. **Couleurs** — Ajustez la palette dans `tailwind.config.js`
3. **Projets** — Ajoutez via l'API POST ou le script seed (`backend/config/seed.js`)
4. **Email** — Configurez `EMAIL_USER` et `EMAIL_PASS` dans `backend/.env`

---

## 📄 Licence

MIT © [Votre Nom](https://github.com/votre-username)

---

<div align="center">
  Fait avec ❤️ en <strong>React</strong> + <strong>Node.js</strong>
</div>
