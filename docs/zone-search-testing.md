# Zone Search Testing Guide

## Seed Data Overview

### New York Venues (Times Square as center: 40.7580, -73.9855)
1. **Blue Note Jazz Club**
   - Location: 40.7302, -74.0003
   - Address: 131 W 3rd St, New York, NY 10012
   - Events: 2 events (Jazz Night, Blues Evening)

2. **Village Vanguard**
   - Location: 40.7347, -74.0023
   - Address: 178 7th Ave S, New York, NY 10014
   - Events: 2 events (Jazz Night, Blues Evening)

3. **Birdland Jazz Club**
   - Location: 40.7589, -73.9910
   - Address: 315 W 44th St, New York, NY 10036
   - Events: 2 events (Jazz Night, Blues Evening)

4. **The Iridium**
   - Location: 40.7620, -73.9837
   - Address: 1650 Broadway, New York, NY 10019
   - Events: 2 events (Jazz Night, Blues Evening)

5. **Bowery Ballroom**
   - Location: 40.7204, -73.9934
   - Address: 6 Delancey St, New York, NY 10002
   - Events: 2 events (Jazz Night, Blues Evening)

6. **Brooklyn Steel**
   - Location: 40.7168, -73.9396
   - Address: 319 Frost St, Brooklyn, NY 11222
   - Events: 2 events (Jazz Night, Blues Evening)

### Paris Venues (Notre-Dame as center: 48.8530, 2.3499)
1. **L'Olympia**
   - Location: 48.8700, 2.3283
   - Address: 28 Boulevard des Capucines, 75009 Paris
   - Events: 2 events (Soirée Jazz, Classical Night)

2. **Le Bataclan**
   - Location: 48.8632, 2.3702
   - Address: 50 Boulevard Voltaire, 75011 Paris
   - Events: 2 events (Soirée Jazz, Classical Night)

3. **New Morning**
   - Location: 48.8729, 2.3502
   - Address: 7-9 Rue des Petites Écuries, 75010 Paris
   - Events: 2 events (Soirée Jazz, Classical Night)

4. **La Cigale**
   - Location: 48.8827, 2.3401
   - Address: 120 Boulevard de Rochechouart, 75018 Paris
   - Events: 2 events (Soirée Jazz, Classical Night)

5. **Le Petit Journal**
   - Location: 48.8524, 2.3384
   - Address: 71 Boulevard Saint-Germain, 75006 Paris
   - Events: 2 events (Soirée Jazz, Classical Night)

### Berlin Venues (Brandenburg Gate as center: 52.5163, 13.3777)
1. **Berghain**
   - Location: 52.5111, 13.4399
   - Address: Am Wriezener Bahnhof, 10243 Berlin
   - Events: 3 events (Electronic Night, Indie Rock, Experimental Music)

2. **SO36**
   - Location: 52.5001, 13.4285
   - Address: Oranienstraße 190, 10999 Berlin
   - Events: 3 events (Electronic Night, Indie Rock, Experimental Music)

3. **Lido**
   - Location: 52.4977, 13.4422
   - Address: Cuvrystraße 7, 10997 Berlin
   - Events: 3 events (Electronic Night, Indie Rock, Experimental Music)

4. **Astra Kulturhaus**
   - Location: 52.5066, 13.4542
   - Address: Revaler Str. 99, 10245 Berlin
   - Events: 3 events (Electronic Night, Indie Rock, Experimental Music)

## Testing Zone Search

### Example Requests

1. **New York Events (20km radius)**
```
GET http://localhost:3000/api/events/zone?lat=40.7580&lng=-73.9855&radius=20
```
Expected: All Manhattan and Brooklyn venues' events

2. **Paris Events (15km radius)**
```
GET http://localhost:3000/api/events/zone?lat=48.8530&lng=2.3499&radius=15
```
Expected: All Paris venues' events

3. **Berlin Events (10km radius)**
```
GET http://localhost:3000/api/events/zone?lat=52.5163&lng=13.3777&radius=10
```
Expected: All Berlin venues' events

### Testing with Browser

1. **Using Browser Developer Tools**
   - Open browser developer tools (F12)
   - Go to Network tab
   - Copy and paste the URL with parameters
   - Observe the GeoJSON response

2. **Using Query Parameters**
   - `lat`: Latitude of search center
   - `lng`: Longitude of search center
   - `radius`: Search radius in kilometers (max 50)
   - Optional:
     - `startDate`: Filter events after this date
     - `status`: Filter by event status

3. **Example with Filters**
```
http://localhost:3000/api/events/zone?lat=40.7580&lng=-73.9855&radius=20&status=published&startDate=2024-03-20T00:00:00Z
```

### Expected Results

1. **Distance Calculations**
   - Events are sorted by distance from search center
   - Distance is included in properties (in kilometers)
   - Rounded to 2 decimal places

2. **GeoJSON Format**
   - FeatureCollection with venue points
   - Coordinates in [longitude, latitude] order
   - Properties include event and venue details

3. **Response Structure**
   - Search center coordinates
   - Search radius
   - List of events within radius
   - Distance from center for each event 