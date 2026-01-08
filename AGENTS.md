# Agent Guide for React Starter Kit

This document provides guidance for AI agents working with this Laravel + Inertia.js + React codebase.

## Project Overview

This is a **Laravel 12 + Inertia.js + React 19** starter kit with:
- Authentication (Login, Register, Password Reset)
- Role-based authorization using Spatie Permission
- Admin dashboard with user management
- Component library with 40+ reusable components

## Tech Stack

- **Backend**: Laravel 12, PHP 8.2+
- **Frontend**: React 19, Inertia.js v2
- **Styling**: Tailwind CSS v4
- **Build Tool**: Vite 7
- **Authorization**: Spatie Laravel Permission

## Project Structure

```
├── app/                    # Laravel application code
│   ├── Http/Controllers/   # Controllers
│   ├── Models/             # Eloquent models
│   └── ...
├── resources/
│   ├── js/
│   │   ├── Components/     # React components
│   │   │   ├── Dashboard/  # Dashboard-specific components
│   │   │   ├── Layouts/    # Layout components
│   │   │   ├── Shared/     # Shared components
│   │   │   └── UI/         # UI component library
│   │   │       └── Form/   # Form components
│   │   ├── Contexts/       # React context providers
│   │   ├── Hooks/          # Custom React hooks
│   │   ├── Pages/          # Inertia pages
│   │   │   ├── Auth/       # Authentication pages
│   │   │   └── Dashboard/  # Dashboard pages
│   │   ├── Utils/          # Utility functions
│   │   ├── app.js          # Entry point
│   │   └── app.jsx         # React app setup
│   └── css/
│       └── app.css         # Tailwind CSS with themes
├── routes/
│   └── web.php             # Application routes
└── ...
```

## Component Conventions

### Creating New Components

1. **File Location**: Place in `resources/js/Components/UI/` or appropriate subdirectory
2. **File Naming**: Use PascalCase (e.g., `MyComponent.jsx`)
3. **Export**: Use default export for main component

```jsx
// Good component structure
export default function MyComponent({ prop1, prop2, className = '' }) {
    return (
        <div className={`base-classes ${className}`}>
            {/* Component content */}
        </div>
    );
}
```

### Using Theme Colors

Use Tailwind's primary color classes which are theme-aware:

```jsx
// ✅ Correct - uses theme colors
<div className="bg-primary-600 text-primary-100">
<button className="hover:bg-primary-700">

// ❌ Avoid - hardcoded colors
<div className="bg-orange-600">
```

Available themes: `orange`, `blue`, `emerald`, `purple`, `slate`

### State Management

- **Global State**: Use React Context (`AlertContext`, `ThemeContext`)
- **Page State**: Use `useState` / `useReducer`
- **Form State**: Use Inertia's `useForm` hook

```jsx
import { useForm } from '@inertiajs/react';
import { useAlert } from '@/Contexts/AlertContext';

function MyForm() {
    const { addAlert } = useAlert();
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
    });
    
    const submit = (e) => {
        e.preventDefault();
        post('/users', {
            onSuccess: () => addAlert('User created!', 'success'),
        });
    };
}
```

## Available Components

### UI Components
- `Button` - Primary action button with variants
- `Card` - Container with shadow
- `Modal` - Dialog overlay
- `ConfirmModal` - Confirmation dialog
- `Spinner` - Loading indicator
- `Skeleton` - Loading placeholder
- `Progress` - Progress bar
- `Badge` - Label/tag
- `Avatar` - User avatar with initials fallback
- `Tabs` - Tab navigation
- `Accordion` - Collapsible sections
- `Toggle` - Switch toggle
- `Tooltip` - Hover tooltip
- `Dropdown` - Dropdown menu
- `EmptyState` - Empty content placeholder
- `StatCard` - Statistics card
- `Pagination` - Page navigation
- `Breadcrumb` - Navigation breadcrumbs

### Form Components
- `TextInput` - Text input with label/error
- `PasswordInput` - Password with visibility toggle
- `Textarea` - Multi-line input
- `Select` - Custom select dropdown
- `Checkbox` - Custom checkbox
- `RadioOption` - Radio buttons
- `DatePicker` - Calendar picker
- `FileUpload` - Drag & drop upload
- `MultiSelect` - Multi-value select
- `TagInput` - Tag/chip input

## Custom Hooks

Located in `resources/js/Hooks/index.js`:

- `useAlert()` - Show toast notifications
- `useTheme()` - Access/change theme
- `usePermission()` - Check user permissions
- `useDebounce()` - Debounce values
- `useLocalStorage()` - Persist to localStorage
- `useClickOutside()` - Detect outside clicks
- `useMediaQuery()` - Check media queries
- `useIsMobile()` - Check mobile viewport
- `useCopyToClipboard()` - Copy to clipboard
- `useToggle()` - Boolean toggle

## Utility Functions

Located in `resources/js/Utils/`:

### Formatters (`formatters.js`)
- `formatDate()` - Format date to locale string
- `formatDateTime()` - Format with time
- `formatRelativeTime()` - "2 hours ago"
- `formatCurrency()` - Currency formatting
- `formatNumber()` - Number with separators
- `formatFileSize()` - Bytes to KB/MB/GB
- `truncateText()` - Text with ellipsis
- `getInitials()` - Name to initials

### Portal (`portal.js`)
- `getModalContainer()` - Get/create modal portal
- `getTooltipContainer()` - Get/create tooltip portal
- `getDropdownContainer()` - Get/create dropdown portal

## Authorization Patterns

### In Components

```jsx
import { usePermission } from '@/Hooks';

function MyComponent() {
    const { can, hasRole, isAdmin } = usePermission();
    
    return (
        <>
            {can('user.create') && <Button>Create User</Button>}
            {isAdmin() && <AdminPanel />}
        </>
    );
}
```

### In Blade (Server-side)

```php
@can('user.create')
    // Show create button
@endcan

@role('admin')
    // Admin only content
@endrole
```

## Common Tasks

### Adding a New Page

1. Create controller: `php artisan make:controller MyController`
2. Add route in `routes/web.php`
3. Create page component in `resources/js/Pages/`
4. Use appropriate layout (`DashboardLayout` or `AuthLayout`)

### Adding a New Form

```jsx
import { useForm } from '@inertiajs/react';
import { TextInput, Button } from '@/Components/UI';

export default function CreatePage() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
    });
    
    const submit = (e) => {
        e.preventDefault();
        post(route('items.store'));
    };
    
    return (
        <form onSubmit={submit}>
            <TextInput
                label="Name"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                error={errors.name}
            />
            <Button type="submit" loading={processing}>
                Save
            </Button>
        </form>
    );
}
```

## LARANGAN (JANGAN DILAKUKAN)

### Build & Environment

- **JANGAN** jalankan `npm run build` - Project dalam mode development, gunakan `npm run dev` untuk HMR
- **JANGAN** jalankan `composer install --no-dev` - Dependencies dev diperlukan
- **JANGAN** modifikasi file `.env` production settings
- **JANGAN** commit file `node_modules/`, `vendor/`, atau `.env`



## Important Notes

1. **Always use theme colors** instead of hardcoded colors
2. **Use Inertia's `route()` helper** for generating URLs
3. **Add proper error handling** to forms
4. **Include loading states** for async operations
5. **Follow component structure** conventions
6. **Export new components** from `Components/UI/index.js`
