export interface City {
  lat: number;
  lng: number;
  label: string;
}

// Select-friendly city interface
export interface SelectCity {
  value: { lat: number; lng: number };
  label: string;
}
