'use client';

import { useState } from 'react';

import {
  ComposableMap,
  createCoordinates,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
  type Coordinates,
} from '@vnedyalk0v/react19-simple-maps';
import worldGeo from '../data/countries-110m.json';

type Spot = {
  name: string;
  coordinates: [number, number];
};

type SurfMapProps = {
  mode: 'surfed' | 'wishlist';
};

const surfedSpots: Spot[] = [
  { name: 'Weligama SK Town, Sri Lanka', coordinates: [80.43, 5.97] },
  { name: "Lion's Rest, Sri Lanka", coordinates: [80.41, 5.96] },
  { name: 'Esmoriz, Portugal', coordinates: [-8.64, 40.96] },
  { name: 'Playa de Paramos, Portugal', coordinates: [-8.66, 40.94] },
  {
    name: 'Praia das Sereias, Portugal',
    coordinates: [-9.24, 38.64],
  },
  {
    name: 'Praia de Matosinhos, Portugal (first surf spot)',
    coordinates: [-8.69, 41.18],
  },
  { name: 'Anchor Point, Morocco', coordinates: [-9.72, 30.54] },
  { name: 'Hash Point, Morocco', coordinates: [-9.71, 30.54] },
  { name: 'La Source, Morocco', coordinates: [-9.7, 30.54] },
  {
    name: 'Playa Carrizalillo, Mexico',
    coordinates: [-96.72, 15.86],
  },
];

const wishlistSpots: Spot[] = [
  { name: 'J-Bay, South Africa', coordinates: [24.93, -34.05] },
  { name: 'Uluwatu, Indonesia', coordinates: [115.09, -8.83] },
  { name: 'Tavarua, Fiji', coordinates: [177.16, -17.88] },
  { name: 'Punta de Lobos, Chile', coordinates: [-72.02, -34.41] },
  { name: 'Raglan, New Zealand', coordinates: [174.82, -37.81] },
];

export default function SurfMap({ mode }: SurfMapProps) {
  const spots = mode === 'surfed' ? surfedSpots : wishlistSpots;
  const [hoveredSpot, setHoveredSpot] = useState<string | null>(null);
  const [mapPosition, setMapPosition] = useState<{
    coordinates: Coordinates;
    zoom: number;
  }>({
    coordinates: createCoordinates(0, 0),
    zoom: 1,
  });

  const clampZoom = (value: number) =>
    Math.min(6, Math.max(1, Number(value.toFixed(2))));

  const zoomIn = () => {
    setMapPosition((current) => ({
      ...current,
      zoom: clampZoom(current.zoom + 0.4),
    }));
  };

  const zoomOut = () => {
    setMapPosition((current) => ({
      ...current,
      zoom: clampZoom(current.zoom - 0.4),
    }));
  };

  const resetZoom = () => {
    setMapPosition({
      coordinates: createCoordinates(0, 0),
      zoom: 1,
    });
  };

  const getLabelWidth = (name: string): number => {
    const textWidth = Array.from(name).reduce((sum, char) => {
      if (char === ' ') {
        return sum + 3;
      }

      if ('ilI.,'.includes(char)) {
        return sum + 3.8;
      }

      if ('mwMW'.includes(char)) {
        return sum + 8;
      }

      return sum + 6.2;
    }, 0);

    return Math.max(56, Math.ceil(textWidth + 16));
  };

  return (
    <div className="rounded-2xl p-4">
      <div className="mb-3 flex items-center gap-2">
        <button
          type="button"
          className="map-toggle"
          onClick={zoomOut}
          aria-label="Zoom out map"
        >
          -
        </button>
        <button
          type="button"
          className="map-toggle"
          onClick={zoomIn}
          aria-label="Zoom in map"
        >
          +
        </button>
        <button
          type="button"
          className="map-toggle"
          onClick={resetZoom}
        >
          Reset
        </button>
      </div>
      <ComposableMap
        projection="geoEqualEarth"
        width={900}
        height={440}
        style={{ width: '100%', height: 'auto' }}
      >
        <ZoomableGroup
          center={mapPosition.coordinates}
          zoom={mapPosition.zoom}
          minZoom={1}
          maxZoom={6}
          onMoveEnd={(position) => {
            setMapPosition({
              coordinates: createCoordinates(
                position.coordinates[0],
                position.coordinates[1],
              ),
              zoom: clampZoom(position.zoom),
            });
          }}
        >
          <Geographies geography={worldGeo}>
            {({ geographies }) =>
              geographies.map((geo, index) => (
                <Geography
                  key={`${geo.id ?? 'geo'}-${geo.properties?.name ?? 'shape'}-${index}`}
                  geography={geo}
                  fill="var(--map-land)"
                  stroke="var(--map-stroke)"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: 'none' },
                    hover: {
                      outline: 'none',
                      fill: 'var(--map-land-hover)',
                    },
                    pressed: { outline: 'none' },
                  }}
                />
              ))
            }
          </Geographies>
          {spots.map((spot) => {
            const labelWidth = getLabelWidth(spot.name);
            const markerScale = Math.max(
              0.65,
              1 / Math.sqrt(mapPosition.zoom),
            );
            const markerRadius = 7 * markerScale;
            const pulseMinRadius = 10 * markerScale;
            const pulseMaxRadius = 16 * markerScale;
            const pulseBaseRadius = 14 * markerScale;
            const markerStrokeWidth = 2 * markerScale;

            return (
              <Marker
                key={spot.name}
                coordinates={spot.coordinates as unknown as never}
              >
                <g
                  className="map-marker"
                  onMouseEnter={() => setHoveredSpot(spot.name)}
                  onMouseLeave={() =>
                    setHoveredSpot((current) =>
                      current === spot.name ? null : current,
                    )
                  }
                  onFocus={() => setHoveredSpot(spot.name)}
                  onBlur={() =>
                    setHoveredSpot((current) =>
                      current === spot.name ? null : current,
                    )
                  }
                  tabIndex={0}
                >
                  <circle
                    r={markerRadius}
                    fill="var(--color-accent)"
                    stroke="var(--color-bg)"
                    strokeWidth={markerStrokeWidth}
                  />
                  <circle
                    r={pulseBaseRadius}
                    fill="var(--color-accent)"
                    opacity={0.2}
                  >
                    <animate
                      attributeName="r"
                      values={`${pulseMinRadius};${pulseMaxRadius};${pulseMinRadius}`}
                      dur="2.6s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0.28;0.06;0.28"
                      dur="2.6s"
                      repeatCount="indefinite"
                    />
                  </circle>

                  {hoveredSpot === spot.name ? (
                    <g
                      className="map-marker-label"
                      transform="translate(12,-14)"
                    >
                      <rect
                        x={-3}
                        y={-14}
                        rx={5}
                        ry={5}
                        width={labelWidth}
                        height={24}
                      />
                      <text x={5} y={2}>
                        {spot.name}
                      </text>
                    </g>
                  ) : null}
                </g>
                <title>{spot.name}</title>
              </Marker>
            );
          })}
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
}
