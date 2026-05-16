'use client';

export default function LocationPulse() {
  const locationLabel =
    'Based in Stuttgart, DE. Full-Time at Mercedes-Benz AG, freelancing for Hochkonzept.';

  return (
    <p className="location-pulse" aria-label={locationLabel}>
      <span className="location-pulse-dot" aria-hidden="true" />
      <span>
        Based in Stuttgart, DE. Full-Time at Mercedes-Benz AG,
        freelancing for{' '}
        <a
          href="https://hochkonzept.de"
          target="_blank"
          rel="noreferrer"
          className="anchor-link"
        >
          Hochkonzept
        </a>
        .
      </span>
    </p>
  );
}
