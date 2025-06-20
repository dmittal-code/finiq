-- Supplementary SQL Script: Question Options for Questions 7-30
-- Run this after running quiz-system-setup.sql

-- Options for Question 7: True/False: Higher potential returns always mean higher risk
INSERT INTO question_options (question_id, option_text, is_correct, option_order) VALUES
(7, 'True', true, 1),
(7, 'False', false, 2);

-- Options for Question 8: What is the stock market?
INSERT INTO question_options (question_id, option_text, is_correct, option_order) VALUES
(8, 'A place where only large corporations trade', false, 1),
(8, 'A platform where shares of publicly-owned companies are bought and sold', true, 2),
(8, 'A government-controlled financial institution', false, 3),
(8, 'A type of bank for wealthy people', false, 4);

-- Options for Question 9: What is the P/E ratio?
INSERT INTO question_options (question_id, option_text, is_correct, option_order) VALUES
(9, 'Price divided by Employee count', false, 1),
(9, 'Price-to-Earnings ratio comparing stock price to earnings per share', true, 2),
(9, 'Profit and Expense calculation', false, 3),
(9, 'Personal Equity measurement', false, 4);

-- Options for Question 10: Which of these factors affect stock prices? (Multiple choice)
INSERT INTO question_options (question_id, option_text, is_correct, option_order) VALUES
(10, 'Company financial performance', true, 1),
(10, 'Market sentiment and investor emotions', true, 2),
(10, 'Economic conditions and interest rates', true, 3),
(10, 'The color of the company logo', false, 4);

-- Options for Question 11: What is an emergency fund?
INSERT INTO question_options (question_id, option_text, is_correct, option_order) VALUES
(11, 'Money for buying luxury items', false, 1),
(11, 'Money set aside for unexpected expenses like job loss or medical bills', true, 2),
(11, 'Funds for vacation planning', false, 3),
(11, 'Money for investment opportunities', false, 4);

-- Options for Question 12: How many months of expenses should you save?
INSERT INTO question_options (question_id, option_text, is_correct, option_order) VALUES
(12, '1 month', false, 1),
(12, '3-6 months', true, 2),
(12, '12 months', false, 3),
(12, '24 months', false, 4);

-- Options for Question 13: True/False: Save before paying high-interest debt
INSERT INTO question_options (question_id, option_text, is_correct, option_order) VALUES
(13, 'True', false, 1),
(13, 'False', true, 2);

-- Options for Question 14: What is the 50-30-20 rule?
INSERT INTO question_options (question_id, option_text, is_correct, option_order) VALUES
(14, '50% savings, 30% needs, 20% wants', false, 1),
(14, '50% needs, 30% wants, 20% savings and debt repayment', true, 2),
(14, '50% investing, 30% savings, 20% spending', false, 3),
(14, '50% taxes, 30% living, 20% emergency', false, 4);

-- Options for Question 15: What is compound interest in savings?
INSERT INTO question_options (question_id, option_text, is_correct, option_order) VALUES
(15, 'Interest that only applies to large deposits', false, 1),
(15, 'Earning interest on both principal and previously earned interest', true, 2),
(15, 'Interest that compounds only once per year', false, 3),
(15, 'A special type of bank account for wealthy people', false, 4);

-- Options for Question 16: What is a credit score?
INSERT INTO question_options (question_id, option_text, is_correct, option_order) VALUES
(16, 'The amount of money you owe on credit cards', false, 1),
(16, 'A three-digit number (300-850) representing creditworthiness', true, 2),
(16, 'Your annual income divided by your debt', false, 3),
(16, 'The number of credit cards you own', false, 4);

-- Options for Question 17: True/False: Paying bills on time helps credit score
INSERT INTO question_options (question_id, option_text, is_correct, option_order) VALUES
(17, 'True', true, 1),
(17, 'False', false, 2);

-- Options for Question 18: What is APR?
INSERT INTO question_options (question_id, option_text, is_correct, option_order) VALUES
(18, 'Annual Payment Required', false, 1),
(18, 'Annual Percentage Rate - yearly interest rate including fees', true, 2),
(18, 'Automatic Payment Reduction', false, 3),
(18, 'Average Purchase Rate', false, 4);

-- Options for Question 19: What is credit utilization?
INSERT INTO question_options (question_id, option_text, is_correct, option_order) VALUES
(19, 'The total number of credit cards you use', false, 1),
(19, 'The percentage of available credit you are using', true, 2),
(19, 'How often you use your credit cards', false, 3),
(19, 'The maximum amount you can spend on credit', false, 4);

-- Options for Question 20: What is a secured credit card?
INSERT INTO question_options (question_id, option_text, is_correct, option_order) VALUES
(20, 'A credit card with no interest rate', false, 1),
(20, 'A credit card that requires a cash deposit as collateral', true, 2),
(20, 'A credit card only for wealthy people', false, 3),
(20, 'A credit card backed by government insurance', false, 4);

