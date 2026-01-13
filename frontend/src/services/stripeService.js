import api from './api';

export const stripeService = {
  async createCheckoutSession(priceId, plan) {
    const response = await api.post('/stripe/create-checkout-session', {
      priceId,
      plan
    });
    return response;
  },

  async createPortalSession() {
    const response = await api.post('/stripe/create-portal-session');
    return response;
  },

  async getSubscription() {
    const response = await api.get('/stripe/subscription');
    return response;
  }
};
