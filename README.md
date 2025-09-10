# 🎬 MovieMate

A modern, responsive movie search application built with Next.js 15, React 19, and TypeScript. MovieMate allows users to search for movies using the OMDb API and view detailed information about their favorite films.

![MovieMate](https://img.shields.io/badge/Next.js-15.5.2-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

- 🔍 **Advanced Movie Search**: Search for movies by title, actor, director, or genre
- 📱 **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- 🌙 **Dark Mode Support**: Built-in dark/light theme toggle
- 🎯 **Detailed Movie Information**: Comprehensive movie details including:
  - IMDb ratings and Metascore
  - Plot summaries and cast information
  - Release dates, runtime, and genre tags
  - Box office performance and awards
  - External ratings from multiple sources
- 🖼️ **Smart Image Handling**: Automatic fallback for missing movie posters
- ⚡ **Fast Performance**: Optimized with Next.js 15 and React 19
- 🎨 **Modern UI**: Beautiful interface built with Tailwind CSS and Radix UI components

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm, yarn, pnpm, or bun
- OMDb API key (free at [omdbapi.com](http://www.omdbapi.com/apikey.aspx))

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd moviemate
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   OMDB_API_KEY=your_omdb_api_key_here
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 🏗️ Project Structure

```
moviemate/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/
│   │   │   └── movies/         # API routes for movie data
│   │   ├── movie/
│   │   │   └── [id]/          # Dynamic movie detail pages
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout component
│   │   └── page.tsx           # Home page with search
│   ├── components/
│   │   ├── movie/
│   │   │   └── MoviePoster.tsx # Movie poster component
│   │   └── ui/                # Reusable UI components
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       └── skeleton.tsx
│   └── lib/
│       └── utils.ts           # Utility functions
├── public/                    # Static assets
├── components.json            # shadcn/ui configuration
├── next.config.ts            # Next.js configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies and scripts
```

## 🛠️ Tech Stack

### Core Technologies
- **Next.js 15.5.2** - React framework with App Router
- **React 19.1.0** - Latest React with concurrent features
- **TypeScript 5.0** - Type-safe JavaScript
- **Tailwind CSS 4.0** - Utility-first CSS framework

### UI Components
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library
- **shadcn/ui** - Pre-built component library

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **PostCSS** - CSS processing

## 📡 API Integration

MovieMate integrates with the **OMDb API** (Open Movie Database) to fetch movie data:

- **Search Endpoint**: `/api/movies?q={query}` - Search for movies by title
- **Details Endpoint**: `/api/movies?id={imdbID}` - Get detailed movie information

### API Features
- Real-time movie search
- Comprehensive movie details
- IMDb ratings and Metascore
- Cast and crew information
- Box office data and awards

## 🎨 UI/UX Features

### Search Experience
- **Smart Search Bar**: Real-time search with keyboard shortcuts
- **Quick Suggestions**: Popular movie suggestions for easy discovery
- **Loading States**: Skeleton loaders for better perceived performance
- **Error Handling**: User-friendly error messages and retry options

### Movie Display
- **Grid Layout**: Responsive movie grid with hover effects
- **Movie Cards**: Clean card design with essential information
- **Image Optimization**: Next.js Image component with automatic optimization
- **Fallback Images**: Graceful handling of missing movie posters

### Movie Details Page
- **Comprehensive Information**: All movie details in organized sections
- **Rating Display**: Visual representation of IMDb and Metascore ratings
- **Responsive Layout**: Optimized for all screen sizes
- **Navigation**: Easy back-to-search functionality

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your `OMDB_API_KEY` environment variable
4. Deploy automatically

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📝 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
```

## 🔧 Configuration

### Environment Variables
- `OMDB_API_KEY` - Your OMDb API key (required)
- `NEXT_PUBLIC_BASE_URL` - Base URL for API calls (optional, defaults to localhost)

### Customization
- **Styling**: Modify `tailwind.config.js` for custom themes
- **Components**: Customize UI components in `src/components/ui/`
- **API**: Extend API routes in `src/app/api/`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [OMDb API](http://www.omdbapi.com/) for providing movie data
- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Lucide](https://lucide.dev/) for the icon library

## 📞 Support

If you have any questions or need help with the project, please:
- Open an issue on GitHub
- Check the documentation
- Review the code comments

---

**Made with ❤️ using Next.js, React, and TypeScript**
