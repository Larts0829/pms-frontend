# Westwood Development Corporation - Project Management System (PMS)

A modern, full-featured Project Management System designed for construction companies. Built with React, Vite, and TailwindCSS with a premium Gold & Black theme.

## 🏗️ Features

### Core Modules

- **Dashboard** - Real-time KPIs, project overview, and activity feed
- **Projects** - Full project lifecycle management with phases
- **Progress Tracking** - Log and monitor construction progress
- **Site Reports** - Daily progress, safety, and inspection reports
- **Documents** - Centralized document management with categories
- **Clients** - Client relationship management
- **Reports** - Generate and download various report types
- **User Management** - Role-based user administration (Admin)
- **Settings** - System configuration (Admin)

### Role-Based Access Control (RBAC)

| Role | Access Level |
|------|-------------|
| **Admin** | Full access to all modules including user management and settings |
| **Project Engineer** | Create/edit projects, log progress, manage documents |
| **Operations Staff** | Log progress, create site reports, upload documents |
| **Viewer** | Read-only access to projects, documents, and reports |

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Navigate to the project directory
cd pms-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@westwoodpms.com | admin123 |
| Project Engineer | engineer@westwoodpms.com | engineer123 |
| Operations Staff | ops@westwoodpms.com | ops123 |
| Viewer | viewer@westwoodpms.com | viewer123 |

## 📁 Project Structure

```
pms-frontend/
├── public/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── common/         # Button, Card, Badge, Modal, etc.
│   │   ├── forms/          # Form input components
│   │   ├── navigation/     # Sidebar, Navbar
│   │   └── tables/         # DataTable with sorting/filtering
│   ├── config/             # App configuration
│   │   ├── apiConfig.js    # API endpoints
│   │   ├── menuConfig.js   # Navigation menu structure
│   │   └── permissions.js  # RBAC configuration
│   ├── context/            # React Context providers
│   │   └── AuthContext.jsx # Authentication state
│   ├── hooks/              # Custom React hooks
│   │   ├── useAuth.js
│   │   ├── usePermissions.js
│   │   └── useProjects.js
│   ├── layouts/            # Page layouts
│   │   ├── AuthLayout.jsx  # Login/auth pages
│   │   └── DashboardLayout.jsx # Main app layout
│   ├── pages/              # Page components
│   │   ├── auth/           # Login, Forgot Password
│   │   ├── dashboard/      # Main dashboard
│   │   ├── projects/       # Project CRUD
│   │   ├── progress/       # Progress tracking
│   │   ├── site-reports/   # Site report management
│   │   ├── documents/      # Document management
│   │   ├── clients/        # Client management
│   │   ├── reports/        # Report generation
│   │   ├── users/          # User management (Admin)
│   │   └── settings/       # System settings (Admin)
│   ├── routes/             # Route guards
│   │   ├── ProtectedRoute.jsx
│   │   └── RoleGuard.jsx
│   ├── services/           # API service layer
│   │   ├── authService.js
│   │   ├── projectService.js
│   │   └── ...
│   ├── utils/              # Utility functions
│   │   ├── constants.js
│   │   ├── formatters.js
│   │   └── helpers.js
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles & design system
├── package.json
├── vite.config.js
├── tailwind.config.js
└── ARCHITECTURE.md         # Detailed architecture documentation
```

## 🎨 Design System

### Color Palette

- **Primary (Gold)**: `#d4a012` - Buttons, links, accents
- **Background**: `#0a0a0a` to `#1a1a1a` - Dark theme
- **Text**: White for headings, gray for body text
- **Status Colors**:
  - Success: Green (`#22c55e`)
  - Warning: Yellow (`#eab308`)
  - Error: Red (`#ef4444`)
  - Info: Blue (`#3b82f6`)

### Component Classes

Pre-built component styles in `index.css`:

```css
/* Buttons */
.btn-primary    /* Gold background */
.btn-secondary  /* Dark background */
.btn-outline    /* Border only */
.btn-danger     /* Red/error */
.btn-ghost      /* Transparent */

/* Cards */
.card           /* Dark card container */

/* Form Elements */
.input          /* Text input */
.select         /* Dropdown */
.textarea       /* Multi-line input */

/* Badges */
.badge-success  /* Green status */
.badge-warning  /* Yellow status */
.badge-error    /* Red status */
```

## 🔌 Backend API Requirements

The frontend expects the following API endpoints:

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh token
- `POST /api/auth/forgot-password` - Password reset request

### Projects
- `GET /api/projects` - List all projects
- `GET /api/projects/:id` - Get project details
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Progress
- `GET /api/progress` - List progress entries
- `POST /api/progress` - Log new progress
- `GET /api/progress/:id` - Get progress details

### Site Reports
- `GET /api/site-reports` - List reports
- `POST /api/site-reports` - Create report
- `GET /api/site-reports/:id` - Get report details

### Documents
- `GET /api/documents` - List documents
- `POST /api/documents/upload` - Upload document
- `DELETE /api/documents/:id` - Delete document

### Clients
- `GET /api/clients` - List clients
- `POST /api/clients` - Create client
- `GET /api/clients/:id` - Get client details
- `PUT /api/clients/:id` - Update client

### Users (Admin)
- `GET /api/users` - List all users
- `POST /api/users` - Create user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

See `ARCHITECTURE.md` for complete API specifications with request/response schemas.

## 📦 Key Dependencies

| Package | Purpose |
|---------|---------|
| `react` | UI framework |
| `react-router-dom` | Routing |
| `@tanstack/react-query` | Server state management |
| `react-hook-form` | Form handling |
| `zod` | Schema validation |
| `axios` | HTTP client |
| `tailwindcss` | Styling |
| `lucide-react` | Icons |
| `recharts` | Charts |
| `@tanstack/react-table` | Data tables |

## 🔧 Configuration

### Environment Variables

Create a `.env` file:

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_NAME=Westwood PMS
```

### Vite Configuration

Path aliases configured in `vite.config.js`:
- `@/` → `src/`
- `@components` → `src/components`
- `@pages` → `src/pages`
- `@hooks` → `src/hooks`
- `@services` → `src/services`
- `@utils` → `src/utils`
- `@config` → `src/config`

## 📄 License

Proprietary - Westwood Development Corporation

---

Built with ❤️ for Westwood Development Corporation
