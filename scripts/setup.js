#!/usr/bin/env node

/**
 * Interactive setup script for property blueprint template
 * This script guides users through configuring the template for their specific building
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const BUILDING_CONFIG_PATH = path.join(__dirname, '..', 'config', 'building-config.js');
const TEMPLATE_CONFIG_PATH = path.join(__dirname, '..', 'config', 'building-config.template.js');

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Helper function to ask questions
function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function setupWizard() {
  console.log('\n=============================================');
  console.log('Property Blueprint Template - Setup Wizard');
  console.log('=============================================\n');
  console.log('This wizard will help you configure your property blueprint template.');
  console.log('Please provide the following information about your property:\n');
  
  // Make a copy of the template if it doesn't exist
  if (!fs.existsSync(TEMPLATE_CONFIG_PATH)) {
    fs.copyFileSync(BUILDING_CONFIG_PATH, TEMPLATE_CONFIG_PATH);
  }
  
  // Read the config template
  let configTemplate = fs.readFileSync(TEMPLATE_CONFIG_PATH, 'utf8');
  
  // Basic Information
  console.log('\n--- Basic Information ---');
  const name = await askQuestion('Property Name: ');
  configTemplate = configTemplate.replace(/name: ".*?"/, `name: "${name}"`);
  
  const address = await askQuestion('Street Address: ');
  configTemplate = configTemplate.replace(/address: ".*?"/, `address: "${address}"`);
  
  const neighborhood = await askQuestion('Neighborhood: ');
  configTemplate = configTemplate.replace(/neighborhood: ".*?"/, `neighborhood: "${neighborhood}"`);
  
  const city = await askQuestion('City: ');
  configTemplate = configTemplate.replace(/city: ".*?"/, `city: "${city}"`);
  
  const state = await askQuestion('State: ');
  configTemplate = configTemplate.replace(/state: ".*?"/, `state: "${state}"`);
  
  const zip = await askQuestion('ZIP Code: ');
  configTemplate = configTemplate.replace(/zip: ".*?"/, `zip: "${zip}"`);
  
  // Property Details
  console.log('\n--- Property Details ---');
  const units = await askQuestion('Number of Units: ');
  configTemplate = configTemplate.replace(/units: \d+/, `units: ${units}`);
  
  const stories = await askQuestion('Number of Stories: ');
  configTemplate = configTemplate.replace(/stories: \d+/, `stories: ${stories}`);
  
  const yearBuilt = await askQuestion('Year Built (or Projected): ');
  configTemplate = configTemplate.replace(/yearBuilt: \d+/, `yearBuilt: ${yearBuilt}`);
  
  const propertyType = await askQuestion('Property Type (e.g., Multifamily, Mixed-Use): ');
  configTemplate = configTemplate.replace(/propertyType: ".*?"/, `propertyType: "${propertyType}"`);
  
  const propertyClass = await askQuestion('Property Class (e.g., Class A, Class B+): ');
  configTemplate = configTemplate.replace(/propertyClass: ".*?"/, `propertyClass: "${propertyClass}"`);
  
  // Branding
  console.log('\n--- Branding ---');
  const primaryColor = await askQuestion('Primary Brand Color (hex code, e.g., #3B7A57): ');
  configTemplate = configTemplate.replace(/primaryColor: ".*?"/, `primaryColor: "${primaryColor}"`);
  
  console.log('\nFont Options:');
  console.log('1. Montserrat, \'Montserrat Fallback\', sans-serif (Primary font)');
  console.log('2. Atlassian Sans, \'Montserrat Fallback\', sans-serif (Secondary font)');
  console.log('3. Custom font (You will need to add this font later)');
  
  const bodyFontChoice = await askQuestion('Choose body font (1-3): ');
  let bodyFont = 'Montserrat, \'Montserrat Fallback\', sans-serif';
  if (bodyFontChoice === '2') bodyFont = '\'Atlassian Sans\', \'Montserrat Fallback\', sans-serif';
  else if (bodyFontChoice === '3') bodyFont = await askQuestion('Enter custom body font name: ') + ', \'Montserrat Fallback\', sans-serif';
  configTemplate = configTemplate.replace(/fontPrimary: ".*?"/, `fontPrimary: "${bodyFont}"`);
  
  const headingFontChoice = await askQuestion('Choose heading font (1-3): ');
  let headingFont = 'Montserrat, \'Montserrat Fallback\', sans-serif';
  if (headingFontChoice === '2') headingFont = '\'Atlassian Sans\', \'Montserrat Fallback\', sans-serif';
  else if (headingFontChoice === '3') headingFont = await askQuestion('Enter custom heading font name: ') + ', \'Montserrat Fallback\', sans-serif';
  configTemplate = configTemplate.replace(/fontHeadings: ".*?"/, `fontHeadings: "${headingFont}"`);
  
  const tagline = await askQuestion('Property Tagline: ');
  configTemplate = configTemplate.replace(/tagline: ".*?"/, `tagline: "${tagline}"`);
  
  // Contact Information
  console.log('\n--- Contact Information ---');
  const email = await askQuestion('Contact Email: ');
  configTemplate = configTemplate.replace(/email: ".*?"/, `email: "${email}"`);
  
  const phone = await askQuestion('Contact Phone: ');
  configTemplate = configTemplate.replace(/phone: ".*?"/, `phone: "${phone}"`);
  
  const website = await askQuestion('Website URL: ');
  configTemplate = configTemplate.replace(/website: ".*?"/, `website: "${website}"`);
  
  // Timeline
  console.log('\n--- Timeline ---');
  const constructionStart = await askQuestion('Construction Start Date (YYYY-MM): ');
  configTemplate = configTemplate.replace(/constructionStart: ".*?"/, `constructionStart: "${constructionStart}"`);
  
  const constructionComplete = await askQuestion('Construction Complete Date (YYYY-MM): ');
  configTemplate = configTemplate.replace(/constructionComplete: ".*?"/, `constructionComplete: "${constructionComplete}"`);
  
  const preLeasingStart = await askQuestion('Pre-Leasing Start Date (YYYY-MM): ');
  configTemplate = configTemplate.replace(/preLeasingStart: ".*?"/, `preLeasingStart: "${preLeasingStart}"`);
  
  const leaseUpPeriod = await askQuestion('Expected Lease-Up Period (e.g., "12 months"): ');
  configTemplate = configTemplate.replace(/leaseUpPeriod: ".*?"/, `leaseUpPeriod: "${leaseUpPeriod}"`);
  
  // Write the updated config
  fs.writeFileSync(BUILDING_CONFIG_PATH, configTemplate);
  
  console.log('\n=============================================');
  console.log('Basic configuration complete!');
  console.log('=============================================\n');
  console.log(`The building-config.js file has been updated with your property information.`);
  console.log(`For more detailed configuration, you can directly edit the file at:`);
  console.log(BUILDING_CONFIG_PATH);
  console.log(`\nTo start the development server, run:`);
  console.log(`npm run dev`);
  
  rl.close();
}

setupWizard().catch(error => {
  console.error('Error running setup wizard:', error);
  rl.close();
  process.exit(1);
});