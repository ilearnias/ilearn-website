// Base API URL configuration
export const API_CONFIG = {
  BASE_URL: "https://ilearn-server.bairuhatech.com",
  // BASE_URL: "http://localhost:8011",
};

// API Endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: "/v1/auth/login",
    LOGOUT: "/v1/auth/logout",
    REFRESH_TOKEN: "/v1/auth/refresh-token",
    VERIFY_TOKEN: "/v1/auth/verify-token",
  },

  // Admin Dashboard endpoints
  ADMIN: {
    // Results management
    RESULTS: {
      LIST: "/v1/admin/results",
      DETAIL: (id: string) => `/v1/admin/results/${id}`,
      CREATE: "/v1/admin/results",
      UPDATE: (id: string) => `/v1/admin/results/${id}`,
      DELETE: (id: string) => `/v1/admin/results/${id}`,
      SUMMARY: "/v1/admin/results/summary",
      EXPORT: "/v1/admin/results/export",
    },

    // Programs management
    PROGRAMS: {
      LIST: "/v1/admin/programs",
      DETAIL: (id: string) => `/v1/admin/programs/${id}`,
      CREATE: "/v1/admin/programs",
      UPDATE: (id: string) => `/v1/admin/programs/${id}`,
      DELETE: (id: string) => `/v1/admin/programs/${id}`,
    },

    // Success Stories management
    SUCCESS_STORIES: {
      LIST: "/v1/admin/success-stories",
      DETAIL: (id: string) => `/v1/admin/success-stories/${id}`,
      CREATE: "/v1/admin/success-stories",
      UPDATE: (id: string) => `/v1/admin/success-stories/${id}`,
      DELETE: (id: string) => `/v1/admin/success-stories/${id}`,
      UPLOAD: "/v1/upload/image",
    },

    // Team management
    TEAM: {
      LIST: "/v1/admin/team",
      DETAIL: (id: string) => `/v1/admin/team/${id}`,
      CREATE: "/v1/admin/team",
      UPDATE: (id: string) => `/v1/admin/team/${id}`,
      DELETE: (id: string) => `/v1/admin/team/${id}`,
      UPLOAD: "/v1/upload/image",
    },

    // Gallery management
    GALLERY: {
      // Gallery items (unified endpoint)
      ITEMS: {
        LIST: "/v1/admin/gallery",
        DETAIL: (id: string) => `/v1/admin/gallery/${id}`,
        CREATE: "/v1/admin/gallery",
        UPDATE: (id: string) => `/v1/admin/gallery/${id}`,
        DELETE: (id: string) => `/v1/admin/gallery/${id}`,
      },
      // Image upload endpoint
      // UPLOAD: "/v1/admin/gallery/upload",
      UPLOAD: "/v1/upload/image",
    },

    // Blog management
    BLOG: {
      POSTS: {
        LIST: "/v1/admin/blog/posts",
        DETAIL: (id: string) => `/v1/admin/blog/posts/${id}`,
        CREATE: "/v1/admin/blog/posts",
        UPDATE: (id: string) => `/v1/admin/blog/posts/${id}`,
        DELETE: (id: string) => `/v1/admin/blog/posts/${id}`,
      },
      CATEGORIES: {
        LIST: "/v1/admin/blog/categories",
        DETAIL: (id: string) => `/v1/admin/blog/categories/${id}`,
        CREATE: "/v1/admin/blog/categories",
        UPDATE: (id: string) => `/v1/admin/blog/categories/${id}`,
        DELETE: (id: string) => `/v1/admin/blog/categories/${id}`,
      },
    },

    // Contact management
    CONTACTS: {
      LIST: "/v1/admin/contacts",
      DETAIL: (id: string) => `/v1/admin/contacts/${id}`,
      CREATE: "/v1/admin/contacts",
      UPDATE: (id: string) => `/v1/admin/contacts/${id}`,
      DELETE: (id: string) => `/v1/admin/contacts/${id}`,
    },

    // Achievers management
    ACHIEVERS: {
      LIST: "/v1/admin/achievers",
      DETAIL: (id: string) => `/v1/admin/achievers/${id}`,
      CREATE: "/v1/admin/achievers",
      UPDATE: (id: string) => `/v1/admin/achievers/${id}`,
      DELETE: (id: string) => `/v1/admin/achievers/${id}`,
      UPLOAD: "/v1/upload/image",
    },

    // File upload endpoint
    UPLOAD: {
      IMAGE: "/v1/upload/image",
    },

    // Dashboard statistics
    DASHBOARD: {
      STATS: "/v1/admin/dashboard/stats",
      RECENT_ACTIVITIES: "/v1/admin/dashboard/activities",
      PERFORMANCE_METRICS: "/v1/admin/dashboard/performance",
    },

    // Journey management
    JOURNEY: {
      LIST: "/v1/journey",
      DETAIL: (id: string) => `/v1/journey/${id}`,
      CREATE: "/v1/journey",
      UPDATE: (id: string) => `/v1/journey/${id}`,
      DELETE: (id: string) => `/v1/journey/${id}`,
    },
  },

  // Public endpoints
  PUBLIC: {
    PROGRAMMES: "/v1/programmes",
    PROGRAMS: "/v1/admin/programs", // Using admin endpoint for now, can be changed to public endpoint when available
    SUCCESS_STORIES: "/v1/success-stories",
    TEAM: "/v1/team",
    GALLERY: "/v1/admin/gallery",
    MEDIA: "/v1/media",
    BLOG: {
      POSTS: "/v1/blog/posts",
      CATEGORIES: "/v1/blog/categories",
    },
    CONTACT: "/v1/contact",
    JOURNEY: "/v1/journey",
  },
};
