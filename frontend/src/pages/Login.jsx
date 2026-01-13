import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login({ email, password });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur de connexion');
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
              <i className="fas fa-chart-line"></i>
            </div>
            <h1>BudgetPro</h1>
            <p>Bienvenue ! Connectez-vous à votre compte</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {error && (
              <div className="alert alert-error">
                <i className="fas fa-exclamation-circle"></i>
                {error}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">
                <i className="fas fa-envelope"></i>
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                  Connexion...
                </>
              ) : (
                <>
                  <i className="fas fa-sign-in-alt"></i>
                  Se connecter
                </>
              )}
            </button>

            <div className="auth-footer">
              <p>
                Pas encore de compte ?{' '}
                <Link to="/register">Créer un compte</Link>
              </p>
            </div>
          </form>
        </div>

        <div className="auth-features">
          <div className="feature">
            <i className="fas fa-shield-alt"></i>
            <h3>Sécurisé</h3>
            <p>Vos données sont chiffrées et protégées</p>
          </div>
          <div className="feature">
            <i className="fas fa-sync"></i>
            <h3>Synchronisé</h3>
            <p>Accédez à vos budgets partout</p>
          </div>
          <div className="feature">
            <i className="fas fa-chart-bar"></i>
            <h3>Intelligent</h3>
            <p>Analyses et insights automatiques</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
