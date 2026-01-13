-- BudgetPro Stripe Integration - Database Update
-- Run this in Supabase SQL Editor

-- Add Stripe customer ID to users table
ALTER TABLE users
ADD COLUMN IF NOT EXISTS "stripeCustomerId" TEXT UNIQUE;

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL UNIQUE,
    "stripeSubscriptionId" TEXT UNIQUE NOT NULL,
    "stripePriceId" TEXT NOT NULL,
    "stripeProductId" TEXT NOT NULL,
    status TEXT NOT NULL,
    plan TEXT NOT NULL,
    "currentPeriodStart" TIMESTAMP(3) NOT NULL,
    "currentPeriodEnd" TIMESTAMP(3) NOT NULL,
    "cancelAtPeriodEnd" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT subscriptions_userId_fkey FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE
);

-- Create indexes
CREATE INDEX IF NOT EXISTS subscriptions_userId_idx ON subscriptions("userId");
CREATE INDEX IF NOT EXISTS subscriptions_status_idx ON subscriptions(status);
CREATE INDEX IF NOT EXISTS subscriptions_plan_idx ON subscriptions(plan);

-- Success message
SELECT 'Stripe tables created successfully!' AS message;
