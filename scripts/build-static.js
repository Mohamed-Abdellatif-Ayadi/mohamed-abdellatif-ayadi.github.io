
const fs = require('fs');
const path = require('path');

// This script would generate a static version of your site
// Note: This would lose backend functionality like the chatbot

console.log('Building static version...');

// Copy client build to docs folder for GitHub Pages
const buildDir = path.join(__dirname, '../client/dist');
const docsDir = path.join(__dirname, '../docs');

if (fs.existsSync(buildDir)) {
  if (fs.existsSync(docsDir)) {
    fs.rmSync(docsDir, { recursive: true });
  }
  fs.cpSync(buildDir, docsDir, { recursive: true });
  console.log('Static build copied to docs/ folder');
} else {
  console.log('Please run "npm run build" first');
}
