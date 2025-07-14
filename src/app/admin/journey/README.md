# Journey Management Module

This module provides comprehensive journey management functionality for the iLearn admin panel, including company milestones and journey timeline management.

## Features

### ✅ Implemented Features

1. **Journey Listing**
   - Paginated table view with search functionality
   - Sortable columns (year, order, description)
   - Real-time search by description or year
   - Responsive design for mobile and desktop

2. **Create Journey**
   - Modal form with validation
   - Year field with 4-digit validation
   - Description field with character limit (500 chars)
   - Image upload with preview
   - Order management for display sequence
   - Active/Inactive status toggle

3. **Edit Journey**
   - **Data preloading on edit** - fetches fresh data when editing
   - Form pre-populated with existing data
   - Image preview in upload component
   - Loading states during data fetch
   - Validation and error handling

4. **Delete Journey**
   - Confirmation dialog
   - Proper error handling for 404s
   - Automatic refresh after deletion

5. **Pagination**
   - Configurable page sizes (10, 20, 50, 100)
   - Quick jump functionality
   - Total count display
   - Responsive pagination controls

6. **Search & Filter**
   - Real-time search by description or year
   - Clear search functionality
   - Case-insensitive filtering

7. **Loading States**
   - Table loading spinner
   - Modal loading states with "Loading journey data..." message
   - Button loading indicators
   - Error handling with user-friendly messages

8. **Image Upload**
   - Drag and drop image upload
   - File validation (size, format)
   - Image preview
   - Supported formats: JPEG, PNG, GIF, WebP
   - Max file size: 5MB

## API Integration

### Endpoints Used

- `GET /v1/journey?page=1&limit=10` - List journey items with pagination
- `GET /v1/journey/{id}` - Get single journey item
- `POST /v1/journey` - Create new journey item
- `PATCH /v1/journey/{id}` - Update journey item
- `DELETE /v1/journey/{id}` - Delete journey item
- `POST /v1/upload/image` - Upload image

### Request/Response Format

```typescript
// Create/Update Request
{
  "year": "2023",
  "description": "Our journey began with a vision to transform education",
  "media": "https://example.com/journey-image.jpg",
  "order": 1,
  "isActive": true
}

// Response Format
{
  "status": true,
  "data": {
    "id": "uuid",
    "year": "string",
    "description": "string",
    "media": "string",
    "order": number,
    "isActive": boolean,
    "createdAt": "string",
    "updatedAt": "string"
  },
  "message": "string"
}
```

## File Structure

```
src/app/admin/journey/
├── page.tsx              # Main journey management page
├── styles.scss           # Component-specific styles
└── README.md            # This documentation

src/services/
└── journey.service.ts   # API service layer
```

## Components Used

- **Ant Design Components**: Table, Modal, Form, Button, Input, Switch, Upload, Image, Dropdown, Menu
- **Custom Hooks**: useState, useEffect for state management
- **Service Layer**: journeyService for API communication

## Styling

- Responsive design with mobile-first approach
- Consistent with admin panel design system
- Hover effects and smooth transitions
- Custom SCSS with BEM methodology
- Matches success-stories and media page themes

## Error Handling

- Network error handling with user-friendly messages
- Form validation with real-time feedback
- Loading states for better UX
- Graceful degradation for failed operations
- Image upload validation

## Performance Optimizations

- Efficient pagination
- Optimized re-renders
- Lazy loading of modal content
- Image compression and validation

## Usage

1. Navigate to `/admin/journey` in the admin panel
2. Use the "Add Journey" button to create new entries
3. Click the edit icon to modify existing journey items
4. Use the search bar to filter journey by description or year
5. Adjust pagination settings as needed
6. Upload images for journey milestones
7. Toggle journey status as required

## Form Validation

- **Year**: Required, must be 4-digit format (e.g., 2023)
- **Description**: Required, max 500 characters
- **Order**: Required, minimum value 1
- **Media**: Optional, supports image upload
- **Status**: Boolean toggle for active/inactive

## Future Enhancements

- Bulk operations (delete, status change)
- Advanced filtering (by year range, status)
- Journey timeline visualization
- Export functionality
- Audit trail
- Journey categories/tags
- Video upload support
- Rich text editor for descriptions 