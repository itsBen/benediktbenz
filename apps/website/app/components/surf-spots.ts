import visitedSurfSpotsData from '../../public/data/visited_surf_spots.json';

export type Spot = {
  name: string;
  latitude: number;
  longitude: number;
};

type VisitedSurfSpots = {
  count: number;
  includeVisitCount: boolean;
  spots: Spot[];
  timestampUtcExtractedAt: string;
};

const visitedSurfSpots = visitedSurfSpotsData as VisitedSurfSpots;

export const surfedSpotsExtractedAt = new Date(
  visitedSurfSpots.timestampUtcExtractedAt,
);

export const surfedSpots: Spot[] = visitedSurfSpots.spots
  .filter(
    (spot) =>
      Number.isFinite(spot.latitude) &&
      Number.isFinite(spot.longitude),
  )
  .map((spot) => ({
    name: spot.name,
    latitude: spot.latitude,
    longitude: spot.longitude,
  }));

const wishlistSurfSpotsData: Spot[] = [
  { name: 'Mavericks', longitude: -122.5, latitude: 37.49 },
  { name: 'Jeffreys Bay', longitude: 24.93, latitude: -34.05 },
  { name: 'Mundaka', longitude: -2.7, latitude: 43.41 },
  { name: 'Hossegor', longitude: -1.43, latitude: 43.67 },
  { name: 'Pipeline', longitude: -158.05, latitude: 21.67 },
  { name: 'Uluwatu', longitude: 115.09, latitude: -8.82 },
  { name: 'Arugam Bay', longitude: 81.84, latitude: 6.84 },
  { name: 'Raglan', longitude: 174.87, latitude: -37.8 },
  { name: 'Cloudbreak', longitude: 177.22, latitude: -17.88 },
  { name: 'Marina di Vecchiano', longitude: 10.28, latitude: 43.77 },
  { name: 'Woolacombe', longitude: -4.21, latitude: 51.17 },
  { name: 'Scheveningen', longitude: 4.28, latitude: 52.11 },
  { name: 'Bouznika', longitude: -7.16, latitude: 33.78 },
  { name: 'Mancora', longitude: -80.82, latitude: -4.11 },
  { name: 'Lima', longitude: -77.04, latitude: -12.1 },
  { name: 'Biarritz', longitude: -1.56, latitude: 43.48 },
  { name: 'Bali', longitude: 115.13, latitude: -8.67 },
  { name: 'Camp de Mar', longitude: 2.42, latitude: 39.54 },
  { name: 'Punta de Lobos', longitude: -71.99, latitude: -34.41 },
  { name: 'Lagos', longitude: -8.67, latitude: 37.09 },
];

export const wishlistSurfSpots: Spot[] = wishlistSurfSpotsData;
