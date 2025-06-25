## Next Posts Dashboard

A modern single-page application (SPA) built with **Next.js**, **React**, **Redux**, **Material UI**, and **Bootstrap** to manage blog posts using the [JSONPlaceholder REST API](https://jsonplaceholder.typicode.com/guide/).

## ✨ Features

- **User Authentication Simulation**: Select from real users via JSONPlaceholder API
- **User-filtered Posts**: View posts belonging to the selected (active) user
- **SPA Navigation**: State-based view switching without page reloads or Next.js routing
- **User Profile Management**: Complete user profile view with personal information, contact details, address, and company information
- **Post Details with Comments**: Full post view displaying content and all associated comments from the JSONPlaceholder API
- List posts in a paginated, searchable datatable with sorting and selection
- Create new posts via a modal form with validation (assigned to active user)
- Edit existing posts
- Delete posts (single and bulk operations)
- Real-time user notifications for all actions
- **Dark/Light Theme Support**: Toggle between custom-designed light and dark themes
- Responsive and accessible UI with admin dashboard design

## 🧭 Navigation Architecture

This application follows a **true SPA (Single Page Application)** pattern:

- **Single Entry Point**: Only `pages/index.tsx` is used - no additional route files
- **State-based Navigation**: View switching is controlled by local React state
- **No Page Reloads**: All transitions happen without browser navigation
- **Conditional Rendering**: Different views are rendered based on state values

### View States

The app switches between different main views using state-based navigation:

- `posts` - Main posts management dashboard with user selection, search, and data table
- `profile` - Complete user profile view with contact information, address, and company details
- `postDetails` - Individual post details view with full content and comments section
- `form` - Post creation/editing modal interface (overlay)

All navigation is handled through state management instead of traditional routing, providing a seamless single-page application experience.

## 🔥 Key Functionalities

### 📊 Posts Management Dashboard

- **Paginated Data Grid**: Display posts in a Material-UI DataGrid with search, sorting, and filtering
- **Bulk Operations**: Select multiple posts for batch deletion with confirmation dialogs
- **CRUD Operations**: Create, read, update, and delete posts with real-time feedback
- **User-based Filtering**: Automatically filter posts by the selected active user

### 👤 User Profile Management

- **Comprehensive Profile View**: Display complete user information including:
  - Personal details (name, username, avatar)
  - Contact information (email, phone, website)
  - Address details with coordinates
  - Company information and business focus
- **Responsive Design**: Optimized layout for desktop and mobile devices
- **Avatar Generation**: Automatic avatar creation with unique colors based on user name

### 📝 Post Details & Comments

- **Full Post View**: Complete post content display with rich text formatting
- **Comments Integration**: Fetch and display all comments for each post via `GET /posts/:id/comments`
- **Comment Threads**: Organized comment display with:
  - Author information and avatars
  - Email addresses and timestamps
  - Threaded conversation layout
- **Loading States**: Skeleton loading animations while fetching comments
- **Error Handling**: Graceful error states for failed comment loading

### 🎨 Theme System

- **Light/Dark Mode**: Toggle between carefully designed light and dark themes
- **Custom Color Palette**: Material-UI themes with consistent branding
- **Persistent Preferences**: Theme selection saved in Redux state

### 🔔 Notification System

- **Global Notifications**: Redux-managed notification system with:
  - Success, error, warning, and info message types
  - Auto-dismiss functionality with configurable duration
  - Slide-in animations and stacking support
- **Action Feedback**: Immediate user feedback for all CRUD operations

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **UI Components**: [Material UI](https://mui.com/) + [Bootstrap](https://getbootstrap.com/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Language**: TypeScript

## 🔗 API Endpoints Used

This application integrates with the [JSONPlaceholder REST API](https://jsonplaceholder.typicode.com/):

- `GET /users` - Fetch all available users for authentication simulation
- `GET /posts?userId={id}` - Fetch posts filtered by user ID
- `GET /posts/{id}/comments` - Fetch all comments for a specific post
- `POST /posts` - Create new posts (simulated)
- `PUT /posts/{id}` - Update existing posts (simulated)
- `DELETE /posts/{id}` - Delete posts (simulated)

## 📁 Estructura del Proyecto

La estructura del proyecto está organizada para facilitar la mantenibilidad y escalabilidad, siguiendo las convenciones de Next.js.

```bash
/src
├── /components         # Componentes de React
│   ├── /common         # Componentes genéricos y reutilizables (Botones, Modales, etc.)
│   └── /posts          # Componentes específicos para la gestión de posts
├── /hooks              # Hooks personalizados de React
├── /pages              # Páginas de la aplicación y rutas de la API
│   ├── /api            # Endpoints de la API de Next.js
│   └── /_app.tsx       # Componente principal de la aplicación
├── /store              # Configuración del estado global con Redux Toolkit
│   ├── /slices         # Definiciones de los estados parciales
│   └── /index.ts       # Configuración del store de Redux
├── /services           # Lógica para interactuar con APIs externas (ej. JSONPlaceholder)
├── /styles             # Archivos de estilos globales y temas (CSS/SCSS)
├── /types              # Interfaces y tipos de TypeScript
└── /utils              # Funciones de utilidad compartidas
```

## 🚀 Getting Started

1. **Clone the repository**

```bash
git clone https://github.com/your-username/next-posts-dashboard.git
cd next-posts-dashboard
```

2. Install dependencies

```bash
npm install
```

3. Run the development server

```bash
npm run dev
```

4. Open your browser

Visit [http://localhost:3000](http://localhost:3000https:/)

## 📦 Build & Deploy

To create a production build:

```bash
npm run build
npm start
```

Optional: Deploy instantly on Vercel by connecting your GitHub repository.

## ✅ Evaluation Criteria

This project demonstrates:

- **Clean Architecture**: Modular component structure with separation of concerns
- **Advanced State Management**: Redux Toolkit with multiple slices (posts, auth, comments, notifications, theme)
- **API Integration**: Multiple JSONPlaceholder endpoints with proper error handling
- **Real-time User Experience**: Immediate feedback, loading states, and smooth transitions
- **Form Validation**: React Hook Form integration with validation and error messaging
- **Modern UI/UX**: Material-UI components with custom theming and responsive design
- **SPA Navigation**: State-based routing without page reloads
- **Comment System**: Full implementation of post comments with user avatars and threading
- **User Management**: Complete user profile system with detailed information display
- **Accessibility**: Semantic HTML, ARIA labels, and keyboard navigation support
- **Performance**: Optimized rendering with proper React patterns and state management

## 📄 License

```yaml
Let me know if you want this exported as a file or extended with GitHub badges, code snippets, or Vercel deployment instructions.
```
