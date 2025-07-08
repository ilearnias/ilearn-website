# iLearn Website

A comprehensive educational platform built with Next.js, featuring admin dashboard functionality for managing various content modules.

## Features

### Admin Dashboard Modules

#### Gallery Module
- **Image Upload**: Supports multiple image uploads with drag-and-drop functionality
- **File Validation**: Validates image formats (JPEG, PNG, GIF, WebP) and file size (max 5MB)
- **CRUD Operations**: Create, read, update, and delete gallery items
- **Image Management**: Organize images with titles, descriptions, and display order

#### Success Stories Module
- **Image Upload**: Single image upload with preview functionality
- **File Validation**: Validates image formats (JPEG, PNG, GIF, WebP) and file size (max 5MB)
- **CRUD Operations**: Create, read, update, and delete success stories
- **Content Management**: Manage student success stories with images, descriptions, and details

#### Achievers Module
- **Image Upload**: Single image upload with preview functionality
- **File Validation**: Validates image formats (JPEG, PNG, GIF, WebP) and file size (max 5MB)
- **CRUD Operations**: Create, read, update, and delete achievers
- **Content Management**: Manage student achievements with images, descriptions, and details

### Image Upload Features

All modules now support image upload functionality with the following features:

- **Supported Formats**: JPEG, PNG, GIF, WebP
- **File Size Limit**: Maximum 5MB per file
- **Preview**: Image preview before upload
- **Validation**: Client-side validation for file type and size
- **Error Handling**: Comprehensive error messages for invalid files
- **Upload Progress**: Visual feedback during upload process

### API Endpoints

The following upload endpoints are available:

- **Gallery**: `/v1/admin/gallery/upload`
- **Success Stories**: `/v1/admin/success-stories/upload`
- **Achievers**: `/v1/admin/achievers/upload`

### Technical Implementation

#### Services
- `galleryService`: Handles gallery image uploads and management
- `successStoryService`: Handles success story image uploads and management
- `achieverService`: Handles achiever image uploads and management

#### Components
- Upload components with drag-and-drop support
- Image preview functionality
- File validation and error handling
- Progress indicators for upload status

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   NEXT_PUBLIC_API_URL=your_api_url
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Access the admin dashboard at `/admin`

## File Structure

```
src/
├── app/
│   ├── admin/
│   │   ├── gallery/
│   │   ├── success-stories/
│   │   └── achievers/
│   └── ...
├── services/
│   ├── gallery.service.ts
│   ├── success-stories.service.ts
│   └── achievers.service.ts
└── config/
    └── api.ts
```

## Recent Updates

### Image Upload Implementation
- Added image upload functionality to Success Stories and Achievers modules
- Replaced URL input fields with file upload components
- Implemented file validation and error handling
- Added proper API endpoints for image uploads
- Enhanced user experience with preview and progress indicators

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
