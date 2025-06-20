-- ============================================
-- QUIZ SYSTEM VERIFICATION QUERIES
-- Run this to verify the complete-quiz-setup.sql worked correctly
-- ============================================

-- 1. CHECK TABLE COUNTS (Expected: 15 quizzes, 32 questions, 120+ options, 50+ relationships)
SELECT 
    'DATABASE COUNTS' as check_type,
    '' as details,
    '' as status;

SELECT 'Quizzes' as table_name, COUNT(*) as count FROM quizzes
UNION ALL
SELECT 'Questions', COUNT(*) FROM questions
UNION ALL  
SELECT 'Question Options', COUNT(*) FROM question_options
UNION ALL
SELECT 'Quiz Questions', COUNT(*) FROM quiz_questions;

-- 2. CHECK QUIZ DISTRIBUTION BY DIFFICULTY
SELECT 
    'QUIZ DIFFICULTY DISTRIBUTION' as check_type,
    '' as details,
    '' as status;

SELECT 
    difficulty,
    COUNT(*) as quiz_count,
    CASE 
        WHEN difficulty = 'beginner' AND COUNT(*) = 5 THEN '✅ Correct'
        WHEN difficulty = 'intermediate' AND COUNT(*) = 6 THEN '✅ Correct'
        WHEN difficulty = 'advanced' AND COUNT(*) = 4 THEN '✅ Correct'
        ELSE '❌ Wrong count'
    END as status
FROM quizzes 
GROUP BY difficulty 
ORDER BY 
    CASE difficulty 
        WHEN 'beginner' THEN 1 
        WHEN 'intermediate' THEN 2 
        WHEN 'advanced' THEN 3 
    END;

-- 3. CHECK QUESTION DISTRIBUTION BY CATEGORY
SELECT 
    'QUESTION CATEGORY DISTRIBUTION' as check_type,
    '' as details,
    '' as status;

SELECT 
    category,
    COUNT(*) as question_count
FROM questions 
GROUP BY category 
ORDER BY COUNT(*) DESC;

-- 4. CHECK QUESTION TYPES
SELECT 
    'QUESTION TYPE DISTRIBUTION' as check_type,
    '' as details,
    '' as status;

SELECT 
    question_type,
    COUNT(*) as count
FROM questions 
GROUP BY question_type;

-- 5. TEST SPECIFIC QUIZ HAS QUESTIONS (Quiz ID 1 should have 10 questions)
SELECT 
    'QUIZ-QUESTION RELATIONSHIPS TEST' as check_type,
    '' as details,
    '' as status;

SELECT 
    q.id as quiz_id,
    q.title,
    COUNT(qq.question_id) as question_count,
    CASE 
        WHEN COUNT(qq.question_id) = 10 THEN '✅ Correct (10 questions)'
        ELSE '❌ Wrong count: ' || COUNT(qq.question_id)
    END as status
FROM quizzes q
LEFT JOIN quiz_questions qq ON q.id = qq.quiz_id
WHERE q.id IN (1, 2, 3)  -- Test first 3 quizzes
GROUP BY q.id, q.title
ORDER BY q.id;

-- 6. CHECK QUESTION OPTIONS (Each question should have 2-4 options)
SELECT 
    'QUESTION OPTIONS CHECK' as check_type,
    '' as details,
    '' as status;

SELECT 
    q.id,
    q.question_text,
    q.question_type,
    COUNT(qo.id) as option_count,
    CASE 
        WHEN q.question_type = 'true_false' AND COUNT(qo.id) = 2 THEN '✅ Correct'
        WHEN q.question_type IN ('single_choice', 'multiple_choice') AND COUNT(qo.id) >= 3 THEN '✅ Correct'
        ELSE '❌ Wrong option count'
    END as status
FROM questions q
LEFT JOIN question_options qo ON q.id = qo.question_id
GROUP BY q.id, q.question_text, q.question_type
HAVING COUNT(qo.id) < 2 OR COUNT(qo.id) > 5  -- Show only potential problems
ORDER BY q.id
LIMIT 5;  -- Limit to first 5 potential issues

-- 7. CHECK CORRECT ANSWERS EXIST (Each question should have at least one correct answer)
SELECT 
    'CORRECT ANSWERS CHECK' as check_type,
    '' as details,
    '' as status;

SELECT 
    q.id,
    q.question_text,
    COUNT(qo.id) as total_options,
    COUNT(CASE WHEN qo.is_correct THEN 1 END) as correct_options,
    CASE 
        WHEN COUNT(CASE WHEN qo.is_correct THEN 1 END) > 0 THEN '✅ Has correct answer'
        ELSE '❌ No correct answer'
    END as status
FROM questions q
LEFT JOIN question_options qo ON q.id = qo.question_id
GROUP BY q.id, q.question_text
HAVING COUNT(CASE WHEN qo.is_correct THEN 1 END) = 0  -- Show only questions without correct answers
ORDER BY q.id
LIMIT 5;

-- 8. SAMPLE DATA CHECK - Show first few records from each table
SELECT 
    'SAMPLE DATA CHECK' as check_type,
    '' as details,
    '' as status;

-- Sample quizzes
SELECT 'SAMPLE QUIZZES:' as info, id, title, difficulty, time_limit FROM quizzes ORDER BY id LIMIT 3;

-- Sample questions  
SELECT 'SAMPLE QUESTIONS:' as info, id, LEFT(question_text, 50) || '...' as question_preview, question_type, category FROM questions ORDER BY id LIMIT 3;

-- Sample options
SELECT 'SAMPLE OPTIONS:' as info, qo.question_id, LEFT(qo.option_text, 30) || '...' as option_preview, qo.is_correct 
FROM question_options qo 
JOIN questions q ON qo.question_id = q.id 
ORDER BY qo.question_id, qo.option_order 
LIMIT 6;

-- 9. FINAL VERIFICATION SUMMARY
SELECT 
    'FINAL VERIFICATION SUMMARY' as check_type,
    '' as details,
    '' as status;

SELECT 
    'Setup Status' as check_item,
    CASE 
        WHEN (SELECT COUNT(*) FROM quizzes) = 15 
         AND (SELECT COUNT(*) FROM questions) = 32
         AND (SELECT COUNT(*) FROM question_options) > 100
         AND (SELECT COUNT(*) FROM quiz_questions) > 40
        THEN '✅ DATABASE SETUP SUCCESSFUL! All tables have expected data.'
        ELSE '❌ DATABASE SETUP INCOMPLETE. Check individual table counts above.'
    END as result;

-- Show any potential issues
SELECT 
    'Potential Issues' as check_item,
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM questions q 
            LEFT JOIN question_options qo ON q.id = qo.question_id 
            GROUP BY q.id 
            HAVING COUNT(qo.id) = 0
        ) THEN '⚠️  Some questions have no options'
        WHEN EXISTS (
            SELECT 1 FROM quizzes q 
            LEFT JOIN quiz_questions qq ON q.id = qq.quiz_id 
            GROUP BY q.id 
            HAVING COUNT(qq.question_id) = 0
        ) THEN '⚠️  Some quizzes have no questions'
        ELSE '✅ No issues detected'
    END as result; 