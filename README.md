# 💰 BudgetPro - Application de Gestion de Budget

Application web complète de gestion de budget personnel avec authentification et synchronisation cloud.

## 🚀 Fonctionnalités

- ✅ **Authentification sécurisée** - JWT + bcrypt
- ✅ **Gestion multi-mois** - 12 mois de suivi
- ✅ **4 Catégories** - Revenus, Dépenses Fixes, Dépenses Variables, Épargne
- ✅ **Auto-save** - Sauvegarde automatique dans le cloud
- ✅ **Dashboard moderne** - Interface glassmorphism
- ✅ **Export de données** - Export JSON de tous vos budgets
- ✅ **Multi-utilisateurs** - Isolation complète des données

## 🛠️ Technologies

### Backend
- Node.js + Express
- PostgreSQL (Supabase)
- Prisma ORM
- JWT Authentication
- bcrypt pour le hashing des mots de passe

### Frontend
- React 18
- Vite
- React Router v6
- Axios
- CSS moderne (Glassmorphism)

## 📦 Installation

### Prérequis
- Node.js 18+ et npm
- Compte Supabase (gratuit)

### Backend

```bash
cd backend
npm install
cp .env.example .env
# Configurez votre DATABASE_URL dans .env
npx prisma generate
npm run dev
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
# Configurez VITE_API_URL dans .env
npm run dev
```

## 🌐 Configuration

### Variables d'environnement Backend (.env)

```env
DATABASE_URL="postgresql://..."
JWT_SECRET="votre-secret-jwt"
PORT=3000
NODE_ENV=development
CORS_ORIGIN="http://localhost:5173"
```

### Variables d'environnement Frontend (.env)

```env
VITE_API_URL=http://localhost:3000/api
```

## 🚀 Démarrage

1. **Démarrer le backend :**
```bash
cd backend
npm run dev
```
Backend sur http://localhost:3000

2. **Démarrer le frontend :**
```bash
cd frontend
npm run dev
```
Frontend sur http://localhost:5173

## 📊 Structure du Projet

```
budget-pro/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Logique métier
│   │   ├── routes/          # Routes API
│   │   ├── middleware/      # Middlewares (auth)
│   │   └── server.js        # Point d'entrée
│   ├── prisma/
│   │   └── schema.prisma    # Schéma de base de données
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── pages/           # Pages React
│   │   ├── services/        # Services API
│   │   ├── context/         # Context React
│   │   └── main.jsx         # Point d'entrée
│   └── package.json
└── README.md
```

## 🔐 Sécurité

- Mots de passe hashés avec bcrypt (10 rounds)
- Tokens JWT avec expiration (7 jours)
- Protection CORS
- Rate limiting (100 req/15min)
- Isolation complète des données utilisateur

## 📝 Licence

MIT

## 👨‍💻 Auteur

Créé avec ❤️ pour une gestion budgétaire simplifiée
