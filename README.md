# Wrapped Stats

A customizable Spotify Wrapped-style stats presentation website built with React 19, Tailwind CSS 4, and Framer Motion. Create beautiful, animated year-in-review presentations with multiple themes, slide templates, and photo support.

## Features

**Visual Themes**
- Five pre-built themes (Vaporwave Dreams, Minimal Elegance, Neon Nights, Pastel Paradise, Brutalist Bold)
- Custom theme editor with full control over colors, fonts, gradients, and animations
- Theme persistence across sessions via local storage

**Slide Templates**
- **Stat Cards**: Display individual statistics with icons and custom backgrounds
- **Top Rankings**: Show top-N lists with rankings and descriptions
- **Timeline**: Visualize events chronologically with dates and descriptions
- **Photo Carousel**: Display photo collections with captions

**Data Management**
- JSON-based data format for easy customization
- Drag-and-drop file upload interface
- Photo upload and management system
- Local storage persistence for data, themes, and photos
- Example JSON file with all slide types

**Navigation**
- Keyboard navigation (arrow keys)
- Touch/swipe gestures for mobile devices
- Tap zones (left/right 30% of screen) for mobile
- Progress indicator with dot navigation
- Smooth slide transitions with Framer Motion

## Project Structure

```
wrapped-stats/
├── client/
│   ├── public/              # Static assets
│   └── src/
│       ├── components/      # React components
│       │   ├── ui/         # shadcn/ui components
│       │   ├── StatsCard.tsx
│       │   ├── StatsSlide.tsx
│       │   ├── TopRankingSlide.tsx
│       │   ├── TimelineSlideComponent.tsx
│       │   ├── PhotoCarouselSlideComponent.tsx
│       │   ├── ThemeSelector.tsx
│       │   ├── CustomThemeEditor.tsx
│       │   ├── DataUpload.tsx
│       │   ├── PhotoUpload.tsx
│       │   ├── NavigationControls.tsx
│       │   ├── ProgressIndicator.tsx
│       │   └── ConfettiEffect.tsx
│       ├── lib/            # Utilities and helpers
│       │   ├── dataUtils.ts    # Data types and utilities
│       │   ├── themes.ts       # Theme definitions
│       │   └── storage.ts      # Local storage helpers
│       ├── pages/          # Page components
│       │   └── Home.tsx
│       ├── App.tsx         # Main app component
│       ├── main.tsx        # Entry point
│       └── index.css       # Global styles and theme variables
├── DATA_FORMAT.md          # JSON schema documentation
├── example-data.json       # Example presentation data
└── README.md              # This file
```

## Getting Started

### Prerequisites

- Node.js 22.x
- pnpm (included in project)

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

The development server will start at `http://localhost:3000`.

## Customization Guide

### Adding New Themes

Themes are defined in `client/src/lib/themes.ts`. Each theme includes:

```typescript
{
  id: string;           // Unique identifier
  name: string;         // Display name
  colors: {
    primary: string;    // Main accent color
    secondary: string;  // Secondary accent color
    accent: string;     // Highlight color
    text: string;       // Text color
    background: string; // Background color
  };
  fonts: {
    display: string;    // Heading font
    stats: string;      // Stats number font
    body: string;       // Body text font
  };
  gradients: {
    intro: string;      // Intro slide gradient
    stat: string;       // Stat slide gradient
    finale: string;     // Finale slide gradient
  };
  animations: {
    transition: string; // Slide transition type
    duration: number;   // Animation duration (ms)
  };
}
```

**To add a new theme:**

1. Add the theme object to the `themes` array in `client/src/lib/themes.ts`
2. Import required fonts in `client/index.html` (Google Fonts)
3. The theme will automatically appear in the theme selector

### Creating Custom Slide Templates

Slide templates are React components that receive data and theme props. Here's how to create a new template:

**1. Define the data type in `client/src/lib/dataUtils.ts`:**

```typescript
export interface MyCustomSlide {
  type: "my-custom";
  title: string;
  // Add your custom fields
}

// Add to SlideData union type
export type SlideData = 
  | StatSlide 
  | TopRankingSlide 
  | TimelineSlide 
  | PhotoCarouselSlide
  | MyCustomSlide;  // Add here
```

**2. Create the component in `client/src/components/`:**

