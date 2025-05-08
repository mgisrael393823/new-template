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

3. **Development**
   ```bash
   # Start the development server
   npm run dev
   ```

4. **Building for Production**
   ```bash
   # Build the project
   npm run build
   ```

## Project Structure

- **`/config`**: Property-specific configuration
  - `building-config.js`: Central configuration file for all property details

- **`/public`**: Static assets
  - Images, documents, and other public files

- **`/scripts`**: Utility scripts
  - `setup.js`: Interactive setup wizard
  - `export-pdf.js`: PDF export utility
  - `create-template.js`: Template creation utility

- **`/src`**: Source code
  - **`/components`**: React components
    - `/GatedContent`: Content gating components (modified to show all content)
    - `/Home`: Homepage components
    - `/Layout`: Layout components
    - `/ui`: UI components (buttons, cards, charts, etc.)
  - **`/content`**: Markdown content for each section
  - **`/hooks`**: Custom React hooks
  - **`/lib`**: Utility functions
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

Edit these files to customize the content for your specific property.

## Styling

The project uses Tailwind CSS for styling, with a custom color palette and design system. The main configuration file is `tailwind.config.ts`.

## Scripts

- **`npm run dev`**: Start the development server
- **`npm run build`**: Build the project for production
- **`npm run start`**: Start the production server
- **`npm run lint`**: Run linting
- **`npm run setup`**: Run the interactive setup wizard
- **`npm run export-pdf`**: Export the entire blueprint as a PDF

## Deployment

This project can be deployed to any platform that supports Next.js, including:

- Vercel
- Netlify
- AWS Amplify
- Self-hosted server

For deployment instructions, see the `DEPLOYMENT.md` file.

## Customization

For advanced customization, see the `CUSTOMIZATION.md` file, which provides guidance on:

- Adding new sections
- Customizing the layout
- Adding new components
- Changing the design system
- Adapting for different property types

## License

Proprietary - All rights reserved.