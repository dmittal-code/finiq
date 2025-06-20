-- ============================================
-- COMPREHENSIVE QUIZ SYSTEM VERIFICATION
-- Run this to verify all data is populated correctly
-- ============================================

-- 1. OVERALL SYSTEM STATUS
SELECT 
    '🔍 QUIZ SYSTEM HEALTH CHECK' as section,
    '' as detail,
    '' as status,
    '' as expected,
    '' as actual;

-- 2. TABLE COUNTS VERIFICATION
SELECT 
    '📊 TABLE COUNTS' as section,
    table_name,
    CASE 
        WHEN table_name = 'Quizzes' AND count = 15 THEN '✅ CORRECT'
        WHEN table_name = 'Questions' AND count = 32 THEN '✅ CORRECT'
        WHEN table_name = 'Question Options' AND count >= 120 THEN '✅ CORRECT'
        WHEN table_name = 'Quiz Questions' AND count >= 150 THEN '✅ CORRECT'
        ELSE '❌ WRONG COUNT'
    END as status,
    CASE 
        WHEN table_name = 'Quizzes' THEN '15'
        WHEN table_name = 'Questions' THEN '32'
        WHEN table_name = 'Question Options' THEN '120+'
        WHEN table_name = 'Quiz Questions' THEN '150+'
    END as expected,
    count::text as actual
FROM (
    SELECT 'Quizzes' as table_name, COUNT(*) as count FROM quizzes
    UNION ALL
    SELECT 'Questions', COUNT(*) FROM questions
    UNION ALL  
    SELECT 'Question Options', COUNT(*) FROM question_options
    UNION ALL
    SELECT 'Quiz Questions', COUNT(*) FROM quiz_questions
) counts;

-- 3. QUIZ DIFFICULTY DISTRIBUTION
SELECT 
    '🎯 QUIZ DIFFICULTY DISTRIBUTION' as section,
    difficulty as detail,
    CASE 
        WHEN difficulty = 'beginner' AND count = 5 THEN '✅ CORRECT (5 quizzes)'
        WHEN difficulty = 'intermediate' AND count = 6 THEN '✅ CORRECT (6 quizzes)'
        WHEN difficulty = 'advanced' AND count = 4 THEN '✅ CORRECT (4 quizzes)'
        ELSE '❌ WRONG: ' || count || ' quizzes'
    END as status,
    CASE 
        WHEN difficulty = 'beginner' THEN '5'
        WHEN difficulty = 'intermediate' THEN '6'
        WHEN difficulty = 'advanced' THEN '4'
    END as expected,
    count::text as actual
FROM (
    SELECT 
        difficulty,
        COUNT(*) as count
    FROM quizzes 
    GROUP BY difficulty 
) quiz_counts
ORDER BY 
    CASE difficulty 
        WHEN 'beginner' THEN 1 
        WHEN 'intermediate' THEN 2 
        WHEN 'advanced' THEN 3 
    END;

-- 4. QUESTION CATEGORY DISTRIBUTION  
SELECT 
    '📚 QUESTION CATEGORIES' as section,
    category as detail,
    '✅ ' || count || ' questions' as status,
    'varies' as expected,
    count::text as actual
FROM (
    SELECT 
        category,
        COUNT(*) as count
    FROM questions 
    GROUP BY category 
    ORDER BY COUNT(*) DESC
) cat_counts;

-- 5. QUESTION TYPE DISTRIBUTION
SELECT 
    '❓ QUESTION TYPES' as section,
    question_type as detail,
    '✅ ' || count || ' questions' as status,
    'varies' as expected,
    count::text as actual
FROM (
    SELECT 
        question_type,
        COUNT(*) as count
    FROM questions 
    GROUP BY question_type
    ORDER BY COUNT(*) DESC
) type_counts;

-- 6. QUESTIONS WITHOUT OPTIONS (Should be 0)
SELECT 
    '⚠️ QUESTIONS WITHOUT OPTIONS' as section,
    CASE WHEN count = 0 THEN 'All questions have options' ELSE count::text || ' questions missing options' END as detail,
    CASE WHEN count = 0 THEN '✅ PERFECT' ELSE '❌ MISSING OPTIONS' END as status,
    '0' as expected,
    count::text as actual
FROM (
    SELECT COUNT(*) as count
    FROM questions q
    LEFT JOIN question_options qo ON q.id = qo.question_id
    WHERE qo.id IS NULL
) missing_options;

-- 7. QUIZZES WITHOUT QUESTIONS (Should be 0)
SELECT 
    '⚠️ QUIZZES WITHOUT QUESTIONS' as section,
    CASE WHEN count = 0 THEN 'All quizzes have questions' ELSE count::text || ' quizzes missing questions' END as detail,
    CASE WHEN count = 0 THEN '✅ PERFECT' ELSE '❌ MISSING QUESTIONS' END as status,
    '0' as expected,
    count::text as actual
FROM (
    SELECT COUNT(*) as count
    FROM quizzes q
    LEFT JOIN quiz_questions qq ON q.id = qq.quiz_id
    WHERE qq.question_id IS NULL
) missing_questions;