```typescript
import { motion } from "framer-motion";
import type { Theme } from "@/lib/themes";
import type { MyCustomSlide } from "@/lib/dataUtils";

interface Props {
  data: MyCustomSlide;
  theme: Theme;
}

export default function MyCustomSlideComponent({ data, theme }: Props) {
  return (
    <div className="flex items-center justify-center min-h-screen p-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ fontFamily: theme.fonts.display, color: theme.colors.primary }}
      >
        <h2 className="text-4xl font-bold mb-4">{data.title}</h2>
        {/* Add your custom content */}
      </motion.div>
    </div>
  );
}
```

**3. Add rendering logic in `client/src/pages/Home.tsx`:**

```typescript
// Import your component
import MyCustomSlideComponent from "@/components/MyCustomSlideComponent";

// In the renderSlide function, add a case for your slide type:
if (slideData.type === "my-custom") {
  return (
    <StatsSlide key={`custom-${index}`} backgroundGradient={currentTheme.gradients.intro}>
      <MyCustomSlideComponent data={slideData as MyCustomSlide} theme={currentTheme} />
    </StatsSlide>
  );
}
```

**4. Update validation in `client/src/components/DataUpload.tsx`:**

```typescript
const validateSlide = (slide: any): boolean => {
  if (slide.type === "my-custom") {
    return typeof slide.title === "string";
    // Add validation for your custom fields
  }
  // ... existing validation
};
```

**5. Update `DATA_FORMAT.md` and `example-data.json` with examples**

### Modifying Existing Slide Templates

Each slide template component is self-contained. To modify:

1. Open the component file (e.g., `client/src/components/StatsCard.tsx`)
2. Modify the JSX structure, styling, or animations
3. Changes will hot-reload automatically in development

**Common modifications:**

- **Layout**: Change Tailwind classes (e.g., `flex-col` to `flex-row`)
- **Colors**: Use `theme.colors.*` props instead of hardcoded values
- **Animations**: Modify Framer Motion props (`initial`, `animate`, `transition`)
- **Typography**: Use `theme.fonts.*` for consistent font usage

### Customizing Animations

Animations are powered by Framer Motion. Common patterns:

**Slide transitions:**
```typescript
<motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 1.1 }}
  transition={{ duration: 0.5, ease: "easeInOut" }}
>
```

**Spring animations:**
```typescript
<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: "spring", stiffness: 300, damping: 20 }}
>
```

**Staggered children:**
```typescript
<motion.div
  initial="hidden"
  animate="visible"
  variants={{
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }}
>
  {items.map((item, i) => (
    <motion.div
      key={i}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
    >
      {item}
    </motion.div>
  ))}
</motion.div>
```

### Working with the Theme System

**Global theme variables** are defined in `client/src/index.css`:

```css
:root {
  --primary: ...;
  --background: ...;
  /* etc */
}
```

**Accessing theme in components:**

```typescript
// Via props (recommended for slide components)
function MyComponent({ theme }: { theme: Theme }) {
  return <div style={{ color: theme.colors.primary }}>...</div>;
}

// Via Tailwind classes (for UI components)
<div className="bg-primary text-primary-foreground">...</div>
```

**Creating custom theme variables:**

1. Add to `@theme inline` block in `client/src/index.css`
2. Add corresponding values in `:root` and `.dark` selectors
3. Use in Tailwind classes: `bg-[color:var(--your-variable)]`

### Data Format

Presentations are defined in JSON format. See `DATA_FORMAT.md` for complete schema documentation.

**Basic structure:**

```json
{
  "title": "Your Year in Stats",
  "subtitle": "2024 Wrapped",
  "slides": [
    {
      "type": "stat",
      "title": "Total Steps",
      "value": "3,456,789",
      "subtitle": "steps walked this year",
      "icon": "activity"
    }
  ]
}
```

**Loading custom data:**

1. Click the upload button (bottom-right)
2. Drag and drop a JSON file or click to browse
3. Data is validated and loaded automatically
4. Download the example file for reference

### Photo Management

**Uploading photos:**

1. Click the photo button (bottom-right, above upload)
2. Add photos with unique IDs
3. Photos are stored as base64 data URLs in local storage

**Using photos in slides:**

```json
{
  "type": "photo-carousel",
  "title": "Favorite Moments",
  "photos": [
    {
      "id": "photo-1",
      "caption": "Summer vacation"
    }
  ]
}
```

**Photo storage limits:**

- Local storage typically has a 5-10MB limit per domain
- Large photos may cause storage quota errors
- Consider resizing images before upload
- For production use with many photos, consider backend storage

## Styling Guide

