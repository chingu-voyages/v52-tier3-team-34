import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.user.deleteMany();

  // Create test users
  const users = await Promise.all([
    // Developers
    prisma.user.create({
      data: {
        email: "john.dev@example.com",
        name: "John Developer",
        googleId: "google_dev_123",
        profileImage: "https://example.com/avatars/john.jpg"
      },
    }),
    prisma.user.create({
      data: {
        email: "jane.tech@example.com",
        name: "Jane Tech",
        googleId: "google_dev_456",
        profileImage: "https://example.com/avatars/jane.jpg"
      },
    }),
    
    // Designers
    prisma.user.create({
      data: {
        email: "bob.design@example.com",
        name: "Bob Designer",
        googleId: "google_design_789",
        profileImage: "https://example.com/avatars/bob.jpg"
      },
    }),
    prisma.user.create({
      data: {
        email: "alice.ux@example.com",
        name: "Alice UX",
        googleId: "google_design_101",
        profileImage: "https://example.com/avatars/alice.jpg"
      },
    }),

    // Project Managers
    prisma.user.create({
      data: {
        email: "sarah.pm@example.com",
        name: "Sarah Manager",
        googleId: "google_pm_102",
        profileImage: "https://example.com/avatars/sarah.jpg"
      },
    }),
    prisma.user.create({
      data: {
        email: "mike.lead@example.com",
        name: "Mike Team Lead",
        googleId: "google_pm_103",
        profileImage: "https://example.com/avatars/mike.jpg"
      },
    }),

    // Marketing Team
    prisma.user.create({
      data: {
        email: "emma.marketing@example.com",
        name: "Emma Marketing",
        googleId: "google_marketing_104",
        profileImage: "https://example.com/avatars/emma.jpg"
      },
    }),
    prisma.user.create({
      data: {
        email: "david.content@example.com",
        name: "David Content",
        googleId: "google_marketing_105",
      },
    }),

    // QA Team
    prisma.user.create({
      data: {
        email: "tom.qa@example.com",
        name: "Tom Tester",
        googleId: "google_qa_106",
        profileImage: "https://example.com/avatars/tom.jpg"
      },
    }),
    prisma.user.create({
      data: {
        email: "lisa.qa@example.com",
        name: "Lisa QA",
        googleId: "google_qa_107",
        profileImage: "https://example.com/avatars/lisa.jpg"
      },
    })
  ]);

  console.log(`Database has been seeded with ${users.length} users 🌱`);
  users.forEach(user => {
    console.log(`Created user: ${user.name} (ID: ${user.id})`);
  });
}

main()
  .catch((e) => {
    console.error('Error seeding data:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 