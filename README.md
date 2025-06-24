## Next Posts Dashboard

A modern single-page application (SPA) built with **Next.js**, **React**, **Redux**, **Material UI**, and **Bootstrap** to manage blog posts using the [JSONPlaceholder REST API](https://jsonplaceholder.typicode.com/guide/).

## ✨ Features

- **User Authentication Simulation**: Select from real users via JSONPlaceholder API
- **User-filtered Posts**: View posts belonging to the selected (active) user
- **SPA Navigation**: State-based view switching without page reloads or Next.js routing
- List posts in a paginated, searchable datatable with sorting and selection
- Create new posts via a modal form with validation (assigned to active user)
- Edit existing posts
- Delete posts
- Real-time user notifications for all actions
- Responsive and accessible UI

## 🧭 Navigation Architecture

This application follows a **true SPA (Single Page Application)** pattern:

- **Single Entry Point**: Only `pages/index.tsx` is used - no additional route files
- **State-based Navigation**: View switching is controlled by local React state
- **No Page Reloads**: All transitions happen without browser navigation
- **Conditional Rendering**: Different views are rendered based on state values

### View States

The app switches between three main views:

- `list` - Main posts table with user selection
- `form` - Post creation/editing interface
- `details` - Individual post details view

All navigation is handled through state management instead of traditional routing.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **UI Components**: [Material UI](https://mui.com/) + [Bootstrap](https://getbootstrap.com/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Language**: TypeScript

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

- Clean architecture with modular components
- Robust state management via Redux
- API integration and error handling
- Form validation and modal interaction
- Modern UI and mobile-first responsiveness
- Accessible and user-friendly interactions

## 📄 License

```yaml
Let me know if you want this exported as a file or extended with GitHub badges, code snippets, or Vercel deployment instructions.
```
