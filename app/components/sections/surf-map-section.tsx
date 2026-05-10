'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import SectionLayout from '../shared/section-layout';

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
      kicker="Section 3"
      title="Surf Spots Map"
      copy="Toggle between places I have already surfed and spots on my list."
    >
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
