#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// This script helps you recreate the project structure locally
console.log('Word Jar Project Structure and Files:');
console.log('=====================================\n');

const projectStructure = {
  'package.json': `{
  "name": "vite-react-typescript-starter",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "lucide-react": "^0.344.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@eslint/js": "^9.9.1",
    "@types/react": "^18.3.5",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.18",
    "eslint": "^9.9.1",
    "eslint-plugin-react-hooks": "^5.1.0-rc.0",
    "eslint-plugin-react-refresh": "^0.4.11",
    "globals": "^15.9.0",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.5.3",
    "typescript-eslint": "^8.3.0",
    "vite": "^5.4.2"
  }
}`,
  
  'index.html': `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SAT Vocabulary Word Jar Application</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`,

  'README.md': `# Word Jar - SAT Vocabulary Study App

A beautiful and interactive web application for studying SAT vocabulary words using a flashcard-based approach.

## Features

- 🎯 **Smart Word Selection**: Weighted random selection based on word priority
- 🔄 **Interactive Flashcards**: Click to flip and reveal definitions
- 📊 **Progress Tracking**: Mark words as mastered to exclude from future selections
- ➕ **Add Custom Words**: Expand your vocabulary with personal additions
- 🎨 **Beautiful Design**: Modern UI with smooth animations
- 💾 **Auto-Save**: Progress automatically saved to local storage
- 📱 **Responsive**: Works perfectly on mobile, tablet, and desktop

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/YOUR_USERNAME/word-jar-app.git
cd word-jar-app
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open your browser and navigate to \`http://localhost:5173\`

### Building for Production

\`\`\`bash
npm run build
\`\`\`

## How to Use

1. **Select Words**: Choose how many words you want to study (1-10)
2. **Pick Random Words**: Click the button to randomly select words from the jar
3. **Study**: Click on flashcards to reveal meanings, pronunciations, and example sentences
4. **Mark Progress**: Use "Drop Back" to return words to the jar or "Mark Success" for mastered words
5. **Add Words**: Use the "Add Word" button to expand your vocabulary
6. **Reset**: Use "Reset" to make all words available again

## Technology Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **Lucide React** - Icons

## Live Demo

Check out the live demo: [Word Jar App](https://sat-vocabulary-word-5n2o.bolt.host)`,

  '.gitignore': `# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Production build
dist/
build/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE files
.vscode/
.idea/
*.swp
*.swo

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Logs
logs
*.log

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/
*.lcov

# Dependency directories
jspm_packages/

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Bolt specific
.bolt/`
};

console.log('Files to create:');
Object.keys(projectStructure).forEach(file => {
  console.log(`- ${file}`);
});

console.log('\n\nTo recreate this project locally:');
console.log('1. Create a new folder: mkdir word-jar-app && cd word-jar-app');
console.log('2. Create each file with the content shown above');
console.log('3. Create the src/ directory structure');
console.log('4. Run: npm install');
console.log('5. Run: npm run dev');