### Tailwind CSS

The project uses Tailwind CSS 4 with custom configuration:

**Custom utilities:**
- `.container`: Auto-centered with responsive padding
- `.flex`: Includes `min-width: 0` and `min-height: 0` by default
- `.text-holographic`: Animated gradient text effect (Vaporwave theme)

**Responsive breakpoints:**
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

**Color system:**
- Use semantic colors: `bg-background`, `text-foreground`, `border-border`
- Theme-specific colors: `bg-primary`, `text-accent`, `bg-card`
- Always pair background with foreground: `bg-card text-card-foreground`

### Custom CSS

Add custom styles in `client/src/index.css`:

```css
@layer components {
  .my-custom-class {
    /* Your styles */
  }
}
```

## Component Library

The project uses **shadcn/ui** components. Available components:

- Button, Card, Dialog, Input, Label
- Select, Slider, Switch, Tabs
- Tooltip, Popover, Dropdown Menu
- And more in `client/src/components/ui/`

**Adding new shadcn components:**

```bash
# Example: adding a new component
npx shadcn-ui@latest add badge
```

## State Management

State is managed with React hooks and local storage:

**React state:**
- `useState`: Component-local state
- `useEffect`: Side effects and data loading
- Context API: Theme provider (if switchable themes enabled)

**Persistent state:**
- Presentation data: `localStorage.getItem('wrapped-stats-data')`
- Current theme: `localStorage.getItem('wrapped-stats-theme')`
- Custom themes: `localStorage.getItem('wrapped-stats-custom-themes')`
- Uploaded photos: `localStorage.getItem('wrapped-stats-photos')`

**Helper functions** in `client/src/lib/storage.ts`:
- `loadPresentationData()`, `savePresentationData(data)`
- `loadTheme()`, `saveTheme(theme)`
- `loadCustomThemes()`, `saveCustomThemes(themes)`
- `loadUploadedPhotos()`, `addUploadedPhoto(id, dataUrl)`, `removeUploadedPhoto(id)`

## Mobile Optimization

**Touch navigation:**
- Swipe left/right to navigate between slides
- Tap left 30% of screen to go back
- Tap right 30% of screen to go forward
- Arrow buttons hidden on screens < 768px

**Responsive design:**
- All components use responsive Tailwind classes
- Font sizes scale with viewport: `text-4xl md:text-6xl`
- Spacing adjusts: `p-4 md:p-8`
- Layouts adapt: `flex-col md:flex-row`

## Performance Tips

**Optimizing animations:**
- Use `transform` and `opacity` for best performance
- Avoid animating `width`, `height`, or `top`/`left`
- Use `will-change` sparingly: `will-change-transform`

**Image optimization:**
- Compress images before upload
- Use appropriate formats (WebP for photos, PNG for graphics)
- Consider lazy loading for photo carousels

**Bundle size:**
- Tree-shaking is enabled by default
- Import only needed icons: `import { Activity } from "lucide-react"`
- Avoid importing entire libraries

## Deployment

**Building for production:**

```bash
pnpm build
```

Output will be in `dist/` directory.

**Deployment options:**
- **Manus Hosting**: Click "Publish" in the Management UI (requires checkpoint)
- **Vercel/Netlify**: Connect GitHub repo and deploy
- **Static hosting**: Upload `dist/` contents to any web server

**Environment variables:**
- No environment variables required for basic functionality
- Analytics and OAuth variables are auto-injected by Manus

## Troubleshooting

**Theme not applying:**
- Check that fonts are imported in `client/index.html`
- Verify theme object structure matches `Theme` type
- Clear browser cache and local storage

**Animations not working:**
- Ensure Framer Motion is installed: `pnpm add framer-motion`
- Check for conflicting CSS transitions
- Verify `AnimatePresence` wraps animated components

**Local storage full:**
- Clear old data: `localStorage.clear()`
- Reduce photo sizes
- Consider implementing data export/import

**TypeScript errors:**
- Run type checking: `pnpm check`
- Ensure all imports have correct paths
- Check that new slide types are added to union types

## Contributing

When adding new features:

1. Follow existing code structure and naming conventions
2. Add TypeScript types for all new data structures
3. Update `DATA_FORMAT.md` for new slide types
4. Test on both desktop and mobile
5. Ensure theme compatibility (test with all themes)

## License

MIT

## Credits

Built with:
- [React 19](https://react.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)
- [Wouter](https://github.com/molefrog/wouter) (routing)
