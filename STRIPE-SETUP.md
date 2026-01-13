# 💳 Guide Configuration Stripe - BudgetPro

## 📋 Ce qui a été fait

✅ **Backend:**
- Stripe SDK installé
- Contrôleurs Stripe créés (checkout, portal, webhooks)
- Routes API Stripe configurées
- Schéma Prisma mis à jour (table subscriptions)

✅ **Frontend:**
- @stripe/stripe-js et @stripe/react-stripe-js installés
- Service Stripe créé
- Composant PricingCard avec intégration Stripe
- Landing page mise à jour

✅ **Database:**
- Script SQL prêt pour Supabase (stripe-setup.sql)

## 🚀 Configuration Stripe (Étape par Étape)

### Étape 1: Créer votre compte Stripe

1. **Allez sur https://dashboard.stripe.com/register**
2. **Créez un compte** avec votre email
3. **Activez votre compte** (vérifiez votre email)
4. **Remplissez les informations de votre entreprise**

### Étape 2: Créer les Produits et Prix

#### 2.1 Produit Pro (€9.99/mois)

1. Dans Stripe Dashboard, allez dans **Produits** → **Ajouter un produit**
2. Remplissez:
   - **Nom**: BudgetPro Pro
   - **Description**: Plan Pro avec toutes les fonctionnalités avancées
   - **Prix**: €9.99
   - **Facturation**: Récurrente - Mensuelle
   - **Modèle de tarification**: Standard
3. Cliquez sur **Ajouter le produit**
4. **Copiez le Price ID** (commence par `price_...`)

#### 2.2 Produit Business (€29.99/mois)

1. **Ajouter un produit**
2. Remplissez:
   - **Nom**: BudgetPro Business
   - **Description**: Plan Business pour les équipes
   - **Prix**: €29.99
   - **Facturation**: Récurrente - Mensuelle
3. **Copiez le Price ID**

### Étape 3: Récupérer vos Clés API

1. Allez dans **Développeurs** → **Clés API**
2. **Mode Test** (pour le développement):
   - Copiez la **Clé secrète** (commence par `sk_test_...`)
   - Copiez la **Clé publiable** (commence par `pk_test_...`)

### Étape 4: Configurer le Backend

#### 4.1 Mettre à jour le .env

Ouvrez `backend/.env` et remplacez:

```env
# Stripe
STRIPE_SECRET_KEY="sk_test_VOTRE_CLE_SECRETE_ICI"
STRIPE_WEBHOOK_SECRET="whsec_..." # On le configurera après
STRIPE_PRICE_ID_PRO="price_VOTRE_PRICE_ID_PRO"
STRIPE_PRICE_ID_BUSINESS="price_VOTRE_PRICE_ID_BUSINESS"
```

#### 4.2 Mettre à jour Supabase

1. **Allez sur Supabase SQL Editor**
2. **Copiez le contenu du fichier** `backend/stripe-setup.sql`
3. **Exécutez le SQL** dans Supabase
4. **Vérifiez** que les tables `users` et `subscriptions` ont été mises à jour

### Étape 5: Configurer le Frontend

#### 5.1 Créer le fichier .env.local

Créez `frontend/.env.local`:

```env
VITE_STRIPE_PUBLISHABLE_KEY="pk_test_VOTRE_CLE_PUBLIABLE"
```

#### 5.2 Mettre à jour les Price IDs

Ouvrez `frontend/src/pages/LandingPage.jsx` et remplacez:

```javascript
// Ligne 72
priceId: 'price_VOTRE_PRO_PRICE_ID',

// Ligne 94
priceId: 'price_VOTRE_BUSINESS_PRICE_ID',
```

### Étape 6: Configurer les Webhooks Stripe

#### 6.1 Pour le développement local

1. **Installez Stripe CLI:**
   ```bash
   # Sur Windows (avec Scoop)
   scoop bucket add stripe https://github.com/stripe/scoop-stripe-cli.git
   scoop install stripe

   # Ou téléchargez depuis:
   # https://github.com/stripe/stripe-cli/releases
   ```

