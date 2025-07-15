# Media Management Module

This module provides comprehensive media management functionality for the iLearn admin panel, including video content and testimonials management.

## Features

### ✅ Implemented Features

1. **Media Listing**

   - Paginated table view with search functionality
   - Sortable columns (order, description, status)
   - Real-time statistics (total, active, testimonials)
   - Responsive design for mobile and desktop

2. **Create Media**

   - Modal form with validation
   - Support for video URLs
   - Description field with character limit
   - Order management for display sequence
   - Active/Inactive status toggle
   - Testimonial flag

3. **Edit Media**

   - Data preloading on edit
   - Form pre-populated with existing data
   - Loading states during data fetch
   - Validation and error handling

4. **Delete Media**

   - Confirmation dialog
   - Soft delete with proper error handling
   - Automatic refresh after deletion

5. **Pagination**

   - Configurable page sizes (10, 20, 50, 100)
   - Quick jump functionality
   - Total count display
   - Responsive pagination controls

6. **Search & Filter**

   - Real-time search by description
   - Clear search functionality
   - Case-insensitive filtering

7. **Loading States**
   - Table loading spinner
   - Modal loading states
   - Button loading indicators
   - Error handling with user feedback

## API Integration

### Endpoints Used

- `GET /v1/media?page=1&limit=10` - List media with pagination
- `GET /v1/media/{id}` - Get single media item
- `POST /v1/media` - Create new media
- `PATCH /v1/media/{id}` - Update media
- `DELETE /v1/media/{id}` - Delete media

### Request/Response Format

```typescript
// Create/Update Request
{
  "description": "Educational video about mathematics",
  "video": "https://example.com/video.mp4",
  "order": 1,
  "isActive": true,
  "isTestimonial": false
}

// Response Format
{
  "status": true,
  "data": {
    "id": "uuid",
    "description": "string",
    "video": "string",
    "order": number,
    "isActive": boolean,
    "isTestimonial": boolean,
    "createdAt": "string",
    "updatedAt": "string"
  },
  "message": "string"
}
```

## File Structure

```
src/app/admin/media/
├── page.tsx              # Main media management page
├── styles.scss           # Component-specific styles
└── README.md            # This documentation

src/services/
└── media.service.ts     # API service layer
```

## Components Used

- **Ant Design Components**: Table, Modal, Form, Button, Input, Switch, Pagination, Card, Statistic
- **Custom Hooks**: useState, useEffect for state management
- **Service Layer**: mediaService for API communication

## Styling

- Responsive design with mobile-first approach
- Consistent with admin panel design system
- Hover effects and smooth transitions
- Dark mode support (if enabled)
- Custom SCSS with BEM methodology

## Error Handling

- Network error handling with user-friendly messages
- Form validation with real-time feedback
- Loading states for better UX
- Graceful degradation for failed operations

## Performance Optimizations

- Debounced search functionality
- Efficient pagination
- Optimized re-renders
- Lazy loading of modal content

## Usage

1. Navigate to `/admin/media` in the admin panel
2. Use the "Add New Media" button to create new entries
3. Click the edit icon to modify existing media
4. Use the search bar to filter media by description
5. Adjust pagination settings as needed
6. Toggle media status and testimonial flags as required

## Future Enhancements

- Bulk operations (delete, status change)
- Advanced filtering (by status, date range)
- Media preview functionality
- File upload integration
- Export functionality
- Audit trail
- Media categories/tags
