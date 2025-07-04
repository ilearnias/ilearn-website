# Admin Authentication System

This document describes the admin authentication system implemented for the iLearn website.

## Overview

The admin authentication system provides secure access to the admin panel with the following features:

- Protected admin routes
- Login/logout functionality
- Authentication state management
- Responsive admin interface

## Routes

### Public Routes

- `/adminlogin` - Admin login page

### Protected Routes (require authentication)

- `/admin/dashboard` - Main admin dashboard
- `/admin/team` - Team management page

## Authentication Flow

1. **Login**: Users access `/adminlogin` and enter credentials
2. **Authentication**: System validates credentials (currently mocked)
3. **Session**: On successful login, user is redirected to `/admin/dashboard`
4. **Protection**: All admin routes are protected and redirect to login if not authenticated
5. **Logout**: Users can logout from the admin navbar

## Current Mock Credentials

For testing purposes, use these credentials:

- **Email**: `admin@ilearn.com`
- **Password**: `admin123`

## File Structure

```
src/
├── app/
│   ├── adminlogin/
│   │   ├── layout.tsx          # Auth provider wrapper
│   │   ├── page.tsx            # Login page
│   │   └── styles.scss         # Login styles
│   └── admin/
│       ├── layout.tsx          # Admin layout with protection
│       ├── styles.scss         # Admin layout styles
│       ├── components/
│       │   ├── AdminNavbar.tsx # Navigation component
│       │   └── AdminNavbar.scss
│       ├── dashboard/
│       │   ├── page.tsx        # Dashboard page
│       │   └── styles.scss     # Dashboard styles
│       └── team/
│           ├── page.tsx        # Team management page
│           └── styles.scss     # Team styles
├── components/
│   └── ProtectedRoute.tsx      # Route protection component
└── contexts/
    └── AdminAuthContext.tsx    # Authentication context
```

## Key Components

### AdminAuthContext

Manages authentication state and provides login/logout methods.

### ProtectedRoute

Wraps admin pages to ensure only authenticated users can access them.

### AdminNavbar

Provides navigation and logout functionality for authenticated users.

## API Integration

To integrate with a real API, update the `login` method in `AdminAuthContext.tsx`:

```typescript
const login = async (email: string, password: string): Promise<boolean> => {
  try {
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    console.log('is this login',data)

    // Store auth token and user data
    localStorage.setItem("adminToken", data.token);
    localStorage.setItem("adminUser", JSON.stringify(data.user));

    setUser(data.user);
    return true;
  } catch (error) {
    console.error("Login error:", error);
    return false;
  }
};
```

## Security Considerations

1. **Token Storage**: Currently using localStorage. Consider using httpOnly cookies for production.
2. **Token Validation**: Implement server-side token validation for each request.
3. **Session Management**: Add token expiration and refresh mechanisms.
4. **Rate Limiting**: Implement rate limiting on login attempts.
5. **HTTPS**: Ensure all admin routes use HTTPS in production.

## Adding New Admin Pages

1. Create the page in `src/app/admin/[page-name]/`
2. The page will automatically be protected by the admin layout
3. Add navigation link in `AdminNavbar.tsx` if needed

## Styling

The admin interface uses SCSS with a modern, responsive design. All styles are modular and follow a consistent design system.

## Browser Support

The admin interface is responsive and works on:

- Desktop browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Tablet browsers