2. **Connectez-vous à Stripe:**
   ```bash
   stripe login
   ```

3. **Écoutez les webhooks:**
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```

4. **Copiez le webhook secret** (commence par `whsec_...`)
5. **Mettez-le dans** `backend/.env`:
   ```env
   STRIPE_WEBHOOK_SECRET="whsec_VOTRE_WEBHOOK_SECRET"
   ```

#### 6.2 Pour la production

1. Dans Stripe Dashboard, allez dans **Développeurs** → **Webhooks**
2. **Ajouter un endpoint**
3. **URL de l'endpoint**: `https://votre-api.com/api/stripe/webhook`
4. **Événements à écouter**:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. **Copiez le webhook secret** et mettez-le dans votre .env production

### Étape 7: Redémarrer les Serveurs

```bash
# Backend
cd backend
npm run dev

# Frontend (nouveau terminal)
cd frontend
npm run dev
```

## 🧪 Tester les Paiements

### 7.1 Cartes de Test Stripe

Utilisez ces numéros de carte pour tester:

**✅ Paiement réussi:**
- Numéro: `4242 4242 4242 4242`
- Date: N'importe quelle date future (ex: 12/30)
- CVC: N'importe quel 3 chiffres (ex: 123)
- Code postal: N'importe quel (ex: 75001)

**❌ Paiement refusé:**
- Numéro: `4000 0000 0000 0002`

**💳 Authentification 3D Secure:**
- Numéro: `4000 0025 0000 3155`

### 7.2 Processus de Test

1. **Ouvrez** http://localhost:5173/
2. **Scrollez** jusqu'à la section Pricing
3. **Cliquez** sur "Essayer 14 jours gratuits" (Plan Pro)
4. **Connectez-vous** ou **créez un compte**
5. **Vous serez redirigé** vers Stripe Checkout
6. **Entrez** les informations de carte test
7. **Cliquez** sur "S'abonner"
8. **Vous serez redirigé** vers le dashboard

### 7.3 Vérifier l'Abonnement

1. **Dans Stripe Dashboard**, allez dans **Clients**
2. **Trouvez votre client** (votre email)
3. **Vérifiez** que l'abonnement est actif
4. **Dans votre base de données** Supabase:
   ```sql
   SELECT * FROM subscriptions;
   ```
5. **Vous devriez voir** votre abonnement avec:
   - status: "active" ou "trialing"
   - plan: "pro"
   - currentPeriodEnd: Date dans 14 jours (trial)

## 📊 Portail Client Stripe

Vos utilisateurs peuvent gérer leur abonnement via le portail:

1. **Dans le Dashboard**, cliquez sur votre profil
2. **Un bouton** "Gérer l'abonnement" apparaîtra (à implémenter)
3. **Les utilisateurs peuvent**:
   - Voir leur abonnement actuel
   - Changer de plan
   - Mettre à jour leur carte
   - Annuler leur abonnement
   - Télécharger les factures

### Implémenter le bouton dans le Dashboard

Ajoutez dans `Dashboard.jsx`:

```jsx
const handleManageSubscription = async () => {
  try {
    const response = await stripeService.createPortalSession();
    window.location.href = response.data.data.url;
  } catch (error) {
    console.error('Portal error:', error);
  }
};

// Dans le header
<button onClick={handleManageSubscription}>
  <i className="fas fa-credit-card"></i>
  Gérer l'abonnement
</button>
```

## 🔐 Sécurité

### ✅ Bonnes Pratiques

1. **Ne jamais exposer** la clé secrète (`sk_...`) côté frontend
2. **Toujours valider** les webhooks avec la signature
3. **Vérifier** que le webhook vient bien de Stripe
4. **Utiliser HTTPS** en production
5. **Ne jamais stocker** les numéros de carte

### 🔒 Clés API

- **Test keys** (`sk_test_...`): Pour développement
- **Live keys** (`sk_live_...`): Pour production (obtenez-les après activation du compte)

## 📈 Monitoring & Analytics

