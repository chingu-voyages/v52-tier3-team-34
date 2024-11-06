# Live Music Finder - MVP

## Table of Contents

- [Overview](#overview)
- [General Instructions](#general-instructions)
- [Requirements & Specifications](#requirements--specifications)
- [Acknowledgements](#acknowledgements)
- [About This Project](#about-this-project)

## Overview

Imagine it’s evening, and you’re in a bustling city, searching for a cozy bar with live blues, jazz, or flamenco music playing. This application, **Live Music Finder**, is designed for people who want to discover venues with live music happening in real time, without the wait associated with big concert events. This web-based MVP allows users to see which places have live music right now, or in the near future.

The application supports three main roles:

- **User (Client)**: Can view locations with live music on a map, filter events by start time, and access basic event details.
- **Artist**: Can register, add details about their band, and submit upcoming live events.
- **Venue Owner**: Can register their venue, set map coordinates, and upload at least one picture of their bar.


## Requirements & Specifications

### Structure

- [ ] This is a full-stack application, with both frontend and backend components.
- [ ] You may use any preferred languages, tools, or libraries for the app’s design and functionality.

### Functionality

#### User (Client) Interface

- **Map View of Live Music Locations**
  - [ ] Display a real-time map showing venues with live music.
  - [ ] Allow users to click a venue to see basic details: event genre, artist name, start time, and entry status (e.g., free or paid).
- **Event Time Filters**
  - [ ] Include a slider to filter events by start time (e.g., “Now,” “In 1 Hour,” “In 2 Hours”).
  
#### Artist Interface

- **Artist Registration**
  - [ ] Allow artists to create a basic profile with details about their band (e.g., genre, group size, contact).
- **Event Submission**
  - [ ] Allow artists to add upcoming live events, linked to a registered venue.

#### Venue (Owner) Interface

- **Venue Registration**
  - [ ] Enable owners to register their bar, set its map coordinates, and add contact information.
- **Venue Details Management**
  - [ ] Allow venue owners to upload at least one image of the bar and provide a description.

#### Backend Essentials

- **User Authentication**
  - [ ] Implement basic login for users, artists, and owners.
- **Database**
  - [ ] Set up a database to store venue details, artist profiles, events, and real-time location data.
- **Notifications**
  - [ ] Implement notifications for upcoming events that align with user preferences.

### Styling

- [ ] Ensure the application has a responsive design, with consistent display across devices (desktop, tablet, mobile).
- [ ] Add a footer containing a link to your team’s GitHub repository.

### Acceptance Criteria

#### User (Client) Interface

- [ ] Users can view live music events on a map, filtered by event time.
- [ ] Users can access basic event details when clicking on a venue.

#### Artist Interface

- [ ] Artists can register and add event details for their performances.

#### Venue Interface

- [ ] Venue owners can register their venue and upload at least one image.

#### Backend Essentials

- [ ] Database stores venue, artist, and event data.
- [ ] Authentication is implemented for secure access.
- [ ] Notifications are sent for upcoming events.

## About This Project

This app is a real-time solution for discovering local, intimate live music performances. It’s perfect for music lovers who want to explore new places and support local artists, all from an easy-to-navigate interface.

