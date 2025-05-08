# Property Blueprint Template

A flexible and customizable template for creating property-specific strategic blueprint websites for multifamily developments. This template allows for easy configuration to generate comprehensive marketing and strategy documentation for any property.

## Quick Start

1. **Installation**
   ```bash
   # Install dependencies
   npm install
   ```

2. **Configuration**
   ```bash
   # Run the setup wizard to configure the template for your property
   npm run setup
   ```

3. **Content Creation**
   ```bash
   # Create content templates for each section
   node scripts/create-content.js
   ```

4. **Development**
   ```bash
   # Start the development server
   npm run dev
   ```

5. **Building for Production**
   ```bash
   # Build the project
   npm run build
   ```

## Replication Workflow

To create a new property blueprint:

1. **Copy the Template**: Clone or copy this repository to a new directory
2. **Install Dependencies**: Run `npm install`
3. **Configure Property Details**: Run `npm run setup` and follow the interactive prompts
4. **Generate Content Templates**: Run `node scripts/create-content.js`
5. **Customize Content**: Edit the markdown files in `src/content/`
6. **Preview**: Run `npm run dev` to see your changes
7. **Deploy**: Build and deploy using your preferred method

## Project Structure

- **`/config`**: Property-specific configuration
  - `building-config.js`: Central configuration file for all property details
  - `building-config.template.js`: Template for new property configurations

- **`/public`**: Static assets
  - Images, documents, and other public files

- **`/scripts`**: Utility scripts
  - `setup.js`: Interactive setup wizard
  - `create-content.js`: Content template generator
  - `export-pdf.js`: PDF export utility

- **`/src`**: Source code
  - **`/components`**: React components
    - `/GatedContent`: Content gating components
    - `/Home`: Homepage components
    - `/Layout`: Layout components (including sidebar navigation)
    - `/ui`: UI components (buttons, cards, charts, etc.)
  - **`/content`**: Markdown content for each section
    - `template.md`: Template for new content sections
  - **`/hooks`**: Custom React hooks
  - **`/lib`**: Utility functions
    - `markdown.ts`: Markdown loading utilities
  - **`/pages`**: Next.js pages
  - **`/styles`**: Global styles
  - **`/templates`**: Page templates

## Configuration

The primary configuration file is `config/building-config.js`, which contains all the property-specific information used throughout the site. This includes:

- **Basic information**: Name, location, address
- **Property details**: Units, stories, year built, property type, class
- **Branding**: Colors, fonts, tagline
- **Contact information**: Email, phone, website
- **Meta information**: SEO titles and descriptions
- **Market information**: Competitive set, target demographics, key amenities
- **Property specifications**: Unit mix, amenities, finishes
- **Timeline**: Construction start/completion, pre-leasing start, lease-up period

## Content Customization

Each section of the blueprint has its own markdown file in the `src/content` directory:

1. **Executive Summary**: `executive-summary.md`
2. **Market Intelligence**: `market-intelligence.md`
3. **Competitive Landscape**: `competitive-landscape.md`
4. **Strategic Opportunities**: `strategic-opportunities.md`
5. **Pricing Framework**: `pricing-framework.md`
6. **Go-to-Market Roadmap**: `go-to-market.md`
7. **Opportunity Map**: `opportunity-map.md`

Use the `scripts/create-content.js` utility to generate template content for each section, then customize it for your specific property.

## Styling

The project uses Tailwind CSS for styling, with a custom color palette and design system. Colors are automatically pulled from the `building-config.js` file to ensure consistent branding. The main configuration file is `tailwind.config.ts`.

## Scripts

- **`npm run dev`**: Start the development server
- **`npm run build`**: Build the project for production
- **`npm run start`**: Start the production server
- **`npm run lint`**: Run linting
- **`npm run setup`**: Run the interactive setup wizard
- **`npm run export-pdf`**: Export the entire blueprint as a PDF
- **`node scripts/create-content.js`**: Create content templates for sections

## Deployment

This project can be deployed to any platform that supports Next.js, including:

- Vercel
- Netlify
- AWS Amplify
- Self-hosted server

## Best Practices for Replication

1. **Keep Property Details in Config**: All property-specific information should be in `building-config.js`
2. **Use Variables in Content**: Reference property details in markdown using placeholders
3. **Create New Branch/Repo**: For each property, create a new branch or repository
4. **Use Git for Version Control**: Commit changes frequently to track progress
5. **Maintain Section Structure**: Keep consistent structure across different property blueprints
6. **Document Special Customizations**: Note any property-specific customizations

## License

Proprietary - All rights reserved.