# Nitro-React Theme System

A comprehensive, customizable theme system for nitro-react that provides Habbo-like UI styling with support for draggable windows, persistent positioning, and extensive customization.

## Features

- 🎨 **Multiple Theme Presets**: Habitat (light), Habitat Dark (dark), Habitat Classic (retro)
- 🖼️ **Draggable Windows**: Components that can be dragged, resized, and persist their positions to localStorage
- 🎯 **CSS Variables**: Dynamic theme switching via CSS custom properties
- 🔄 **Persistent State**: Window positions and theme preferences are saved automatically
- 📦 **Pre-built Components**: Button, Card, TextField, Panel, and DraggableWindow
- ♿ **Accessible**: Built with accessibility in mind
- 🎭 **Dark Mode Support**: Built-in dark mode support for all components

## Architecture

```
src/
├── theme/                          # Theme system core
│   ├── config/
│   │   └── themes.ts              # Theme presets
│   ├── context/
│   │   └── ThemeProvider.tsx       # Theme context provider
│   ├── hooks/
│   │   ├── useTheme.ts            # Access theme context
│   │   └── useDraggableWindow.ts  # Manage window positions
│   ├── stores/
│   │   ├── useThemeStore.ts       # Zustand store for themes
│   │   └── useDraggableWindowStore.ts # Window position persistence
│   ├── utils/
│   │   └── classNameUtils.ts      # Utility functions
│   ├── types.ts                    # TypeScript definitions
│   └── index.ts                    # Barrel export
├── components/
│   ├── ui/                         # Base UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── TextField.tsx
│   │   ├── Panel.tsx
│   │   └── index.ts
│   ├── windows/                    # Draggable window components
│   │   ├── DraggableWindow.tsx
│   │   ├── ExampleWindow.tsx
│   │   └── index.ts
│   └── index.ts                    # Barrel export
```

## Quick Start

### 1. Wrap Your App with ThemeProvider

```tsx
import { ThemeProvider } from './theme';

export const App = () => (
  <ThemeProvider defaultTheme="habitat">
    {/* Your app content */}
  </ThemeProvider>
);
```

### 2. Use Theme and Components

```tsx
import { DraggableWindow, Button, Card, CardHeader, CardBody } from './components';
import { useTheme } from './theme';

export const MyWindow = () => {
  const { theme, isDarkMode, setDarkMode } = useTheme();

  return (
    <DraggableWindow
      id="my-window"
      title="My Window"
      defaultX={100}
      defaultY={100}
      defaultWidth={350}
      defaultHeight={450}
    >
      <Card>
        <CardHeader>Settings</CardHeader>
        <CardBody>
          <Button onClick={() => setDarkMode(!isDarkMode)}>
            Toggle Dark Mode
          </Button>
        </CardBody>
      </Card>
    </DraggableWindow>
  );
};
```

## Components

### DraggableWindow

A window component that can be dragged, resized, and persists its position.

**Props:**
- `id` (string): Unique identifier for position persistence
- `title` (string): Window title
- `children` (ReactNode): Window content
- `onClose?` (function): Called when close button is clicked
- `defaultX?` (number): Default X position (default: 100)
- `defaultY?` (number): Default Y position (default: 100)
- `defaultWidth?` (number): Default width (default: 350)
- `defaultHeight?` (number): Default height (default: 450)
- `minWidth?` (number): Minimum width (default: 200)
- `minHeight?` (number): Minimum height (default: 200)
- `resizable?` (boolean): Enable resizing (default: true)
- `movable?` (boolean): Enable moving (default: true)
- `className?` (string): Additional CSS classes

**Example:**
```tsx
<DraggableWindow
  id="chat-window"
  title="Chat"
  defaultX={200}
  defaultY={200}
  onClose={() => setChatOpen(false)}
>
  <div className="p-4">Chat content here</div>
</DraggableWindow>
```

### Button

A customizable button component with multiple variants and sizes.

**Props:**
- `variant?` ('primary' | 'secondary' | 'destructive' | 'outline' | 'ghost'): Button style
- `size?` ('sm' | 'md' | 'lg'): Button size
- `children` (ReactNode): Button text
- `isLoading?` (boolean): Show loading spinner
- `fullWidth?` (boolean): Span full width
- `disabled?` (boolean): Disable button
- Standard HTMLButtonElement props

