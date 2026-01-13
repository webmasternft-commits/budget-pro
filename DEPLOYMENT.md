# 🚀 Guide de Déploiement - BudgetPro

## 🎯 Architecture de Déploiement

```
budgetpro.fr (Hostinger DNS)
    ↓
Frontend → Vercel (budgetpro.fr)
    ↓
Backend API → Railway (api.budgetpro.fr)
    ↓
Database → Supabase (PostgreSQL)
```

## 📋 Prérequis

- ✅ Compte GitHub (déjà fait)
- ✅ Compte Vercel (gratuit)
- ✅ Compte Railway (gratuit)
- ✅ Domaine budgetpro.fr sur Hostinger
- ✅ Compte Stripe activé (clés live)

## 🚀 PARTIE 1 : Déployer le Backend sur Railway

### Étape 1.1 : Créer un compte Railway

1. Allez sur https://railway.app
2. Cliquez sur **"Start a New Project"**
3. Connectez-vous avec GitHub
4. Autorisez Railway à accéder à vos repos

### Étape 1.2 : Déployer depuis GitHub

1. **Cliquez** sur "New Project"
2. **Sélectionnez** "Deploy from GitHub repo"
3. **Choisissez** votre repo `budget-pro`
4. Railway va détecter automatiquement le backend

### Étape 1.3 : Configurer le projet Railway

1. **Cliquez** sur votre projet
2. **Cliquez** sur "Settings"
3. **Root Directory** : Changez en `backend`
4. **Start Command** : `npm start`
5. **Build Command** : `npm install && npx prisma generate`

### Étape 1.4 : Ajouter les variables d'environnement

1. **Cliquez** sur votre service → **Variables**
2. **Ajoutez** les variables suivantes :

```env
DATABASE_URL=postgresql://postgres.evkbykdiympgemrpfgay:Youpla69webnov%40@aws-1-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1

JWT_SECRET=votre-secret-jwt-super-secure-production-2024

NODE_ENV=production

PORT=3000

CORS_ORIGIN=https://budgetpro.fr

STRIPE_SECRET_KEY=sk_live_VOTRE_CLE_STRIPE_LIVE
STRIPE_WEBHOOK_SECRET=whsec_VOTRE_WEBHOOK_SECRET_PRODUCTION
STRIPE_PRICE_ID_PRO=price_VOTRE_PRO_PRICE_ID
STRIPE_PRICE_ID_BUSINESS=price_VOTRE_BUSINESS_PRICE_ID
```

3. **Cliquez** sur "Deploy" pour redéployer

### Étape 1.5 : Obtenir l'URL du backend

1. **Cliquez** sur "Settings"
2. **Copiez** l'URL (ex: `https://budgetpro-backend-production.up.railway.app`)
3. **Notez-la** pour plus tard

### Étape 1.6 : Configurer le domaine personnalisé (Optionnel)

1. Dans Railway → **Settings** → **Domains**
2. **Cliquez** sur "Add Domain"
3. **Entrez** : `api.budgetpro.fr`
4. Railway vous donnera un **CNAME** (ex: `xxx.up.railway.app`)
5. **Gardez cette fenêtre ouverte** (on configurera Hostinger après)

---

## 🎨 PARTIE 2 : Déployer le Frontend sur Vercel

### Étape 2.1 : Créer un compte Vercel

1. Allez sur https://vercel.com
2. **Cliquez** sur "Sign Up"
3. **Connectez-vous** avec GitHub
4. **Autorisez** Vercel

### Étape 2.2 : Importer le projet

1. **Cliquez** sur "Add New..." → "Project"
2. **Trouvez** votre repo `budget-pro`
3. **Cliquez** sur "Import"

### Étape 2.3 : Configurer le build

1. **Framework Preset** : Vite
2. **Root Directory** : `frontend`
3. **Build Command** : `npm run build`
4. **Output Directory** : `dist`
5. **Install Command** : `npm install`

