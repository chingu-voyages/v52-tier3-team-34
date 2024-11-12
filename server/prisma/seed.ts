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

  // Clear existing events
  await prisma.event.deleteMany();

  // Create sample events
  const events = await Promise.all([
    prisma.event.create({
      data: {
        title: "Jazz Night at Blue Note",
        description: "Live jazz quartet performing classic standards and original compositions. Perfect for a sophisticated evening out.",
        startDate: new Date("2024-03-25T19:00:00Z"),
        endDate: new Date("2024-03-25T23:00:00Z"),
        location: "Blue Note Bar & Restaurant",
        status: "published",
      },
    }),
    prisma.event.create({
      data: {
        title: "Acoustic Sessions at The Old Pub",
        description: "Local singer-songwriters showcase their original music in an intimate setting. Great craft beer selection available.",
        startDate: new Date("2024-03-28T20:00:00Z"),
        endDate: new Date("2024-03-29T00:00:00Z"),
        location: "The Old Pub",
        status: "published",
      },
    }),
    prisma.event.create({
      data: {
        title: "Latin Night at Casa Bonita",
        description: "Live salsa band and dance lessons. Featuring authentic Latin cuisine and signature cocktails.",
        startDate: new Date("2024-03-30T21:00:00Z"),
        endDate: new Date("2024-03-31T02:00:00Z"),
        location: "Casa Bonita Restaurant & Bar",
        status: "published",
      },
    }),
    prisma.event.create({
      data: {
        title: "Rock Cover Band at Murphy's",
        description: "Local favorites 'The Amplifiers' playing classic rock hits from the 70s to now. Full bar and pub menu available.",
        startDate: new Date("2024-04-01T20:30:00Z"),
        endDate: new Date("2024-04-02T00:30:00Z"),
        location: "Murphy's Irish Pub",
        status: "draft",
      },
    }),
  ]);

  console.log(`Database has been seeded with ${events.length} events 🌱`);
  events.forEach(event => {
    console.log(`Created event: ${event.title} (ID: ${event.id})`);
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