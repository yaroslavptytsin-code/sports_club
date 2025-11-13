const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔧 Starting complete database reset...');

try {
  // 1. Stop any running processes
  console.log('Stopping processes...');
  try {
    execSync('taskkill /f /im node.exe 2>nul', { stdio: 'inherit' });
  } catch (e) {}

  // 2. Delete database file
  const dbPath = path.join(__dirname, 'prisma', 'dev.db');
  if (fs.existsSync(dbPath)) {
    console.log('Deleting old database...');
    fs.unlinkSync(dbPath);
  }

  // 3. Clear Prisma client cache
  const prismaClientPath = path.join(__dirname, 'node_modules', '.prisma');
  if (fs.existsSync(prismaClientPath)) {
    console.log('Clearing Prisma client cache...');
    fs.rmSync(prismaClientPath, { recursive: true, force: true });
  }

  // 4. Regenerate Prisma client
  console.log('Generating Prisma client...');
  execSync('npx prisma generate', { stdio: 'inherit' });

  // 5. Push schema to database
  console.log('Creating database schema...');
  execSync('npx prisma db push --force-reset', { stdio: 'inherit' });

  console.log('✅ Database reset completed successfully!');
  
} catch (error) {
  console.error('❌ Error during reset:', error.message);
  process.exit(1);
}