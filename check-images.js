const fs = require('fs');
const path = require('path');

console.log('🔍 Checking image files...');

const images = [
  'public/images/1489454514.jpg',
  'public/images/sidelogo.png'
];

images.forEach(imagePath => {
  const fullPath = path.join(__dirname, imagePath);
  if (fs.existsSync(fullPath)) {
    console.log(`✅ ${imagePath} - EXISTS`);
    const stats = fs.statSync(fullPath);
    console.log(`   Size: ${(stats.size / 1024).toFixed(2)} KB`);
  } else {
    console.log(`❌ ${imagePath} - MISSING`);
  }
});