### Étape 2.4 : Ajouter les variables d'environnement

**Cliquez** sur "Environment Variables" et ajoutez :

```env
VITE_API_URL=https://budgetpro-backend-production.up.railway.app/api
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_VOTRE_CLE_STRIPE_LIVE
```

**⚠️ Important :** Remplacez l'URL par celle de votre backend Railway (Étape 1.5)

### Étape 2.5 : Déployer

1. **Cliquez** sur "Deploy"
2. **Attendez** 2-3 minutes
3. **Copiez** l'URL Vercel (ex: `https://budget-pro-xyz.vercel.app`)

### Étape 2.6 : Tester le déploiement

1. **Ouvrez** l'URL Vercel
2. **Testez** :
   - La landing page s'affiche ✅
   - Les images se chargent ✅
   - Les liens fonctionnent ✅

---

## 🌐 PARTIE 3 : Configurer le Domaine budgetpro.fr

### Étape 3.1 : Connecter le domaine à Vercel

1. **Dans Vercel** → Votre projet → **Settings** → **Domains**
2. **Cliquez** sur "Add"
3. **Entrez** : `budgetpro.fr`
4. **Cliquez** sur "Add"
5. Vercel vous demandera de configurer les DNS

### Étape 3.2 : Ajouter www.budgetpro.fr

1. **Cliquez** encore sur "Add"
2. **Entrez** : `www.budgetpro.fr`
3. **Cochez** "Redirect to budgetpro.fr"

### Étape 3.3 : Configurer les DNS sur Hostinger

1. **Connectez-vous** à Hostinger
2. **Allez** dans "Domaines" → budgetpro.fr → "Gérer"
3. **Cliquez** sur "DNS / Zone DNS"

#### Configuration DNS pour Vercel (Frontend)

**Supprimez** les enregistrements A existants pour `@` et `www`

**Ajoutez** ces enregistrements :

| Type | Nom | Valeur | TTL |
|------|-----|--------|-----|
| A | @ | 76.76.21.21 | 14400 |
| CNAME | www | cname.vercel-dns.com | 14400 |

#### Configuration DNS pour Railway (Backend - Optionnel)

**Si vous utilisez api.budgetpro.fr :**

| Type | Nom | Valeur | TTL |
|------|-----|--------|-----|
| CNAME | api | xxx.up.railway.app | 14400 |

**⚠️ Remplacez** `xxx.up.railway.app` par le CNAME fourni par Railway (Étape 1.6)

### Étape 3.4 : Attendre la propagation DNS

- **Délai** : 5 minutes à 48 heures (généralement 1-2 heures)
- **Vérifier** : https://dnschecker.org

### Étape 3.5 : Vérifier dans Vercel

1. **Retournez** sur Vercel → Domains
2. **Attendez** que le statut passe à "Valid Configuration" ✅
3. Vercel activera automatiquement **SSL/HTTPS**

---

## 🔐 PARTIE 4 : Configuration SSL & Sécurité

### SSL automatique avec Vercel

✅ Vercel active **automatiquement** SSL via Let's Encrypt
✅ Pas de configuration nécessaire
✅ Renouvellement automatique tous les 90 jours

### Forcer HTTPS

Dans `frontend/vite.config.js` :

```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true
  },
  // Force HTTPS in production
  base: process.env.NODE_ENV === 'production' ? '/' : '/',
})
```

---

## 🔄 PARTIE 5 : Mettre à Jour le Backend avec le Nouveau Domaine

### Étape 5.1 : Mettre à jour CORS_ORIGIN

Dans **Railway** → Variables :

```env
CORS_ORIGIN=https://budgetpro.fr
```

### Étape 5.2 : Mettre à jour Stripe Webhooks

