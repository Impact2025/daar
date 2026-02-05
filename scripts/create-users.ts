import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

// Sterke wachtwoorden voor elk teamlid
const users = [
  {
    email: 'vincent@daar.nl',
    name: 'Vincent',
    password: 'Daar#Vincent2024!',
    teamMemberEmail: 'vincent@daar.nl',
  },
  {
    email: 'saviem@daar.nl',
    name: 'Saveim',
    password: 'Daar#Saveim2024!',
    teamMemberEmail: 'saveim@daar.nl',
  },
  {
    email: 'thijs@daar.nl',
    name: 'Thijs',
    password: 'Daar#Thijs2024!',
    teamMemberEmail: 'thijs@daar.nl',
  },
]

async function main() {
  console.log('Creating user accounts...\n')

  for (const userData of users) {
    // Hash het wachtwoord
    const passwordHash = await bcrypt.hash(userData.password, 12)

    // Maak of update de user
    const user = await prisma.user.upsert({
      where: { email: userData.email },
      update: {
        name: userData.name,
        passwordHash,
        role: 'ADMIN',
      },
      create: {
        email: userData.email,
        name: userData.name,
        passwordHash,
        role: 'ADMIN',
      },
    })

    // Koppel aan TeamMember
    const teamMember = await prisma.teamMember.findUnique({
      where: { email: userData.teamMemberEmail },
    })

    if (teamMember && !teamMember.userId) {
      await prisma.teamMember.update({
        where: { id: teamMember.id },
        data: { userId: user.id },
      })
      console.log(`✓ Linked ${userData.name} to TeamMember`)
    }

    console.log(`✓ Created user: ${userData.email}`)
    console.log(`  Password: ${userData.password}\n`)
  }

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('LOGIN GEGEVENS')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  for (const u of users) {
    console.log(`${u.name.padEnd(10)} ${u.email.padEnd(20)} ${u.password}`)
  }
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
