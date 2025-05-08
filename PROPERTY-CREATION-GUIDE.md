# Property Blueprint Creation Guide

This guide provides step-by-step instructions for creating a new property blueprint using this template.

## Quick Start for New Properties

```bash
# 1. Clone or copy the template
git clone [repository-url] new-property-name
cd new-property-name

# 2. Install dependencies
npm install

# 3. Run the all-in-one setup command
npm run new-property
```

## Detailed Workflow

### 1. Configure Basic Property Information

Run the setup wizard to configure the property details:

```bash
npm run setup
```

This interactive wizard will prompt you for:
- Property name
- Location details
- Unit information
- Branding elements
- Contact information
- Timeline

All information will be stored in `config/building-config.js`.

### 2. Create Content Templates

Generate content templates for each section:

```bash
npm run create-content
```

This will create template markdown files in the `src/content/` directory for each section:
- Executive Summary
- Market Intelligence
- Competitive Landscape
- Strategic Opportunities
- Pricing Framework
- Go-to-Market Roadmap
- Opportunity Map

### 3. Customize Content

Edit the markdown files in `src/content/` to add your property-specific content. Use the placeholders provided in the templates as a guide.

Key best practices:
- Reference property details from the config (e.g., "[PROPERTY_NAME]")
- Maintain consistent section structure
- Use markdown formatting (headings, lists, emphasis)
- Keep all property-specific details in the configuration file

### 4. Preview Your Changes

Run the development server to preview your changes:

```bash
npm run dev
```

Navigate to http://localhost:3000 to see your property blueprint.

### 5. Customize Styling (Optional)

If you need to customize the visual appearance beyond the branding colors:

1. Edit the property's brand colors in `config/building-config.js`
2. For more advanced styling, modify `tailwind.config.ts`
3. Custom components can be edited in their respective files

### 6. Build and Deploy

When you're ready to deploy:

```bash
npm run build
```

The built project can be deployed to any platform that supports Next.js.

## Tips for Efficient Replication

1. **Use Git Branches**: Create a new branch or repository for each property
2. **Template Content**: Save reusable content templates for similar properties
3. **Batch Creation**: When creating multiple properties, use similar sections as a starting point
4. **Documentation**: Document any special customizations for each property
5. **Version Control**: Commit changes frequently to track progress

## Troubleshooting

- **Content Not Displaying**: Make sure markdown files exist in the correct location
- **Styling Issues**: Check that the property colors are correctly set in the config
- **Navigation Problems**: Verify that all pages are correctly referenced in the Layout component

## Advanced Customization

For more advanced customization needs, refer to:
- The React components in `src/components/`
- Page templates in `src/templates/`
- Navigation structure in `src/components/Layout/Layout.tsx`