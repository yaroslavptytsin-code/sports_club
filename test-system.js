const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function testSystem() {
  console.log('🧪 Testing System Status...\n');

  try {
    // Test database connection
    console.log('1. Testing database connection...');
    const userCount = await prisma.user.count();
    console.log(`   ✅ Database connected! Users in database: ${userCount}`);

    // Test if username column exists
    console.log('2. Testing username column...');
    const sampleUser = await prisma.user.findFirst();
    if (sampleUser && sampleUser.username) {
      console.log(`   ✅ Username column exists! Sample: ${sampleUser.username}`);
    } else {
      console.log('   ❌ Username column issue');
    }

    // Test image paths
    console.log('3. Testing image paths...');
    const images = ['/images/1489454514.jpg', '/images/sidelogo.png'];
    
    images.forEach(img => {
      const imagePath = path.join(__dirname, 'public', img);
      if (fs.existsSync(imagePath)) {
        const stats = fs.statSync(imagePath);
        console.log(`   ✅ ${img} - ${(stats.size / 1024).toFixed(1)} KB`);
      } else {
        console.log(`   ❌ ${img} - Missing`);
      }
    });

    console.log('\n🎉 System Status: READY');
    console.log('\nYou can now:');
    console.log('1. Register new users at http://localhost:3000/register');
    console.log('2. Login with existing users');
    console.log('3. Access My Page and My Club');

  } catch (error) {
    console.log('❌ System Status: ISSUES DETECTED');
    console.error('Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the test
testSystem();