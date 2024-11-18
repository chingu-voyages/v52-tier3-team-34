import { createFileRoute } from '@tanstack/react-router';
import 'maplibre-gl/dist/maplibre-gl.css';
import { ZoneFeature } from '../../types/zones';
import { useZones } from '../../hooks/useZones';

export const Route = createFileRoute('/')({
  component: HomeComponent
});

// const calculateBoundingBox = (latitude: number, longitude: number, radius: number) => {
//   const circle = turf.circle([longitude, latitude], radius, { units: 'kilometers' });
//   return turf.bbox(circle);
// };

function HomeComponent() {
  const { data, isLoading, error, isError } = useZones();

  // const onMove = useCallback(({ viewState }) => {
  //   setViewState(viewState);
  // }, []);

  // will need to be updated so it loads based on client location
  // const onMapLoad = useCallback(() => {
  //   if (mapRef.current) {
  //     mapRef.current?.fitBounds(
  //       [
  //         [-]
  //       ]
  //     );
  //   }
  // }, [eventsData]);

  // necessary to move map and zoom
  // const onMove = useCallback(({ viewState }) => {
  //   const newCenter = [viewState.longitude, viewState.latitude];
  //   if (turf.booleanPointInPolygon(newCenter, GEOFENCE)) {
  //     setViewState(viewState);
  //   }
  // }, []);

  if (isLoading)
    return (
      <div className="p-2 min-h-screen flex flex-col gap-3 justify-center items-center">
        <h3 className="text-2xl font-bold">Loading zones...</h3>
      </div>
    );
  if (isError)
    return (
      <div className="p-2 min-h-screen flex flex-col gap-3 justify-center items-center">
        <h3 className="text-2xl font-bold">Error loading zones...</h3>
      </div>
    );

  return <div className="p-2 min-h-screen flex flex-col gap-3 justify-center items-center"></div>;
}