**Example:**
```tsx
<Button variant="primary" size="md" fullWidth>
  Click Me
</Button>

<Button variant="secondary" disabled>
  Disabled
</Button>

<Button variant="destructive" isLoading>
  Deleting...
</Button>
```

### Card

A container component with optional header, body, and footer sections.

**Components:**
- `Card`: Main container
- `CardHeader`: Header section with theme styling
- `CardBody`: Main content area
- `CardFooter`: Footer section with flex layout

**Props:**
- `variant?` ('default' | 'elevated' | 'outlined'): Card style
- All standard HTMLDivElement props

**Example:**
```tsx
<Card variant="elevated">
  <CardHeader>Title</CardHeader>
  <CardBody>
    Content here
  </CardBody>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### TextField

A text input component with label, error, and helper text.

**Props:**
- `label?` (ReactNode): Field label
- `error?` (string): Error message
- `helper?` (string): Helper text
- `variant?` ('default' | 'filled' | 'outlined'): Input style
- `fullWidth?` (boolean): Span full width
- Standard HTMLInputElement props

**Example:**
```tsx
<TextField
  label="Email"
  type="email"
  placeholder="your@email.com"
  error="Invalid email format"
  fullWidth
/>
```

### Panel

A simple panel component for grouping content.

**Props:**
- `variant?` ('default' | 'primary' | 'secondary' | 'accent'): Panel style
- `padded?` (boolean): Add padding (default: true)
- All standard HTMLDivElement props

**Example:**
```tsx
<Panel variant="accent">
  Important information
</Panel>
```

## Hooks

### useTheme()

Access the current theme and theme controls.

**Returns:**
```ts
{
  theme: ThemeConfig;
  isDarkMode: boolean;
  setTheme: (theme: ThemeConfig | string) => void;
  setDarkMode: (isDark: boolean) => void;
}
```

**Example:**
```tsx
const { theme, isDarkMode, setTheme, setDarkMode } = useTheme();

// Switch theme
setTheme('habitatDark');

// Toggle dark mode
setDarkMode(!isDarkMode);

// Access colors
console.log(theme.colors.primary);
```

### useDraggableWindow()

Manage the position and size of a draggable window.

**Parameters:**
```ts
useDraggableWindow(windowId, {
  defaultX?: number;
  defaultY?: number;
  defaultWidth?: number;
  defaultHeight?: number;
  defaultZIndex?: number;
})
```

**Returns:**
```ts
{
  position: DraggableWindowPosition;
  updatePosition: (newPosition: Partial<DraggableWindowPosition>) => void;
  setPosition: (newPosition: DraggableWindowPosition) => void;
}
```

**Example:**
```tsx
const { position, updatePosition } = useDraggableWindow('my-window', {
  defaultX: 100,
  defaultY: 100,
});

// Update individual properties
updatePosition({ x: 200, y: 150 });

// Or set everything at once
setPosition({ x: 0, y: 0, width: 400, height: 300 });
```

## Theme System

### Built-in Themes

1. **habitat** (default): Modern Habbo-style theme with light colors
2. **habitatDark**: Dark version with darker backgrounds
3. **habitatClassic**: Retro Habbo-era styling

### Theme Structure

```ts
interface ThemeConfig {
  name: string;
  colors: ThemeColors;
  spacing: ThemeSpacing;
  shadows: ThemeShadows;
  borderRadius: { sm, md, lg };
  fontFamily: { base, mono };
  transitions: { fast, normal, slow };
}
```

### Switching Themes

```tsx
import { useTheme } from './theme';

export const ThemeSwitcher = () => {
  const { setTheme } = useTheme();

  return (
    <div>
      <button onClick={() => setTheme('habitat')}>Light</button>
      <button onClick={() => setTheme('habitatDark')}>Dark</button>
      <button onClick={() => setTheme('habitatClassic')}>Classic</button>
    </div>
  );
};
```

### Creating Custom Themes

```tsx
import { ThemeConfig } from './theme';

const customTheme: ThemeConfig = {
  name: 'my-custom-theme',
  colors: {
    background: '#ffffff',
    foreground: '#000000',
    primary: '#0066cc',
    // ... other colors
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px rgba(0, 0, 0, 0.15)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.2)',
    window: '0 8px 16px rgba(0, 0, 0, 0.25)',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
  },
  fontFamily: {
    base: 'Ubuntu, sans-serif',
    mono: 'Fira Code, monospace',
  },
  transitions: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    normal: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

