# 🚀 Laravel Inertia React Starter Kit

Modern starter kit for building web applications with **Laravel 12**, **Inertia.js v2**, and **React 19**. Includes authentication, Spatie Permission, user management, and comprehensive component library.

<p align="center">
  <img src="https://img.shields.io/badge/Laravel-12.x-FF2D20?style=for-the-badge&logo=laravel&logoColor=white" alt="Laravel">
  <img src="https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/Inertia.js-2.x-6B46C1?style=for-the-badge&logo=inertia&logoColor=white" alt="Inertia">
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind">
  <img src="https://img.shields.io/badge/Spatie_Permission-6.x-2196F3?style=for-the-badge" alt="Spatie Permission">
</p>

## 📋 Table of Contents

- [Features](#-features)
- [Requirements](#-requirements)
- [Installation](#-installation)
- [Configuration](#%EF%B8%8F-configuration)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [Components](#-components)
- [Customization](#-customization)

## ✨ Features

### 🔐 Authentication & Authorization
- Login, Register, Forgot Password, Reset Password
- Email verification (optional)
- **Spatie Laravel Permission** for roles & permissions
- 3 default roles: Super Admin, Admin, Member
- 17 granular permissions
- Permission Matrix UI for managing permissions
- Protected routes with middleware

### 👥 User Management
- CRUD users with DataTable
- Assign roles to users
- Search, sort, and pagination
- User avatar with initial generator

### 🔒 Session Management
- View all active sessions
- Revoke sessions from other devices
- Device, IP, and last activity information

### 🎨 UI/UX Features
- **5 Theme Colors**: Orange (default), Blue, Emerald, Purple, Slate
- **Customizable Alert Position**: 6 positions (top/bottom, left/center/right)
- **Responsive Design**: Mobile-first approach
- **Toast Notifications**: Success, error, info, warning alerts
- **Loading States**: Skeleton loader & spinner
- **Empty States**: Informative placeholder
- **Dark Mode Support**: Toggle between light and dark themes

### 🛠️ Developer Experience
- **React 19**: Latest React with concurrent features
- **Hot Module Replacement**: Instant preview
- **Component Library**: 40+ reusable components
- **React Context**: Global state management with contexts
- **Form Handling**: Integrated with Inertia
- **Validation**: Client & server-side

## 📦 Requirements

Make sure your system meets the following requirements:

- **PHP** >= 8.2
- **Composer** >= 2.7
- **Node.js** >= 20.0
- **NPM** >= 10.0 or Yarn
- **MySQL** >= 8.0 or PostgreSQL >= 15

## 🔧 Installation

### 1. Clone Repository

```bash
# Clone repository
git clone https://github.com/your-username/starter-kit-inertia-react.git my-app

# Enter directory
cd my-app
```

### 2. Install Dependencies

```bash
# Install PHP dependencies
composer install

# Install Node dependencies
npm install
# or using yarn
yarn install
```

### 3. Environment Setup

```bash
# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate
```

### 4. Configure Database

Edit `.env` file and configure your database:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

### 5. Run Migrations & Seeders

```bash
# Create database tables
php artisan migrate

# Seed dummy data (optional)
php artisan db:seed
```

Seeder will create:
- Super Admin: `superadmin@example.com` / `password`
- Admin: `admin@example.com` / `password`
- Member: `member@example.com` / `password`
- 50 dummy users with member role

### 6. Build Assets

```bash
# Development mode with HMR
npm run dev

# Production build
npm run build
```

### 7. Start Development Server

```bash
# Terminal 1: Laravel server
php artisan serve

# Terminal 2: Vite dev server (if not already running)
npm run dev
```

Application accessible at: `http://localhost:8000`

## ⚙️ Configuration

### Email Configuration

For email features (reset password, verification), configure in `.env`:

```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@yourapp.com
MAIL_FROM_NAME="${APP_NAME}"
```

### Storage Link

For file/image uploads:

```bash
php artisan storage:link
```

### Queue Configuration (Optional)

For background jobs:

```env
QUEUE_CONNECTION=database
```

```bash
php artisan queue:table
php artisan migrate
php artisan queue:work
```

## 💻 Usage

### Default Users

After running seeder, use the following accounts:

| Role | Email | Password |
|------|-------|----------|
| Super Admin | superadmin@example.com | password |
| Admin | admin@example.com | password |
| Member | member@example.com | password |

### Roles & Permissions

This project uses [Spatie Laravel Permission](https://spatie.be/docs/laravel-permission):

| Role | Permissions | Dashboard |
|------|-------------|-----------|
| `super-admin` | All permissions | `/admin/dashboard` |
| `admin` | User CRUD, Settings, Components | `/admin/dashboard` |
| `member` | Profile, Sessions | `/dashboard` |

**Available Permissions:**
- `user.view`, `user.create`, `user.edit`, `user.delete`
- `role.view`, `role.create`, `role.edit`, `role.delete`
- `settings.view`, `settings.edit`
- `dashboard.admin`, `dashboard.member`
- `profile.view`, `profile.edit`
- `sessions.view`, `sessions.revoke`
- `components.view`

### Route Structure

```php
// Public routes
Route::get('/', ...);
Route::get('/login', ...);
Route::get('/register', ...);

// Admin routes (super-admin & admin)
Route::middleware(['auth', 'role:super-admin,admin'])->prefix('admin')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index']);
    Route::resource('users', UserController::class);
    Route::resource('roles', RoleController::class);
    Route::resource('permissions', PermissionController::class);
    Route::get('/settings', ...);
    Route::get('/components', ...);
});

// Member routes
Route::middleware(['auth', 'role:member'])->group(function () {
    Route::get('/dashboard', ...);
    Route::get('/profile', ...);
    Route::get('/sessions', ...);
});
```

## 📁 Project Structure

```
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   └── Middleware/
│   └── Models/
├── resources/
│   ├── js/
│   │   ├── Components/        # Reusable React components
│   │   │   ├── Dashboard/     # Dashboard-specific components
│   │   │   ├── Layouts/       # Page layouts
│   │   │   ├── Shared/        # Shared components
│   │   │   └── UI/            # UI component library
│   │   │       └── Form/      # Form components
│   │   ├── Contexts/          # React contexts for state
│   │   ├── Hooks/             # Custom React hooks
│   │   ├── Pages/             # React pages
│   │   │   ├── Auth/          # Authentication pages
│   │   │   └── Dashboard/     # Dashboard pages
│   │   ├── Utils/             # Utility functions
│   │   └── app.jsx            # Main entry point
│   └── css/
│       └── app.css            # Tailwind CSS
├── routes/
│   └── web.php                # Application routes
├── database/
│   ├── migrations/
│   └── seeders/
└── tests/
```

## 🧩 Components

Starter kit provides 40+ ready-to-use components with React 19:

### UI Components
| Component | Description |
|-----------|-------------|
| `Button` | Button with variants (primary, secondary, danger, ghost, link) |
| `Card` | Container with shadow and padding |
| `Modal` | Dialog/popup with portal rendering |
| `ConfirmModal` | Confirmation modal with callback |
| `Alert` | Inline notification |
| `AlertContainer` | Toast notifications with 6 positions |
| `Badge` | Label/tag with colors |
| `Avatar` | User avatar with fallback initials |
| `Tabs` | Tab navigation |
| `Accordion` | Collapsible content |
| `Tooltip` | Hover tooltips |
| `Progress` | Progress bar |
| `Spinner` | Loading indicator |
| `Skeleton` | Loading placeholder |
| `Pagination` | Page navigation |
| `Breadcrumb` | Navigation breadcrumbs |
| `Dropdown` | Dropdown menu |
| `EmptyState` | Empty state placeholder |
| `StatCard` | Statistics card with icon |
| `Toggle` | Toggle switch |

### Form Components
| Component | Description |
|-----------|-------------|
| `TextInput` | Text input with label and error |
| `PasswordInput` | Password with visibility toggle |
| `Select` | Custom select dropdown |
| `MultiSelect` | Multi-value select with tags |
| `Textarea` | Multi-line text input |
| `Checkbox` | Custom checkbox |
| `RadioOption` | Radio button options |
| `DatePicker` | Calendar date picker |
| `FileUpload` | Drag & drop file upload |
| `TagInput` | Tag/chip input |

View all components at `/admin/components` after login.

## 🎨 Customization

### Changing Theme

1. Via UI:
   - Login as admin
   - Go to Settings
   - Select desired theme

2. Adding new theme:
```jsx
// resources/js/Contexts/ThemeContext.jsx
const presetThemes = {
    indigo: {
        name: 'Indigo Night',
        primary600: '#4f46e5',
    },
    // ... add more themes
};
```

3. Update CSS variables:
```css
/* resources/css/app.css */
[data-theme='indigo'] {
    --theme-primary-50: #eef2ff;
    --theme-primary-100: #e0e7ff;
    /* ... other color shades */
}
```

### Adding Role & Permission

```php
// database/seeders/RolePermissionSeeder.php

// Add new permissions
$permissions = [
    // ... existing
    'report.view',
    'report.export',
];

// Create new role
$editor = Role::create(['name' => 'editor']);
$editor->givePermissionTo(['report.view', 'report.export']);

// Run: php artisan db:seed --class=RolePermissionSeeder
```

### Using Permissions in React

```jsx
import { usePage } from '@inertiajs/react';

function MyComponent() {
    const { auth } = usePage().props;
    const user = auth?.user;
    
    const canCreateUser = user?.permissions?.includes('user.create');
    const isAdmin = user?.roles?.some(r => ['admin', 'super-admin'].includes(r));
    
    return (
        <>
            {canCreateUser && (
                <Button>Create User</Button>
            )}
        </>
    );
}
```

### Creating Custom Hooks

```jsx
// resources/js/Hooks/usePermission.js
import { usePage } from '@inertiajs/react';

export function usePermission() {
    const { auth } = usePage().props;
    const user = auth?.user;
    
    const can = (permission) => {
        return user?.permissions?.includes(permission) ?? false;
    };
    
    const hasRole = (role) => {
        return user?.roles?.includes(role) ?? false;
    };
    
    return { can, hasRole, user };
}
```

## 📚 Resources

- [Laravel Documentation](https://laravel.com/docs)
- [Inertia.js Documentation](https://inertiajs.com)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

## 👨‍💻 Author

Created with ❤️ for the Laravel & React community

---

<p align="center">
  <strong>Happy Coding! 🎉</strong>
</p>
