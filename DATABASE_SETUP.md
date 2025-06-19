# Database Setup for Financial Terms

This guide will help you set up the database to store financial terms instead of using hardcoded data.

## Prerequisites

1. A Supabase project (you already have this configured)
2. Your Supabase URL and anon key in your environment variables

## Setup Steps

### 1. Run the Database Setup Script

1. Go to your Supabase dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `database-setup.sql` into the editor
4. Click "Run" to execute the script

This will:
- Create the `financial_terms` table with all necessary columns
- Insert all 25 existing financial terms
- Create indexes for better performance
- Set up automatic timestamp updates

### 2. Verify the Setup

After running the script, you can verify the setup by:

1. Going to the "Table Editor" in your Supabase dashboard
2. Looking for the `financial_terms` table
3. Checking that it contains 25 rows of data

### 3. Test the Application

1. Make sure your environment variables are set:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

2. Run your development server:
   ```bash
   npm run dev
   ```

3. Navigate to `/terms` and verify that:
   - All terms are loading from the database
   - Search functionality works
   - Category filtering works
   - Modal details display correctly

## Database Schema

The `financial_terms` table has the following structure:

```sql
CREATE TABLE financial_terms (
  id SERIAL PRIMARY KEY,
  term VARCHAR(255) NOT NULL,
  definition TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  example TEXT,
  related_terms TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Adding New Terms

To add new financial terms, you can:

1. Use the Supabase dashboard to insert new rows directly
2. Create an admin interface (future enhancement)
3. Run additional SQL INSERT statements

Example SQL to add a new term:
```sql
INSERT INTO financial_terms (term, definition, category, example, related_terms) 
VALUES (
  'New Term',
  'Definition of the new term',
  'Category',
  'Example usage',
  ARRAY['Related Term 1', 'Related Term 2']
);
```

## Benefits of Database Storage

- **Scalability**: Easy to add new terms without code changes
- **Performance**: Database indexes for fast searches
- **Maintainability**: Centralized data management
- **Flexibility**: Can add features like user contributions, ratings, etc.
- **Backup**: Automatic database backups through Supabase

## Troubleshooting

If you encounter issues:

1. **Terms not loading**: Check your Supabase connection and environment variables
2. **Search not working**: Verify the database indexes were created
3. **Categories missing**: Ensure the `getCategories()` function is working correctly

## Next Steps

With the database setup complete, you can now:
- Add more financial terms easily
- Implement user authentication
- Add user-specific features like favorites
- Create an admin interface for managing terms
- Add analytics and usage tracking 