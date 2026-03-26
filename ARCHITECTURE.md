# Westwood Development Corporation - Project Management System (PMS)
## Frontend Architecture Documentation

---

## Table of Contents
1. [Overview](#overview)
2. [Technology Stack](#technology-stack)
3. [Folder Structure](#folder-structure)
4. [Design System](#design-system)
5. [Role-Based Access Control](#role-based-access-control)
6. [Page List](#page-list)
7. [Reusable Components](#reusable-components)
8. [API Requirements](#api-requirements)
9. [Recommended Libraries](#recommended-libraries)

---

## Overview

The Westwood PMS is a modern web application designed to help monitor construction projects, track progress, manage documents, and generate reports in a centralized digital platform.

### Target Users
- **Admin**: Full system access
- **Project Engineer**: Construction project updates and monitoring
- **Operations Staff**: Project coordination and documentation
- **Viewer**: Read-only access

---

## Technology Stack

| Category | Technology |
|----------|------------|
| Framework | React 18+ |
| Build Tool | Vite |
| Styling | TailwindCSS |
| State Management | React Context + React Query |
| Routing | React Router v6 |
| Forms | React Hook Form + Zod |
| Charts | Recharts / Chart.js |
| Tables | TanStack Table |
| Icons | Lucide React |
| HTTP Client | Axios |
| Notifications | React Hot Toast |
| Date Handling | date-fns |

---

## Folder Structure

```
/src
├── /assets              # Static assets (images, fonts, icons)
│   ├── /images
│   ├── /icons
│   └── /fonts
│
├── /components          # Reusable UI components
│   ├── /common          # Generic components (Button, Input, Modal)
│   ├── /charts          # Chart components
│   ├── /tables          # Table components
│   ├── /forms           # Form components
│   ├── /navigation      # Sidebar, Navbar
│   └── /feedback        # Alerts, Toasts, Loading
│
├── /pages               # Route-based page components
│   ├── /auth            # Login, ForgotPassword
│   ├── /dashboard       # Dashboard views
│   ├── /projects        # Project management pages
│   ├── /progress        # Progress tracking pages
│   ├── /reports         # Report pages
│   ├── /documents       # Document management pages
│   ├── /clients         # Client management pages
│   ├── /users           # User management pages
│   └── /settings        # System settings pages
│
├── /layouts             # Layout components
│   ├── DashboardLayout.jsx
│   ├── AuthLayout.jsx
│   └── PublicLayout.jsx
│
├── /hooks               # Custom React hooks
│   ├── useAuth.js
│   ├── useProjects.js
│   ├── usePermissions.js
│   └── ...
│
├── /services            # API service layer
│   ├── api.js           # Axios instance
│   ├── authService.js
│   ├── projectService.js
│   └── ...
│
├── /context             # React Context providers
│   ├── AuthContext.jsx
│   ├── ThemeContext.jsx
│   └── NotificationContext.jsx
│
├── /utils               # Utility functions
│   ├── constants.js
│   ├── helpers.js
│   ├── formatters.js
│   └── validators.js
│
├── /routes              # Route configuration
│   ├── index.jsx
│   ├── ProtectedRoute.jsx
│   ├── RoleGuard.jsx
│   └── routeConfig.js
│
├── /config              # App configuration
│   ├── permissions.js
│   ├── menuConfig.js
│   └── apiConfig.js
│
├── /types               # TypeScript types (if using TS)
│   └── ...
│
├── App.jsx
├── main.jsx
└── index.css
```

### Folder Purposes

| Folder | Purpose |
|--------|---------|
| `/assets` | Static files like images, logos, fonts, and SVG icons |
| `/components` | Reusable UI building blocks organized by category |
| `/pages` | Top-level route components, one per URL route |
| `/layouts` | Page wrapper components with common structure (sidebar, navbar) |
| `/hooks` | Custom React hooks for shared logic and API calls |
| `/services` | API communication layer with Axios |
| `/context` | Global state management with React Context |
| `/utils` | Helper functions, constants, and formatters |
| `/routes` | Route configuration and protected route components |
| `/config` | Application configuration files |

---

## Design System

### Color Palette - Gold & Black Construction Theme

```css
/* Primary Colors */
--gold-50: #fefce8;
--gold-100: #fef9c3;
--gold-200: #fef08a;
--gold-300: #fde047;
--gold-400: #facc15;
--gold-500: #d4a012;     /* Primary Gold */
--gold-600: #b8860b;     /* Dark Gold */
--gold-700: #a16207;
--gold-800: #854d0e;
--gold-900: #713f12;

/* Neutral/Black Colors */
--black-50: #fafafa;
--black-100: #f4f4f5;
--black-200: #e4e4e7;
--black-300: #d4d4d8;
--black-400: #a1a1aa;
--black-500: #71717a;
--black-600: #52525b;
--black-700: #3f3f46;
--black-800: #27272a;    /* Primary Dark */
--black-900: #18181b;    /* Darkest */
--black-950: #09090b;

/* Semantic Colors */
--success: #22c55e;
--warning: #f59e0b;
--error: #ef4444;
--info: #3b82f6;

/* Background Colors */
--bg-primary: #0f0f0f;
--bg-secondary: #1a1a1a;
--bg-tertiary: #242424;
--bg-card: #1f1f1f;
--bg-hover: #2a2a2a;

/* Text Colors */
--text-primary: #ffffff;
--text-secondary: #a1a1aa;
--text-muted: #71717a;
--text-gold: #d4a012;
```

### Typography

```css
/* Font Family */
font-family: 'Inter', 'SF Pro Display', system-ui, sans-serif;

/* Font Sizes */
--text-xs: 0.75rem;      /* 12px */
--text-sm: 0.875rem;     /* 14px */
--text-base: 1rem;       /* 16px */
--text-lg: 1.125rem;     /* 18px */
--text-xl: 1.25rem;      /* 20px */
--text-2xl: 1.5rem;      /* 24px */
--text-3xl: 1.875rem;    /* 30px */
--text-4xl: 2.25rem;     /* 36px */

/* Font Weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### Component Styles

#### Buttons
```
Primary Button: Gold background, black text, gold hover glow
Secondary Button: Transparent with gold border, gold text
Danger Button: Red background, white text
Ghost Button: Transparent, gold text on hover
```

#### Cards
```
Background: #1f1f1f
Border: 1px solid #2a2a2a
Border Radius: 12px
Shadow: Subtle gold glow on hover
```

#### Forms
```
Input Background: #242424
Border: 1px solid #3f3f46
Focus Border: Gold (#d4a012)
Placeholder: #71717a
```

#### Tables
```
Header Background: #1a1a1a
Row Hover: #242424
Border: #2a2a2a
Striped Rows: Alternating #1a1a1a and #1f1f1f
```

---

## Role-Based Access Control

### Permission Matrix

| Module | Action | Admin | Project Engineer | Operations Staff | Viewer |
|--------|--------|-------|------------------|------------------|--------|
| **Dashboard** | View | ✅ | ✅ | ✅ | ✅ |
| **Projects** | View | ✅ | ✅ (Assigned) | ✅ | ✅ |
| **Projects** | Create | ✅ | ❌ | ✅ | ❌ |
| **Projects** | Edit | ✅ | ❌ | ✅ | ❌ |
| **Projects** | Delete | ✅ | ❌ | ❌ | ❌ |
| **Progress** | View | ✅ | ✅ | ✅ | ✅ |
| **Progress** | Create | ✅ | ✅ | ❌ | ❌ |
| **Progress** | Edit | ✅ | ✅ | ❌ | ❌ |
| **Progress** | Delete | ✅ | ❌ | ❌ | ❌ |
| **Documents** | View | ✅ | ✅ | ✅ | ✅ |
| **Documents** | Upload | ✅ | ✅ | ✅ | ❌ |
| **Documents** | Delete | ✅ | ❌ | ✅ | ❌ |
| **Reports** | View | ✅ | ✅ | ✅ | ✅ |
| **Reports** | Generate | ✅ | ✅ | ✅ | ❌ |
| **Reports** | Export | ✅ | ✅ | ✅ | ✅ |
| **Clients** | View | ✅ | ✅ | ✅ | ✅ |
| **Clients** | Create | ✅ | ❌ | ✅ | ❌ |
| **Clients** | Edit | ✅ | ❌ | ✅ | ❌ |
| **Clients** | Delete | ✅ | ❌ | ❌ | ❌ |
| **Users** | View | ✅ | ❌ | ❌ | ❌ |
| **Users** | Create | ✅ | ❌ | ❌ | ❌ |
| **Users** | Edit | ✅ | ❌ | ❌ | ❌ |
| **Users** | Delete | ✅ | ❌ | ❌ | ❌ |
| **Settings** | View | ✅ | ❌ | ❌ | ❌ |
| **Settings** | Manage | ✅ | ❌ | ❌ | ❌ |

### Route Access by Role

| Route | Admin | Project Engineer | Operations Staff | Viewer |
|-------|-------|------------------|------------------|--------|
| `/dashboard` | ✅ | ✅ | ✅ | ✅ |
| `/projects` | ✅ | ✅ | ✅ | ✅ |
| `/projects/create` | ✅ | ❌ | ✅ | ❌ |
| `/projects/:id/edit` | ✅ | ❌ | ✅ | ❌ |
| `/progress` | ✅ | ✅ | ✅ | ✅ |
| `/progress/update` | ✅ | ✅ | ❌ | ❌ |
| `/site-reports` | ✅ | ✅ | ✅ | ✅ |
| `/site-reports/upload` | ✅ | ✅ | ❌ | ❌ |
| `/documents` | ✅ | ✅ | ✅ | ✅ |
| `/documents/upload` | ✅ | ✅ | ✅ | ❌ |
| `/clients` | ✅ | ✅ | ✅ | ✅ |
| `/clients/create` | ✅ | ❌ | ✅ | ❌ |
| `/reports` | ✅ | ✅ | ✅ | ✅ |
| `/users` | ✅ | ❌ | ❌ | ❌ |
| `/settings` | ✅ | ❌ | ❌ | ❌ |

---

## Page List

### Authentication Module
| Page | Route | Description |
|------|-------|-------------|
| Login | `/login` | User authentication |
| Forgot Password | `/forgot-password` | Password recovery |
| Reset Password | `/reset-password/:token` | Password reset form |

### Dashboard Module
| Page | Route | Description |
|------|-------|-------------|
| Main Dashboard | `/dashboard` | KPIs, charts, project overview |

### Projects Module
| Page | Route | Description |
|------|-------|-------------|
| Project List | `/projects` | All projects with filters |
| Project Details | `/projects/:id` | Detailed project view |
| Create Project | `/projects/create` | New project form |
| Edit Project | `/projects/:id/edit` | Edit project form |
| Project Timeline | `/projects/:id/timeline` | Gantt chart view |
| Project Assignments | `/projects/:id/assignments` | Team assignments |

### Progress Tracking Module
| Page | Route | Description |
|------|-------|-------------|
| Milestone Tracking | `/progress` | All milestones overview |
| Project Progress | `/progress/:projectId` | Project-specific progress |
| Update Progress | `/progress/:projectId/update` | Progress update form |

### Site Reports Module
| Page | Route | Description |
|------|-------|-------------|
| Report List | `/site-reports` | All site reports |
| Report Details | `/site-reports/:id` | Report detail view |
| Upload Report | `/site-reports/upload` | Upload new report |

### Document Management Module
| Page | Route | Description |
|------|-------|-------------|
| Document Library | `/documents` | All documents |
| Document Viewer | `/documents/:id` | View document |
| Upload Document | `/documents/upload` | Upload new document |
| Document Categories | `/documents/categories` | Manage categories |

### Clients Module
| Page | Route | Description |
|------|-------|-------------|
| Client List | `/clients` | All clients |
| Client Profile | `/clients/:id` | Client details |
| Create Client | `/clients/create` | New client form |
| Edit Client | `/clients/:id/edit` | Edit client form |

### Reports Module
| Page | Route | Description |
|------|-------|-------------|
| Report Dashboard | `/reports` | Report overview |
| Progress Reports | `/reports/progress` | Progress summaries |
| Status Reports | `/reports/status` | Project status reports |
| Performance Reports | `/reports/performance` | Performance metrics |

### User Management Module (Admin Only)
| Page | Route | Description |
|------|-------|-------------|
| User List | `/users` | All system users |
| User Details | `/users/:id` | User profile |
| Create User | `/users/create` | New user form |
| Edit User | `/users/:id/edit` | Edit user form |
| Role Management | `/users/roles` | Role configuration |

### Settings Module (Admin Only)
| Page | Route | Description |
|------|-------|-------------|
| General Settings | `/settings` | System settings |
| Company Profile | `/settings/company` | Company information |
| Notification Settings | `/settings/notifications` | Notification config |
| Backup & Restore | `/settings/backup` | Data management |

---

## Reusable Components

### Navigation Components
| Component | Description |
|-----------|-------------|
| `Sidebar` | Main navigation sidebar with role-based menu |
| `Navbar` | Top navigation with user menu, notifications |
| `Breadcrumb` | Navigation breadcrumb trail |
| `MobileNav` | Responsive mobile navigation |

### Layout Components
| Component | Description |
|-----------|-------------|
| `DashboardLayout` | Main app layout with sidebar |
| `AuthLayout` | Login/auth pages layout |
| `PageHeader` | Page title and actions header |
| `ContentWrapper` | Page content container |

### Route Guards
| Component | Description |
|-----------|-------------|
| `ProtectedRoute` | Auth-required route wrapper |
| `RoleGuard` | Role-based access control |
| `PermissionGuard` | Permission-based access control |

### Data Display
| Component | Description |
|-----------|-------------|
| `DataTable` | Sortable, filterable data table |
| `KPICard` | Dashboard metric card |
| `StatCard` | Statistics display card |
| `ProjectCard` | Project summary card |
| `ProgressBar` | Progress indicator bar |
| `StatusBadge` | Color-coded status indicator |
| `Timeline` | Vertical timeline display |
| `Avatar` | User avatar component |

### Charts
| Component | Description |
|-----------|-------------|
| `ProgressChart` | Circular/linear progress |
| `BarChart` | Bar chart wrapper |
| `LineChart` | Line chart wrapper |
| `PieChart` | Pie/donut chart wrapper |
| `GanttChart` | Project timeline chart |

### Forms
| Component | Description |
|-----------|-------------|
| `FormInput` | Text input with validation |
| `FormSelect` | Dropdown select |
| `FormTextarea` | Multi-line text input |
| `FormDatePicker` | Date selection |
| `FormFileUpload` | File upload with preview |
| `FormCheckbox` | Checkbox input |
| `FormRadio` | Radio button group |
| `FormSwitch` | Toggle switch |

### Feedback
| Component | Description |
|-----------|-------------|
| `Modal` | Dialog modal |
| `ConfirmDialog` | Confirmation dialog |
| `Toast` | Notification toast |
| `Alert` | Alert message box |
| `Spinner` | Loading spinner |
| `Skeleton` | Loading skeleton |
| `EmptyState` | Empty data placeholder |
| `ErrorBoundary` | Error handling wrapper |

### Common
| Component | Description |
|-----------|-------------|
| `Button` | Styled button variants |
| `Card` | Card container |
| `Dropdown` | Dropdown menu |
| `Tabs` | Tab navigation |
| `Tooltip` | Hover tooltip |
| `Badge` | Label/tag badge |
| `Divider` | Visual separator |
| `SearchInput` | Search with suggestions |

---

## API Requirements

### Authentication API

```
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/refresh-token
POST   /api/auth/forgot-password
POST   /api/auth/reset-password
GET    /api/auth/me
```

#### Request/Response Examples

**Login**
```json
// POST /api/auth/login
// Request
{
  "email": "user@westwood.com",
  "password": "password123"
}

// Response
{
  "success": true,
  "data": {
    "user": {
      "id": "usr_123",
      "email": "user@westwood.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "project_engineer",
      "avatar": "/avatars/john.jpg"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

### Projects API

```
GET    /api/projects                    # List all projects
GET    /api/projects/:id                # Get project details
POST   /api/projects                    # Create project
PUT    /api/projects/:id                # Update project
DELETE /api/projects/:id                # Delete project
GET    /api/projects/:id/team           # Get project team
POST   /api/projects/:id/team           # Add team member
DELETE /api/projects/:id/team/:userId   # Remove team member
GET    /api/projects/:id/timeline       # Get project timeline
```

#### Request/Response Examples

**List Projects**
```json
// GET /api/projects?status=active&page=1&limit=10
// Response
{
  "success": true,
  "data": {
    "projects": [
      {
        "id": "prj_123",
        "name": "Westwood Tower Phase 1",
        "code": "WT-P1",
        "status": "in_progress",
        "progress": 67,
        "startDate": "2025-01-15",
        "endDate": "2026-06-30",
        "budget": 15000000,
        "client": {
          "id": "cli_456",
          "name": "Westwood Holdings Inc."
        },
        "projectManager": {
          "id": "usr_789",
          "name": "Jane Smith"
        },
        "location": "Metro Manila, Philippines",
        "thumbnail": "/projects/wt-p1.jpg"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "totalPages": 5,
      "totalItems": 47
    }
  }
}
```

**Create Project**
```json
// POST /api/projects
// Request
{
  "name": "Westwood Tower Phase 2",
  "code": "WT-P2",
  "description": "Second phase of Westwood Tower development",
  "startDate": "2026-07-01",
  "endDate": "2028-12-31",
  "budget": 25000000,
  "clientId": "cli_456",
  "projectManagerId": "usr_789",
  "location": "Metro Manila, Philippines",
  "type": "high_rise"
}

// Response
{
  "success": true,
  "data": {
    "id": "prj_124",
    "name": "Westwood Tower Phase 2",
    "code": "WT-P2",
    "status": "planning",
    "progress": 0,
    "createdAt": "2026-03-12T10:30:00Z"
  }
}
```

### Progress API

```
GET    /api/projects/:id/progress              # Get project progress
POST   /api/projects/:id/progress              # Create progress update
PUT    /api/progress/:progressId               # Update progress entry
DELETE /api/progress/:progressId               # Delete progress entry
GET    /api/projects/:id/milestones            # Get project milestones
POST   /api/projects/:id/milestones            # Create milestone
PUT    /api/milestones/:milestoneId            # Update milestone
DELETE /api/milestones/:milestoneId            # Delete milestone
```

#### Request/Response Examples

**Create Progress Update**
```json
// POST /api/projects/prj_123/progress
// Request
{
  "date": "2026-03-12",
  "percentage": 70,
  "description": "Completed floor 15 concrete pouring",
  "milestoneId": "mls_456",
  "weather": "clear",
  "workersOnSite": 45,
  "issues": [],
  "photos": ["photo1.jpg", "photo2.jpg"]
}

// Response
{
  "success": true,
  "data": {
    "id": "prg_789",
    "projectId": "prj_123",
    "date": "2026-03-12",
    "percentage": 70,
    "previousPercentage": 67,
    "createdBy": {
      "id": "usr_123",
      "name": "John Doe"
    },
    "createdAt": "2026-03-12T14:30:00Z"
  }
}
```

### Documents API

```
GET    /api/documents                          # List all documents
GET    /api/documents/:id                      # Get document details
POST   /api/documents                          # Upload document
PUT    /api/documents/:id                      # Update document metadata
DELETE /api/documents/:id                      # Delete document
GET    /api/documents/:id/download             # Download document
GET    /api/projects/:id/documents             # Get project documents
GET    /api/documents/categories               # List document categories
```

#### Request/Response Examples

**Upload Document**
```json
// POST /api/documents (multipart/form-data)
// Request
{
  "file": <binary>,
  "projectId": "prj_123",
  "category": "engineering_plans",
  "title": "Floor Plan Level 15",
  "description": "Architectural floor plan for level 15",
  "tags": ["floor_plan", "architecture", "level_15"]
}

// Response
{
  "success": true,
  "data": {
    "id": "doc_456",
    "title": "Floor Plan Level 15",
    "filename": "floor_plan_l15.pdf",
    "fileSize": 2456789,
    "mimeType": "application/pdf",
    "category": "engineering_plans",
    "projectId": "prj_123",
    "uploadedBy": {
      "id": "usr_123",
      "name": "John Doe"
    },
    "uploadedAt": "2026-03-12T10:30:00Z",
    "url": "/api/documents/doc_456/download"
  }
}
```

### Site Reports API

```
GET    /api/site-reports                       # List all site reports
GET    /api/site-reports/:id                   # Get report details
POST   /api/site-reports                       # Create site report
PUT    /api/site-reports/:id                   # Update site report
DELETE /api/site-reports/:id                   # Delete site report
GET    /api/projects/:id/site-reports          # Get project site reports
```

### Clients API

```
GET    /api/clients                            # List all clients
GET    /api/clients/:id                        # Get client details
POST   /api/clients                            # Create client
PUT    /api/clients/:id                        # Update client
DELETE /api/clients/:id                        # Delete client
GET    /api/clients/:id/projects               # Get client projects
```

### Reports API

```
GET    /api/reports/dashboard                  # Dashboard summary
GET    /api/reports/projects                   # Project reports
GET    /api/reports/progress                   # Progress reports
GET    /api/reports/performance                # Performance reports
POST   /api/reports/generate                   # Generate custom report
GET    /api/reports/:id/export                 # Export report (PDF/Excel)
```

### Users API (Admin Only)

```
GET    /api/users                              # List all users
GET    /api/users/:id                          # Get user details
POST   /api/users                              # Create user
PUT    /api/users/:id                          # Update user
DELETE /api/users/:id                          # Delete user
PUT    /api/users/:id/role                     # Update user role
PUT    /api/users/:id/status                   # Activate/deactivate user
GET    /api/users/:id/activity                 # Get user activity log
```

### Settings API (Admin Only)

```
GET    /api/settings                           # Get all settings
PUT    /api/settings                           # Update settings
GET    /api/settings/company                   # Get company profile
PUT    /api/settings/company                   # Update company profile
POST   /api/settings/backup                    # Create backup
POST   /api/settings/restore                   # Restore from backup
```

---

## Recommended Libraries

### Core
| Library | Version | Purpose |
|---------|---------|---------|
| react | ^18.2.0 | UI framework |
| react-dom | ^18.2.0 | React DOM renderer |
| react-router-dom | ^6.22.0 | Routing |
| @tanstack/react-query | ^5.24.0 | Server state management |
| axios | ^1.6.7 | HTTP client |

### Styling
| Library | Version | Purpose |
|---------|---------|---------|
| tailwindcss | ^3.4.1 | Utility CSS framework |
| @headlessui/react | ^1.7.18 | Unstyled accessible components |
| clsx | ^2.1.0 | Conditional class names |
| tailwind-merge | ^2.2.1 | Merge Tailwind classes |

### Forms
| Library | Version | Purpose |
|---------|---------|---------|
| react-hook-form | ^7.50.1 | Form management |
| zod | ^3.22.4 | Schema validation |
| @hookform/resolvers | ^3.3.4 | Form validation resolvers |

### UI Components
| Library | Version | Purpose |
|---------|---------|---------|
| lucide-react | ^0.336.0 | Icon library |
| @radix-ui/react-* | latest | Primitive UI components |
| react-hot-toast | ^2.4.1 | Toast notifications |
| react-dropzone | ^14.2.3 | File upload |

### Data Display
| Library | Version | Purpose |
|---------|---------|---------|
| @tanstack/react-table | ^8.12.0 | Data tables |
| recharts | ^2.12.0 | Charts library |
| react-gantt-timeline | ^2.3.0 | Gantt charts |
| date-fns | ^3.3.1 | Date utilities |

### Development
| Library | Version | Purpose |
|---------|---------|---------|
| typescript | ^5.3.3 | Type safety (optional) |
| eslint | ^8.56.0 | Code linting |
| prettier | ^3.2.5 | Code formatting |

---

## Database Models (Suggested)

Based on the API requirements, here are the suggested database models:

### User
```
- id (UUID)
- email (String, unique)
- password (String, hashed)
- firstName (String)
- lastName (String)
- role (Enum: admin, project_engineer, operations_staff, viewer)
- avatar (String, nullable)
- phone (String, nullable)
- status (Enum: active, inactive)
- lastLoginAt (DateTime, nullable)
- createdAt (DateTime)
- updatedAt (DateTime)
```

### Project
```
- id (UUID)
- code (String, unique)
- name (String)
- description (Text)
- status (Enum: planning, in_progress, on_hold, completed, cancelled)
- progress (Integer, 0-100)
- startDate (Date)
- endDate (Date)
- budget (Decimal)
- actualCost (Decimal)
- location (String)
- type (Enum: residential, commercial, industrial, infrastructure)
- clientId (FK -> Client)
- projectManagerId (FK -> User)
- thumbnail (String, nullable)
- createdAt (DateTime)
- updatedAt (DateTime)
```

### ProjectTeam
```
- id (UUID)
- projectId (FK -> Project)
- userId (FK -> User)
- role (String)
- assignedAt (DateTime)
```

### Milestone
```
- id (UUID)
- projectId (FK -> Project)
- name (String)
- description (Text)
- targetDate (Date)
- completedDate (Date, nullable)
- status (Enum: pending, in_progress, completed, delayed)
- order (Integer)
- createdAt (DateTime)
- updatedAt (DateTime)
```

### ProgressUpdate
```
- id (UUID)
- projectId (FK -> Project)
- milestoneId (FK -> Milestone, nullable)
- date (Date)
- percentage (Integer, 0-100)
- description (Text)
- weather (String, nullable)
- workersOnSite (Integer, nullable)
- issues (JSON)
- photos (JSON)
- createdById (FK -> User)
- createdAt (DateTime)
- updatedAt (DateTime)
```

### Document
```
- id (UUID)
- projectId (FK -> Project)
- title (String)
- description (Text, nullable)
- filename (String)
- fileSize (Integer)
- mimeType (String)
- category (Enum: contracts, engineering_plans, permits, site_photos, reports, other)
- tags (JSON)
- filePath (String)
- uploadedById (FK -> User)
- uploadedAt (DateTime)
- updatedAt (DateTime)
```

### SiteReport
```
- id (UUID)
- projectId (FK -> Project)
- title (String)
- date (Date)
- weather (String)
- workersOnSite (Integer)
- workPerformed (Text)
- materialsUsed (JSON)
- issues (JSON)
- safetyIncidents (JSON)
- photos (JSON)
- createdById (FK -> User)
- createdAt (DateTime)
- updatedAt (DateTime)
```

### Client
```
- id (UUID)
- name (String)
- contactPerson (String)
- email (String)
- phone (String)
- address (Text)
- type (Enum: individual, corporation, government)
- status (Enum: active, inactive)
- notes (Text, nullable)
- createdAt (DateTime)
- updatedAt (DateTime)
```

---

This documentation provides a complete blueprint for the frontend architecture. The implementation files in this project contain working code examples for all components, pages, and features described above.
