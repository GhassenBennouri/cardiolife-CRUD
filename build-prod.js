#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting optimized production build...');

// Nettoyer le dossier dist
console.log('🧹 Cleaning dist folder...');
if (fs.existsSync('dist')) {
  fs.rmSync('dist', { recursive: true, force: true });
}

// Build de production avec optimisations
console.log('📦 Building for production...');
try {
  execSync('ng build --configuration production', { 
    stdio: 'inherit',
    cwd: process.cwd()
  });
  
  console.log('✅ Production build completed successfully!');
  
  // Afficher les tailles des bundles
  console.log('\n📊 Bundle sizes:');
  const distPath = path.join(process.cwd(), 'dist', 'aed-management');
  
  if (fs.existsSync(distPath)) {
    const files = fs.readdirSync(distPath);
    const jsFiles = files.filter(file => file.endsWith('.js'));
    
    jsFiles.forEach(file => {
      const filePath = path.join(distPath, file);
      const stats = fs.statSync(filePath);
      const sizeKB = (stats.size / 1024).toFixed(2);
      console.log(`  ${file}: ${sizeKB} KB`);
    });
  }
  
  console.log('\n🎉 Build ready for deployment!');
  console.log('📁 Files are in: dist/aed-management/');
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