-- 8. QUESTIONS WITHOUT CORRECT ANSWERS (Should be 0)
SELECT 
    '⚠️ QUESTIONS WITHOUT CORRECT ANSWERS' as section,
    CASE WHEN count = 0 THEN 'All questions have correct answers' ELSE count::text || ' questions missing correct answers' END as detail,
    CASE WHEN count = 0 THEN '✅ PERFECT' ELSE '❌ MISSING CORRECT ANSWERS' END as status,
    '0' as expected,
    count::text as actual
FROM (
    SELECT COUNT(*) as count
    FROM questions q
    WHERE NOT EXISTS (
        SELECT 1 FROM question_options qo 
        WHERE qo.question_id = q.id AND qo.is_correct = true
    )
) missing_correct;

-- 9. QUIZ QUESTION COUNT VERIFICATION (Each quiz should have 10 questions)
SELECT 
    '🧮 QUIZ QUESTION COUNTS' as section,
    q.title as detail,
    CASE 
        WHEN COUNT(qq.question_id) = 10 THEN '✅ CORRECT (10 questions)'
        ELSE '❌ WRONG: ' || COUNT(qq.question_id) || ' questions'
    END as status,
    '10' as expected,
    COUNT(qq.question_id)::text as actual
FROM quizzes q
LEFT JOIN quiz_questions qq ON q.id = qq.quiz_id
GROUP BY q.id, q.title
HAVING COUNT(qq.question_id) != 10  -- Only show quizzes with wrong count
ORDER BY q.id
LIMIT 5;  -- Limit to first 5 issues

-- 10. SAMPLE QUIZ TEST (Show first quiz details)
SELECT 
    '🔍 SAMPLE QUIZ DETAILS' as section,
    'Quiz: ' || q.title as detail,
    'Question ' || qq.question_order || ': ' || LEFT(qs.question_text, 50) || '...' as status,
    'Has options' as expected,
    COUNT(qo.id)::text || ' options' as actual
FROM quizzes q
JOIN quiz_questions qq ON q.id = qq.quiz_id
JOIN questions qs ON qq.question_id = qs.id
LEFT JOIN question_options qo ON qs.id = qo.question_id
WHERE q.id = 1  -- Test first quiz
GROUP BY q.id, q.title, qq.question_order, qs.question_text
ORDER BY qq.question_order
LIMIT 5;  -- Show first 5 questions

-- 11. FINAL SYSTEM STATUS
SELECT 
    '🎉 FINAL SYSTEM STATUS' as section,
    '' as detail,
    CASE 
        WHEN (SELECT COUNT(*) FROM quizzes) = 15 
         AND (SELECT COUNT(*) FROM questions) = 32
         AND (SELECT COUNT(*) FROM question_options) >= 120
         AND (SELECT COUNT(*) FROM quiz_questions) >= 150
         AND NOT EXISTS (SELECT 1 FROM questions q LEFT JOIN question_options qo ON q.id = qo.question_id WHERE qo.id IS NULL)
         AND NOT EXISTS (SELECT 1 FROM quizzes q LEFT JOIN quiz_questions qq ON q.id = qq.quiz_id WHERE qq.question_id IS NULL)
        THEN '🚀 QUIZ SYSTEM FULLY OPERATIONAL! Ready for users.'
        ELSE '⚠️ QUIZ SYSTEM NEEDS ATTENTION. Check issues above.'
    END as status,
    'Fully operational' as expected,
    'See status' as actual;

-- 12. QUICK STATISTICS SUMMARY
SELECT 
    '📈 SYSTEM STATISTICS' as section,
    stat_name as detail,
    value as status,
    '' as expected,
    '' as actual
FROM (
    SELECT 'Total Quizzes' as stat_name, COUNT(*)::text as value FROM quizzes
    UNION ALL
    SELECT 'Beginner Quizzes', COUNT(*)::text FROM quizzes WHERE difficulty = 'beginner'
    UNION ALL
    SELECT 'Intermediate Quizzes', COUNT(*)::text FROM quizzes WHERE difficulty = 'intermediate'
    UNION ALL
    SELECT 'Advanced Quizzes', COUNT(*)::text FROM quizzes WHERE difficulty = 'advanced'
    UNION ALL
    SELECT 'Total Questions', COUNT(*)::text FROM questions
    UNION ALL
    SELECT 'Investing Questions', COUNT(*)::text FROM questions WHERE category = 'Investing'
    UNION ALL
    SELECT 'Total Answer Options', COUNT(*)::text FROM question_options
    UNION ALL
    SELECT 'Quiz-Question Relationships', COUNT(*)::text FROM quiz_questions
    UNION ALL
    SELECT 'Average Questions per Quiz', ROUND(AVG(question_count), 1)::text
    FROM (SELECT COUNT(qq.question_id) as question_count FROM quizzes q LEFT JOIN quiz_questions qq ON q.id = qq.quiz_id GROUP BY q.id) avg_calc
) stats; 