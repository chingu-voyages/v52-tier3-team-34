# Venue Management System - Seed Data Documentation

## Overview
Our seed data represents a diverse, global network of music venues across major cultural cities. Each city's venues are carefully selected to represent different music genres, venue sizes, and cultural significance.

## Cities Coverage

### Europe
1. **Amsterdam, Netherlands**
   - Centered around Dam Square (52.3731° N, 4.8926° E)
   - Mix of historic venues (Paradiso, former church) and modern spaces (Ziggo Dome)
   - Strong representation of Dutch cultural heritage

2. **Paris, France**
   - Centered around Louvre (48.8606° N, 2.3376° E)
   - Emphasis on classical music and chanson française
   - Blend of historic theaters and contemporary spaces

3. **Berlin, Germany**
   - Focus on electronic music scene and alternative culture
   - Mix of repurposed industrial spaces and purpose-built venues
   - Strong representation of techno and experimental music

4. **Barcelona, Spain**
   - Mediterranean influence in venue selection
   - Combination of traditional flamenco spaces and modern concert halls
   - Focus on both Spanish and international music

5. **London, UK**
   - Diverse mix reflecting city's multicultural nature
   - Historic venues (Royal Albert Hall) to modern arenas
   - Coverage of all major music genres

6. **Porto, Portugal**
   - Traditional Portuguese music venues
   - Focus on Fado houses and cultural centers
   - Mix of historic and contemporary spaces

7. **Toulouse, France**
   - Regional French cultural representation
   - Strong jazz and classical music presence
   - Mix of intimate venues and larger concert halls

### North America
8. **New York, USA**
   - Centered around Times Square (40.7580° N, 73.9855° W)
   - Iconic venues from multiple eras
   - Representation of jazz, classical, and contemporary music

### Africa
9. **Lagos, Nigeria**
   - Focus on Afrobeats and contemporary African music
   - Mix of traditional and modern venues
   - Strong representation of local music scene

## Venue Selection Criteria

### Size Distribution
- Large Arenas (5000+ capacity)
- Mid-size Venues (1000-5000)
- Intimate Spaces (<1000)

### Genre Coverage
- Classical/Orchestra
- Jazz/Blues
- Rock/Pop
- Electronic/Dance
- World Music
- Traditional/Folk

### Historical Significance
- Landmark Venues
- Cultural Heritage Sites
- Modern Purpose-built Spaces
- Repurposed Buildings

## Event Generation Strategy

### Temporal Distribution
- 7 events per venue throughout 2024
- Events spread across different months
- Consideration of seasonal patterns

### Event Types
1. **Venue-Specific Events**
   - Matched to venue's primary genre
   - Appropriate to venue size and facilities
   - Culturally relevant programming

2. **Default Events**
   - Generic templates for flexible spaces
   - Local artist showcases
   - Cultural performances

### Event Scheduling
- 3-hour duration standard
- Evening time slots
- Weekend preference for major events

## Data Structure

### Venue Data
```typescript
{
  name: string
  description: string
  address: string
  contact: {
    phone: string
    email: string
    website: string
  }
  coordinates: {
    lat: number
    lng: number
  }
  images: string[]
  userId: string
}
```

### Event Data
```typescript
{
  title: string
  description: string
  startDate: Date
  endDate: Date
  status: "published"
  venueId: string
}
```

## Management Structure
- Each city has a dedicated venue manager
- Managers have unique email and profile
- Consistent naming convention for manager accounts

## Quality Assurance
- Real geographical coordinates
- Valid contact information format
- Consistent image URL structure
- Realistic venue capacities
- Appropriate event timing
- Cultural accuracy in descriptions

## Future Expansion Considerations
- Asian market coverage
- South American venues
- More African cities
- Specialized venue types
- Seasonal event patterns
- Festival circuits

This seed data provides a robust foundation for testing and demonstrating the venue management system's capabilities while maintaining cultural authenticity and practical usability.
