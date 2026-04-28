import fs from 'fs';
import path from 'path';

export type UserRole = 'admin' | 'user';

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  categories: string[]; // ['*'] means all, or specific slugs like ['media-buying']
  name: string;
  createdAt: string;
}

export interface Category {
  slug: string;
  name: string;
  department: string;
  description: string;
  accentHex: string;
}

interface DB {
  users: User[];
  categories?: Category[];
}

const DB_PATH = path.join(process.cwd(), 'data', 'db.json');

function readDB(): DB {
  if (!fs.existsSync(DB_PATH)) {
    const initial: DB = { users: [] };
    fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
    fs.writeFileSync(DB_PATH, JSON.stringify(initial, null, 2));
    return initial;
  }
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
}

function writeDB(db: DB): void {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
}

export function getUsers(): User[] {
  return readDB().users;
}

export function getUserById(id: string): User | undefined {
  return readDB().users.find(u => u.id === id);
}

export function getUserByEmail(email: string): User | undefined {
  return readDB().users.find(u => u.email.toLowerCase() === email.toLowerCase());
}

export function createUser(user: Omit<User, 'id' | 'createdAt'>): User {
  const db = readDB();
  const newUser: User = {
    ...user,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  db.users.push(newUser);
  writeDB(db);
  return newUser;
}

export function updateUser(id: string, updates: Partial<Omit<User, 'id' | 'createdAt'>>): User | null {
  const db = readDB();
  const idx = db.users.findIndex(u => u.id === id);
  if (idx === -1) return null;
  db.users[idx] = { ...db.users[idx], ...updates };
  writeDB(db);
  return db.users[idx];
}

export function deleteUser(id: string): boolean {
  const db = readDB();
  const idx = db.users.findIndex(u => u.id === id);
  if (idx === -1) return false;
  db.users.splice(idx, 1);
  writeDB(db);
  return true;
}

export function userHasAccess(user: User, categorySlug: string): boolean {
  return user.categories.includes('*') || user.categories.includes(categorySlug);
}

export function getCategories(): Category[] {
  const db = readDB();
  return db.categories || [];
}

export function getCategoryBySlug(slug: string): Category | undefined {
  const db = readDB();
  return (db.categories || []).find(c => c.slug === slug);
}

export function updateCategory(slug: string, updates: Partial<Omit<Category, 'slug' | 'accentHex'>>): boolean {
  const db = readDB();
  const categories = db.categories || [];
  const idx = categories.findIndex(c => c.slug === slug);
  if (idx === -1) return false;
  categories[idx] = { ...categories[idx], ...updates };
  db.categories = categories;
  writeDB(db as any);
  return true;
}