-- Options for Question 21: What is a budget?
INSERT INTO question_options (question_id, option_text, is_correct, option_order) VALUES
(21, 'A loan from a bank', false, 1),
(21, 'A plan that tracks income and expenses to manage money', true, 2),
(21, 'A type of savings account', false, 3),
(21, 'A government financial program', false, 4);

-- Options for Question 22: True/False: Financial goals should be specific
INSERT INTO question_options (question_id, option_text, is_correct, option_order) VALUES
(22, 'True', true, 1),
(22, 'False', false, 2);

-- Options for Question 23: What is net worth?
INSERT INTO question_options (question_id, option_text, is_correct, option_order) VALUES
(23, 'Your annual income', false, 1),
(23, 'Total assets minus total liabilities', true, 2),
(23, 'The value of your house', false, 3),
(23, 'Your monthly take-home pay', false, 4);

-- Options for Question 24: What is the time value of money?
INSERT INTO question_options (question_id, option_text, is_correct, option_order) VALUES
(24, 'Money loses value as you spend it', false, 1),
(24, 'Money available today is worth more than the same amount in the future', true, 2),
(24, 'Time spent earning money is valuable', false, 3),
(24, 'Money earns more during business hours', false, 4);

-- Options for Question 25: What is opportunity cost?
INSERT INTO question_options (question_id, option_text, is_correct, option_order) VALUES
(25, 'The cost of missed opportunities in the stock market', false, 1),
(25, 'The potential benefit given up when choosing one option over another', true, 2),
(25, 'The cost of business opportunities', false, 3),
(25, 'The time spent making financial decisions', false, 4);

-- Options for Question 26: What is inflation?
INSERT INTO question_options (question_id, option_text, is_correct, option_order) VALUES
(26, 'When prices for goods and services decrease over time', false, 1),
(26, 'The rate at which prices increase, reducing purchasing power', true, 2),
(26, 'When the economy grows rapidly', false, 3),
(26, 'When unemployment rates increase', false, 4);

-- Options for Question 27: What is GDP?
INSERT INTO question_options (question_id, option_text, is_correct, option_order) VALUES
(27, 'Government Debt Percentage', false, 1),
(27, 'Gross Domestic Product - total value of goods and services produced', true, 2),
(27, 'Global Development Program', false, 3),
(27, 'General Deposit Protection', false, 4);

-- Options for Question 28: Recession vs Depression difference
INSERT INTO question_options (question_id, option_text, is_correct, option_order) VALUES
(28, 'There is no difference between them', false, 1),
(28, 'Recession lasts months, depression lasts years and is more severe', true, 2),
(28, 'Depression is shorter than recession', false, 3),
(28, 'Recession affects only certain industries', false, 4);

-- Options for Question 29: What is a tax deduction?
INSERT INTO question_options (question_id, option_text, is_correct, option_order) VALUES
(29, 'Money the government pays you', false, 1),
(29, 'An amount that reduces your taxable income', true, 2),
(29, 'A penalty for late tax filing', false, 3),
(29, 'Interest earned on tax refunds', false, 4);

-- Options for Question 30: Tax deduction vs credit difference
INSERT INTO question_options (question_id, option_text, is_correct, option_order) VALUES
(30, 'They are exactly the same thing', false, 1),
(30, 'Deductions reduce taxable income, credits reduce taxes owed dollar-for-dollar', true, 2),
(30, 'Credits reduce income, deductions reduce taxes', false, 3),
(30, 'Deductions are better than credits', false, 4);

-- Options for Question 31: What is a 401(k)?
INSERT INTO question_options (question_id, option_text, is_correct, option_order) VALUES
(31, 'A type of bank account', false, 1),
(31, 'An employer-sponsored retirement plan with pre-tax contributions', true, 2),
(31, 'A government savings bond', false, 3),
(31, 'A type of health insurance', false, 4);

-- Options for Question 32: True/False: Start saving for retirement in 20s
INSERT INTO question_options (question_id, option_text, is_correct, option_order) VALUES
(32, 'True', true, 1),
(32, 'False', false, 2);

-- Verification: Check that all questions have options
SELECT 
    q.id,
    q.question_text,
    COUNT(qo.id) as option_count
FROM questions q
LEFT JOIN question_options qo ON q.id = qo.question_id
GROUP BY q.id, q.question_text
HAVING COUNT(qo.id) = 0
ORDER BY q.id;

-- Count total questions and options
SELECT 
    'Total Questions' as metric,
    COUNT(*) as count
FROM questions

UNION ALL

SELECT 
    'Total Options' as metric,
    COUNT(*) as count
FROM question_options

UNION ALL

SELECT 
    'Questions with Options' as metric,
    COUNT(DISTINCT question_id) as count
FROM question_options; 