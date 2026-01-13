import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { stripeService } from '../services/stripeService';
import { authService } from '../services/authService';

const PricingCard = ({ plan }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubscribe = async () => {
    // Check if user is logged in
    const token = authService.getToken();

    if (!token) {
      // Redirect to register page
      navigate('/register');
      return;
    }

    // Free plan - just redirect to dashboard
    if (plan.price === '0') {
      navigate('/dashboard');
      return;
    }

    // Paid plans - create Stripe checkout
    setLoading(true);
    try {
      const response = await stripeService.createCheckoutSession(
        plan.priceId,
        plan.planName
      );

      if (response.data.success) {
        // Redirect to Stripe Checkout
        window.location.href = response.data.data.url;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`pricing-card ${plan.highlighted ? 'highlighted' : ''}`}>
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
      <button
        onClick={handleSubscribe}
        className={`btn-pricing ${plan.highlighted ? 'btn-primary' : 'btn-secondary'}`}
        disabled={loading}
      >
        {loading ? (
          <>
            <i className="fas fa-spinner fa-spin"></i>
            Chargement...
          </>
        ) : (
          plan.cta
        )}
      </button>
    </div>
  );
};

export default PricingCard;
