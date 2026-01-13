import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get budget for specific month/year
export const getBudget = async (req, res) => {
  try {
    const { month, year } = req.params;
    const userId = req.userId;

    let budget = await prisma.budget.findUnique({
      where: {
        userId_month_year: {
          userId,
          month,
          year: parseInt(year)
        }
      }
    });

    // Create default budget if doesn't exist
    if (!budget) {
      budget = await prisma.budget.create({
        data: {
          userId,
          month,
          year: parseInt(year),
          data: {
            revenus: [{ type: 'Salaire', prevu: 0, reel: 0 }],
            depensesFixes: [{ facture: 'Loyer', prevu: 0, reel: 0 }],
            depensesVariables: [{ achat: 'Courses', prevu: 0, reel: 0 }],
            epargne: [{ type: 'Épargne mensuelle', prevu: 0, reel: 0 }]
          }
        }
      });
    }

    res.json({
      success: true,
      data: { budget }
    });
  } catch (error) {
    console.error('Get budget error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get budget',
      error: error.message
    });
  }
};

// Save/Update budget
export const saveBudget = async (req, res) => {
  try {
    const { month, year } = req.params;
    const { data } = req.body;
    const userId = req.userId;

    const budget = await prisma.budget.upsert({
      where: {
        userId_month_year: {
          userId,
          month,
          year: parseInt(year)
        }
      },
      update: {
        data
      },
      create: {
        userId,
        month,
        year: parseInt(year),
        data
      }
    });

    res.json({
      success: true,
      message: 'Budget saved successfully',
      data: { budget }
    });
  } catch (error) {
    console.error('Save budget error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save budget',
      error: error.message
    });
  }
};

// Get all budgets for user
export const getAllBudgets = async (req, res) => {
  try {
    const userId = req.userId;

    const budgets = await prisma.budget.findMany({
      where: { userId },
      orderBy: [
        { year: 'desc' },
        { month: 'asc' }
      ]
    });

    res.json({
      success: true,
      data: { budgets }
    });
  } catch (error) {
    console.error('Get all budgets error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get budgets',
      error: error.message
    });
  }
};

// Delete budget
export const deleteBudget = async (req, res) => {
  try {
    const { month, year } = req.params;
    const userId = req.userId;

    await prisma.budget.delete({
      where: {
        userId_month_year: {
          userId,
          month,
          year: parseInt(year)
        }
      }
    });

    res.json({
      success: true,
      message: 'Budget deleted successfully'
    });
  } catch (error) {
    console.error('Delete budget error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete budget',
      error: error.message
    });
  }
};
