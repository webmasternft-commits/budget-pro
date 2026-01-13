import { useState } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const [faqOpen, setFaqOpen] = useState(null);

  const toggleFaq = (index) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  const features = [
    {
      icon: 'fa-shield-alt',
      title: 'Sécurité Bancaire',
      description: 'Vos données sont chiffrées avec le même niveau de sécurité que les banques. SSL, encryption AES-256.'
    },
    {
      icon: 'fa-sync',
      title: 'Synchronisation Cloud',
      description: 'Accédez à vos budgets depuis n\'importe quel appareil. Synchronisation en temps réel automatique.'
    },
    {
      icon: 'fa-chart-line',
      title: 'Analyses Intelligentes',
      description: 'Visualisez vos dépenses avec des graphiques clairs. Prédictions et recommandations personnalisées.'
    },
    {
      icon: 'fa-mobile-alt',
      title: 'Application Mobile',
      description: 'Disponible sur iOS et Android. Gérez vos finances en déplacement avec notre app native.'
    },
    {
      icon: 'fa-file-export',
      title: 'Export Flexible',
      description: 'Exportez vos données en PDF, Excel ou CSV. Compatible avec tous les logiciels comptables.'
    },
    {
      icon: 'fa-users',
      title: 'Multi-Comptes',
      description: 'Gérez plusieurs budgets (personnel, professionnel, familial). Partagez avec vos proches.'
    }
  ];

  const pricing = [
    {
      name: 'Gratuit',
      price: '0',
      period: 'Forever',
      description: 'Parfait pour débuter',
      features: [
        '1 budget mensuel',
        '4 catégories de base',
        'Sauvegarde cloud',
        'Export PDF',
        'Support par email',
        'Accès web'
      ],
      cta: 'Commencer Gratuitement',
      highlighted: false,
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      name: 'Pro',
      price: '9.99',
      period: '/mois',
      description: 'Pour une gestion avancée',
      features: [
        'Budgets illimités',
        'Toutes les catégories',
        'Analyses avancées',
        'Export Excel & CSV',
        'Support prioritaire 24/7',
        'Accès mobile & tablette',
        'Objectifs d\'épargne',
        'Rapports personnalisés'
      ],
      badge: 'POPULAIRE',
      cta: 'Essayer 14 jours gratuits',
      highlighted: true,
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      name: 'Business',
      price: '29.99',
      period: '/mois',
      description: 'Pour les professionnels',
      features: [
        'Tout du plan Pro',
        'Jusqu\'à 10 utilisateurs',
        'Collaboration en équipe',
        'API complète',
        'Manager dédié',
        'Formation personnalisée',
        'Intégration comptable',
        'White label disponible'
      ],
      cta: 'Demander une démo',
      highlighted: false,
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    }
  ];

  const testimonials = [
    {
      name: 'Sophie Martin',
      role: 'Entrepreneure',
      avatar: 'SM',
      rating: 5,
      text: 'BudgetPro a révolutionné ma gestion financière. J\'ai économisé 30% sur mes dépenses en seulement 3 mois !'
    },
    {
      name: 'Thomas Dubois',
      role: 'Développeur',
      avatar: 'TD',
      rating: 5,
      text: 'Interface intuitive et rapide. La synchronisation cloud est parfaite. Je recommande à 100% !'
    },
    {
      name: 'Marie Lefebvre',
      role: 'Étudiante',
      avatar: 'ML',
      rating: 5,
      text: 'Parfait pour mon budget étudiant. La version gratuite est déjà très complète. Merci BudgetPro !'
    }
  ];

  const faqs = [
    {
      question: 'Puis-je essayer BudgetPro gratuitement ?',
      answer: 'Oui ! Notre plan gratuit est disponible à vie sans carte bancaire. Pour les plans payants, profitez de 14 jours d\'essai gratuit.'
    },
    {
      question: 'Mes données sont-elles sécurisées ?',
      answer: 'Absolument. Nous utilisons un chiffrement AES-256, le même standard que les banques. Vos données sont hébergées sur des serveurs sécurisés en Europe (RGPD compliant).'
    },
    {
      question: 'Puis-je changer de plan à tout moment ?',
      answer: 'Oui, vous pouvez upgrader ou downgrader votre plan à tout moment. Les changements sont effectifs immédiatement et la facturation est ajustée au prorata.'
    },
    {
      question: 'BudgetPro fonctionne-t-il sur mobile ?',
      answer: 'Oui ! BudgetPro est disponible sur web, iOS et Android. Vos données sont synchronisées en temps réel sur tous vos appareils.'
    },
    {
      question: 'Proposez-vous des réductions pour les associations ?',
      answer: 'Oui, nous offrons des réductions jusqu\'à 50% pour les associations, ONG et étudiants. Contactez-nous pour plus d\'informations.'
    },
    {
      question: 'Puis-je annuler mon abonnement ?',
      answer: 'Oui, vous pouvez annuler à tout moment sans frais. Aucun engagement, aucune période minimum. Vos données restent accessibles.'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Utilisateurs Actifs' },
    { number: '€2.5M', label: 'Économies Générées' },
    { number: '4.9/5', label: 'Note Moyenne' },
    { number: '99.9%', label: 'Disponibilité' }
  ];

  return (
    <div className="landing-page">
      {/* Header / Navigation */}
      <header className="landing-header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <i className="fas fa-chart-line"></i>
              <span>BudgetPro</span>
            </div>
            <nav className="nav-menu">
              <a href="#features">Fonctionnalités</a>
              <a href="#pricing">Tarifs</a>
              <a href="#testimonials">Témoignages</a>
              <a href="#faq">FAQ</a>
            </nav>
            <div className="header-actions">
              <Link to="/login" className="btn-secondary">Connexion</Link>
              <Link to="/register" className="btn-primary">Essayer Gratuitement</Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <div className="badge">🚀 +10,000 nouveaux utilisateurs ce mois</div>
              <h1>
                Prenez le contrôle de <span className="gradient-text">vos finances</span> dès aujourd'hui
              </h1>
              <p className="hero-description">
                BudgetPro est l'application #1 de gestion budgétaire en France.
                Suivez vos dépenses, économisez plus et atteignez vos objectifs financiers 3x plus vite.
              </p>
              <div className="hero-cta">
                <Link to="/register" className="btn-primary btn-large">
                  <i className="fas fa-rocket"></i>
                  Commencer Gratuitement
                </Link>
                <button className="btn-secondary btn-large">
                  <i className="fas fa-play"></i>
                  Voir la Démo
                </button>
              </div>
              <div className="hero-trust">
                <div className="trust-item">
                  <i className="fas fa-check-circle"></i>
                  <span>Gratuit à vie</span>
                </div>
                <div className="trust-item">
                  <i className="fas fa-check-circle"></i>
                  <span>Sans carte bancaire</span>
                </div>
                <div className="trust-item">
                  <i className="fas fa-check-circle"></i>
                  <span>Setup en 2 minutes</span>
                </div>
              </div>
            </div>
            <div className="hero-image">
              <div className="dashboard-preview">
                <div className="preview-card">
                  <div className="card-header">
                    <span>Dashboard</span>
                    <span className="live-dot">🟢 Live</span>
                  </div>
                  <div className="preview-stats">
                    <div className="stat-item">
                      <span className="stat-label">Revenus</span>
                      <span className="stat-value green">+3,250€</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Dépenses</span>
                      <span className="stat-value red">-2,180€</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Épargne</span>
                      <span className="stat-value blue">+1,070€</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div className="stat-card" key={index}>
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Fonctionnalités</span>
            <h2>Tout ce dont vous avez besoin pour gérer votre budget</h2>
            <p>Des outils puissants pour une gestion financière simplifiée</p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div className="feature-card" key={index}>
                <div className="feature-icon">
                  <i className={`fas ${feature.icon}`}></i>
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="pricing-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Tarifs</span>
            <h2>Un plan pour chaque besoin</h2>
            <p>Commencez gratuitement, upgradez quand vous voulez</p>
          </div>
          <div className="pricing-grid">
            {pricing.map((plan, index) => (
              <div className={`pricing-card ${plan.highlighted ? 'highlighted' : ''}`} key={index}>
                {plan.badge && <div className="pricing-badge">{plan.badge}</div>}
                <div className="pricing-header">
                  <h3>{plan.name}</h3>
                  <p className="pricing-description">{plan.description}</p>
                  <div className="pricing-price">
                    <span className="currency">€</span>
                    <span className="amount">{plan.price}</span>
                    <span className="period">{plan.period}</span>
                  </div>
                </div>
                <ul className="pricing-features">
                  {plan.features.map((feature, idx) => (
                    <li key={idx}>
                      <i className="fas fa-check"></i>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/register"
                  className={`btn-pricing ${plan.highlighted ? 'btn-primary' : 'btn-secondary'}`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
          <div className="pricing-footer">
            <p>💳 Tous les plans incluent une garantie satisfait ou remboursé de 30 jours</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Témoignages</span>
            <h2>Ils nous font confiance</h2>
            <p>Découvrez ce que disent nos utilisateurs</p>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div className="testimonial-card" key={index}>
                <div className="testimonial-rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <i className="fas fa-star" key={i}></i>
                  ))}
                </div>
                <p className="testimonial-text">"{testimonial.text}"</p>
                <div className="testimonial-author">
                  <div className="author-avatar">{testimonial.avatar}</div>
                  <div className="author-info">
                    <div className="author-name">{testimonial.name}</div>
                    <div className="author-role">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="faq-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">FAQ</span>
            <h2>Questions Fréquentes</h2>
            <p>Tout ce que vous devez savoir sur BudgetPro</p>
          </div>
          <div className="faq-grid">
            {faqs.map((faq, index) => (
              <div className={`faq-item ${faqOpen === index ? 'open' : ''}`} key={index}>
                <div className="faq-question" onClick={() => toggleFaq(index)}>
                  <h3>{faq.question}</h3>
                  <i className={`fas fa-chevron-${faqOpen === index ? 'up' : 'down'}`}></i>
                </div>
                {faqOpen === index && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Prêt à transformer votre gestion financière ?</h2>
            <p>Rejoignez 50,000+ utilisateurs qui économisent déjà avec BudgetPro</p>
            <Link to="/register" className="btn-primary btn-large">
              <i className="fas fa-rocket"></i>
              Commencer Gratuitement
            </Link>
            <p className="cta-note">✓ Gratuit à vie • ✓ Sans carte bancaire • ✓ Setup en 2 min</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <div className="footer-logo">
                <i className="fas fa-chart-line"></i>
                <span>BudgetPro</span>
              </div>
              <p>L'application #1 de gestion budgétaire en France</p>
              <div className="social-links">
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-facebook"></i></a>
                <a href="#"><i className="fab fa-linkedin"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
              </div>
            </div>
            <div className="footer-col">
              <h4>Produit</h4>
              <ul>
                <li><a href="#features">Fonctionnalités</a></li>
                <li><a href="#pricing">Tarifs</a></li>
                <li><a href="#">Sécurité</a></li>
                <li><a href="#">Roadmap</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Ressources</h4>
              <ul>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Guides</a></li>
                <li><a href="#">API</a></li>
                <li><a href="#">Support</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Entreprise</h4>
              <ul>
                <li><a href="#">À propos</a></li>
                <li><a href="#">Carrières</a></li>
                <li><a href="#">Contact</a></li>
                <li><a href="#">Partenaires</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Légal</h4>
              <ul>
                <li><a href="#">CGU</a></li>
                <li><a href="#">Confidentialité</a></li>
                <li><a href="#">Cookies</a></li>
                <li><a href="#">Mentions légales</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 BudgetPro. Tous droits réservés.</p>
            <p>Made with ❤️ in France</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
