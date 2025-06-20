# User Profile System

## Overview
The FinIQ user profile system allows users to personalize their financial learning experience by providing optional information about their background, goals, and preferences.

## Database Schema

### `user_profiles` Table
```sql
CREATE TABLE user_profiles (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) UNIQUE NOT NULL, -- Google OAuth user ID
  email VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  avatar_url TEXT,
  
  -- Basic Information
  age INTEGER,
  city VARCHAR(100),
  state VARCHAR(100),
  
  -- Financial Background
  education_level VARCHAR(50) CHECK (education_level IN ('high_school', 'college', 'working_professional', 'other')),
  monthly_income_range VARCHAR(50) CHECK (monthly_income_range IN ('0-1000', '1001-5000', '5001-10000', '10000+', 'prefer_not_say')),
  financial_knowledge_level VARCHAR(50) CHECK (financial_knowledge_level IN ('beginner', 'intermediate', 'advanced')),
  
  -- Goals & Interests
  primary_financial_goals TEXT[], -- Array of goals
  preferred_learning_style VARCHAR(50) CHECK (preferred_learning_style IN ('visual', 'interactive', 'reading', 'video')),
  favorite_financial_topic VARCHAR(100),
  
  -- Optional Personal Touch
  bio TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Profile Fields

### Basic Information
- **Name**: Auto-populated from Google SSO (editable)
- **Email**: Auto-populated from Google SSO (read-only)
- **Age**: Optional, 13-30 range
- **City**: Free text input
- **State**: Dropdown with Indian states

### Financial Background
- **Education Level**: High School, College, Working Professional, Other
- **Monthly Income Range**: ₹0-1K, ₹1K-5K, ₹5K-10K, ₹10K+, Prefer not to say
- **Financial Knowledge**: Beginner, Intermediate, Advanced

### Goals & Interests
- **Primary Financial Goals** (multiple selection):
  - Save for College/Education
  - Build Emergency Fund
  - Learn about Investments
  - Start a Business
  - Buy Gadgets/Electronics
  - Travel Fund
  - Other

- **Preferred Learning Style**: Visual, Interactive, Reading, Video
- **Favorite Financial Topic**: Investing, Savings, Budgeting, etc.

### Personal Touch
- **Bio**: 500-character limit description

## Features

### Profile Management
- **Optional Completion**: Users can skip profile setup and complete it later
- **Edit Anytime**: Full profile editing capabilities
- **Auto-Save**: Form saves all data on submission
- **Validation**: Client-side and server-side validation

### Navigation Integration
- **Desktop**: Profile link in user dropdown menu
- **Mobile**: Profile section in mobile navigation
- **Protected Route**: Requires authentication

### Indian Context
- **Indian States**: Complete list of Indian states and territories
- **Rupee Amounts**: All income ranges in Indian Rupees
- **Teen-Focused**: Age ranges and options suitable for Indian teens

## Usage

### Accessing Profile
1. Sign in with Google
2. Click user avatar/name in navbar
3. Select "My Profile" from dropdown
4. Or navigate to `/profile`

### Profile Flow
1. **New User**: Basic info pre-populated from Google OAuth
2. **First Visit**: Empty form with optional fields
3. **Subsequent Visits**: Previously saved data loaded
4. **Updates**: Changes saved via upsert operation

## Technical Implementation

### Frontend
- **React Hook Form**: Form state management
- **TypeScript**: Type-safe profile interface
- **Tailwind CSS**: Responsive design with muted gray theme
- **Client Components**: Interactive form elements

### Backend
- **Supabase**: PostgreSQL database with RLS
- **UPSERT Operations**: Create or update profile seamlessly
- **Indexed Fields**: Optimized queries on common fields

### Security
- **Row Level Security**: Users can only access their own profiles
- **Authentication Required**: Protected routes
- **Data Validation**: Server-side constraints and checks

## Future Enhancements

### Potential Features
- **Profile Completion Progress**: Visual indicator of profile completeness
- **Personalized Recommendations**: Content suggestions based on profile
- **Profile Sharing**: Optional public profile pages
- **Achievement System**: Badges based on profile goals
- **Analytics**: Usage insights for admins

### Data Utilization
- **Content Personalization**: Tailor learning modules to user level
- **Goal Tracking**: Progress tracking for financial goals
- **Learning Path**: Customized learning sequences
- **Reporting**: Anonymous analytics for improvement 