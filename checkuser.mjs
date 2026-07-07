import { PrismaClient } from '@prisma/client'
const p = new PrismaClient()
const u = await p.user.findFirst({ where: { role: 'ADMIN' }, select: { id: true, email: true, role: true, passwordHash: true } })
console.log('ADMIN_USER=' + JSON.stringify(u))
await p.$disconnect()
