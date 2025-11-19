#!/usr/bin/env node

/**
 * Setup Checker - Verifies environment and database configuration
 * Run with: node check-setup.js
 */

console.log('\n🔍 Checking Creator Genius Platform Setup...\n');

// Check 1: Environment variables
console.log('📋 Step 1: Environment Variables');
const fs = require('fs');
const path = require('path');

const envLocalPath = path.join(__dirname, '.env.local');
if (!fs.existsSync(envLocalPath)) {
  console.log('❌ .env.local file not found');
  console.log('   → Run: cp .env.example .env.local');
  console.log('   → Then edit .env.local with your real credentials\n');
  process.exit(1);
} else {
  console.log('✅ .env.local file exists');

  const envContent = fs.readFileSync(envLocalPath, 'utf-8');
  const checks = [
    { key: 'NEXT_PUBLIC_SUPABASE_URL', name: 'Supabase URL' },
    { key: 'NEXT_PUBLIC_SUPABASE_ANON_KEY', name: 'Supabase Anon Key' },
    { key: 'SUPABASE_SERVICE_ROLE_KEY', name: 'Supabase Service Role Key' },
    { key: 'OPENAI_API_KEY', name: 'OpenAI API Key' },
  ];

  let hasPlaceholders = false;
  checks.forEach(check => {
    const regex = new RegExp(`${check.key}=(.+)`);
    const match = envContent.match(regex);

    if (!match || !match[1]) {
      console.log(`   ⚠️  ${check.name} not set`);
      hasPlaceholders = true;
    } else if (match[1].includes('placeholder') || match[1].includes('your_') || match[1] === 'your-') {
      console.log(`   ⚠️  ${check.name} has placeholder value`);
      hasPlaceholders = true;
    } else if (match[1].length < 20) {
      console.log(`   ⚠️  ${check.name} looks too short`);
      hasPlaceholders = true;
    } else {
      console.log(`   ✅ ${check.name} configured`);
    }
  });

  if (hasPlaceholders) {
    console.log('\n❌ Some environment variables have placeholder values');
    console.log('   → Edit .env.local with your real Supabase and OpenAI credentials');
    console.log('   → See QUICK_START.md for instructions\n');
    process.exit(1);
  }
}

console.log('\n📦 Step 2: Dependencies');
const nodeModulesPath = path.join(__dirname, 'node_modules');
if (!fs.existsSync(nodeModulesPath)) {
  console.log('❌ node_modules not found');
  console.log('   → Run: npm install\n');
  process.exit(1);
} else {
  console.log('✅ Dependencies installed');
}

console.log('\n🗄️  Step 3: Database Tables');
console.log('⚠️  Cannot auto-check database tables from Node.js');
console.log('   → Please verify manually in Supabase dashboard:');
console.log('   → Go to Table Editor and check these tables exist:');
console.log('   → • bp_projects');
console.log('   → • bp_client_intake');
console.log('   → • bp_client_knowledge');
console.log('   → • sm_video_transcripts (with project_id column)');
console.log('   → • training_categories');
console.log('   → • training_insights');
console.log('\n   If tables are missing, run the SQL scripts in Supabase SQL Editor:');
console.log('   1. database-blueprint-only.sql (or database-schema.sql)');
console.log('   2. database-schema-update-project-research.sql');
console.log('   3. database-training-manual.sql');

console.log('\n✅ Environment configuration looks good!');
console.log('\n🚀 Next Steps:');
console.log('   1. Verify database tables exist in Supabase (see above)');
console.log('   2. Run: npm run dev');
console.log('   3. Open: http://localhost:3000');
console.log('   4. Test: Create a new project in Blueprint Generator');
console.log('\n📚 See QUICK_START.md for full setup guide\n');
