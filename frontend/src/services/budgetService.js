import api from './api';

export const budgetService = {
  async getBudget(month, year) {
    const response = await api.get(`/budgets/${month}/${year}`);
    return response;
  },

  async saveBudget(month, year, data) {
    const response = await api.post(`/budgets/${month}/${year}`, { data });
    return response;
  },

  async getAllBudgets() {
    const response = await api.get('/budgets');
    return response;
  },

  async exportBudgets() {
    const response = await api.get('/budgets');
    return response;
  },

  async deleteBudget(month, year) {
    const response = await api.delete(`/budgets/${month}/${year}`);
    return response;
  }
};
