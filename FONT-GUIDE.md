# Font Guide for Property Blueprint Template

This template uses Montserrat and Atlassian Sans fonts to provide a clean, professional appearance that works well for property marketing materials.

## Font Setup

### Primary Font
The default font for the template is Montserrat with Montserrat Fallback and Atlassian Sans as fallbacks. This provides a modern, elegant typography system.

```css
font-family: Montserrat, 'Montserrat Fallback', 'Atlassian Sans', sans-serif;
```

### Font Options
The template includes two main font options:

1. **Montserrat** - A clean, geometric sans-serif font with variable weight support
2. **Atlassian Sans** - A modern, highly legible sans-serif font

## Font Usage

### In CSS/Tailwind

You can use these fonts in your CSS with Tailwind classes:

```jsx
// Default Montserrat font (default, no class needed)
<p>This uses the default Montserrat font</p>

// Explicitly use Montserrat
<p className="font-montserrat">This uses Montserrat font</p>

// Use Atlassian Sans
<p className="font-atlassian">This uses Atlassian Sans font</p>

// Tailwind font weight utilities work with both
<p className="font-montserrat font-bold">Bold Montserrat</p>
<p className="font-montserrat font-light">Light Montserrat</p>
```

### In Markdown Content

The markdown renderer is configured to use the default Montserrat font for content. If you want to use Atlassian Sans for specific elements in your markdown, you would need to customize the markdown component rendering.

## Font Files

The font files should be placed in the `/public/fonts/` directory:

- `Montserrat-Variable.woff2` - Variable Montserrat font
- `MontserratFallback-Regular.woff2` - Montserrat fallback font 
- `AtlassianSans-Regular.woff2` - Atlassian Sans font

If these files are not present, the system will attempt to load web fonts as a fallback.

## Adding Custom Fonts

If you want to use a different font for a specific property:

1. Add the font files to `/public/fonts/`
2. Update the font-face definitions in `src/styles/globals.css`
3. Update the font family references in `tailwind.config.ts`
4. Update the building-config.js to include your custom font references

Example for adding a custom font:

```css
/* In globals.css */
@font-face {
  font-family: 'CustomFont';
  src: url('/fonts/CustomFont.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

/* Add a utility class */
.font-custom {
  font-family: 'CustomFont', 'Montserrat Fallback', sans-serif;
}
```

```js
// In tailwind.config.ts
fontFamily: {
  // ... existing fonts
  custom: ['CustomFont', 'Montserrat Fallback', 'sans-serif'],
}
```

## Typography Best Practices

- Use consistent fonts throughout your property blueprint
- Limit the number of different fonts to maintain a clean appearance
- Use font weights to create hierarchy instead of multiple font families
- Consider accessibility - ensure text has sufficient contrast and size