// Usage: node update-article.mjs <slug> <html-file>
import { readFileSync } from 'fs';
import { PrismaClient } from '@prisma/client';
const [slug, file] = process.argv.slice(2);
const content = readFileSync(file, 'utf8');
const p = new PrismaClient();
const before = await p.article.findUnique({ where: { slug }, select: { content: true } });
if (!before) { console.error('Artikel niet gevonden:', slug); process.exit(1); }
const wc = s => s.split(/\s+/).filter(Boolean).length;
await p.article.update({ where: { slug }, data: { content } });
console.log(`${slug}: ${wc(before.content)}w -> ${wc(content)}w`);
await p.$disconnect();
