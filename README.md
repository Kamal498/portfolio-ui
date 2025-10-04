# Portfolio Website

A modern, scalable personal portfolio website built with React.js featuring a blog section with full CRUD functionality. This website showcases personal information, projects, achievements, and allows creating and managing blog posts.

## Features

### Core Sections
- **Home**: Hero section with featured projects and call-to-action
- **About**: Personal information, skills, work experience, and education
- **Projects**: Filterable project showcase with tags
- **Achievements**: Display of awards, certifications, and milestones
- **Blog**: Full-featured blog with CRUD operations
- **Contact**: Contact form and social media links

### Blog Features
- ✍️ Create, edit, and delete blog posts
- 📝 Markdown support for rich content formatting
- 🏷️ Tag-based organization
- 🔍 Search functionality
- 💾 Local storage persistence using Zustand
- 📱 Responsive design

### Technical Highlights
- **Modern Stack**: React 18 + Vite for fast development
- **Routing**: React Router v6 for seamless navigation
- **State Management**: Zustand with persistence
- **Styling**: CSS modules with modern design
- **Icons**: Lucide React for beautiful icons
- **Markdown**: React Markdown for blog content

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio-website
```

2. Install dependencies:
```bash
npm install
```

### Running the Development Server

Start the development server with hot reload:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (default Vite port).

### Building for Production

Create a production build:
```bash
npm run build
```

### Preview Production Build

Preview the production build locally:
```bash
npm run preview
```

## Project Structure
## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
