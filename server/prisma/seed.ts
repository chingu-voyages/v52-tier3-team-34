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
    }),
    prisma.user.create({
      data: {
        email: "barcelona.manager@example.com",
        name: "Barcelona Venue Manager",
        googleId: "g_bcn_123",
        profileImage: "https://example.com/profiles/bcn_manager.jpg"
      }
    })
  ]);

  const [nyManager, parisManager, berlinManager, barcelonaManager] = users;

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
        images: [
          "https://media.timeout.com/images/105848436/750/422/image.jpg",
          "https://media.timeout.com/images/105848434/750/422/image.jpg"
        ],
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
        images: [
          "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Village_Vanguard%2C_NYC.jpg/1200px-Village_Vanguard%2C_NYC.jpg",
          "https://media.timeout.com/images/105930105/750/422/image.jpg"
        ],
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
        images: [
          "https://media.timeout.com/images/105022673/750/422/image.jpg",
          "https://media.timeout.com/images/105022674/750/422/image.jpg"
        ],
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
        images: [
          "https://media.timeout.com/images/105759425/750/422/image.jpg",
          "https://media.timeout.com/images/105759426/750/422/image.jpg"
        ],
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
        images: [
          "https://media.timeout.com/images/105759427/750/422/image.jpg",
          "https://media.timeout.com/images/105759428/750/422/image.jpg"
        ],
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
        images: [
          "https://media.timeout.com/images/105124786/750/422/image.jpg",
          "https://media.timeout.com/images/105124787/750/422/image.jpg"
        ],
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
        images: [
          "https://www.olympiahall.com/assets/img/olympia-facade.jpg",
          "https://www.olympiahall.com/assets/img/olympia-salle.jpg"
        ],
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
        images: [
          "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Le_Bataclan_25_11_2015.jpg/1200px-Le_Bataclan_25_11_2015.jpg",
          "https://media.timeout.com/images/105237731/750/422/image.jpg"
        ],
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
        images: [
          "https://www.newmorning.com/assets/img/facade.jpg",
          "https://media.timeout.com/images/105237732/750/422/image.jpg"
        ],
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
        images: [
          "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/La_Cigale_Paris_2.jpg/1200px-La_Cigale_Paris_2.jpg",
          "https://media.timeout.com/images/105237733/750/422/image.jpg"
        ],
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
        images: [
          "https://media.timeout.com/images/105237734/750/422/image.jpg",
          "https://media.timeout.com/images/105237735/750/422/image.jpg"
        ],
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
        images: [
          "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Berghain_Berlin.jpg/1200px-Berghain_Berlin.jpg",
          "https://media.timeout.com/images/105935915/750/422/image.jpg"
        ],
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
        images: [
          "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/SO36_Berlin.jpg/1200px-SO36_Berlin.jpg",
          "https://media.timeout.com/images/105935916/750/422/image.jpg"
        ],
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
        images: [
          "https://media.timeout.com/images/105935917/750/422/image.jpg",
          "https://media.timeout.com/images/105935918/750/422/image.jpg"
        ],
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
        images: [
          "https://media.timeout.com/images/105935919/750/422/image.jpg",
          "https://media.timeout.com/images/105935920/750/422/image.jpg"
        ],
        userId: berlinManager.id
      }
    })
  ]);

  // Barcelona Venues (Plaça Catalunya as center: 41.3874, 2.1686)
  const barcelonaVenues = await Promise.all([
    prisma.venue.create({
      data: {
        name: "Sala Apolo",
        description: "Historic concert hall featuring live music, club nights and cultural events since 1943",
        address: "Carrer Nou de la Rambla, 113, 08004 Barcelona",
        contact: {
          phone: "+34-93-441-4001",
          email: "info@sala-apolo.com",
          website: "https://www.sala-apolo.com"
        },
        coordinates: { lat: 41.3741, lng: 2.1694 },
        images: [
          "https://www.sala-apolo.com/sites/default/files/styles/galeria_700x460/public/images/img_7398.jpg",
          "https://www.sala-apolo.com/sites/default/files/styles/galeria_700x460/public/images/img_7401.jpg"
        ],
        userId: barcelonaManager.id
      }
    }),
    prisma.venue.create({
      data: {
        name: "Palau de la Música Catalana",
        description: "UNESCO World Heritage modernist concert hall, known for its stunning architecture and exceptional acoustics",
        address: "C/ Palau de la Música, 4-6, 08003 Barcelona",
        contact: {
          phone: "+34-93-295-7200",
          email: "info@palaumusica.cat",
          website: "https://www.palaumusica.cat"
        },
        coordinates: { lat: 41.3875, lng: 2.1752 },
        images: [
          "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Palau_de_la_M%C3%BAsica_Catalana%2C_Barcelona_-_panoramio.jpg/1280px-Palau_de_la_M%C3%BUsica_Catalana%2C_Barcelona_-_panoramio.jpg",
          "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Palau_de_la_M%C3%BUsica_Catalana%2C_The_Concert_Auditorium.jpg/1280px-Palau_de_la_M%C3%BUsica_Catalana%2C_The_Concert_Auditorium.jpg"
        ],
        userId: barcelonaManager.id
      }
    }),
    prisma.venue.create({
      data: {
        name: "Razzmatazz",
        description: "Massive five-room club complex hosting live music and electronic nights",
        address: "C/ Pamplona, 88, 08018 Barcelona",
        contact: {
          phone: "+34-93-320-8200",
          email: "info@salarazzmatazz.com",
          website: "https://www.salarazzmatazz.com"
        },
        coordinates: { lat: 41.3975, lng: 2.1902 },
        images: [
          "https://www.salarazzmatazz.com/wp-content/uploads/2023/01/razz1-exterior.jpg",
          "https://www.salarazzmatazz.com/wp-content/uploads/2023/01/razz1-main-room.jpg"
        ],
        userId: barcelonaManager.id
      }
    }),
    prisma.venue.create({
      data: {
        name: "Gran Teatre del Liceu",
        description: "Barcelona's opulent opera house, opened in 1847",
        address: "La Rambla, 51-59, 08002 Barcelona",
        contact: {
          phone: "+34-93-485-9900",
          email: "info@liceubarcelona.cat",
          website: "https://www.liceubarcelona.cat"
        },
        coordinates: { lat: 41.3802, lng: 2.1734 },
        images: [
          "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Gran_Teatre_del_Liceu_-_Barcelona%2C_Spain_-_Jan_2007.jpg/1280px-Gran_Teatre_del_Liceu_-_Barcelona%2C_Spain_-_Jan_2007.jpg",
          "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Gran_Teatre_del_Liceu_interior.jpg/1280px-Gran_Teatre_del_Liceu_interior.jpg"
        ],
        userId: barcelonaManager.id
      }
    }),
    prisma.venue.create({
      data: {
        name: "Sala BARTS",
        description: "Modern performing arts venue in the heart of Barcelona",
        address: "Av. del Paraŀlel, 62, 08001 Barcelona",
        contact: {
          phone: "+34-93-324-8492",
          email: "info@barts.cat",
          website: "https://www.barts.cat"
        },
        coordinates: { lat: 41.3745, lng: 2.1686 },
        images: [
          "https://www.barts.cat/wp-content/uploads/2022/09/sala-barts-exterior.jpg",
          "https://www.barts.cat/wp-content/uploads/2022/09/sala-barts-interior.jpg"
        ],
        userId: barcelonaManager.id
      }
    }),
    prisma.venue.create({
      data: {
        name: "Jamboree",
        description: "Historic jazz club in the Gothic Quarter hosting daily live performances",
        address: "Plaça Reial, 17, 08002 Barcelona",
        contact: {
          phone: "+34-93-319-1789",
          email: "info@jamboreejazz.com",
          website: "https://www.masimas.com/jamboree"
        },
        coordinates: { lat: 41.3797, lng: 2.1753 },
        images: [
          "https://www.masimas.com/wp-content/uploads/2018/09/jamboree-jazz-club-barcelona.jpg",
          "https://www.masimas.com/wp-content/uploads/2018/09/jamboree-interior.jpg"
        ],
        userId: barcelonaManager.id
      }
    }),
    prisma.venue.create({
      data: {
        name: "Sala Bikini",
        description: "Popular nightclub and concert venue",
        address: "L'Illa Diagonal, Av. Diagonal, 547, 08029 Barcelona",
        contact: {
          phone: "+34-93-322-0800",
          email: "info@salabikini.com",
          website: "https://www.salabikini.com"
        },
        coordinates: { lat: 41.3894, lng: 2.1363 },
        images: [
          "https://www.salabikini.com/wp-content/uploads/2022/09/sala-bikini-exterior.jpg",
          "https://www.salabikini.com/wp-content/uploads/2022/09/sala-bikini-interior.jpg"
        ],
        userId: barcelonaManager.id
      }
    }),
    prisma.venue.create({
      data: {
        name: "Sala Tarantos",
        description: "Intimate flamenco venue in Plaça Reial",
        address: "Plaça Reial, 17, 08002 Barcelona",
        contact: {
          phone: "+34-93-319-1789",
          email: "info@masimas.com",
          website: "https://www.masimas.com/tarantos"
        },
        coordinates: { lat: 41.3797, lng: 2.1753 },
        images: [
          "https://www.masimas.com/wp-content/uploads/2018/09/tarantos-flamenco-barcelona.jpg",
          "https://www.masimas.com/wp-content/uploads/2018/09/tarantos-interior.jpg"
        ],
        userId: barcelonaManager.id
      }
    }),
    prisma.venue.create({
      data: {
        name: "Sala Luz de Gas",
        description: "Classic Barcelona music hall in a converted 19th-century theater",
        address: "C/ Muntaner, 246, 08021 Barcelona",
        contact: {
          phone: "+34-93-209-7711",
          email: "info@luzdegas.com",
          website: "https://www.luzdegas.com"
        },
        coordinates: { lat: 41.3947, lng: 2.1507 },
        images: [
          "https://www.luzdegas.com/wp-content/uploads/2022/09/luz-de-gas-exterior.jpg",
          "https://www.luzdegas.com/wp-content/uploads/2022/09/luz-de-gas-interior.jpg"
        ],
        userId: barcelonaManager.id
      }
    }),
    prisma.venue.create({
      data: {
        name: "L'Auditori",
        description: "Modern concert hall complex designed by Rafael Moneo",
        address: "C/ Lepant, 150, 08013 Barcelona",
        contact: {
          phone: "+34-93-247-9300",
          email: "info@auditori.cat",
          website: "https://www.auditori.cat"
        },
        coordinates: { lat: 41.3975, lng: 2.1857 },
        images: [
          "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/L%27Auditori_%28Barcelona%29_-_01.jpg/1280px-L%27Auditori_%28Barcelona%29_-_01.jpg",
          "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Sala_1_Pau_Casals_de_L%27Auditori.jpg/1280px-Sala_1_Pau_Casals_de_L%27Auditori.jpg"
        ],
        userId: barcelonaManager.id
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

  // Helper function to create 2024 event dates
  const get2024EventDates = (month: number, day: number) => {
    const startDate = new Date(2024, month - 1, day, 20, 0, 0, 0);
    const endDate = new Date(2024, month - 1, day, 23, 0, 0, 0);
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

  // Events for Barcelona venues
  for (const venue of barcelonaVenues) {
    // Generate 7 events throughout 2024 for each venue
    const eventDates = [
      get2024EventDates(1, 15),  // January
      get2024EventDates(3, 20),  // March
      get2024EventDates(5, 10),  // May
      get2024EventDates(7, 5),   // July
      get2024EventDates(9, 25),  // September
      get2024EventDates(11, 15), // November
      get2024EventDates(12, 30)  // December
    ];

    // Define types for event templates
    type EventTemplate = {
      title: string;
      description: string;
    };

    type VenueEventTypes = {
      [key: string]: EventTemplate[];
    };

    // Event templates based on venue type
    const eventTypes: VenueEventTypes = {
      "Palau de la Música Catalana": [
        { title: "Classical Symphony Orchestra", description: "Experience the majesty of classical masterpieces" },
        { title: "Chamber Music Evening", description: "Intimate performance of chamber music classics" },
        { title: "Catalan Choral Music", description: "Traditional and contemporary Catalan choral works" }
      ],
      "Razzmatazz": [
        { title: "Electronic Music Night", description: "Top DJs and electronic music producers" },
        { title: "Indie Rock Festival", description: "Multiple indie bands showcase" },
        { title: "Urban Music Party", description: "Hip-hop and R&B performances" }
      ],
      "Sala Apolo": [
        { title: "Alternative Rock Night", description: "Live performances from alternative rock bands" },
        { title: "Electronic Music Sessions", description: "DJ sets and electronic music" },
        { title: "Pop Music Showcase", description: "Contemporary pop music performances" }
      ],
      "default": [
        { title: "Live Music Night", description: "An evening of live music performances" },
        { title: "Local Artists Showcase", description: "Featuring the best local talent" },
        { title: "International Artist Performance", description: "Special performance by international artists" }
      ]
    };

    // Get appropriate event types for this venue
    const venueEventTypes = eventTypes[venue.name] || eventTypes.default;

    // Create events for each date
    eventDates.forEach((dates, index) => {
      const eventType = venueEventTypes[index % venueEventTypes.length];
      events.push(
        prisma.event.create({
          data: {
            title: `${eventType.title} at ${venue.name}`,
            description: eventType.description,
            startDate: dates.startDate,
            endDate: dates.endDate,
            status: "published",
            venueId: venue.id
          }
        })
      );
    });
  }

  const createdEvents = await Promise.all(events);

  console.log(`Database has been seeded with:`);
  console.log(`- ${nyVenues.length} New York venues`);
  console.log(`- ${parisVenues.length} Paris venues`);
  console.log(`- ${berlinVenues.length} Berlin venues`);
  console.log(`- ${barcelonaVenues.length} Barcelona venues`);
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
