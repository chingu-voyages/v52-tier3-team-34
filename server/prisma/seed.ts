import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.event.deleteMany();
  await prisma.venue.deleteMany();
  await prisma.user.deleteMany();

  // Create venue managers/owners
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: "ny.manager@example.com",
        name: "New York Venue Manager",
        googleId: "g_ny_123",
        profileImage: "https://example.com/profiles/ny_manager.jpg"
      }
    }),
    prisma.user.create({
      data: {
        email: "paris.manager@example.com",
        name: "Paris Venue Manager",
        googleId: "g_paris_123",
        profileImage: "https://example.com/profiles/paris_manager.jpg"
      }
    }),
    prisma.user.create({
      data: {
        email: "berlin.manager@example.com",
        name: "Berlin Venue Manager",
        googleId: "g_berlin_123",
        profileImage: "https://example.com/profiles/berlin_manager.jpg"
      }
    })
  ]);

  const [nyManager, parisManager, berlinManager] = users;

  // New York Venues (Times Square as center: 40.7580, -73.9855)
  const nyVenues = await Promise.all([
    prisma.venue.create({
      data: {
        name: "Blue Note Jazz Club",
        description: "Historic jazz venue featuring nightly live performances and full bar service",
        address: "131 W 3rd St, New York, NY 10012",
        contact: {
          phone: "+1-212-475-8592",
          email: "info@bluenote.net",
          website: "https://www.bluenote.com"
        },
        coordinates: { lat: 40.7302, lng: -74.0003 },
        images: ["https://example.com/venues/bluenote1.jpg"],
        userId: nyManager.id
      }
    }),
    prisma.venue.create({
      data: {
        name: "Village Vanguard",
        description: "Legendary jazz club in Greenwich Village, operating since 1935",
        address: "178 7th Ave S, New York, NY 10014",
        contact: {
          phone: "+1-212-255-4037",
          email: "info@villagevanguard.com",
          website: "https://www.villagevanguard.com"
        },
        coordinates: { lat: 40.7347, lng: -74.0023 },
        images: ["https://example.com/venues/vanguard1.jpg"],
        userId: nyManager.id
      }
    }),
    prisma.venue.create({
      data: {
        name: "Birdland Jazz Club",
        description: "Premier jazz venue featuring world-class musicians",
        address: "315 W 44th St, New York, NY 10036",
        contact: {
          phone: "+1-212-581-3080",
          email: "info@birdlandjazz.com",
          website: "https://www.birdlandjazz.com"
        },
        coordinates: { lat: 40.7589, lng: -73.9910 },
        images: ["https://example.com/venues/birdland1.jpg"],
        userId: nyManager.id
      }
    }),
    prisma.venue.create({
      data: {
        name: "The Iridium",
        description: "Intimate music venue known for jazz and rock performances",
        address: "1650 Broadway, New York, NY 10019",
        contact: {
          phone: "+1-212-582-2121",
          email: "info@theiridium.com",
          website: "https://www.theiridium.com"
        },
        coordinates: { lat: 40.7620, lng: -73.9837 },
        images: ["https://example.com/venues/iridium1.jpg"],
        userId: nyManager.id
      }
    }),
    prisma.venue.create({
      data: {
        name: "Bowery Ballroom",
        description: "Three-level music venue featuring indie and rock acts",
        address: "6 Delancey St, New York, NY 10002",
        contact: {
          phone: "+1-212-533-2111",
          email: "info@boweryballroom.com",
          website: "https://www.boweryballroom.com"
        },
        coordinates: { lat: 40.7204, lng: -73.9934 },
        images: ["https://example.com/venues/bowery1.jpg"],
        userId: nyManager.id
      }
    }),
    prisma.venue.create({
      data: {
        name: "Brooklyn Steel",
        description: "Modern music venue in East Williamsburg",
        address: "319 Frost St, Brooklyn, NY 11222",
        contact: {
          phone: "+1-929-234-6200",
          email: "info@bksteel.com",
          website: "https://www.brooklynsteel.com"
        },
        coordinates: { lat: 40.7168, lng: -73.9396 },
        images: ["https://example.com/venues/bksteel1.jpg"],
        userId: nyManager.id
      }
    })
  ]);

  // Paris Venues (Notre-Dame as center: 48.8530, 2.3499)
  const parisVenues = await Promise.all([
    prisma.venue.create({
      data: {
        name: "L'Olympia",
        description: "Historic music hall hosting major international artists",
        address: "28 Boulevard des Capucines, 75009 Paris",
        contact: {
          phone: "+33-1-47-42-25-49",
          email: "contact@olympia.fr",
          website: "https://www.olympiahall.com"
        },
        coordinates: { lat: 48.8700, lng: 2.3283 },
        images: ["https://example.com/venues/olympia1.jpg"],
        userId: parisManager.id
      }
    }),
    prisma.venue.create({
      data: {
        name: "Le Bataclan",
        description: "Iconic venue for rock and contemporary music",
        address: "50 Boulevard Voltaire, 75011 Paris",
        contact: {
          phone: "+33-1-43-14-00-30",
          email: "info@bataclan.fr",
          website: "https://www.bataclan.fr"
        },
        coordinates: { lat: 48.8632, lng: 2.3702 },
        images: ["https://example.com/venues/bataclan1.jpg"],
        userId: parisManager.id
      }
    }),
    prisma.venue.create({
      data: {
        name: "New Morning",
        description: "Renowned jazz club featuring international artists",
        address: "7-9 Rue des Petites Écuries, 75010 Paris",
        contact: {
          phone: "+33-1-45-23-51-41",
          email: "contact@newmorning.com",
          website: "https://www.newmorning.com"
        },
        coordinates: { lat: 48.8729, lng: 2.3502 },
        images: ["https://example.com/venues/newmorning1.jpg"],
        userId: parisManager.id
      }
    }),
    prisma.venue.create({
      data: {
        name: "La Cigale",
        description: "Historic theater venue for diverse musical performances",
        address: "120 Boulevard de Rochechouart, 75018 Paris",
        contact: {
          phone: "+33-1-49-25-89-99",
          email: "contact@lacigale.fr",
          website: "https://www.lacigale.fr"
        },
        coordinates: { lat: 48.8827, lng: 2.3401 },
        images: ["https://example.com/venues/cigale1.jpg"],
        userId: parisManager.id
      }
    }),
    prisma.venue.create({
      data: {
        name: "Le Petit Journal",
        description: "Intimate jazz club with nightly performances",
        address: "71 Boulevard Saint-Germain, 75006 Paris",
        contact: {
          phone: "+33-1-43-26-28-59",
          email: "info@petitjournal.com",
          website: "https://www.petitjournal.com"
        },
        coordinates: { lat: 48.8524, lng: 2.3384 },
        images: ["https://example.com/venues/petitjournal1.jpg"],
        userId: parisManager.id
      }
    })
  ]);

  // Berlin Venues (Brandenburg Gate as center: 52.5163, 13.3777)
  const berlinVenues = await Promise.all([
    prisma.venue.create({
      data: {
        name: "Berghain",
        description: "World-famous electronic music venue",
        address: "Am Wriezener Bahnhof, 10243 Berlin",
        contact: {
          phone: "+49-30-2936-0210",
          email: "info@berghain.de",
          website: "https://www.berghain.de"
        },
        coordinates: { lat: 52.5111, lng: 13.4399 },
        images: ["https://example.com/venues/berghain1.jpg"],
        userId: berlinManager.id
      }
    }),
    prisma.venue.create({
      data: {
        name: "SO36",
        description: "Historic punk and rock venue in Kreuzberg",
        address: "Oranienstraße 190, 10999 Berlin",
        contact: {
          phone: "+49-30-6140-1306",
          email: "info@so36.de",
          website: "https://www.so36.de"
        },
        coordinates: { lat: 52.5001, lng: 13.4285 },
        images: ["https://example.com/venues/so361.jpg"],
        userId: berlinManager.id
      }
    }),
    prisma.venue.create({
      data: {
        name: "Lido",
        description: "Popular indie music venue",
        address: "Cuvrystraße 7, 10997 Berlin",
        contact: {
          phone: "+49-30-6956-6840",
          email: "info@lido-berlin.de",
          website: "https://www.lido-berlin.de"
        },
        coordinates: { lat: 52.4977, lng: 13.4422 },
        images: ["https://example.com/venues/lido1.jpg"],
        userId: berlinManager.id
      }
    }),
    prisma.venue.create({
      data: {
        name: "Astra Kulturhaus",
        description: "Alternative music venue in Friedrichshain",
        address: "Revaler Str. 99, 10245 Berlin",
        contact: {
          phone: "+49-30-2005-6767",
          email: "info@astra-berlin.de",
          website: "https://www.astra-berlin.de"
        },
        coordinates: { lat: 52.5066, lng: 13.4542 },
        images: ["https://example.com/venues/astra1.jpg"],
        userId: berlinManager.id
      }
    })
  ]);

  // Create events for each venue
  const events = [];

  // Helper function to create event dates
  const getEventDates = (dayOffset: number) => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + dayOffset);
    startDate.setHours(20, 0, 0, 0);
    const endDate = new Date(startDate);
    endDate.setHours(23, 0, 0, 0);
    return { startDate, endDate };
  };

  // Events for New York venues
  for (const venue of nyVenues) {
    // 2-3 events per venue on different days
    const dates1 = getEventDates(1);
    const dates2 = getEventDates(3);
    
    events.push(
      prisma.event.create({
        data: {
          title: `Jazz Night at ${venue.name}`,
          description: "Live jazz quartet performing classic standards and original compositions",
          startDate: dates1.startDate,
          endDate: dates1.endDate,
          status: "published",
          venueId: venue.id
        }
      }),
      prisma.event.create({
        data: {
          title: `Blues Evening at ${venue.name}`,
          description: "Soulful blues performance featuring local and guest artists",
          startDate: dates2.startDate,
          endDate: dates2.endDate,
          status: "published",
          venueId: venue.id
        }
      })
    );
  }

  // Events for Paris venues
  for (const venue of parisVenues) {
    const dates1 = getEventDates(2);
    const dates2 = getEventDates(4);
    
    events.push(
      prisma.event.create({
        data: {
          title: `Soirée Jazz at ${venue.name}`,
          description: "Une soirée exceptionnelle de jazz contemporain",
          startDate: dates1.startDate,
          endDate: dates1.endDate,
          status: "published",
          venueId: venue.id
        }
      }),
      prisma.event.create({
        data: {
          title: `Classical Night at ${venue.name}`,
          description: "Classical music performance featuring chamber orchestra",
          startDate: dates2.startDate,
          endDate: dates2.endDate,
          status: "published",
          venueId: venue.id
        }
      })
    );
  }

  // Events for Berlin venues
  for (const venue of berlinVenues) {
    const dates1 = getEventDates(1);
    const dates2 = getEventDates(3);
    const dates3 = getEventDates(5);
    
    events.push(
      prisma.event.create({
        data: {
          title: `Electronic Night at ${venue.name}`,
          description: "Progressive electronic music featuring international DJs",
          startDate: dates1.startDate,
          endDate: dates1.endDate,
          status: "published",
          venueId: venue.id
        }
      }),
      prisma.event.create({
        data: {
          title: `Indie Rock at ${venue.name}`,
          description: "Alternative and indie rock bands showcase",
          startDate: dates2.startDate,
          endDate: dates2.endDate,
          status: "published",
          venueId: venue.id
        }
      }),
      prisma.event.create({
        data: {
          title: `Experimental Music at ${venue.name}`,
          description: "Avant-garde and experimental music performance",
          startDate: dates3.startDate,
          endDate: dates3.endDate,
          status: "draft",
          venueId: venue.id
        }
      })
    );
  }

  const createdEvents = await Promise.all(events);

  console.log(`Database has been seeded with:`);
  console.log(`- ${nyVenues.length} New York venues`);
  console.log(`- ${parisVenues.length} Paris venues`);
  console.log(`- ${berlinVenues.length} Berlin venues`);
  console.log(`- ${createdEvents.length} events`);
}

main()
  .catch((e) => {
    console.error("Error seeding data:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