### Dans Stripe Dashboard

1. **Vue d'ensemble**: Revenus, nouveaux clients, churn
2. **Paiements**: Liste de tous les paiements
3. **Clients**: Gérer vos clients
4. **Abonnements**: Voir tous les abonnements actifs
5. **Rapports**: Analytics détaillées

### KPIs Importants

- **MRR** (Monthly Recurring Revenue)
- **Churn Rate** (taux d'annulation)
- **ARPU** (Average Revenue Per User)
- **LTV** (Lifetime Value)
- **Taux de conversion** (visiteurs → clients)

## 🚨 Gestion des Erreurs Courantes

### Erreur: "No such price"
- **Cause**: Price ID incorrect
- **Solution**: Vérifiez que le Price ID dans .env correspond à celui dans Stripe

### Erreur: "Invalid API Key"
- **Cause**: Clé Stripe incorrecte ou expirée
- **Solution**: Vérifiez votre clé dans backend/.env

### Erreur: "Webhook signature verification failed"
- **Cause**: Webhook secret incorrect
- **Solution**: Récupérez le bon secret avec `stripe listen` ou depuis le dashboard

### Paiement échoue toujours
- **Cause**: Mode test non activé ou mauvaise carte
- **Solution**: Utilisez les cartes de test Stripe (4242 4242 4242 4242)

## 🎯 Checklist Finale

### Configuration Stripe
- [ ] Compte Stripe créé
- [ ] Produits créés (Pro & Business)
- [ ] Price IDs récupérés
- [ ] Clés API récupérées (test)

### Backend
- [ ] .env configuré avec les clés Stripe
- [ ] SQL exécuté dans Supabase
- [ ] Serveur redémarré

### Frontend
- [ ] .env.local créé avec clé publiable
- [ ] Price IDs mis à jour dans LandingPage.jsx
- [ ] Serveur frontend redémarré

### Tests
- [ ] Paiement test réussi
- [ ] Abonnement visible dans Stripe
- [ ] Abonnement visible dans Supabase
- [ ] Webhooks fonctionnels

### Production (À faire plus tard)
- [ ] Activer le compte Stripe (vérification identité)
- [ ] Obtenir les clés live
- [ ] Configurer les webhooks production
- [ ] Tester en mode live
- [ ] Configurer les emails de confirmation

## 💰 Tarification Optimale

### Recommandations

**Plan Gratuit:**
- Objectif: Acquisition maximum
- Limite: 1 budget/mois (encourager upgrade)
- Pas de CB requise

**Plan Pro (€9.99):**
- **Sweet spot** pour la plupart des utilisateurs
- Trial 14 jours (conversion ~25%)
- Annuel: €99/an (économie 17% = 2 mois gratuits)

**Plan Business (€29.99):**
- Target: 10-20% des clients payants
- ROI élevé (3x le plan Pro)
- Vente consultative (call de démo)

### Stratégies d'Optimisation

1. **Afficher l'économie annuelle**: "Économisez €20/an"
2. **Trial automatique**: 14 jours sans CB
3. **Upgrade prompts**: Dans l'app quand limite atteinte
4. **Offres limitées**: "Offre lancement: -20%"
5. **Programme de parrainage**: "€20 offerts"

## 📞 Support

Si vous rencontrez des problèmes:

1. **Documentation Stripe**: https://stripe.com/docs
2. **Support Stripe**: https://support.stripe.com
3. **Forum Stripe**: https://support.stripe.com/questions
4. **Status Stripe**: https://status.stripe.com

## 🎉 Prochaines Étapes

Maintenant que Stripe est configuré:

1. **Tester** les paiements en mode test
2. **Activer** votre compte Stripe (vérification)
3. **Passer en mode live** quand prêt
4. **Ajouter** des fonctionnalités:
   - Portail client
   - Invoices automatiques
   - Emails de confirmation
   - Rappels de renouvellement
   - Analytics avancées

---

**Configuration Stripe créée par Claude Sonnet 4.5**
**Date: 2026-01-13**

Bon lancement ! 🚀
