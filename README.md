# 🎵 Live Music Finder 🌃

## Discover Live Music in Real-Time, Right Now!

### 🎸 What is Live Music Finder?

Imagine wandering through a vibrant city on a crisp evening, craving the soul-stirring sounds of live blues, the improvisational magic of jazz, or the passionate rhythms of flamenco. **Live Music Finder** is your ultimate companion to spontaneous musical adventures.

![Live Music Finder Banner](LiveMusicFinderBanner.webp)

*This application was developed as a learning project for Chingu Voyage 52.*

### ✨ Key Features

- **Real-Time Music Discovery**: Find live music venues happening right now or in the near future
- **Interactive City Map**: Explore musical hotspots with an intuitive, user-friendly interface
- **Dual-Purpose Platform**:
  - **For Music Lovers**: Instantly discover where live music is playing
  - **For Venue Owners**: Easily showcase your live music events to eager audiences
 
### Deployed App 
[Live Music Finder](https://v52-tier3-team-34-1.onrender.com/)

### 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/your-username/live-music-finder.git

# Navigate to the project directory
cd live-music-finder

# Install dependencies on client and server folders
npm install

# Run the development server on client and server folders
npm run dev
```

### 🔑 Main Functionalities

#### User (Client) Experience
- Browse live music venues on an interactive map
- Filter events by start time
- View detailed event information

#### Venue Owner Experience
- Register your venue
- Set precise map coordinates
- Upload venue images
- Create and manage live music events

### 🛠 Tech Stack

- **Frontend**: 
* React with TypeScript

* ViteJS as Build Tool

* CSS Tailwind
  
- **Backend**:
* Node.JS with TypeScript

* Express as API framework

* Prisma as ORM

* PostgreSQL as database

* Zod for validation
  
* Jest for testing

**Check [this documentation](server/README.md) to know all about how to get the back-end started on your local machine.**
  
- **Authentication**: Google OAuth

### 📡 Live Music Finder API Documentation

Deployed API url : https://v52-tier3-team-34.onrender.com/api/v1/

#### Postman Collections
[This directory](postman/README.mdcontains) contains Postman collections for testing the Live Music Finder API, organized into authentication, events, venues, and user management endpoints.

#### 🎵 Venue Endpoints

* GET /venues 🗺️ List all venues
* POST /venues 🏠 Create a new venue
* GET /venues/{venueId} 🔍 Get venue details
* PUT /venues/{venueId} ✏️ Update venue information
* DELETE /venues/{venueId} 🗑️ Delete a venue

#### 🎸 Event Endpoints

* GET /events 📅 List all events
* POST /events 🎉 Create a new event
* GET /events/{eventId} 🔎 Get event details
* PUT /events/{eventId} 📝 Update event information
* DELETE /events/{eventId} ❌ Cancel an event

#### 🛡️ User Profile Endpoints

* GET /profile 👤 Get user profile
* PUT /profile ✨ Update user profile

#### 🛠️ Utility Endpoints

* GET /health ❤️ API health check

### 🤝 Contributing

Passionate about music and code? We'd love your help!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### 📋 Upcoming Features

- Enhanced music genre filtering
- User reviews and ratings
- Recommendation algorithm

### 🎉 Why Live Music Finder?

In a world of algorithm-driven playlists, we believe in the magic of live, spontaneous music. Whether you're a jazz enthusiast, a blues lover, or a flamenco aficionado, Live Music Finder connects you with the heartbeat of your city's music scene.

**Made with 🎵 by Music Lovers, For Music Lovers**

## Acknowledgements

Special thanks to the Chingu community for their ongoing support that make this project possible. 

## The team

- Adam Honvedo #1: [GitHub](https://github.com/Homvi) / [LinkedIn](https://www.linkedin.com/in/adamhonvedo/)
- Carlos Morais #2: [GitHub](https://github.com/Morais-C) / [LinkedIn](https://www.linkedin.com/in/carlosmoraisprofile/)
- Cristiano Valente #3: [GitHub](https://github.com/cris-valente) / [LinkedIn](https://www.linkedin.com/in/cristiano-valente-3943092a1/)
- Damilola Oshinowo #4: [GitHub](https://github.com/dami-boy) / [LinkedIn](https://linkedin.com/in/damilola-oshinowo)
- Kris Oldrini #5: [GitHub](https://github.com/XiaoQuark) / [LinkedIn](https://www.linkedin.com/in/kris-oldrini/)
