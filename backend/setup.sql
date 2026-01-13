-- BudgetPro Database Setup
-- Run this in Supabase SQL Editor

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create budgets table
CREATE TABLE IF NOT EXISTS budgets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    month TEXT NOT NULL,
    year INTEGER NOT NULL,
    data JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT budgets_userId_fkey FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT budgets_userId_month_year_key UNIQUE ("userId", month, year)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS budgets_userId_idx ON budgets("userId");
CREATE INDEX IF NOT EXISTS budgets_month_year_idx ON budgets(month, year);

-- Success message
SELECT 'Database setup completed successfully!' AS message;
