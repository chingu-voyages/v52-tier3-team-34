import { ViewState } from '@vis.gl/react-maplibre';

export const serverBaseUrl = import.meta.env.VITE_SERVER_BASE_URL;
export const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// Map default setup:
export const initialViewState: ViewState = {
  longitude: 0,
  latitude: 0,
  zoom: 1,
  pitch: 0,
  bearing: 0,
  padding: { top: 0, right: 0, bottom: 0, left: 0 }
};

export const initialCity = {
  lat: 0,
  lng: 0
};
