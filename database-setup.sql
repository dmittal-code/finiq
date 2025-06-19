-- Create the financial_terms table
CREATE TABLE IF NOT EXISTS financial_terms (
  id SERIAL PRIMARY KEY,
  term VARCHAR(255) NOT NULL,
  definition TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  example TEXT,
  related_terms TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on the term column for faster searches
CREATE INDEX IF NOT EXISTS idx_financial_terms_term ON financial_terms(term);
CREATE INDEX IF NOT EXISTS idx_financial_terms_category ON financial_terms(category);

-- Insert the existing financial terms data
INSERT INTO financial_terms (term, definition, category, example, related_terms) VALUES
('Compound Interest', 'Interest earned on both the principal amount and any previously earned interest. It''s often called ''interest on interest'' and helps money grow faster over time.', 'Investing', 'If you invest $1,000 at 5% compound interest, after 10 years you''ll have $1,628.89 instead of $1,500 with simple interest.', ARRAY['Simple Interest', 'APY', 'Time Value of Money']),
('Emergency Fund', 'A savings account with 3-6 months of living expenses set aside for unexpected financial emergencies like job loss or medical bills.', 'Savings', 'If your monthly expenses are $3,000, you should aim to save $9,000-$18,000 in your emergency fund.', ARRAY['Liquidity', 'Budget', 'Financial Security']),
('Diversification', 'Spreading investments across different assets, sectors, or geographic regions to reduce risk. The saying goes: ''Don''t put all your eggs in one basket.''', 'Investing', 'Instead of investing all your money in tech stocks, you might invest in stocks, bonds, real estate, and international markets.', ARRAY['Asset Allocation', 'Risk Management', 'Portfolio']),
('Credit Score', 'A three-digit number (300-850) that represents your creditworthiness. Higher scores help you get better loan terms and lower interest rates.', 'Credit', 'A credit score of 750+ typically qualifies you for the best mortgage rates and credit card offers.', ARRAY['Credit Report', 'FICO Score', 'Credit History']),
('Budget', 'A financial plan that tracks income and expenses to help you spend within your means and save for goals.', 'Planning', 'A 50/30/20 budget allocates 50% to needs, 30% to wants, and 20% to savings and debt repayment.', ARRAY['Income', 'Expenses', 'Cash Flow']),
('Inflation', 'The rate at which prices for goods and services increase over time, reducing the purchasing power of money.', 'Economics', 'If inflation is 3% per year, a $100 item will cost $103 next year, meaning your money buys less.', ARRAY['Purchasing Power', 'CPI', 'Deflation']),
('Mutual Fund', 'An investment vehicle that pools money from many investors to buy a diversified portfolio of stocks, bonds, or other securities.', 'Investing', 'A mutual fund might invest in 100+ different stocks, giving you instant diversification with a single investment.', ARRAY['Index Fund', 'ETF', 'Portfolio']),
('Net Worth', 'The difference between your total assets (what you own) and total liabilities (what you owe). It''s a measure of your financial health.', 'Planning', 'If you have $50,000 in assets and $20,000 in debt, your net worth is $30,000.', ARRAY['Assets', 'Liabilities', 'Balance Sheet']),
('ROI (Return on Investment)', 'A measure of the profitability of an investment, calculated as (Gain - Cost) / Cost × 100. Shows how much money you made relative to what you invested.', 'Investing', 'If you invest $1,000 and it grows to $1,200, your ROI is (200/1000) × 100 = 20%.', ARRAY['Profit', 'Investment', 'Performance']),
('Liquidity', 'How easily an asset can be converted to cash without losing value. Cash is the most liquid asset, while real estate is less liquid.', 'Investing', 'You can sell stocks quickly for cash, but selling a house takes time and may require a price reduction.', ARRAY['Cash', 'Marketability', 'Emergency Fund']),
('Debt-to-Income Ratio', 'A percentage that compares your monthly debt payments to your monthly income. Lenders use this to assess your ability to take on new debt.', 'Credit', 'If your monthly income is $5,000 and debt payments are $1,500, your DTI ratio is 30%.', ARRAY['Credit Score', 'Loan Approval', 'Debt Management']),
('Tax Deduction', 'An expense that can be subtracted from your taxable income, reducing the amount of tax you owe. Examples include student loan interest and charitable donations.', 'Taxes', 'If you earn $50,000 and have $2,000 in deductions, you only pay taxes on $48,000.', ARRAY['Taxable Income', 'Tax Credit', 'Deductions']),
('Asset Allocation', 'The distribution of investments across different asset classes (stocks, bonds, cash, real estate) based on your goals, time horizon, and risk tolerance.', 'Investing', 'A conservative portfolio might be 60% bonds, 30% stocks, and 10% cash.', ARRAY['Diversification', 'Risk Tolerance', 'Portfolio']),
('APR (Annual Percentage Rate)', 'The yearly interest rate charged on loans or credit cards, including fees. It helps you compare the true cost of borrowing money.', 'Credit', 'A credit card with 18% APR means you pay 18% interest per year on outstanding balances.', ARRAY['Interest Rate', 'APY', 'Loan Terms']),
('Capital Gains', 'Profits earned from selling an investment or asset for more than you paid for it. These may be subject to capital gains tax.', 'Investing', 'If you buy a stock for $100 and sell it for $150, you have a $50 capital gain.', ARRAY['Capital Loss', 'Taxes', 'Investment']),
('401(k)', 'A retirement savings plan offered by employers where you can contribute pre-tax money, often with employer matching contributions.', 'Retirement', 'If you contribute $500/month and your employer matches 50%, you''re saving $750/month total.', ARRAY['IRA', 'Employer Match', 'Retirement Planning']),
('Index Fund', 'A type of mutual fund that tracks a specific market index (like the S&P 500), providing broad market exposure at low costs.', 'Investing', 'An S&P 500 index fund owns shares of the 500 largest US companies, automatically diversifying your investment.', ARRAY['ETF', 'Passive Investing', 'Market Index']),
('Amortization', 'The process of paying off a loan through regular payments that include both principal and interest. Early payments are mostly interest, later payments are mostly principal.', 'Credit', 'On a 30-year mortgage, early payments are mostly interest, while later payments are mostly principal.', ARRAY['Principal', 'Interest', 'Loan Payment']),
('Risk Tolerance', 'Your ability and willingness to lose some or all of your original investment in exchange for greater potential returns. It affects your investment strategy.', 'Investing', 'A young person might have high risk tolerance and invest in stocks, while someone near retirement might prefer bonds.', ARRAY['Risk Management', 'Investment Strategy', 'Asset Allocation']),
('Time Value of Money', 'The concept that money available today is worth more than the same amount in the future due to its potential earning capacity through interest or investment returns.', 'Economics', '$1,000 today is worth more than $1,000 in 5 years because you could invest it and earn interest.', ARRAY['Compound Interest', 'Present Value', 'Future Value']),
('Stock', 'A share of ownership in a company. When you buy stock, you become a partial owner and may receive dividends and voting rights.', 'Investing', 'If you own 100 shares of Apple stock, you own a tiny piece of Apple Inc. and may receive dividend payments.', ARRAY['Dividend', 'Shareholder', 'Equity']),
('Bond', 'A loan you make to a company or government. In return, they promise to pay you back with interest over a specified period.', 'Investing', 'A 10-year government bond might pay 3% interest annually and return your principal after 10 years.', ARRAY['Interest', 'Maturity', 'Fixed Income']),
('IRA (Individual Retirement Account)', 'A tax-advantaged retirement savings account that individuals can open independently of their employer.', 'Retirement', 'A traditional IRA allows you to deduct contributions from your taxes now and pay taxes when you withdraw in retirement.', ARRAY['401(k)', 'Roth IRA', 'Retirement Planning']),
('ETF (Exchange-Traded Fund)', 'A type of investment fund that trades on stock exchanges like individual stocks, providing diversification at low costs.', 'Investing', 'An S&P 500 ETF can be bought and sold throughout the trading day, just like a stock.', ARRAY['Index Fund', 'Mutual Fund', 'Diversification']),
('Credit Report', 'A detailed record of your credit history, including loans, credit cards, payment history, and credit inquiries.', 'Credit', 'Lenders check your credit report to see if you''ve paid bills on time and how much debt you have.', ARRAY['Credit Score', 'Credit History', 'Credit Bureau']);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update the updated_at column
CREATE TRIGGER update_financial_terms_updated_at 
    BEFORE UPDATE ON financial_terms 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column(); 