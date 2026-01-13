import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    if (formData.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    setLoading(true);

    try {
      await register({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName
      });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de l\'inscription');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-background">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-icon">
              <i className="fas fa-user-plus"></i>
            </div>
            <h1>Créer un compte</h1>
            <p>Rejoignez BudgetPro et prenez le contrôle de vos finances</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {error && (
              <div className="alert alert-error">
                <i className="fas fa-exclamation-circle"></i>
                {error}
              </div>
            )}

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">
                  <i className="fas fa-user"></i>
                  Prénom
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Jean"
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">
                  <i className="fas fa-user"></i>
                  Nom
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Dupont"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">
                <i className="fas fa-envelope"></i>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="jean.dupont@example.com"
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">
                <i className="fas fa-lock"></i>
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                disabled={loading}
                minLength={6}
              />
              <small>Au moins 6 caractères</small>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">
                <i className="fas fa-lock"></i>
                Confirmer le mot de passe
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                required
                disabled={loading}
              />
            </div>

            <button 
              type="submit" 
              className="btn-primary"
              disabled={loading}
            >
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  Création du compte...
                </>
              ) : (
                <>
                  <i className="fas fa-rocket"></i>
                  Créer mon compte
                </>
              )}
            </button>

            <div className="auth-footer">
              <p>
                Déjà un compte ?{' '}
                <Link to="/login">Se connecter</Link>
              </p>
            </div>
          </form>
        </div>

        <div className="auth-features">
          <div className="feature">
            <i className="fas fa-gift"></i>
            <h3>Gratuit</h3>
            <p>Commencez gratuitement, sans carte bancaire</p>
          </div>
          <div className="feature">
            <i className="fas fa-clock"></i>
            <h3>Rapide</h3>
            <p>Créez votre compte en 30 secondes</p>
          </div>
          <div className="feature">
            <i className="fas fa-mobile-alt"></i>
            <h3>Multi-plateforme</h3>
            <p>Web, mobile, tablette - partout</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
