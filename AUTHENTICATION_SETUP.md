# Authentication Setup Guide

This guide will help you set up Google SSO authentication and admin controls for your FinIQ application.

## 🔐 Authentication Overview

The application now requires users to sign in with Google to access all features except the homepage. Admin functionality is restricted to users listed in the admin configuration file.

## 📋 Prerequisites

1. **Supabase Project**: You already have this configured
2. **Google OAuth App**: You need to create a Google OAuth application
3. **Environment Variables**: Configure your Supabase and Google OAuth credentials

## 🚀 Setup Steps

### 1. Create Google OAuth Application

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Configure the OAuth consent screen:
   - User Type: External
   - App name: FinIQ
   - User support email: Your email
   - Developer contact information: Your email
6. Create OAuth 2.0 Client ID:
   - Application type: Web application
   - Name: FinIQ Web Client
   - Authorized JavaScript origins: `http://localhost:3000` (for development)
   - Authorized redirect URIs: `http://localhost:3000/auth/callback` (for development)
7. Copy the Client ID and Client Secret

### 2. Configure Supabase Authentication

1. Go to your Supabase dashboard
2. Navigate to "Authentication" → "Providers"
3. Enable Google provider
4. Enter your Google OAuth credentials:
   - Client ID: Your Google OAuth Client ID
   - Client Secret: Your Google OAuth Client Secret
5. Save the configuration

### 3. Update Environment Variables

Add these to your `.env.local` file:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Google OAuth (if needed for additional configuration)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### 4. Configure Admin Users

The admin configuration is stored in `public/config/admins.txt`. Each line should contain one admin email address:

```txt
deepak.mittal@cloudkeeper.com
admin2@example.com
admin3@example.com
```

**Important**: 
- One email per line
- No extra spaces or special characters
- Emails are case-insensitive
- Lines starting with `#` are treated as comments

### 5. Test the Setup

1. Start your development server: `npm run dev`
2. Visit `http://localhost:3000`
3. Click "Sign In" in the navigation
4. Try signing in with a Google account
5. Test admin access with an email from the admin config

## 🔒 Security Features

### Authentication Flow

1. **Homepage**: Public access, no authentication required
2. **All Other Pages**: Require Google sign-in
3. **Admin Pages**: Require Google sign-in + admin email verification

### Admin Controls

- **Admin Detection**: Based on email addresses in `public/config/admins.txt`
- **Admin Features**: 
  - Access to `/admin/terms` dashboard
  - Add, edit, delete financial terms
  - View admin statistics
- **Admin UI**: Admin badge in user menu, admin-only navigation links

### User Experience

- **Unauthenticated Users**: Redirected to login page
- **Non-Admin Users**: Can access all learning modules but not admin features
- **Admin Users**: Full access including admin interface
- **Sign Out**: Available in user menu dropdown

## 🛠️ File Structure

```
src/
├── lib/
│   ├── auth.ts              # Authentication utilities
│   └── financialTerms.ts    # Database operations
├── contexts/
│   └── AuthContext.tsx      # React context for auth state
├── components/
│   └── ProtectedRoute.tsx   # Route protection component
├── app/
│   ├── login/
│   │   └── page.tsx         # Login page
│   ├── auth/
│   │   └── callback/
│   │       └── page.tsx     # OAuth callback handler
│   └── admin/               # Admin routes (protected)
public/
└── config/
    └── admins.txt           # Admin email configuration
```

## 🔧 Customization

### Adding New Admins

1. Edit `public/config/admins.txt`
2. Add the new email address on a new line
3. Save the file
4. The change takes effect immediately (no restart needed)

### Modifying Authentication

- **Change OAuth Provider**: Modify `src/lib/auth.ts`
- **Custom Login Page**: Edit `src/app/login/page.tsx`
- **Auth Callback**: Edit `src/app/auth/callback/page.tsx`

### Styling

- **Login Page**: Customize in `src/app/login/page.tsx`
- **User Menu**: Modify in `src/app/NavBar.tsx`
- **Loading States**: Update in `src/components/ProtectedRoute.tsx`

## 🚨 Troubleshooting

### Common Issues

1. **"Failed to sign in with Google"**
   - Check Google OAuth configuration
   - Verify redirect URIs match exactly
   - Ensure Google+ API is enabled

2. **"Admin access denied"**
   - Verify email is in `public/config/admins.txt`
   - Check for typos in email address
   - Ensure file is accessible at `/config/admins.txt`

3. **"Authentication failed"**
   - Check Supabase configuration
   - Verify environment variables
   - Check browser console for errors

4. **"Config file not found"**
   - Ensure `public/config/admins.txt` exists
   - Check file permissions
   - Verify file path is correct

### Debug Mode

Enable debug logging by adding to your browser console:

```javascript
localStorage.setItem('supabase.auth.debug', 'true')
```

### Production Deployment

For production deployment:

1. **Update Google OAuth**:
   - Add your production domain to authorized origins
   - Add production callback URL: `https://yourdomain.com/auth/callback`

2. **Environment Variables**:
   - Set production Supabase credentials
   - Configure production Google OAuth

3. **Admin Configuration**:
   - Update `public/config/admins.txt` with production admin emails
   - Ensure file is deployed to production

## 📚 Next Steps

With authentication set up, you can now:

1. **Add User Profiles**: Store additional user data in Supabase
2. **Track Progress**: Save quiz results and learning progress
3. **Personalization**: Customize content based on user preferences
4. **Analytics**: Track user engagement and learning patterns
5. **Content Moderation**: Review and approve user-generated content

## 🔐 Security Best Practices

1. **Regular Admin Review**: Periodically review admin access
2. **Environment Variables**: Never commit secrets to version control
3. **HTTPS**: Always use HTTPS in production
4. **Session Management**: Monitor for suspicious activity
5. **Backup**: Regularly backup admin configuration

## 📞 Support

If you encounter issues:

1. Check the browser console for error messages
2. Verify all configuration steps were completed
3. Test with a different Google account
4. Check Supabase logs for authentication errors
5. Ensure all environment variables are set correctly 