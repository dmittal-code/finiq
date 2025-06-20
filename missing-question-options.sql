-- ============================================
-- MISSING QUESTION OPTIONS (Questions 18-32)
-- Run this AFTER the complete-quiz-setup.sql to add missing options
-- ============================================

-- Question 18: APR
INSERT INTO question_options (question_id, option_text, is_correct, option_order) VALUES
(18, 'Average Payment Rate', false, 1),
(18, 'Annual Percentage Rate - yearly interest rate including fees', true, 2),
(18, 'Automatic Payment Reduction', false, 3),
(18, 'Annual Principal Repayment', false, 4);

-- Question 19: Credit utilization  
INSERT INTO question_options (question_id, option_text, is_correct, option_order) VALUES
(19, 'The total amount of credit cards you have', false, 1),
(19, 'The percentage of available credit you are using', true, 2),
(19, 'How often you use your credit cards', false, 3),
(19, 'The interest rate on your credit cards', false, 4);

-- Question 20: Secured credit card
INSERT INTO question_options (question_id, option_text, is_correct, option_order) VALUES
(20, 'A credit card with extra security features', false, 1),
(20, 'A credit card that requires a cash deposit as collateral', true, 2),
(20, 'A credit card only for online purchases', false, 3),
(20, 'A credit card with a very high credit limit', false, 4);

-- Question 21: Budget
INSERT INTO question_options (question_id, option_text, is_correct, option_order) VALUES
(21, 'A list of things you want to buy', false, 1),
(21, 'A plan that tracks income and expenses to manage money', true, 2),
(21, 'A savings account for emergencies', false, 3),
(21, 'A type of investment strategy', false, 4);

-- Question 22: Financial goals specific (True/False)
INSERT INTO question_options (question_id, option_text, is_correct, option_order) VALUES
(22, 'True', true, 1),
(22, 'False', false, 2);

-- Question 23: Net worth
INSERT INTO question_options (question_id, option_text, is_correct, option_order) VALUES
(23, 'Your annual salary', false, 1),
(23, 'Total assets minus total liabilities', true, 2),
(23, 'The amount in your savings account', false, 3),
(23, 'Your monthly income after taxes', false, 4);

-- Question 24: Time value of money
INSERT INTO question_options (question_id, option_text, is_correct, option_order) VALUES
(24, 'Money loses value over time due to wear and tear', false, 1),
(24, 'Money available today is worth more than the same amount in the future', true, 2),
(24, 'Time spent earning money is valuable', false, 3),
(24, 'Money should be spent quickly before it loses value', false, 4);

-- Question 25: Opportunity cost
INSERT INTO question_options (question_id, option_text, is_correct, option_order) VALUES
(25, 'The cost of financial planning services', false, 1),
(25, 'The potential benefit given up when choosing one option over another', true, 2),
(25, 'The interest cost on loans', false, 3),
(25, 'The fees charged by financial advisors', false, 4);

-- Question 26: Inflation
INSERT INTO question_options (question_id, option_text, is_correct, option_order) VALUES
(26, 'When prices decrease over time', false, 1),
(26, 'The rate at which prices increase, reducing purchasing power', true, 2),
(26, 'When the economy grows rapidly', false, 3),
(26, 'The interest rate set by banks', false, 4);

-- Question 27: GDP
INSERT INTO question_options (question_id, option_text, is_correct, option_order) VALUES
(27, 'Government Debt Percentage', false, 1),
(27, 'Gross Domestic Product - total value of goods and services produced', true, 2),
(27, 'Global Development Program', false, 3),
(27, 'General Distribution Policy', false, 4);

-- Question 28: Recession vs depression
INSERT INTO question_options (question_id, option_text, is_correct, option_order) VALUES
(28, 'They are the same thing', false, 1),
(28, 'Recession is shorter economic decline, depression is severe and prolonged', true, 2),
(28, 'Depression is shorter than recession', false, 3),
(28, 'Recession affects only some industries, depression affects all', false, 4);

-- Question 29: Tax deduction
INSERT INTO question_options (question_id, option_text, is_correct, option_order) VALUES
(29, 'Money the government pays you back', false, 1),
(29, 'An amount that reduces your taxable income', true, 2),
(29, 'A penalty for not paying taxes on time', false, 3),
(29, 'The total amount of taxes you owe', false, 4);

-- Question 30: Tax deduction vs credit
INSERT INTO question_options (question_id, option_text, is_correct, option_order) VALUES
(30, 'They are exactly the same', false, 1),
(30, 'Deductions reduce taxable income, credits reduce taxes owed dollar-for-dollar', true, 2),
(30, 'Credits reduce taxable income, deductions reduce taxes owed', false, 3),
(30, 'Deductions are better than credits', false, 4);

-- Question 31: 401(k)
INSERT INTO question_options (question_id, option_text, is_correct, option_order) VALUES
(31, 'A type of savings account', false, 1),
(31, 'An employer-sponsored retirement plan with pre-tax contributions', true, 2),
(31, 'A government pension program', false, 3),
(31, 'A tax form you file annually', false, 4);

-- Question 32: Start saving for retirement in 20s (True/False)
INSERT INTO question_options (question_id, option_text, is_correct, option_order) VALUES
(32, 'True', true, 1),
(32, 'False', false, 2);

-- ============================================
-- VERIFICATION - Check if all questions now have options
-- ============================================

SELECT 
    'Questions without options:' as check_type,
    COUNT(*) as count
FROM questions q
LEFT JOIN question_options qo ON q.id = qo.question_id
WHERE qo.id IS NULL;

-- Show questions with option counts
SELECT 
    q.id,
    LEFT(q.question_text, 50) || '...' as question_preview,
    q.question_type,
    COUNT(qo.id) as option_count
FROM questions q
LEFT JOIN question_options qo ON q.id = qo.question_id
GROUP BY q.id, q.question_text, q.question_type
ORDER BY q.id; 