import { PrismaClient } from "@prisma/client";

// Define types for event templates
type EventTemplate = {
  title: string;
  description: string;
};

type VenueEventTypes = {
  [key: string]: EventTemplate[];
};

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
    }),
    prisma.user.create({
      data: {
        email: "london.manager@example.com",
        name: "London Venue Manager",
        googleId: "g_ldn_123",
        profileImage: "https://example.com/profiles/london_manager.jpg"
      }
    }),
    prisma.user.create({
      data: {
        email: "porto.manager@example.com",
        name: "Porto Venue Manager",
        googleId: "g_porto_123",
        profileImage: "https://example.com/profiles/porto_manager.jpg"
      }
    }),
    prisma.user.create({
      data: {
        email: "toulouse.manager@example.com",
        name: "Toulouse Venue Manager",
        googleId: "g_tls_123",
        profileImage: "https://example.com/profiles/toulouse_manager.jpg"
      }
    }),
    prisma.user.create({
      data: {
        email: "lagos.manager@example.com",
        name: "Lagos Venue Manager",
        googleId: "g_lag_123",
        profileImage: "https://example.com/profiles/lagos_manager.jpg"
      }
    }),
    prisma.user.create({
      data: {
        email: "amsterdam.manager@example.com",
        name: "Amsterdam Venue Manager",
        googleId: "g_ams_123",
        profileImage: "https://example.com/profiles/amsterdam_manager.jpg"
      }
    })
  ]);

  const [nyManager, parisManager, berlinManager, barcelonaManager, londonManager, portoManager, toulouseManager, lagosManager, amsterdamManager] = users;

  // Event patterns for consistent data generation
  const eventTypes = {
    jazz: {
      artist: (city: string) => `${city} Jazz Quartet`,
      genre: ["Jazz", "Blues"],
      price: 35.00
    },
    classical: {
      artist: (city: string) => `${city} Symphony Orchestra`,
      genre: ["Classical", "Chamber Music"],
      price: 65.00
    },
    electronic: {
      artist: (city: string) => `DJ ${city}Beat`,
      genre: ["Electronic", "Techno", "House"],
      price: 30.00
    },
    rock: {
      artist: (city: string) => `${city} Rock Collective`,
      genre: ["Rock", "Alternative"],
      price: 28.00
    },
    world: {
      artist: (city: string) => `${city} World Ensemble`,
      genre: ["World", "Folk"],
      price: 40.00
    }
  };

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

  // London Venues (Trafalgar Square as center: 51.5080° N, 0.1281° W)
  const londonVenues = await Promise.all([
    prisma.venue.create({
      data: {
        name: "Royal Albert Hall",
        description: "Iconic concert hall hosting diverse performances from classical to rock, opened in 1871",
        address: "Kensington Gore, South Kensington, London SW7 2AP",
        contact: {
          phone: "+44-20-7589-8212",
          email: "boxoffice@royalalberthall.com",
          website: "https://www.royalalberthall.com"
        },
        coordinates: { lat: 51.5009, lng: -0.1774 },
        images: [
          "https://www.royalalberthall.com/media/zovfsi0w/rah-exterior-south-steps.jpg",
          "https://www.royalalberthall.com/media/kyihxgwe/auditorium-from-circle.jpg"
        ],
        userId: londonManager.id
      }
    }),
    prisma.venue.create({
      data: {
        name: "O2 Academy Brixton",
        description: "Historic Art Deco venue hosting major contemporary music acts",
        address: "211 Stockwell Rd, London SW9 9SL",
        contact: {
          phone: "+44-20-7771-3000",
          email: "info@o2academybrixton.co.uk",
          website: "https://www.academymusicgroup.com/o2academybrixton"
        },
        coordinates: { lat: 51.4652, lng: -0.1150 },
        images: [
          "https://www.academymusicgroup.com/sites/default/files/styles/venue_hero/public/venues/brixton/o2-academy-brixton-exterior.jpg",
          "https://www.academymusicgroup.com/sites/default/files/styles/venue_gallery/public/venues/brixton/o2-academy-brixton-main-room.jpg"
        ],
        userId: londonManager.id
      }
    }),
    prisma.venue.create({
      data: {
        name: "Roundhouse",
        description: "Iconic circular venue in Camden, converted from a railway engine shed",
        address: "Chalk Farm Rd, London NW1 8EH",
        contact: {
          phone: "+44-20-7424-9991",
          email: "info@roundhouse.org.uk",
          website: "https://www.roundhouse.org.uk"
        },
        coordinates: { lat: 51.5429, lng: -0.1503 },
        images: [
          "https://www.roundhouse.org.uk/assets/uploads/images/_1200x630_crop_center-center_82_none/roundhouse-exterior-night.jpg",
          "https://www.roundhouse.org.uk/assets/uploads/images/_1200x630_crop_center-center_82_none/main-space-concert.jpg"
        ],
        userId: londonManager.id
      }
    }),
    prisma.venue.create({
      data: {
        name: "Jazz Cafe",
        description: "Intimate venue specializing in jazz, soul, and world music",
        address: "5 Parkway, London NW1 7PG",
        contact: {
          phone: "+44-20-7485-6834",
          email: "info@thejazzcafelondon.com",
          website: "https://thejazzcafelondon.com"
        },
        coordinates: { lat: 51.5386, lng: -0.1425 },
        images: [
          "https://thejazzcafelondon.com/wp-content/uploads/2023/01/jazz-cafe-exterior.jpg",
          "https://thejazzcafelondon.com/wp-content/uploads/2023/01/jazz-cafe-stage.jpg"
        ],
        userId: londonManager.id
      }
    }),
    prisma.venue.create({
      data: {
        name: "KOKO",
        description: "Recently restored Victorian theatre turned contemporary music venue",
        address: "1A Camden High St, London NW1 7JE",
        contact: {
          phone: "+44-20-7388-3222",
          email: "info@koko.uk.com",
          website: "https://www.koko.co.uk"
        },
        coordinates: { lat: 51.5347, lng: -0.1385 },
        images: [
          "https://www.koko.co.uk/assets/images/venue/koko-exterior-night.jpg",
          "https://www.koko.co.uk/assets/images/venue/main-room.jpg"
        ],
        userId: londonManager.id
      }
    }),
    prisma.venue.create({
      data: {
        name: "Barbican Centre",
        description: "Europe's largest multi-arts venue, featuring classical and contemporary music",
        address: "Silk St, Barbican, London EC2Y 8DS",
        contact: {
          phone: "+44-20-7638-8891",
          email: "info@barbican.org.uk",
          website: "https://www.barbican.org.uk"
        },
        coordinates: { lat: 51.5200, lng: -0.0927 },
        images: [
          "https://www.barbican.org.uk/sites/default/files/styles/image_landscape_xl/public/images/2019-09/Barbican_External_Day_MaxColson.jpg",
          "https://www.barbican.org.uk/sites/default/files/styles/image_landscape_xl/public/images/2019-09/Barbican_Hall_MaxColson.jpg"
        ],
        userId: londonManager.id
      }
    }),
    prisma.venue.create({
      data: {
        name: "Shepherd's Bush Empire",
        description: "Grade II listed building hosting rock, pop, and alternative music",
        address: "Shepherd's Bush Green, London W12 8TT",
        contact: {
          phone: "+44-20-8354-3300",
          email: "info@o2shepherdsbushempire.co.uk",
          website: "https://www.academymusicgroup.com/o2shepherdsbushempire"
        },
        coordinates: { lat: 51.5049, lng: -0.2247 },
        images: [
          "https://www.academymusicgroup.com/sites/default/files/styles/venue_hero/public/venues/shepherds-bush/o2-shepherds-bush-empire-exterior.jpg",
          "https://www.academymusicgroup.com/sites/default/files/styles/venue_gallery/public/venues/shepherds-bush/o2-shepherds-bush-empire-circle-view.jpg"
        ],
        userId: londonManager.id
      }
    }),
    prisma.venue.create({
      data: {
        name: "Union Chapel",
        description: "Grade I listed church and award-winning music venue",
        address: "Compton Terrace, London N1 2UN",
        contact: {
          phone: "+44-20-7226-1686",
          email: "info@unionchapel.org.uk",
          website: "https://unionchapel.org.uk"
        },
        coordinates: { lat: 51.5439, lng: -0.1027 },
        images: [
          "https://unionchapel.org.uk/assets/images/venue/union-chapel-exterior.jpg",
          "https://unionchapel.org.uk/assets/images/venue/union-chapel-interior.jpg"
        ],
        userId: londonManager.id
      }
    }),
    prisma.venue.create({
      data: {
        name: "Alexandra Palace",
        description: "Historic entertainment venue with panoramic views of London",
        address: "Alexandra Palace Way, London N22 7AY",
        contact: {
          phone: "+44-20-8365-2121",
          email: "enquiries@alexandrapalace.com",
          website: "https://www.alexandrapalace.com"
        },
        coordinates: { lat: 51.5941, lng: -0.1300 },
        images: [
          "https://www.alexandrapalace.com/wp-content/uploads/2023/01/ally-pally-exterior.jpg",
          "https://www.alexandrapalace.com/wp-content/uploads/2023/01/great-hall-concert.jpg"
        ],
        userId: londonManager.id
      }
    }),
    prisma.venue.create({
      data: {
        name: "Royal Festival Hall",
        description: "World-class venue on the South Bank, home to classical and contemporary performances",
        address: "Southbank Centre, Belvedere Rd, London SE1 8XX",
        contact: {
          phone: "+44-20-3879-9555",
          email: "customer@southbankcentre.co.uk",
          website: "https://www.southbankcentre.co.uk"
        },
        coordinates: { lat: 51.5055, lng: -0.1156 },
        images: [
          "https://www.southbankcentre.co.uk/sites/default/files/styles/hero_thin_16_9/public/images/royal_festival_hall_exterior.jpg",
          "https://www.southbankcentre.co.uk/sites/default/files/styles/hero_thin_16_9/public/images/rfh_auditorium.jpg"
        ],
        userId: londonManager.id
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

  // Porto Venues (Avenida dos Aliados as center: 41.1495° N, 8.6108° W)
  const portoVenues = await Promise.all([
    prisma.venue.create({
      data: {
        name: "Casa da Música",
        description: "Iconic contemporary concert hall designed by Rem Koolhaas, hosting classical, jazz, and world music",
        address: "Av. da Boavista 604-610, 4149-071 Porto",
        contact: {
          phone: "+351-220-120-220",
          email: "info@casadamusica.com",
          website: "https://www.casadamusica.com"
        },
        coordinates: { lat: 41.1589, lng: -8.6305 },
        images: [
          "https://www.casadamusica.com/images/spaces/sala-suggia/sala-suggia-1.jpg",
          "https://www.casadamusica.com/images/spaces/sala-suggia/sala-suggia-2.jpg"
        ],
        userId: portoManager.id
      }
    }),
    prisma.venue.create({
      data: {
        name: "Coliseu Porto Ageas",
        description: "Historic concert hall and cultural venue hosting diverse performances since 1941",
        address: "R. de Passos Manuel 137, 4000-385 Porto",
        contact: {
          phone: "+351-223-394-940",
          email: "geral@coliseu.pt",
          website: "https://www.coliseu.pt"
        },
        coordinates: { lat: 41.1467, lng: -8.6066 },
        images: [
          "https://www.coliseu.pt/wp-content/uploads/2022/01/coliseu-exterior.jpg",
          "https://www.coliseu.pt/wp-content/uploads/2022/01/coliseu-sala.jpg"
        ],
        userId: portoManager.id
      }
    }),
    prisma.venue.create({
      data: {
        name: "Hard Club",
        description: "Alternative music venue in a restored market building, featuring rock and electronic music",
        address: "Mercado Ferreira Borges, R. da Bolsa, 4050-146 Porto",
        contact: {
          phone: "+351-222-087-268",
          email: "geral@hardclub.pt",
          website: "https://www.hardclub.pt"
        },
        coordinates: { lat: 41.1414, lng: -8.6156 },
        images: [
          "https://www.hardclub.pt/wp-content/uploads/2022/01/hard-club-exterior.jpg",
          "https://www.hardclub.pt/wp-content/uploads/2022/01/hard-club-main-room.jpg"
        ],
        userId: portoManager.id
      }
    }),
    prisma.venue.create({
      data: {
        name: "Teatro Rivoli",
        description: "Municipal theater hosting music, dance, and theatrical performances",
        address: "Praça D. João I, 4000-295 Porto",
        contact: {
          phone: "+351-223-392-200",
          email: "teatrorivoli@cm-porto.pt",
          website: "https://www.teatromunicipaldoporto.pt"
        },
        coordinates: { lat: 41.1477, lng: -8.6114 },
        images: [
          "https://www.teatromunicipaldoporto.pt/wp-content/uploads/2022/01/rivoli-exterior.jpg",
          "https://www.teatromunicipaldoporto.pt/wp-content/uploads/2022/01/rivoli-main-hall.jpg"
        ],
        userId: portoManager.id
      }
    }),
    prisma.venue.create({
      data: {
        name: "Maus Hábitos",
        description: "Cultural center and music venue known for alternative and electronic music",
        address: "R. de Passos Manuel 178, 4º, 4000-382 Porto",
        contact: {
          phone: "+351-222-087-268",
          email: "geral@maushabitos.pt",
          website: "https://www.maushabitos.pt"
        },
        coordinates: { lat: 41.1466, lng: -8.6070 },
        images: [
          "https://www.maushabitos.pt/wp-content/uploads/2022/01/maus-habitos-terrace.jpg",
          "https://www.maushabitos.pt/wp-content/uploads/2022/01/maus-habitos-interior.jpg"
        ],
        userId: portoManager.id
      }
    }),
    prisma.venue.create({
      data: {
        name: "Hot Five Jazz & Blues Club",
        description: "Intimate jazz club featuring local and international artists",
        address: "Largo Actor Dias 51, 4430-257 Porto",
        contact: {
          phone: "+351-934-418-184",
          email: "info@hotfive.pt",
          website: "https://www.hotfive.pt"
        },
        coordinates: { lat: 41.1439, lng: -8.6167 },
        images: [
          "https://www.hotfive.pt/wp-content/uploads/2022/01/hot-five-entrance.jpg",
          "https://www.hotfive.pt/wp-content/uploads/2022/01/hot-five-stage.jpg"
        ],
        userId: portoManager.id
      }
    }),
    prisma.venue.create({
      data: {
        name: "Plano B",
        description: "Multi-room venue featuring live music, DJ sets, and cultural events",
        address: "R. da Bolsa, 30, 4050-151 Porto",
        contact: {
          phone: "+351-222-012-500",
          email: "info@planobporto.net",
          website: "https://www.planobporto.net"
        },
        coordinates: { lat: 41.1456, lng: -8.6151 },
        images: [
          "https://www.planobporto.net/wp-content/uploads/2022/01/plano-b-entrance.jpg",
          "https://www.planobporto.net/wp-content/uploads/2022/01/plano-b-dance-floor.jpg"
        ],
        userId: portoManager.id
      }
    }),
    prisma.venue.create({
      data: {
        name: "Cave 45",
        description: "Underground venue known for metal and rock concerts",
        address: "R. das Oliveiras 45, 4050-449 Porto",
        contact: {
          phone: "+351-222-017-045",
          email: "geral@cave45.pt",
          website: "https://www.cave45.pt"
        },
        coordinates: { lat: 41.1464, lng: -8.6176 },
        images: [
          "https://www.cave45.pt/wp-content/uploads/2022/01/cave-45-entrance.jpg",
          "https://www.cave45.pt/wp-content/uploads/2022/01/cave-45-stage.jpg"
        ],
        userId: portoManager.id
      }
    }),
    prisma.venue.create({
      data: {
        name: "M.Ou.Co.",
        description: "Modern music venue and hotel complex with recording studios",
        address: "R. do Heroísmo 329, 4300-096 Porto",
        contact: {
          phone: "+351-220-114-800",
          email: "geral@mouco.pt",
          website: "https://www.mouco.pt"
        },
        coordinates: { lat: 41.1483, lng: -8.5933 },
        images: [
          "https://www.mouco.pt/wp-content/uploads/2022/01/mouco-exterior.jpg",
          "https://www.mouco.pt/wp-content/uploads/2022/01/mouco-concert-hall.jpg"
        ],
        userId: portoManager.id
      }
    }),
    prisma.venue.create({
      data: {
        name: "Super Bock Arena - Pavilhão Rosa Mota",
        description: "Large multi-purpose arena hosting major concerts and events",
        address: "R. Dom Manuel II, 4050-346 Porto",
        contact: {
          phone: "+351-226-151-000",
          email: "info@superbockarena.pt",
          website: "https://www.superbockarena.pt"
        },
        coordinates: { lat: 41.1469, lng: -8.6236 },
        images: [
          "https://www.superbockarena.pt/wp-content/uploads/2022/01/super-bock-arena-exterior.jpg",
          "https://www.superbockarena.pt/wp-content/uploads/2022/01/super-bock-arena-interior.jpg"
        ],
        userId: portoManager.id
      }
    })
  ]);

  // Toulouse Venues (Place du Capitole as center: 43.6045° N, 1.4442° E)
  const toulouseVenues = await Promise.all([
    prisma.venue.create({
      data: {
        name: "Le Bikini",
        description: "Iconic concert venue known for electronic music and rock concerts",
        address: "Rue Théodore Monod, 31520 Ramonville-Saint-Agne",
        contact: {
          phone: "+33-5-62-24-09-50",
          email: "contact@lebikini.com",
          website: "https://www.lebikini.com"
        },
        coordinates: { lat: 43.5478, lng: 1.4728 },
        images: [
          "https://www.lebikini.com/wp-content/uploads/2022/01/le-bikini-exterior.jpg",
          "https://www.lebikini.com/wp-content/uploads/2022/01/le-bikini-main-room.jpg"
        ],
        userId: toulouseManager.id
      }
    }),
    prisma.venue.create({
      data: {
        name: "Le Zénith Toulouse Métropole",
        description: "Large arena hosting major concerts and events",
        address: "11 Avenue Raymond Badiou, 31300 Toulouse",
        contact: {
          phone: "+33-5-62-74-49-49",
          email: "contact@zenith-toulouse.fr",
          website: "https://www.zenith-toulouse-metropole.com"
        },
        coordinates: { lat: 43.5989, lng: 1.4086 },
        images: [
          "https://www.zenith-toulouse-metropole.com/wp-content/uploads/2022/01/zenith-exterior.jpg",
          "https://www.zenith-toulouse-metropole.com/wp-content/uploads/2022/01/zenith-arena.jpg"
        ],
        userId: toulouseManager.id
      }
    }),
    prisma.venue.create({
      data: {
        name: "Le Connexion Live",
        description: "Modern venue featuring indie bands and electronic music",
        address: "8 Rue Gabriel Péri, 31000 Toulouse",
        contact: {
          phone: "+33-5-34-41-62-88",
          email: "contact@connexion-live.com",
          website: "https://www.connexion-live.com"
        },
        coordinates: { lat: 43.6052, lng: 1.4498 },
        images: [
          "https://www.connexion-live.com/wp-content/uploads/2022/01/connexion-entrance.jpg",
          "https://www.connexion-live.com/wp-content/uploads/2022/01/connexion-stage.jpg"
        ],
        userId: toulouseManager.id
      }
    }),
    prisma.venue.create({
      data: {
        name: "Le Rex",
        description: "Historic theater turned nightclub hosting live performances",
        address: "15 Avenue Honoré Serres, 31000 Toulouse",
        contact: {
          phone: "+33-5-61-38-57-71",
          email: "contact@lerextoulouse.com",
          website: "https://www.lerextoulouse.com"
        },
        coordinates: { lat: 43.6112, lng: 1.4428 },
        images: [
          "https://www.lerextoulouse.com/wp-content/uploads/2022/01/rex-facade.jpg",
          "https://www.lerextoulouse.com/wp-content/uploads/2022/01/rex-interior.jpg"
        ],
        userId: toulouseManager.id
      }
    }),
    prisma.venue.create({
      data: {
        name: "Théâtre du Capitole",
        description: "Historic opera house and classical music venue",
        address: "Place du Capitole, 31000 Toulouse",
        contact: {
          phone: "+33-5-61-63-13-13",
          email: "contact@theatreducapitole.fr",
          website: "https://www.theatreducapitole.fr"
        },
        coordinates: { lat: 43.6044, lng: 1.4442 },
        images: [
          "https://www.theatreducapitole.fr/wp-content/uploads/2022/01/capitole-exterior.jpg",
          "https://www.theatreducapitole.fr/wp-content/uploads/2022/01/capitole-hall.jpg"
        ],
        userId: toulouseManager.id
      }
    }),
    prisma.venue.create({
      data: {
        name: "La Dynamo",
        description: "Alternative music venue focusing on rock and punk",
        address: "6 Rue Amélie, 31000 Toulouse",
        contact: {
          phone: "+33-5-62-73-08-51",
          email: "contact@ladynamo.fr",
          website: "https://www.ladynamo.fr"
        },
        coordinates: { lat: 43.6027, lng: 1.4505 },
        images: [
          "https://www.ladynamo.fr/wp-content/uploads/2022/01/dynamo-entrance.jpg",
          "https://www.ladynamo.fr/wp-content/uploads/2022/01/dynamo-stage.jpg"
        ],
        userId: toulouseManager.id
      }
    }),
    prisma.venue.create({
      data: {
        name: "Le Métronum",
        description: "Modern cultural space dedicated to contemporary music",
        address: "2 Rond-Point Madame de Mondonville, 31200 Toulouse",
        contact: {
          phone: "+33-5-31-22-94-10",
          email: "contact@metronum.fr",
          website: "https://www.metronum.fr"
        },
        coordinates: { lat: 43.6397, lng: 1.4547 },
        images: [
          "https://www.metronum.fr/wp-content/uploads/2022/01/metronum-exterior.jpg",
          "https://www.metronum.fr/wp-content/uploads/2022/01/metronum-hall.jpg"
        ],
        userId: toulouseManager.id
      }
    }),
    prisma.venue.create({
      data: {
        name: "Le Taquin",
        description: "Intimate jazz club and cultural café",
        address: "23 Rue des Amidonniers, 31000 Toulouse",
        contact: {
          phone: "+33-5-61-21-98-18",
          email: "contact@le-taquin.fr",
          website: "https://www.le-taquin.fr"
        },
        coordinates: { lat: 43.6066, lng: 1.4338 },
        images: [
          "https://www.le-taquin.fr/wp-content/uploads/2022/01/taquin-entrance.jpg",
          "https://www.le-taquin.fr/wp-content/uploads/2022/01/taquin-interior.jpg"
        ],
        userId: toulouseManager.id
      }
    }),
    prisma.venue.create({
      data: {
        name: "La Cave Poésie",
        description: "Historic venue for intimate concerts and poetry readings",
        address: "71 Rue du Taur, 31000 Toulouse",
        contact: {
          phone: "+33-5-61-23-62-00",
          email: "contact@cave-poesie.com",
          website: "https://www.cave-poesie.com"
        },
        coordinates: { lat: 43.6067, lng: 1.4414 },
        images: [
          "https://www.cave-poesie.com/wp-content/uploads/2022/01/cave-entrance.jpg",
          "https://www.cave-poesie.com/wp-content/uploads/2022/01/cave-stage.jpg"
        ],
        userId: toulouseManager.id
      }
    }),
    prisma.venue.create({
      data: {
        name: "Halle aux Grains",
        description: "Former grain market converted into a symphony hall",
        address: "1 Place Dupuy, 31000 Toulouse",
        contact: {
          phone: "+33-5-61-63-13-13",
          email: "contact@halleauxgrains.fr",
          website: "https://www.halleauxgrains-toulouse.fr"
        },
        coordinates: { lat: 43.6001, lng: 1.4533 },
        images: [
          "https://www.halleauxgrains-toulouse.fr/wp-content/uploads/2022/01/halle-exterior.jpg",
          "https://www.halleauxgrains-toulouse.fr/wp-content/uploads/2022/01/halle-concert.jpg"
        ],
        userId: toulouseManager.id
      }
    })
  ]);

  // Lagos Venues (Victoria Island as center: 6.4281° N, 3.4219° E)
  const lagosVenues = await Promise.all([
    prisma.venue.create({
      data: {
        name: "Eko Hotel Convention Centre",
        description: "Premier event venue hosting major concerts and entertainment shows",
        address: "Plot 1415 Adetokunbo Ademola Street, Victoria Island, Lagos",
        contact: {
          phone: "+234-1-270-2220",
          email: "events@ekohotels.com",
          website: "https://www.ekohotels.com"
        },
        coordinates: { lat: 6.4281, lng: 3.4219 },
        images: [
          "https://www.ekohotels.com/wp-content/uploads/2022/01/eko-convention-exterior.jpg",
          "https://www.ekohotels.com/wp-content/uploads/2022/01/eko-convention-hall.jpg"
        ],
        userId: lagosManager.id
      }
    }),
    prisma.venue.create({
      data: {
        name: "Landmark Event Centre",
        description: "Modern multipurpose venue for concerts and cultural events",
        address: "Plot 2 & 3, Water Corporation Road, Victoria Island, Lagos",
        contact: {
          phone: "+234-1-448-2812",
          email: "info@landmarkeventcentre.com",
          website: "https://www.landmarkeventcentre.com"
        },
        coordinates: { lat: 6.4258, lng: 3.4341 },
        images: [
          "https://www.landmarkeventcentre.com/wp-content/uploads/2022/01/landmark-exterior.jpg",
          "https://www.landmarkeventcentre.com/wp-content/uploads/2022/01/landmark-hall.jpg"
        ],
        userId: lagosManager.id
      }
    }),
    prisma.venue.create({
      data: {
        name: "Terra Kulture Arena",
        description: "Cultural center and music venue showcasing Nigerian arts, music, and theater",
        address: "Plot 1376 Tiamiyu Savage Street, Victoria Island, Lagos",
        contact: {
          phone: "+234-1-270-0588",
          email: "info@terrakulture.com",
          website: "https://www.terrakulture.com"
        },
        coordinates: { lat: 6.4312, lng: 3.4284 },
        images: [
          "https://www.terrakulture.com/wp-content/uploads/2022/01/terra-kulture-exterior.jpg",
          "https://www.terrakulture.com/wp-content/uploads/2022/01/terra-kulture-theater.jpg"
        ],
        userId: lagosManager.id
      }
    }),
    prisma.venue.create({
      data: {
        name: "The New Afrika Shrine",
        description: "Historic venue celebrating Afrobeat music and Fela Kuti's legacy",
        address: "1 NERDC Road, Agindigbi, Ikeja, Lagos",
        contact: {
          phone: "+234-802-828-4499",
          email: "info@newafrikashrine.com",
          website: "https://www.newafrikashrine.com"
        },
        coordinates: { lat: 6.6096, lng: 3.3406 },
        images: [
          "https://www.newafrikashrine.com/wp-content/uploads/2022/01/shrine-exterior.jpg",
          "https://www.newafrikashrine.com/wp-content/uploads/2022/01/shrine-stage.jpg"
        ],
        userId: lagosManager.id
      }
    }),
    prisma.venue.create({
      data: {
        name: "Freedom Park",
        description: "Former colonial prison transformed into a cultural venue",
        address: "Broad Street, Lagos Island, Lagos",
        contact: {
          phone: "+234-802-828-4499",
          email: "info@freedomparklagos.com",
          website: "https://www.freedomparklagos.com"
        },
        coordinates: { lat: 6.4478, lng: 3.3947 },
        images: [
          "https://www.freedomparklagos.com/wp-content/uploads/2022/01/freedom-park-amphitheater.jpg",
          "https://www.freedomparklagos.com/wp-content/uploads/2022/01/freedom-park-stage.jpg"
        ],
        userId: lagosManager.id
      }
    }),
    prisma.venue.create({
      data: {
        name: "Muri Okunola Park",
        description: "Open-air venue for concerts and cultural festivals",
        address: "Muri Okunola Street, Victoria Island, Lagos",
        contact: {
          phone: "+234-802-828-4499",
          email: "info@muriokunola.com",
          website: "https://www.muriokunola.com"
        },
        coordinates: { lat: 6.4279, lng: 3.4245 },
        images: [
          "https://www.muriokunola.com/wp-content/uploads/2022/01/muri-okunola-park.jpg",
          "https://www.muriokunola.com/wp-content/uploads/2022/01/muri-okunola-stage.jpg"
        ],
        userId: lagosManager.id
      }
    }),
    prisma.venue.create({
      data: {
        name: "Hard Rock Cafe Lagos",
        description: "International music venue featuring live bands and DJ nights",
        address: "Landmark Village, Water Corporation Road, Victoria Island, Lagos",
        contact: {
          phone: "+234-1-448-2812",
          email: "info@hardrockcafelagos.com",
          website: "https://www.hardrockcafe.com/location/lagos"
        },
        coordinates: { lat: 6.4258, lng: 3.4341 },
        images: [
          "https://www.hardrockcafe.com/location/lagos/wp-content/uploads/2022/01/hrc-lagos-exterior.jpg",
          "https://www.hardrockcafe.com/location/lagos/wp-content/uploads/2022/01/hrc-lagos-stage.jpg"
        ],
        userId: lagosManager.id
      }
    }),
    prisma.venue.create({
      data: {
        name: "Oriental Hotel Conference Centre",
        description: "Luxury hotel venue hosting high-profile music events",
        address: "3 Lekki Road, Victoria Island, Lagos",
        contact: {
          phone: "+234-1-280-6600",
          email: "events@oriental-hotels.com",
          website: "https://www.oriental-hotels.com"
        },
        coordinates: { lat: 6.4312, lng: 3.4284 },
        images: [
          "https://www.oriental-hotels.com/wp-content/uploads/2022/01/oriental-exterior.jpg",
          "https://www.oriental-hotels.com/wp-content/uploads/2022/01/oriental-hall.jpg"
        ],
        userId: lagosManager.id
      }
    }),
    prisma.venue.create({
      data: {
        name: "The Jazz Hole",
        description: "Intimate jazz club featuring local and international artists",
        address: "168 Awolowo Road, Ikoyi, Lagos",
        contact: {
          phone: "+234-803-403-0266",
          email: "info@thejazzhole.com",
          website: "https://www.thejazzhole.com"
        },
        coordinates: { lat: 6.4478, lng: 3.4341 },
        images: [
          "https://www.thejazzhole.com/wp-content/uploads/2022/01/jazzhole-entrance.jpg",
          "https://www.thejazzhole.com/wp-content/uploads/2022/01/jazzhole-interior.jpg"
        ],
        userId: lagosManager.id
      }
    }),
    prisma.venue.create({
      data: {
        name: "Federal Palace Hotel",
        description: "Historic hotel venue with modern concert facilities",
        address: "6-8 Ahmadu Bello Way, Victoria Island, Lagos",
        contact: {
          phone: "+234-1-277-7777",
          email: "events@federalpalacehotel.com",
          website: "https://www.federalpalacehotel.com"
        },
        coordinates: { lat: 6.4219, lng: 3.4147 },
        images: [
          "https://www.federalpalacehotel.com/wp-content/uploads/2022/01/federal-palace-exterior.jpg",
          "https://www.federalpalacehotel.com/wp-content/uploads/2022/01/federal-palace-hall.jpg"
        ],
        userId: lagosManager.id
      }
    })
  ]);

  // Amsterdam Venues (Dam Square as center: 52.3731° N, 4.8926° E)
  const amsterdamVenues = await Promise.all([
    prisma.venue.create({
      data: {
        name: "Royal Concertgebouw",
        description: "World-renowned concert hall known for exceptional acoustics",
        address: "Concertgebouwplein 10, 1071 LN Amsterdam",
        contact: {
          phone: "+31-20-671-8345",
          email: "info@concertgebouw.nl",
          website: "https://www.concertgebouw.nl"
        },
        coordinates: { lat: 52.3564, lng: 4.8790 },
        images: [
          "https://www.concertgebouw.nl/wp-content/uploads/2022/01/concertgebouw-exterior.jpg",
          "https://www.concertgebouw.nl/wp-content/uploads/2022/01/concertgebouw-main-hall.jpg"
        ],
        userId: amsterdamManager.id
      }
    }),
    prisma.venue.create({
      data: {
        name: "Paradiso",
        description: "Former church turned iconic rock venue and cultural center",
        address: "Weteringschans 6-8, 1017 SG Amsterdam",
        contact: {
          phone: "+31-20-626-4521",
          email: "info@paradiso.nl",
          website: "https://www.paradiso.nl"
        },
        coordinates: { lat: 52.3622, lng: 4.8834 },
        images: [
          "https://www.paradiso.nl/wp-content/uploads/2022/01/paradiso-exterior.jpg",
          "https://www.paradiso.nl/wp-content/uploads/2022/01/paradiso-main-hall.jpg"
        ],
        userId: amsterdamManager.id
      }
    }),
    prisma.venue.create({
      data: {
        name: "Melkweg",
        description: "Multi-room venue in former milk factory hosting diverse music events",
        address: "Lijnbaansgracht 234A, 1017 PH Amsterdam",
        contact: {
          phone: "+31-20-531-8181",
          email: "info@melkweg.nl",
          website: "https://www.melkweg.nl"
        },
        coordinates: { lat: 52.3650, lng: 4.8815 },
        images: [
          "https://www.melkweg.nl/wp-content/uploads/2022/01/melkweg-exterior.jpg",
          "https://www.melkweg.nl/wp-content/uploads/2022/01/melkweg-max.jpg"
        ],
        userId: amsterdamManager.id
      }
    }),
    prisma.venue.create({
      data: {
        name: "AFAS Live",
        description: "Modern arena for large-scale concerts and events",
        address: "ArenA Boulevard 590, 1101 DS Amsterdam",
        contact: {
          phone: "+31-20-207-5000",
          email: "info@afaslive.nl",
          website: "https://www.afaslive.nl"
        },
        coordinates: { lat: 52.3134, lng: 4.9407 },
        images: [
          "https://www.afaslive.nl/wp-content/uploads/2022/01/afas-live-exterior.jpg",
          "https://www.afaslive.nl/wp-content/uploads/2022/01/afas-live-main-hall.jpg"
        ],
        userId: amsterdamManager.id
      }
    }),
    prisma.venue.create({
      data: {
        name: "Bimhuis",
        description: "Premier jazz venue with stunning waterfront location",
        address: "Piet Heinkade 3, 1019 BR Amsterdam",
        contact: {
          phone: "+31-20-788-2150",
          email: "info@bimhuis.nl",
          website: "https://www.bimhuis.nl"
        },
        coordinates: { lat: 52.3766, lng: 4.9123 },
        images: [
          "https://www.bimhuis.nl/wp-content/uploads/2022/01/bimhuis-exterior.jpg",
          "https://www.bimhuis.nl/wp-content/uploads/2022/01/bimhuis-concert-hall.jpg"
        ],
        userId: amsterdamManager.id
      }
    }),
    prisma.venue.create({
      data: {
        name: "De School",
        description: "Former technical school converted into electronic music venue",
        address: "Doctor Jan van Breemenstraat 1, 1056 AB Amsterdam",
        contact: {
          phone: "+31-20-737-3255",
          email: "info@deschoolamsterdam.nl",
          website: "https://www.deschoolamsterdam.nl"
        },
        coordinates: { lat: 52.3669, lng: 4.8539 },
        images: [
          "https://www.deschoolamsterdam.nl/wp-content/uploads/2022/01/de-school-exterior.jpg",
          "https://www.deschoolamsterdam.nl/wp-content/uploads/2022/01/de-school-club.jpg"
        ],
        userId: amsterdamManager.id
      }
    }),
    prisma.venue.create({
      data: {
        name: "Muziekgebouw aan 't IJ",
        description: "Contemporary classical music venue with innovative programming",
        address: "Piet Heinkade 1, 1019 BR Amsterdam",
        contact: {
          phone: "+31-20-788-2000",
          email: "info@muziekgebouw.nl",
          website: "https://www.muziekgebouw.nl"
        },
        coordinates: { lat: 52.3776, lng: 4.9122 },
        images: [
          "https://www.muziekgebouw.nl/wp-content/uploads/2022/01/muziekgebouw-exterior.jpg",
          "https://www.muziekgebouw.nl/wp-content/uploads/2022/01/muziekgebouw-hall.jpg"
        ],
        userId: amsterdamManager.id
      }
    }),
    prisma.venue.create({
      data: {
        name: "Ziggo Dome",
        description: "State-of-the-art arena hosting major international concerts",
        address: "De Passage 100, 1101 AX Amsterdam",
        contact: {
          phone: "+31-20-207-5000",
          email: "info@ziggodome.nl",
          website: "https://www.ziggodome.nl"
        },
        coordinates: { lat: 52.3134, lng: 4.9378 },
        images: [
          "https://www.ziggodome.nl/wp-content/uploads/2022/01/ziggo-dome-exterior.jpg",
          "https://www.ziggodome.nl/wp-content/uploads/2022/01/ziggo-dome-arena.jpg"
        ],
        userId: amsterdamManager.id
      }
    }),
    prisma.venue.create({
      data: {
        name: "Q-Factory",
        description: "Music venue and cultural center with recording studios",
        address: "Atlantisplein 1, 1093 NE Amsterdam",
        contact: {
          phone: "+31-20-409-7979",
          email: "info@q-factory-amsterdam.nl",
          website: "https://www.q-factory-amsterdam.nl"
        },
        coordinates: { lat: 52.3599, lng: 4.9346 },
        images: [
          "https://www.q-factory-amsterdam.nl/wp-content/uploads/2022/01/q-factory-exterior.jpg",
          "https://www.q-factory-amsterdam.nl/wp-content/uploads/2022/01/q-factory-hall.jpg"
        ],
        userId: amsterdamManager.id
      }
    }),
    prisma.venue.create({
      data: {
        name: "North Sea Jazz Club",
        description: "Intimate jazz club with restaurant and bar",
        address: "Pazzanistraat 1, 1014 DB Amsterdam",
        contact: {
          phone: "+31-20-722-0980",
          email: "info@northseajazzclub.nl",
          website: "https://www.northseajazzclub.nl"
        },
        coordinates: { lat: 52.3853, lng: 4.8789 },
        images: [
          "https://www.northseajazzclub.nl/wp-content/uploads/2022/01/north-sea-jazz-club-exterior.jpg",
          "https://www.northseajazzclub.nl/wp-content/uploads/2022/01/north-sea-jazz-club-interior.jpg"
        ],
        userId: amsterdamManager.id
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
          title: "Jazz Night at Blue Note",
          description: "Live jazz quartet performing classic standards and original compositions",
          startDate: dates1.startDate.toISOString(),
          endDate: dates1.endDate.toISOString(),
          status: "published",
          artist: eventTypes.jazz.artist("NYC"),
          genre: eventTypes.jazz.genre,
          price: eventTypes.jazz.price,
          venueId: venue.id
        }
      }),
      prisma.event.create({
        data: {
          title: "Blues Evening at Blue Note",
          description: "Soulful blues performance featuring local and guest artists",
          startDate: dates2.startDate.toISOString(),
          endDate: dates2.endDate.toISOString(),
          status: "published",
          artist: eventTypes.rock.artist("NYC"),
          genre: eventTypes.rock.genre,
          price: eventTypes.rock.price,
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
          title: "Soirée Jazz at L'Olympia",
          description: "Une soirée exceptionnelle de jazz contemporain",
          startDate: dates1.startDate.toISOString(),
          endDate: dates1.endDate.toISOString(),
          status: "published",
          artist: eventTypes.jazz.artist("Paris"),
          genre: eventTypes.jazz.genre,
          price: eventTypes.jazz.price,
          venueId: venue.id
        }
      }),
      prisma.event.create({
        data: {
          title: "Classical Night at L'Olympia",
          description: "Classical music performance featuring chamber orchestra",
          startDate: dates2.startDate.toISOString(),
          endDate: dates2.endDate.toISOString(),
          status: "published",
          artist: eventTypes.classical.artist("Paris"),
          genre: eventTypes.classical.genre,
          price: eventTypes.classical.price,
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
          title: "Electronic Night at Berghain",
          description: "Progressive electronic music featuring international DJs",
          startDate: dates1.startDate.toISOString(),
          endDate: dates1.endDate.toISOString(),
          status: "published",
          artist: eventTypes.electronic.artist("Berlin"),
          genre: eventTypes.electronic.genre,
          price: eventTypes.electronic.price,
          venueId: venue.id
        }
      }),
      prisma.event.create({
        data: {
          title: "Indie Rock at Berghain",
          description: "Alternative and indie rock bands showcase",
          startDate: dates2.startDate.toISOString(),
          endDate: dates2.endDate.toISOString(),
          status: "published",
          artist: eventTypes.rock.artist("Berlin"),
          genre: eventTypes.rock.genre,
          price: eventTypes.rock.price,
          venueId: venue.id
        }
      }),
      prisma.event.create({
        data: {
          title: "Experimental Music at Berghain",
          description: "Avant-garde and experimental music performance",
          startDate: dates3.startDate.toISOString(),
          endDate: dates3.endDate.toISOString(),
          status: "draft",
          artist: eventTypes.world.artist("Berlin"),
          genre: eventTypes.world.genre,
          price: eventTypes.world.price,
          venueId: venue.id
        }
      })
    );
  }

  // Events for London venues
  for (const venue of londonVenues) {
    // Generate 7 events throughout 2024 for each venue
    const eventDates = [
      get2024EventDates(1, 20),  // January
      get2024EventDates(3, 15),  // March
      get2024EventDates(5, 25),  // May
      get2024EventDates(7, 10),  // July
      get2024EventDates(9, 30),  // September
      get2024EventDates(11, 20), // November
      get2024EventDates(12, 15)  // December
    ];

    // Event templates based on venue type
    const londonEventTypes: VenueEventTypes = {
      "Royal Albert Hall": [
        { title: "Classical Proms", description: "Experience the magic of the Proms with world-class orchestras" },
        { title: "Opera Gala", description: "A spectacular evening of operatic masterpieces" },
        { title: "Film Score Night", description: "Live orchestra performing iconic film scores" }
      ],
      "O2 Academy Brixton": [
        { title: "Rock Legends", description: "Epic night of classic and modern rock" },
        { title: "Indie Festival", description: "Showcase of the best indie bands" },
        { title: "Electronic Beats", description: "Night of electronic music and live performances" }
      ],
      "Jazz Cafe": [
        { title: "Jazz Legends", description: "Evening of classic jazz standards" },
        { title: "Soul Night", description: "Soulful performances from top artists" },
        { title: "World Music Fusion", description: "Blend of jazz with world music influences" }
      ],
      "Barbican Centre": [
        { title: "Contemporary Classical", description: "Modern classical music performances" },
        { title: "Experimental Music", description: "Cutting-edge experimental compositions" },
        { title: "World Orchestra", description: "International orchestra performances" }
      ],
      "default": [
        { title: "Live Music Showcase", description: "An evening of outstanding live music" },
        { title: "Artist Spotlight", description: "Featured performance by renowned artists" },
        { title: "Music Festival", description: "Multi-artist festival experience" }
      ]
    };

    // Get appropriate event types for this venue
    const venueEventTypes = londonEventTypes[venue.name] || londonEventTypes.default;

    // Create events for each date
    eventDates.forEach((dates, index) => {
      const eventType = venueEventTypes[index % venueEventTypes.length];
      events.push(
        prisma.event.create({
          data: {
            title: `${eventType.title} at ${venue.name}`,
            description: eventType.description,
            startDate: dates.startDate.toISOString(),
            endDate: dates.endDate.toISOString(),
            status: "published",
            artist: eventTypes.classical.artist("London"),
            genre: eventTypes.classical.genre,
            price: eventTypes.classical.price,
            venueId: venue.id
          }
        })
      );
    });
  }

  // Events for Porto venues
  for (const venue of portoVenues) {
    // Generate 7 events throughout 2024 for each venue
    const eventDates = [
      get2024EventDates(2, 10),  // February
      get2024EventDates(4, 15),  // April
      get2024EventDates(6, 20),  // June
      get2024EventDates(8, 25),  // August
      get2024EventDates(10, 5),  // October
      get2024EventDates(11, 30), // November
      get2024EventDates(12, 20)  // December
    ];

    // Event templates based on venue type
    const portoEventTypes: VenueEventTypes = {
      "Casa da Música": [
        { title: "Classical Orchestra", description: "Porto Symphony Orchestra performs masterpieces" },
        { title: "World Music Festival", description: "Celebrating global music traditions" },
        { title: "Contemporary Music", description: "Modern classical and experimental performances" }
      ],
      "Coliseu Porto Ageas": [
        { title: "Portuguese Fado Night", description: "Traditional fado performances by renowned artists" },
        { title: "International Artist Concert", description: "World-famous performers live on stage" },
        { title: "Music Festival", description: "Multi-artist music festival" }
      ],
      "Hard Club": [
        { title: "Rock Night", description: "Heavy rock and metal bands live" },
        { title: "Electronic Music Party", description: "DJ sets and electronic music performances" },
        { title: "Alternative Music Showcase", description: "Independent and alternative bands" }
      ],
      "default": [
        { title: "Live Music Night", description: "Evening of live music performances" },
        { title: "Local Artists Showcase", description: "Featuring Porto's best musical talent" },
        { title: "Cultural Performance", description: "Unique cultural and musical experience" }
      ]
    };

    // Get appropriate event types for this venue
    const venueEventTypes = portoEventTypes[venue.name] || portoEventTypes.default;

    // Create events for each date
    eventDates.forEach((dates, index) => {
      const eventType = venueEventTypes[index % venueEventTypes.length];
      events.push(
        prisma.event.create({
          data: {
            title: `${eventType.title} at ${venue.name}`,
            description: eventType.description,
            startDate: dates.startDate.toISOString(),
            endDate: dates.endDate.toISOString(),
            status: "published",
            artist: eventTypes.classical.artist("Porto"),
            genre: eventTypes.classical.genre,
            price: eventTypes.classical.price,
            venueId: venue.id
          }
        })
      );
    });
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
        { title: "Live Music Night", description: "Evening of live music performances" },
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
            startDate: dates.startDate.toISOString(),
            endDate: dates.endDate.toISOString(),
            status: "published",
            artist: eventTypes.classical.artist("Barcelona"),
            genre: eventTypes.classical.genre,
            price: eventTypes.classical.price,
            venueId: venue.id
          }
        })
      );
    });
  }

  // Events for Toulouse venues
  for (const venue of toulouseVenues) {
    // Generate 7 events throughout 2024 for each venue
    const eventDates = [
      get2024EventDates(1, 20),  // January
      get2024EventDates(3, 15),  // March
      get2024EventDates(5, 10),  // May
      get2024EventDates(7, 5),   // July
      get2024EventDates(9, 25),  // September
      get2024EventDates(11, 10), // November
      get2024EventDates(12, 15)  // December
    ];

    // Event templates based on venue type
    const toulouseEventTypes: VenueEventTypes = {
      "Le Bikini": [
        { title: "Electronic Music Night", description: "Top DJs and electronic music producers" },
        { title: "Rock Concert", description: "Live rock band performance" },
        { title: "Alternative Music Festival", description: "Diverse alternative music lineup" }
      ],
      "Le Zénith Toulouse Métropole": [
        { title: "International Artist Tour", description: "World-famous artist live in concert" },
        { title: "French Pop Concert", description: "Popular French artists perform live" },
        { title: "Music Festival", description: "Multi-artist music festival" }
      ],
      "Théâtre du Capitole": [
        { title: "Opera Night", description: "Classical opera performance" },
        { title: "Symphony Orchestra", description: "Orchestral masterpieces" },
        { title: "Classical Concert", description: "Chamber music performance" }
      ],
      "Le Taquin": [
        { title: "Jazz Night", description: "Evening of jazz music" },
        { title: "Blues Session", description: "Live blues performance" },
        { title: "World Music", description: "International music showcase" }
      ],
      "default": [
        { title: "Live Music Evening", description: "Evening of live performances" },
        { title: "Local Artist Showcase", description: "Featuring Toulouse's musical talent" },
        { title: "Cultural Performance", description: "Unique artistic experience" }
      ]
    };

    // Get appropriate event types for this venue
    const venueEventTypes = toulouseEventTypes[venue.name] || toulouseEventTypes.default;

    // Create events for each date
    eventDates.forEach((dates, index) => {
      const eventType = venueEventTypes[index % venueEventTypes.length];
      events.push(
        prisma.event.create({
          data: {
            title: `${eventType.title} at ${venue.name}`,
            description: eventType.description,
            startDate: dates.startDate.toISOString(),
            endDate: dates.endDate.toISOString(),
            status: "published",
            artist: eventTypes.classical.artist("Toulouse"),
            genre: eventTypes.classical.genre,
            price: eventTypes.classical.price,
            venueId: venue.id
          }
        })
      );
    });
  }

  // Events for Lagos venues
  for (const venue of lagosVenues) {
    // Generate 7 events throughout 2024 for each venue
    const eventDates = [
      get2024EventDates(2, 15),  // February
      get2024EventDates(4, 20),  // April
      get2024EventDates(6, 25),  // June
      get2024EventDates(8, 30),  // August
      get2024EventDates(10, 15), // October
      get2024EventDates(11, 20), // November
      get2024EventDates(12, 25)  // December
    ];

    // Event templates based on venue type
    const lagosEventTypes: VenueEventTypes = {
      "Eko Hotel Convention Centre": [
        { title: "Afrobeats Mega Concert", description: "Nigeria's biggest Afrobeats stars live in concert" },
        { title: "International Music Festival", description: "Global music stars perform live" },
        { title: "African Music Awards", description: "Celebrating excellence in African music" }
      ],
      "The New Afrika Shrine": [
        { title: "Afrobeat Legacy Night", description: "Celebrating the spirit of Fela Kuti" },
        { title: "African Fusion Concert", description: "Blend of traditional and modern African music" },
        { title: "Cultural Music Festival", description: "Showcase of Nigerian musical heritage" }
      ],
      "Terra Kulture Arena": [
        { title: "Nigerian Classical Concert", description: "Traditional Nigerian music performance" },
        { title: "Contemporary African Music", description: "Modern interpretations of African sounds" },
        { title: "Cultural Fusion Night", description: "Blend of traditional and contemporary performances" }
      ],
      "The Jazz Hole": [
        { title: "Jazz & Blues Night", description: "Evening of smooth jazz and blues" },
        { title: "African Jazz Fusion", description: "Blend of African rhythms and jazz" },
        { title: "World Music Showcase", description: "International jazz artists perform" }
      ],
      "default": [
        { title: "Live Music Night", description: "Evening of live performances" },
        { title: "Local Artist Showcase", description: "Featuring Lagos's musical talent" },
        { title: "Cultural Performance", description: "Celebration of Nigerian music and culture" }
      ]
    };

    // Get appropriate event types for this venue
    const venueEventTypes = lagosEventTypes[venue.name] || lagosEventTypes.default;

    // Create events for each date
    eventDates.forEach((dates, index) => {
      const eventType = venueEventTypes[index % venueEventTypes.length];
      events.push(
        prisma.event.create({
          data: {
            title: `${eventType.title} at ${venue.name}`,
            description: eventType.description,
            startDate: dates.startDate.toISOString(),
            endDate: dates.endDate.toISOString(),
            status: "published",
            artist: eventTypes.world.artist("Lagos"),
            genre: eventTypes.world.genre,
            price: eventTypes.world.price,
            venueId: venue.id
          }
        })
      );
    });
  }

  // Events for Amsterdam venues
  for (const venue of amsterdamVenues) {
    // Generate 7 events throughout 2024 for each venue
    const eventDates = [
      get2024EventDates(1, 25),  // January
      get2024EventDates(3, 20),  // March
      get2024EventDates(5, 15),  // May
      get2024EventDates(7, 10),  // July
      get2024EventDates(9, 5),   // September
      get2024EventDates(10, 30), // October
      get2024EventDates(12, 15)  // December
    ];

    // Event templates based on venue type
    const amsterdamEventTypes: VenueEventTypes = {
      "Royal Concertgebouw": [
        { title: "Symphony Orchestra", description: "World-class orchestral performance" },
        { title: "Chamber Music Evening", description: "Intimate performance of chamber music classics" },
        { title: "Classical Masterworks", description: "Celebrating classical music excellence" }
      ],
      "Paradiso": [
        { title: "Rock Legends", description: "International rock bands live" },
        { title: "Indie Music Night", description: "Showcase of independent artists" },
        { title: "Alternative Music Festival", description: "Diverse alternative music lineup" }
      ],
      "Melkweg": [
        { title: "Electronic Music Night", description: "Top DJs and electronic music producers" },
        { title: "World Music Festival", description: "Global music celebration" },
        { title: "Urban Music Showcase", description: "Hip-hop and R&B performances" }
      ],
      "Bimhuis": [
        { title: "Jazz Masters", description: "Renowned jazz artists perform" },
        { title: "Contemporary Jazz", description: "Modern jazz interpretations" },
        { title: "Dutch Jazz Scene", description: "Celebrating local jazz talent" }
      ],
      "default": [
        { title: "Live Music Evening", description: "Evening of live performances" },
        { title: "Local Artist Showcase", description: "Featuring Amsterdam's musical talent" },
        { title: "Cultural Performance", description: "Unique Dutch cultural experience" }
      ]
    };

    // Get appropriate event types for this venue
    const venueEventTypes = amsterdamEventTypes[venue.name] || amsterdamEventTypes.default;

    // Create events for each date
    eventDates.forEach((dates, index) => {
      const eventType = venueEventTypes[index % venueEventTypes.length];
      events.push(
        prisma.event.create({
          data: {
            title: `${eventType.title} at ${venue.name}`,
            description: eventType.description,
            startDate: dates.startDate.toISOString(),
            endDate: dates.endDate.toISOString(),
            status: "published",
            artist: eventTypes.classical.artist("Amsterdam"),
            genre: eventTypes.classical.genre,
            price: eventTypes.classical.price,
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
  console.log(`- ${londonVenues.length} London venues`);
  console.log(`- ${portoVenues.length} Porto venues`);
  console.log(`- ${toulouseVenues.length} Toulouse venues`);
  console.log(`- ${lagosVenues.length} Lagos venues`);
  console.log(`- ${amsterdamVenues.length} Amsterdam venues`);
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
```