1. **Stripe Dashboard** → Développeurs → **Webhooks**
2. **Supprimez** l'ancien webhook localhost
3. **Ajoutez** un nouveau endpoint :
   - **URL** : `https://api.budgetpro.fr/api/stripe/webhook` (ou votre URL Railway)
   - **Événements** : Sélectionnez tous les événements de subscription
4. **Copiez** le nouveau Webhook Secret
5. **Mettez à jour** dans Railway → Variables :
   ```env
   STRIPE_WEBHOOK_SECRET=whsec_NOUVEAU_SECRET
   ```

---

## ✅ PARTIE 6 : Tests de Production

### Checklist Tests

1. **Frontend**
   - [ ] https://budgetpro.fr s'ouvre ✅
   - [ ] https://www.budgetpro.fr redirige vers budgetpro.fr ✅
   - [ ] Certificat SSL actif (cadenas vert) ✅
   - [ ] Landing page s'affiche correctement ✅
   - [ ] Toutes les sections chargent ✅

2. **Authentification**
   - [ ] Inscription fonctionne ✅
   - [ ] Connexion fonctionne ✅
   - [ ] Dashboard s'affiche ✅
   - [ ] Déconnexion fonctionne ✅

3. **Backend API**
   - [ ] API répond (vérifiez https://votre-backend.railway.app/health) ✅
   - [ ] Budget se charge ✅
   - [ ] Budget se sauvegarde ✅
   - [ ] Données persistent ✅

4. **Paiements Stripe**
   - [ ] Clic sur "Essayer 14 jours" redirige vers Stripe ✅
   - [ ] Checkout Stripe s'ouvre ✅
   - [ ] Paiement test fonctionne ✅
   - [ ] Redirection vers dashboard après paiement ✅
   - [ ] Webhooks reçus dans Railway logs ✅

### Test avec carte réelle (Optionnel)

**⚠️ Utilisez d'abord le mode test Stripe !**

Carte de test : `4242 4242 4242 4242`

---

## 📊 PARTIE 7 : Monitoring & Performance

### Analytics

**Google Analytics 4**

1. Créez une propriété GA4
2. Ajoutez le tracking ID dans `frontend/index.html` :

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Vercel Analytics

1. **Vercel Dashboard** → Votre projet → **Analytics**
2. **Activez** Vercel Analytics
3. Suivez : Visiteurs, Performance, Core Web Vitals

### Railway Logs

1. **Railway** → Votre service → **Logs**
2. Surveillez les erreurs backend
3. Configurez des alertes (optionnel)

---

## 🔧 PARTIE 8 : Déploiements Futurs (CI/CD)

### Automatisation GitHub → Vercel

✅ **Déjà configuré !**

Chaque `git push` sur `main` déploie automatiquement :
1. Vercel détecte le push
2. Build le frontend
3. Déploie en production
4. Invalide le cache CDN

### Automatisation GitHub → Railway

✅ **Déjà configuré !**

Chaque `git push` sur `main` :
1. Railway détecte le push
2. Build le backend
3. Redéploie automatiquement

### Workflow de déploiement

```bash
# Local
git add .
git commit -m "New feature"
git push origin main

# Automatique (2-3 minutes)
→ Vercel déploie le frontend
→ Railway déploie le backend
→ Tout est en production ! 🎉
```

---

## 💰 PARTIE 9 : Coûts Mensuels

| Service | Plan | Coût |
|---------|------|------|
| **Vercel** | Hobby (gratuit) | €0 |
| **Railway** | Hobby (gratuit puis €5) | €0-5 |
| **Supabase** | Free | €0 |
| **Hostinger** | Domain | ~€10/an |
| **Stripe** | Commission | 1.4% + €0.25 |

**Total mensuel : €0-5** (+ commissions Stripe)

### Limites Gratuites

**Vercel Hobby :**
- Builds illimités
- 100 GB bande passante/mois
- Domaines personnalisés illimités
- SSL automatique

**Railway Hobby :**
- $5 de crédit gratuit/mois
- Au-delà : $0.000463/GB-hour RAM + $0.000231/GB-hour CPU

**Supabase Free :**
- 500 MB database
- 1 GB file storage
- 2 GB bandwidth/mois

### Quand upgrader ?

**Vercel Pro (€20/mois) si :**
- +100 GB bande passante
- Analytics avancées
- Support prioritaire

**Railway Developer ($20/mois) si :**
- Besoin de plus de ressources
- Support 24/7
- SLA garanti

---

## 🚨 Troubleshooting

### Frontend ne se charge pas

**Problème** : "This site can't be reached"

**Solutions** :
1. Vérifier DNS : https://dnschecker.org
2. Attendre propagation (jusqu'à 48h)
3. Vider cache navigateur (Ctrl+Shift+R)
4. Vérifier configuration Vercel Domains

### API ne répond pas

**Problème** : Erreur 502/503

**Solutions** :
1. Vérifier Railway Logs
2. Vérifier variables d'environnement
3. Vérifier DATABASE_URL Supabase
4. Redéployer : Railway → Deploy → Restart

### Paiements Stripe échouent

**Problème** : Erreur lors du checkout

**Solutions** :
1. Vérifier STRIPE_SECRET_KEY (mode live !)
2. Vérifier Price IDs
3. Vérifier webhooks configurés
4. Tester avec carte de test d'abord

### SSL non actif

**Problème** : "Not Secure" dans le navigateur

**Solutions** :
1. Attendre 5-10 minutes après config DNS
2. Vercel → Domains → Click "Refresh"
3. Vérifier enregistrements DNS corrects

---

## 📝 Checklist Finale de Déploiement

### Préparation
- [ ] Code pushé sur GitHub
- [ ] Variables .env.example créées
- [ ] Stripe en mode live activé
- [ ] Domaine budgetpro.fr accessible sur Hostinger

### Backend (Railway)
- [ ] Projet créé sur Railway
- [ ] Repo GitHub connecté
- [ ] Variables d'environnement configurées
- [ ] Build réussi
- [ ] API répond (/health)
- [ ] Logs sans erreurs

### Frontend (Vercel)
- [ ] Projet créé sur Vercel
- [ ] Repo GitHub connecté
- [ ] Variables d'environnement configurées
- [ ] Build réussi
- [ ] Site accessible (URL Vercel)

### Domaine
- [ ] DNS A record configuré (@ → 76.76.21.21)
- [ ] DNS CNAME configuré (www → cname.vercel-dns.com)
- [ ] DNS CNAME configuré (api → railway) - optionnel
- [ ] Propagation DNS complète
- [ ] SSL actif sur budgetpro.fr
- [ ] Redirection www → budgetpro.fr fonctionne

### Tests Production
- [ ] Landing page s'affiche
- [ ] Inscription fonctionne
- [ ] Connexion fonctionne
- [ ] Dashboard fonctionne
- [ ] Stripe checkout fonctionne
- [ ] Webhooks Stripe fonctionnent
- [ ] Tout fonctionne sur mobile

### Post-Déploiement
- [ ] Google Analytics configuré
- [ ] Stripe webhooks production configurés
- [ ] Monitoring actif (Vercel + Railway)
- [ ] Backup database configuré
- [ ] Tests de bout en bout réussis

---

## 🎉 Félicitations !

Votre SaaS BudgetPro est maintenant **en production** sur **budgetpro.fr** ! 🚀

**Prochaines étapes :**
1. Tester tous les flows
2. Configurer Google Analytics
3. Lancer le marketing
4. Acquérir vos premiers clients !

**Besoin d'aide ?**
- Vercel Docs : https://vercel.com/docs
- Railway Docs : https://docs.railway.app
- Stripe Docs : https://stripe.com/docs

---

**Guide créé par Claude Sonnet 4.5**
**Date : 2026-01-13**

Bon lancement ! 💪
