import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { budgetService } from '../services/budgetService';
import './Dashboard.css';

const MONTHS = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
];

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear] = useState(new Date().getFullYear());
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadBudget();
  }, [currentMonth]);

  const loadBudget = async () => {
    try {
      setLoading(true);
      const response = await budgetService.getBudget(MONTHS[currentMonth], currentYear);
      setData(response.data.budget.data);
    } catch (error) {
      console.error('Erreur chargement budget:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveBudget = async () => {
    try {
      setSaving(true);
      await budgetService.saveBudget(MONTHS[currentMonth], currentYear, data);
    } catch (error) {
      console.error('Erreur sauvegarde:', error);
      alert('Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  };

  // Auto-save après chaque modification
  useEffect(() => {
    if (data && !loading) {
      const timer = setTimeout(() => {
        saveBudget();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [data]);

  const updateData = (section, index, field, value) => {
    const newData = { ...data };
    newData[section] = [...newData[section]];
    newData[section][index] = {
      ...newData[section][index],
      [field]: value
    };
    setData(newData);
  };

  const addRow = (section, defaultItem) => {
    const newData = { ...data };
    newData[section] = [...newData[section], defaultItem];
    setData(newData);
  };

  const deleteRow = (section, index) => {
    const newData = { ...data };
    newData[section] = newData[section].filter((_, i) => i !== index);
    setData(newData);
  };

  const calculateTotals = () => {
    if (!data) return { totalRevenus: 0, totalDepenses: 0, totalEpargne: 0, reste: 0 };
    
    const totalRevenus = data.revenus.reduce((sum, r) => sum + parseFloat(r.reel || 0), 0);
    const totalDepensesFixes = data.depensesFixes.reduce((sum, d) => sum + parseFloat(d.reel || 0), 0);
    const totalDepensesVariables = data.depensesVariables.reduce((sum, d) => sum + parseFloat(d.reel || 0), 0);
    const totalEpargne = data.epargne.reduce((sum, e) => sum + parseFloat(e.reel || 0), 0);
    const totalDepenses = totalDepensesFixes + totalDepensesVariables;
    const reste = totalRevenus - totalDepenses - totalEpargne;

    return { totalRevenus, totalDepenses, totalEpargne, reste };
  };

  const calculateRecap = () => {
    if (!data) return {};

    const recap = {
      revenus: { prevu: 0, reel: 0 },
      depensesFixes: { prevu: 0, reel: 0 },
      depensesVariables: { prevu: 0, reel: 0 },
      epargne: { prevu: 0, reel: 0 }
    };

    data.revenus.forEach(r => {
      recap.revenus.prevu += parseFloat(r.prevu || 0);
      recap.revenus.reel += parseFloat(r.reel || 0);
    });

    data.depensesFixes.forEach(d => {
      recap.depensesFixes.prevu += parseFloat(d.prevu || 0);
      recap.depensesFixes.reel += parseFloat(d.reel || 0);
    });

    data.depensesVariables.forEach(d => {
      recap.depensesVariables.prevu += parseFloat(d.prevu || 0);
      recap.depensesVariables.reel += parseFloat(d.reel || 0);
    });

    data.epargne.forEach(e => {
      recap.epargne.prevu += parseFloat(e.prevu || 0);
      recap.epargne.reel += parseFloat(e.reel || 0);
    });

    return recap;
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleExport = async () => {
    try {
      const response = await budgetService.exportBudgets();
      const dataStr = JSON.stringify(response.data.budgets, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'budgets-export.json';
      link.click();
    } catch (error) {
      console.error('Erreur export:', error);
    }
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loader-spinner"></div>
        <p>Chargement de votre budget...</p>
      </div>
    );
  }

  const totals = calculateTotals();
  const recap = calculateRecap();
  const budgetPercent = totals.totalRevenus > 0 
    ? Math.min((totals.totalDepenses / totals.totalRevenus) * 100, 100) 
    : 0;

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <h1>
              <i className="fas fa-chart-line"></i>
              Budget Manager Pro
            </h1>
            <p>{MONTHS[currentMonth]} {currentYear}</p>
          </div>
          <div className="header-right">
            <div className="user-info">
              <div className="user-avatar">
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </div>
              <div className="user-details">
                <span className="user-name">{user?.firstName} {user?.lastName}</span>
                <span className="user-email">{user?.email}</span>
              </div>
            </div>
            <button className="btn-icon" onClick={handleExport} title="Exporter">
              <i className="fas fa-download"></i>
            </button>
            <button className="btn-icon" onClick={handleLogout} title="Déconnexion">
              <i className="fas fa-sign-out-alt"></i>
            </button>
          </div>
        </div>
        {saving && (
          <div className="save-indicator">
            <i className="fas fa-sync fa-spin"></i>
            Sauvegarde...
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card revenus">
          <div className="stat-header">
            <div className="stat-label">Revenus Total</div>
            <div className="stat-icon">
              <i className="fas fa-wallet"></i>
            </div>
          </div>
          <div className="stat-value">{totals.totalRevenus.toFixed(2)} €</div>
          <div className="stat-trend trend-up">
            <i className="fas fa-arrow-up"></i>
            <span>Réel</span>
          </div>
        </div>

        <div className="stat-card depenses">
          <div className="stat-header">
            <div className="stat-label">Dépenses Total</div>
            <div className="stat-icon">
              <i className="fas fa-credit-card"></i>
            </div>
          </div>
          <div className="stat-value">{totals.totalDepenses.toFixed(2)} €</div>
          <div className="stat-trend trend-down">
            <i className="fas fa-arrow-down"></i>
            <span>Réel</span>
          </div>
        </div>

        <div className="stat-card epargne">
          <div className="stat-header">
            <div className="stat-label">Épargne Total</div>
            <div className="stat-icon">
              <i className="fas fa-piggy-bank"></i>
            </div>
          </div>
          <div className="stat-value">{totals.totalEpargne.toFixed(2)} €</div>
          <div className="stat-trend trend-up">
            <i className="fas fa-arrow-up"></i>
            <span>Économies</span>
          </div>
        </div>

        <div className={`stat-card reste ${totals.reste >= 0 ? 'positive' : 'negative'}`}>
          <div className="stat-header">
            <div className="stat-label">Reste à Dépenser</div>
            <div className="stat-icon">
              <i className="fas fa-coins"></i>
            </div>
          </div>
          <div className="stat-value">{totals.reste.toFixed(2)} €</div>
          <div className={`stat-trend ${totals.reste >= 0 ? 'trend-up' : 'trend-down'}`}>
            <i className={`fas fa-${totals.reste >= 0 ? 'arrow-up' : 'arrow-down'}`}></i>
            <span>{totals.reste >= 0 ? 'Excédent' : 'Déficit'}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs-container">
        {MONTHS.map((month, index) => (
          <button
            key={month}
            className={`tab ${currentMonth === index ? 'active' : ''}`}
            onClick={() => setCurrentMonth(index)}
          >
            {month}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="content">
        {/* Progress Bar */}
        <div className="budget-progress">
          <div className="progress-label">
            <span>Budget utilisé</span>
            <span>{budgetPercent.toFixed(0)}%</span>
          </div>
          <div className="progress-bar-bg">
            <div 
              className="progress-bar-fill" 
              style={{ 
                width: `${budgetPercent}%`,
                background: budgetPercent > 90 ? 'linear-gradient(90deg, #ef4444, #dc2626)' :
                           budgetPercent > 70 ? 'linear-gradient(90deg, #f59e0b, #d97706)' :
                           'linear-gradient(90deg, #10b981, #34d399)'
              }}
            ></div>
          </div>
        </div>

        {/* Récapitulatif */}
        <div className="section">
          <div className="section-header">
            <h2 className="section-title">
              <div className="section-icon">
                <i className="fas fa-chart-pie"></i>
              </div>
              Récapitulatif
            </h2>
          </div>
          <div className="recap-cards">
            {Object.entries(recap).map(([key, value]) => (
              <div className="recap-card" key={key}>
                <div className="recap-label">
                  {key === 'revenus' ? '💵 Revenus' :
                   key === 'depensesFixes' ? '🏠 Dépenses Fixes' :
                   key === 'depensesVariables' ? '🛒 Dépenses Variables' :
                   '🏦 Épargne'}
                </div>
                <div className="recap-values">
                  <div className="recap-amount prevu">
                    <div className="recap-amount-label">Prévu</div>
                    <div className="recap-amount-value">{value.prevu.toFixed(2)} €</div>
                  </div>
                  <div className="recap-amount reel">
                    <div className="recap-amount-label">Réel</div>
                    <div className="recap-amount-value">{value.reel.toFixed(2)} €</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Revenus */}
        <div className="section">
          <div className="section-header">
            <h2 className="section-title">
              <div className="section-icon">
                <i className="fas fa-wallet"></i>
              </div>
              Revenus
            </h2>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Prévu</th>
                  <th>Réel</th>
                  <th style={{ width: '50px' }}></th>
                </tr>
              </thead>
              <tbody>
                {data?.revenus?.map((revenu, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="text"
                        value={revenu.type}
                        onChange={(e) => updateData('revenus', index, 'type', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={revenu.prevu}
                        onChange={(e) => updateData('revenus', index, 'prevu', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={revenu.reel}
                        onChange={(e) => updateData('revenus', index, 'reel', e.target.value)}
                      />
                    </td>
                    <td>
                      {data.revenus.length > 1 && (
                        <button
                          className="btn btn-delete"
                          onClick={() => deleteRow('revenus', index)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                <tr className="total-row">
                  <td><strong>TOTAL</strong></td>
                  <td></td>
                  <td><strong>{data?.revenus?.reduce((sum, r) => sum + parseFloat(r.reel || 0), 0).toFixed(2)} €</strong></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
          <button
            className="btn btn-add"
            onClick={() => addRow('revenus', { type: '', prevu: 0, reel: 0 })}
          >
            <i className="fas fa-plus"></i>
            Ajouter un revenu
          </button>
        </div>

        {/* Dépenses Fixes */}
        <div className="section">
          <div className="section-header">
            <h2 className="section-title">
              <div className="section-icon">
                <i className="fas fa-home"></i>
              </div>
              Dépenses Fixes
            </h2>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Facture</th>
                  <th>Prévu</th>
                  <th>Réel</th>
                  <th style={{ width: '50px' }}></th>
                </tr>
              </thead>
              <tbody>
                {data?.depensesFixes?.map((depense, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="text"
                        value={depense.facture}
                        onChange={(e) => updateData('depensesFixes', index, 'facture', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={depense.prevu}
                        onChange={(e) => updateData('depensesFixes', index, 'prevu', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={depense.reel}
                        onChange={(e) => updateData('depensesFixes', index, 'reel', e.target.value)}
                      />
                    </td>
                    <td>
                      {data.depensesFixes.length > 1 && (
                        <button
                          className="btn btn-delete"
                          onClick={() => deleteRow('depensesFixes', index)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                <tr className="total-row">
                  <td><strong>TOTAL</strong></td>
                  <td></td>
                  <td><strong>{data?.depensesFixes?.reduce((sum, d) => sum + parseFloat(d.reel || 0), 0).toFixed(2)} €</strong></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
          <button
            className="btn btn-add"
            onClick={() => addRow('depensesFixes', { facture: '', prevu: 0, reel: 0 })}
          >
            <i className="fas fa-plus"></i>
            Ajouter une dépense fixe
          </button>
        </div>

        {/* Dépenses Variables */}
        <div className="section">
          <div className="section-header">
            <h2 className="section-title">
              <div className="section-icon">
                <i className="fas fa-shopping-cart"></i>
              </div>
              Dépenses Variables
            </h2>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Achats</th>
                  <th>Prévu</th>
                  <th>Réel</th>
                  <th style={{ width: '50px' }}></th>
                </tr>
              </thead>
              <tbody>
                {data?.depensesVariables?.map((depense, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="text"
                        value={depense.achat}
                        onChange={(e) => updateData('depensesVariables', index, 'achat', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={depense.prevu}
                        onChange={(e) => updateData('depensesVariables', index, 'prevu', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={depense.reel}
                        onChange={(e) => updateData('depensesVariables', index, 'reel', e.target.value)}
                      />
                    </td>
                    <td>
                      {data.depensesVariables.length > 1 && (
                        <button
                          className="btn btn-delete"
                          onClick={() => deleteRow('depensesVariables', index)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                <tr className="total-row">
                  <td><strong>TOTAL</strong></td>
                  <td></td>
                  <td><strong>{data?.depensesVariables?.reduce((sum, d) => sum + parseFloat(d.reel || 0), 0).toFixed(2)} €</strong></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
          <button
            className="btn btn-add"
            onClick={() => addRow('depensesVariables', { achat: '', prevu: 0, reel: 0 })}
          >
            <i className="fas fa-plus"></i>
            Ajouter une dépense variable
          </button>
        </div>

        {/* Épargne */}
        <div className="section">
          <div className="section-header">
            <h2 className="section-title">
              <div className="section-icon">
                <i className="fas fa-piggy-bank"></i>
              </div>
              Épargne
            </h2>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Prévu</th>
                  <th>Réel</th>
                  <th style={{ width: '50px' }}></th>
                </tr>
              </thead>
              <tbody>
                {data?.epargne?.map((epargne, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="text"
                        value={epargne.type}
                        onChange={(e) => updateData('epargne', index, 'type', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={epargne.prevu}
                        onChange={(e) => updateData('epargne', index, 'prevu', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={epargne.reel}
                        onChange={(e) => updateData('epargne', index, 'reel', e.target.value)}
                      />
                    </td>
                    <td>
                      {data.epargne.length > 1 && (
                        <button
                          className="btn btn-delete"
                          onClick={() => deleteRow('epargne', index)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                <tr className="total-row">
                  <td><strong>TOTAL</strong></td>
                  <td></td>
                  <td><strong>{data?.epargne?.reduce((sum, e) => sum + parseFloat(e.reel || 0), 0).toFixed(2)} €</strong></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
          <button
            className="btn btn-add"
            onClick={() => addRow('epargne', { type: '', prevu: 0, reel: 0 })}
          >
            <i className="fas fa-plus"></i>
            Ajouter une épargne
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
