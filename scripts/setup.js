const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const readline = require('readline');

const DB_PATH = path.join(__dirname, '..', 'data', 'db.json');

function readDB() {
  if (!fs.existsSync(DB_PATH)) return { users: [] };
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
}

function writeDB(db) {
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
}

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = q => new Promise(resolve => rl.question(q, resolve));

async function main() {
  console.log('\n🚀  SOP Platform — First-time Setup\n');

  const db = readDB();
  if (db.users.some(u => u.role === 'admin')) {
    console.log('✅  Admin account already exists. To add more users, use the Admin Panel in the app.\n');
    rl.close();
    return;
  }

  console.log('Create your admin account:\n');
  const name = await ask('  Name: ');
  const email = await ask('  Email: ');
  const password = await ask('  Password: ');

  if (!name || !email || !password) {
    console.log('\n❌  All fields are required.\n');
    rl.close();
    return;
  }

  const passwordHash = await bcrypt.hash(password, 10);
  db.users.push({
    id: Date.now().toString(),
    email,
    passwordHash,
    name,
    role: 'admin',
    categories: ['*'],
    createdAt: new Date().toISOString(),
  });

  writeDB(db);
  console.log(`\n✅  Admin account created for ${email}`);
  console.log('   Run "npm run dev" and visit http://localhost:3000\n');
  rl.close();
}

main().catch(err => {
  console.error(err);
  rl.close();
  process.exit(1);
});