// Use it
const { setTheme } = useTheme();
setTheme(customTheme);
```

## CSS Variables

The theme system automatically sets CSS variables that can be used in your styles:

```css
/* Colors */
--color-background
--color-foreground
--color-primary
--color-secondary
--color-accent
--color-windowBg
--color-windowBorder
--color-windowHeader
/* ... and more */

/* Spacing */
--spacing-xs
--spacing-sm
--spacing-md
--spacing-lg
--spacing-xl

/* Shadows */
--shadow-sm
--shadow-md
--shadow-lg
--shadow-window

/* Other */
--border-radius-sm
--border-radius-md
--border-radius-lg
--font-family-base
--font-family-mono
--transition-fast
--transition-normal
--transition-slow
```

**Usage in CSS:**
```css
.my-element {
  background-color: var(--color-primary);
  padding: var(--spacing-md);
  box-shadow: var(--shadow-lg);
}
```

## Persistence

### Theme Preferences
- Stored in localStorage under key `nitro-theme`
- Automatically loaded on app startup
- Persists across sessions

### Window Positions
- Stored in localStorage under key `nitro-window-positions`
- Contains position, size, and z-index for each window
- Automatically updated when windows are moved/resized
- Automatically restored on app reload

To clear all saved data:
```tsx
import { useThemeStore, useDraggableWindowStore } from './theme';

const { resetTheme } = useThemeStore();
const { clearPositions } = useDraggableWindowStore();

resetTheme();      // Clear theme and dark mode preference
clearPositions();  // Clear all window positions
```

## Best Practices

1. **Always wrap with ThemeProvider**: Ensure ThemeProvider is at the root of your component tree
2. **Use semantic variants**: Choose button and card variants based on their purpose
3. **Leverage CSS variables**: Use CSS variables for consistency across custom styles
4. **Set meaningful window IDs**: Use descriptive IDs for windows to help with debugging
5. **Handle window closing**: Implement proper cleanup when windows are closed
6. **Responsive design**: Consider mobile and different screen sizes in window sizing
7. **Accessibility**: Use proper labels and ARIA attributes for interactive components

## Example: Complete Window Setup

```tsx
import { useState } from 'react';
import { DraggableWindow, Button, Card, CardHeader, CardBody, CardFooter, TextField } from './components';
import { useTheme } from './theme';

export const UserProfileWindow = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [username, setUsername] = useState('');
  const { theme } = useTheme();

  if (!isOpen) return null;

  const handleSave = () => {
    console.log('Saving user:', username);
    setIsOpen(false);
  };

  return (
    <DraggableWindow
      id="user-profile"
      title="User Profile"
      onClose={() => setIsOpen(false)}
      defaultX={150}
      defaultY={150}
      defaultWidth={400}
      defaultHeight={300}
    >
      <Card variant="elevated">
        <CardHeader>Edit Profile</CardHeader>
        <CardBody className="space-y-4">
          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            fullWidth
          />
          <p className="text-xs text-gray-600">
            Current theme: {theme.name}
          </p>
        </CardBody>
        <CardFooter>
          <Button
            variant="secondary"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </CardFooter>
      </Card>
    </DraggableWindow>
  );
};
```

## Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- IE11: ⚠️ CSS variables not supported

## Performance Considerations

- Theme changes are debounced automatically
- Window position updates use efficient position tracking
- CSS variables reduce re-renders compared to inline styles
- Zustand stores provide optimal state management
- localStorage updates are wrapped in try-catch blocks

## Troubleshooting

### Theme not applying
- Ensure ThemeProvider wraps your component tree
- Check that CSS is properly loaded
- Verify theme name matches preset names

### Window position not persisting
- Check browser localStorage is enabled
- Verify window ID is unique
- Check browser console for localStorage errors

### Components not styled correctly
- Confirm Tailwind CSS is properly configured
- Check for CSS specificity conflicts
- Verify theme colors are valid CSS values

## Future Enhancements

- [ ] Theme customization UI
- [ ] Window minimize/maximize
- [ ] Snap-to-grid support
- [ ] Window grouping/tabs
- [ ] Animation presets
- [ ] Export/import themes
- [ ] Theme marketplace
