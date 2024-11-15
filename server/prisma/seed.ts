import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.venue.deleteMany();
  await prisma.event.deleteMany();
  await prisma.user.deleteMany();

  // Create test venues
  const venues = await Promise.all([
    prisma.venue.create({
      data: {
        name: "Blue Note Jazz Club",
        description: "Historic jazz venue featuring nightly live performances and full bar service.",
        address: "131 W 3rd St, New York, NY 10012",
        contact: {
          phone: "+1-212-475-8592",
          email: "info@bluenote.net",
          website: "https://www.bluenotejazz.com"
        },
        coordinates: {
          lat: 40.730483,
          lng: -74.000339
        },
        images: [
          "https://example.com/venues/bluenote1.jpg",
          "https://example.com/venues/bluenote2.jpg"
        ]
      }
    }),
    prisma.venue.create({
      data: {
        name: "The Basement Bar",
        description: "Intimate underground venue for live music and craft cocktails.",
        address: "42 Hoxton Square, London N1 6PB",
        contact: {
          phone: "+44-20-7729-4121",
          email: "bookings@basementbar.co.uk",
          website: "https://www.thebasementbar.co.uk"
        },
        coordinates: {
          lat: 51.527817,
          lng: -0.082448
        },
        images: [
          "https://example.com/venues/basement1.jpg"
        ]
      }
    }),
    prisma.venue.create({
      data: {
        name: "Flamenco Casa",
        description: "Authentic Spanish tablao featuring nightly flamenco shows.",
        address: "Calle de los Reyes, 28015 Madrid",
        contact: {
          phone: "+34-91-547-2672",
          email: "hola@flamencacasa.es",
          website: "https://www.flamencacasa.es"
        },
        coordinates: {
          lat: 40.423697,
          lng: -3.710432
        },
        images: [
          "https://example.com/venues/flamenco1.jpg",
          "https://example.com/venues/flamenco2.jpg",
          "https://example.com/venues/flamenco3.jpg"
        ]
      }
    })
  ]);

  // Create test users
  const users = await Promise.all([
    // Developers
    prisma.user.create({
      data: {
        email: "john.dev@example.com",
        name: "John Developer",
        googleId: "google_dev_123",
        profileImage: "https://example.com/avatars/john.jpg",
      },
    }),
    prisma.user.create({
      data: {
        email: "jane.tech@example.com",
        name: "Jane Tech",
        googleId: "google_dev_456",
        profileImage: "https://example.com/avatars/jane.jpg",
      },
    }),

    // Designers
    prisma.user.create({
      data: {
        email: "bob.design@example.com",
        name: "Bob Designer",
        googleId: "google_design_789",
        profileImage: "https://example.com/avatars/bob.jpg",
      },
    }),
    prisma.user.create({
      data: {
        email: "alice.ux@example.com",
        name: "Alice UX",
        googleId: "google_design_101",
        profileImage: "https://example.com/avatars/alice.jpg",
      },
    }),

    // Project Managers
    prisma.user.create({
      data: {
        email: "sarah.pm@example.com",
        name: "Sarah Manager",
        googleId: "google_pm_102",
        profileImage: "https://example.com/avatars/sarah.jpg",
      },
    }),
    prisma.user.create({
      data: {
        email: "mike.lead@example.com",
        name: "Mike Team Lead",
        googleId: "google_pm_103",
        profileImage: "https://example.com/avatars/mike.jpg",
      },
    }),

    // Marketing Team
    prisma.user.create({
      data: {
        email: "emma.marketing@example.com",
        name: "Emma Marketing",
        googleId: "google_marketing_104",
        profileImage: "https://example.com/avatars/emma.jpg",
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
        profileImage: "https://example.com/avatars/tom.jpg",
      },
    }),
    prisma.user.create({
      data: {
        email: "lisa.qa@example.com",
        name: "Lisa QA",
        googleId: "google_qa_107",
        profileImage: "https://example.com/avatars/lisa.jpg",
      },
    }),
  ]);

  console.log(`Database has been seeded with:`);
  console.log(`- ${venues.length} venues`);
  venues.forEach(venue => {
    console.log(`  - ${venue.name} (ID: ${venue.id})`);
  });
  console.log(`- ${users.length} users`);
  users.forEach(user => {
    console.log(`  - ${user.name} (ID: ${user.id})`);
  });

  // Create sample events
  const events = await Promise.all([
    prisma.event.create({
      data: {
        title: "Jazz Night at Blue Note",
        description:
          "Live jazz quartet performing classic standards and original compositions. Perfect for a sophisticated evening out.",
        startDate: new Date("2024-03-25T19:00:00Z"),
        endDate: new Date("2024-03-25T23:00:00Z"),
        location: "Blue Note Bar & Restaurant",
        status: "published",
      },
    }),
    prisma.event.create({
      data: {
        title: "Acoustic Sessions at The Old Pub",
        description:
          "Local singer-songwriters showcase their original music in an intimate setting. Great craft beer selection available.",
        startDate: new Date("2024-03-28T20:00:00Z"),
        endDate: new Date("2024-03-29T00:00:00Z"),
        location: "The Old Pub",
        status: "published",
      },
    }),
    prisma.event.create({
      data: {
        title: "Latin Night at Casa Bonita",
        description:
          "Live salsa band and dance lessons. Featuring authentic Latin cuisine and signature cocktails.",
        startDate: new Date("2024-03-30T21:00:00Z"),
        endDate: new Date("2024-03-31T02:00:00Z"),
        location: "Casa Bonita Restaurant & Bar",
        status: "published",
      },
    }),
    prisma.event.create({
      data: {
        title: "Rock Cover Band at Murphy's",
        description:
          "Local favorites 'The Amplifiers' playing classic rock hits from the 70s to now. Full bar and pub menu available.",
        startDate: new Date("2024-04-01T20:30:00Z"),
        endDate: new Date("2024-04-02T00:30:00Z"),
        location: "Murphy's Irish Pub",
        status: "draft",
      },
    }),
  ]);

  console.log(`Database has been seeded with ${events.length} events 🌱`);
  events.forEach((event) => {
    console.log(`Created event: ${event.title} (ID: ${event.id})`);
  });
}

main()
  .catch((e) => {
    console.error("Error seeding data:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
