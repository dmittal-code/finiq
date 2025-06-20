-- Flashcards Database Setup Script
-- This script creates the flashcards table and populates it with the existing data

-- Create the flashcards table
CREATE TABLE IF NOT EXISTS flashcards (
  id SERIAL PRIMARY KEY,
  term VARCHAR(255) NOT NULL,
  definition TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_flashcards_category ON flashcards(category);
CREATE INDEX IF NOT EXISTS idx_flashcards_term ON flashcards(term);

-- Create function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_flashcards_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_flashcards_updated_at ON flashcards;
CREATE TRIGGER update_flashcards_updated_at
    BEFORE UPDATE ON flashcards
    FOR EACH ROW
    EXECUTE FUNCTION update_flashcards_updated_at();

-- Insert the existing flashcard data
INSERT INTO flashcards (term, definition, category) VALUES
('Compound Interest', 'Interest earned on both the principal amount and any previously earned interest. It''s often called ''interest on interest'' and helps money grow faster over time.', 'Investing'),
('Emergency Fund', 'A savings account with 3-6 months of living expenses set aside for unexpected financial emergencies like job loss or medical bills.', 'Savings'),
('Diversification', 'Spreading investments across different assets, sectors, or geographic regions to reduce risk. The saying goes: ''Don''t put all your eggs in one basket.''', 'Investing'),
('Credit Score', 'A three-digit number (300-850) that represents your creditworthiness. Higher scores help you get better loan terms and lower interest rates.', 'Credit'),
('Budget', 'A financial plan that tracks income and expenses to help you spend within your means and save for goals.', 'Planning'),
('Inflation', 'The rate at which prices for goods and services increase over time, reducing the purchasing power of money.', 'Economics'),
('Mutual Fund', 'An investment vehicle that pools money from many investors to buy a diversified portfolio of stocks, bonds, or other securities.', 'Investing'),
('Net Worth', 'The difference between your total assets (what you own) and total liabilities (what you owe). It''s a measure of your financial health.', 'Planning'),
('ROI (Return on Investment)', 'A measure of the profitability of an investment, calculated as (Gain - Cost) / Cost × 100. Shows how much money you made relative to what you invested.', 'Investing'),
('Liquidity', 'How easily an asset can be converted to cash without losing value. Cash is the most liquid asset, while real estate is less liquid.', 'Investing'),
('Debt-to-Income Ratio', 'A percentage that compares your monthly debt payments to your monthly income. Lenders use this to assess your ability to take on new debt.', 'Credit'),
('Tax Deduction', 'An expense that can be subtracted from your taxable income, reducing the amount of tax you owe. Examples include student loan interest and charitable donations.', 'Taxes'),
('Asset Allocation', 'The distribution of investments across different asset classes (stocks, bonds, cash, real estate) based on your goals, time horizon, and risk tolerance.', 'Investing'),
('APR (Annual Percentage Rate)', 'The yearly interest rate charged on loans or credit cards, including fees. It helps you compare the true cost of borrowing money.', 'Credit'),
('Capital Gains', 'Profits earned from selling an investment or asset for more than you paid for it. These may be subject to capital gains tax.', 'Investing'),
('401(k)', 'A retirement savings plan offered by employers where you can contribute pre-tax money, often with employer matching contributions.', 'Retirement'),
('Index Fund', 'A type of mutual fund that tracks a specific market index (like the S&P 500), providing broad market exposure at low costs.', 'Investing'),
('Amortization', 'The process of paying off a loan through regular payments that include both principal and interest. Early payments are mostly interest, later payments are mostly principal.', 'Credit'),
('Risk Tolerance', 'Your ability and willingness to lose some or all of your original investment in exchange for greater potential returns. It affects your investment strategy.', 'Investing'),
('Time Value of Money', 'The concept that money available today is worth more than the same amount in the future due to its potential earning capacity through interest or investment returns.', 'Economics');

-- Verify the data was inserted
SELECT COUNT(*) as total_flashcards FROM flashcards;
SELECT category, COUNT(*) as count FROM flashcards GROUP BY category ORDER BY category; 