'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import SectionLayout from '../shared/section-layout';
import { surfedSpots } from '../surf-spots';

const SurfMap = dynamic(() => import('../surf-map'), {
  ssr: false,
});

export default function SurfMapSection() {
  const [mapMode, setMapMode] = useState<'surfed' | 'wishlist'>(
    'surfed',
  );

  return (
    <SectionLayout
      id="surf-map"
      title="My Surf Journey"
      copy="I caught my first wave in Matosinhos in 2021. Since then, surfing has become a constant in my life - I try to get in the water as much as I possibly can, wherever the road takes me. Ideally fully remote, board on the roof, embracing the wipeout."
    >
      <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-[var(--color-text-muted)]">
        <span className="tag-pill">Started in 2021</span>
        <span className="tag-pill">
          Surfed spots: {surfedSpots.length}
        </span>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setMapMode('surfed')}
          className={`map-toggle ${
            mapMode === 'surfed' ? 'map-toggle-active' : ''
          }`}
        >
          Surfed
        </button>
        <button
          type="button"
          onClick={() => setMapMode('wishlist')}
          className={`map-toggle ${
            mapMode === 'wishlist' ? 'map-toggle-active' : ''
          }`}
        >
          Want to surf
        </button>
        <span className="text-sm text-[var(--color-text-muted)]">
          {mapMode === 'surfed'
            ? 'Orange markers indicate visited breaks'
            : 'Orange markers indicate target breaks'}
        </span>
      </div>

      <div className="mt-6">
        <SurfMap mode={mapMode} />
      </div>
    </SectionLayout>
  );
}
