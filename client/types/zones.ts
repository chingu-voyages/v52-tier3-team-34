export interface ZoneFeature {
  type: string;
  geometry: {
    type: string;
    coordinates: [number, number]; // [longitude, latitude]
  };
  properties: {
    id: number;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    status: string;
    distance: number;
    venue: Venue;
    createdAt: string;
    updatedAt: string;
  };
}

export interface Venue {
  id: number;
  name: string;
  address: string;
}

export interface Center {
  type: string;
  coordinates: [number, number];
}

export interface Zone {
  type: string;
  features: ZoneFeature[];
  center: Center;
  radius: number; //in kilometres
}

export interface ZoneResponse {
  status: string; // sucess or error

  data: {
    type: string;
    features: ZoneFeature[];
    center: Center;
    radius: number;
  };
  timestamp: string;
}
