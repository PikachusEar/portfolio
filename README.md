# Portfolio Website

A modern, responsive portfolio website built with React, Vite, and Tailwind CSS. Features a clean design with smooth animations and custom cursor effects.

## Features

- **Modern Tech Stack**: React 19, Vite 6, Tailwind CSS
- **Responsive Design**: Mobile-first approach with breakpoint optimizations
- **Interactive Elements**: Custom cursor, hover effects, smooth scrolling
- **Component Architecture**: Atomic design pattern with reusable components
- **Performance Optimized**: Fast loading with Vite's optimized bundling

## Project Structure

```
src/
├── components/
│   ├── atoms/          # Basic UI elements (HeroButton, Heading, Text, etc.)
│   ├── molecules/      # Component combinations (NavItem, ProjectCard, etc.)
│   ├── organisms/      # Complex sections (Navigation, HeroSection, etc.)
│   └── templates/      # Page layouts (Portfolio)
├── data/
│   └── defaultData.js  # All portfolio content and configuration
├── service/
│   └── api.js          # API utilities
└── index.css          # Global styles and Tailwind imports
```

## Sections

- **Hero**: Introduction with call-to-action buttons
- **About**: Personal description with social links
- **Experience**: Work history timeline
- **Projects**: Portfolio showcase grid
- **Skills**: Technical skills by category
- **Blog**: Recent articles
- **Contact**: Get in touch section

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd portfolio
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Customization

### Content Updates

The portfolio supports two content management approaches:

#### Static Content (Default)
All portfolio content is centrally managed in `src/data/defaultData.js`. Update the following exports:

1. **Personal Information**: Modify `DEFAULT_ABOUT` object
2. **Experience**: Update `DEFAULT_EXPERIENCES` array
3. **Projects**: Edit `DEFAULT_PROJECTS` array
4. **Skills**: Modify `DEFAULT_SKILLS` object
5. **Blog Posts**: Update `DEFAULT_BLOG` array
6. **Contact Info**: Change details in `DEFAULT_CONTACT` object

#### Dynamic Content with Strapi CMS
The portfolio includes a Strapi API integration for dynamic content management. See the [Strapi Integration](#strapi-integration) section below for setup details.

### Styling

- **Colors**: Modify Tailwind config in `tailwind.config.js`
- **Typography**: Update font classes throughout components
- **Animations**: Customize CSS animations in `index.css`

### Components

The project uses atomic design principles:

- **Atoms**: Basic elements like buttons and headings
- **Molecules**: Simple component groups like navigation items
- **Organisms**: Complete sections like navigation and hero
- **Templates**: Full page layouts

## Technologies Used

- **React 19** - UI library with latest features
- **Vite 6** - Fast build tool and dev server
- **Tailwind CSS 3** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Strapi CMS** - Headless CMS for content management
- **ESLint** - Code linting and formatting

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Lighthouse Score: 95+ (Performance, Accessibility, Best Practices, SEO)
- First Contentful Paint: <1.5s
- Largest Contentful Paint: <2.5s

## Strapi Integration

This portfolio includes a complete Strapi CMS integration for dynamic content management. The API service (`src/service/api.js`) provides methods to fetch content from a Strapi backend.

### API Configuration

Set the Strapi API URL using environment variables:

```bash
# .env.local
VITE_STRAPI_URL=https://your-strapi-instance.com
```

If no environment variable is set, it defaults to `https://api.pikachusear.space`.

### Content Types

The Strapi integration supports the following content types:

#### About Section (`/api/about`)
- **title**: Text field
- **description**: Rich text/Textarea
- **secondaryDescription**: Rich text/Textarea  
- **image**: Media (single image)
- **socialLinks**: JSON field (array of social media links)

#### Experience (`/api/experiences`)
- **title**: Text field (job title)
- **company**: Text field
- **period**: Text field (e.g., "2023 - Present")
- **startDate**: Date field
- **endDate**: Date field (optional)
- **description**: Rich text/Textarea
- **technologies**: JSON field (array of technology names)

#### Projects (`/api/projects`)
- **title**: Text field
- **description**: Rich text/Textarea
- **image**: Media (single image)
- **techStack**: JSON field (array of technologies)
- **liveUrl**: Text field (URL)
- **githubUrl**: Text field (URL)
- **featured**: Boolean field
- **order**: Number field (for sorting)

#### Skills (`/api/skill-categories`)
- **name**: Text field (category name)
- **skills**: Component/Dynamic Zone with skill items
- **order**: Number field (for sorting)

#### Blog Posts (`/api/blog-posts`)
- **title**: Text field
- **excerpt**: Text field (short description)
- **content**: Rich text field
- **slug**: UID field (auto-generated from title)
- **featuredImage**: Media (single image)
- **publishedAt**: DateTime field

### API Methods

The `StrapiAPI` class provides the following methods:

```javascript
import strapiAPI from './src/service/api.js';

// Fetch content
const about = await strapiAPI.getAbout();
const experiences = await strapiAPI.getExperiences();
const projects = await strapiAPI.getProjects();
const skills = await strapiAPI.getSkills();
const blogPosts = await strapiAPI.getBlogPosts();

// Helper method for images
const imageUrl = strapiAPI.getImageUrl(imageObject);
```

### Error Handling

The API service includes built-in error handling:
- Returns `null` for failed GET requests (graceful degradation)
- Logs errors to console for debugging
- Automatically falls back to default data when API is unavailable

### Local Development with Strapi

1. Set up a local Strapi instance or use a remote deployment
2. Create the content types mentioned above
3. Add sample content through the Strapi admin panel
4. Update your `.env.local` file with the correct API URL
5. The portfolio will automatically fetch and display the dynamic content

### Mixed Content Strategy

The portfolio can seamlessly mix static and dynamic content:
- Use static content from `defaultData.js` as fallbacks
- Override with dynamic content from Strapi when available
- Perfect for gradual migration or hybrid content strategies

## Deployment

### Build for Production

```bash
npm run build
```

The build files will be in the `dist/` directory, ready for deployment to any static hosting service.

### Recommended Hosting

- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

## License

MIT License - feel free to use this project as a template for your own portfolio.

## Contributing

1. Fork the project
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request