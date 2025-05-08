#!/usr/bin/env node

/**
 * Create content script for property blueprint template
 * This script helps with creating new content sections based on templates
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const CONTENT_DIR = path.join(__dirname, '..', 'src', 'content');
const TEMPLATE_PATH = path.join(CONTENT_DIR, 'template.md');
const CONFIG_PATH = path.join(__dirname, '..', 'config', 'building-config.js');

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

// Load building config to use property details in content
function loadBuildingConfig() {
  try {
    // Dynamic require to get the latest version
    delete require.cache[require.resolve(CONFIG_PATH)];
    return require(CONFIG_PATH);
  } catch (error) {
    console.error('Error loading building config:', error);
    return null;
  }
}

async function createContent() {
  console.log('\n=============================================');
  console.log('Property Blueprint - Content Creator');
  console.log('=============================================\n');
  
  // Load building config
  const buildingConfig = loadBuildingConfig();
  if (!buildingConfig) {
    console.error('Could not load building config. Please run setup.js first.');
    return;
  }
  
  // List available sections
  const sectionOptions = [
    'executive-summary',
    'market-intelligence',
    'competitive-landscape',
    'strategic-opportunities',
    'pricing-framework',
    'go-to-market',
    'opportunity-map',
    'custom'
  ];
  
  console.log('Available content sections:');
  sectionOptions.forEach((section, index) => {
    console.log(`${index + 1}. ${section}`);
  });
  
  // Ask which section to create
  const sectionChoice = await askQuestion('\nWhich section would you like to create/edit? (enter number): ');
  const sectionIndex = parseInt(sectionChoice) - 1;
  
  if (isNaN(sectionIndex) || sectionIndex < 0 || sectionIndex >= sectionOptions.length) {
    console.error('Invalid selection. Please try again.');
    rl.close();
    return;
  }
  
  let sectionName = sectionOptions[sectionIndex];
  if (sectionName === 'custom') {
    sectionName = await askQuestion('Enter custom section name (e.g., "amenities-analysis"): ');
  }
  
  const outputPath = path.join(CONTENT_DIR, `${sectionName}.md`);
  
  // Check if file already exists
  if (fs.existsSync(outputPath)) {
    const overwrite = await askQuestion(`File ${sectionName}.md already exists. Overwrite? (y/n): `);
    if (overwrite.toLowerCase() !== 'y') {
      console.log('Operation cancelled.');
      rl.close();
      return;
    }
  }
  
  // Load template
  let templateContent;
  try {
    templateContent = fs.readFileSync(TEMPLATE_PATH, 'utf8');
  } catch (error) {
    console.error('Error loading template:', error);
    rl.close();
    return;
  }
  
  // Replace common placeholders with building config values
  templateContent = templateContent
    .replace(/\[PROPERTY_NAME\]/g, buildingConfig.name)
    .replace(/\[NEIGHBORHOOD\]/g, buildingConfig.location.neighborhood)
    .replace(/\[CITY\]/g, buildingConfig.location.city)
    .replace(/\[STATE\]/g, buildingConfig.location.state)
    .replace(/\[UNITS\]/g, buildingConfig.details.units)
    .replace(/\[STORIES\]/g, buildingConfig.details.stories)
    .replace(/\[SECTION_TITLE\]/g, sectionName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '));

  // Add section-specific placeholder
  templateContent = templateContent
    .replace(/\[SECTION_SPECIFIC_FOCUS\]/g, sectionName.split('-').join(' '));
  
  // Create the content file
  try {
    fs.writeFileSync(outputPath, templateContent);
    console.log(`\nSuccess! Created ${sectionName}.md with template content.`);
    console.log(`You can now edit this file at: ${outputPath}`);
  } catch (error) {
    console.error('Error creating content file:', error);
  }
  
  rl.close();
}

createContent().catch(error => {
  console.error('Error creating content:', error);
  rl.close();
  process.exit(1);
});