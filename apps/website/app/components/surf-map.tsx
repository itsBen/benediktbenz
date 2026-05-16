'use client';

import { useEffect, useMemo } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import {
  surfedSpotsExtractedAt,
  surfedSpots,
  type Spot,
  wishlistSurfSpots,
} from './surf-spots';

type SurfMapProps = {
  mode: 'surfed' | 'wishlist';
};

export default function SurfMap({ mode }: SurfMapProps) {
  const spots = useMemo(
    () => (mode === 'surfed' ? surfedSpots : wishlistSurfSpots),
    [mode],
  );

  const defaultCenter: [number, number] = [18, 6];
  const defaultZoom = 2;

  const markerIcon = useMemo(
    () =>
      L.divIcon({
        className: 'surf-marker-wrapper',
        html: '<span class="surf-marker-dot" aria-hidden="true"></span>',
        iconSize: [18, 18],
        iconAnchor: [9, 9],
      }),
    [],
  );

  const clusterIcon = useMemo(
    () =>
      ((cluster: L.MarkerCluster) =>
        L.divIcon({
          html: `<span>${cluster.getChildCount()}</span>`,
          className: 'surf-cluster-icon',
          iconSize: [34, 34],
        })) as L.MarkerClusterGroupOptions['iconCreateFunction'],
    [],
  );

  return (
    <div className="rounded-2xl p-4">
      <MapContainer
        className="surf-leaflet-map"
        center={defaultCenter}
        zoom={defaultZoom}
        minZoom={2}
        maxZoom={12}
        worldCopyJump
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <TileLayer
          attribution='<a href="https://www.openaip.net/">openAIP Data</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-NC-SA</a>)'
          url="https://{s}.tile.maps.openaip.net/geowebcache/service/tms/1.0.0/openaip_basemap@EPSG%3A900913@png/{z}/{x}/{y}.{ext}"
          ext="png"
        />
        <MarkerClusterLayer
          spots={spots}
          markerIcon={markerIcon}
          clusterIcon={clusterIcon}
        />
      </MapContainer>
      <p className="mt-3 text-xs italic text-[var(--color-text-muted)]">
        I am tracking my surfspots via Garmin, last updated at{' '}
        {surfedSpotsExtractedAt.toLocaleString('en-GB', {
          timeZone: 'UTC',
          dateStyle: 'medium',
          timeStyle: 'short',
        })}{' '}
        UTC
      </p>
    </div>
  );
}

function MarkerClusterLayer({
  spots,
  markerIcon,
  clusterIcon,
}: {
  spots: Spot[];
  markerIcon: L.DivIcon;
  clusterIcon: L.MarkerClusterGroupOptions['iconCreateFunction'];
}) {
  const map = useMap();

  useEffect(() => {
    let isMounted = true;
    let clusterGroup: L.MarkerClusterGroup | null = null;

    const loadAndRenderClusters = async () => {
      await import('leaflet.markercluster');

      if (!isMounted) {
        return;
      }

      clusterGroup = L.markerClusterGroup({
        showCoverageOnHover: false,
        removeOutsideVisibleBounds: true,
        spiderfyOnMaxZoom: true,
        maxClusterRadius: 40,
        iconCreateFunction: clusterIcon,
      });

      spots.forEach((spot) => {
        const marker = L.marker([spot.latitude, spot.longitude], {
          icon: markerIcon,
          title: spot.name,
        });

        marker.bindTooltip(spot.name, {
          direction: 'top',
          offset: [0, -14],
          className: 'surf-tooltip',
        });

        clusterGroup?.addLayer(marker);
      });

      map.addLayer(clusterGroup);
    };

    void loadAndRenderClusters();

    return () => {
      isMounted = false;

      if (clusterGroup) {
        map.removeLayer(clusterGroup);
      }
    };
  }, [map, spots, markerIcon, clusterIcon]);

  return null;
}
