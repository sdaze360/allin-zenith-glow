import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
}

export function Logo({ className = '' }: LogoProps) {
  const candidates = ['/brandlogo.png', '/logo.svg', '/logo.png', '/logo.jpg', '/favicon.png'];
  const [src, setSrc] = useState<string>(candidates[0]);
  const [index, setIndex] = useState<number>(0);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const next = index + 1;
    if (next < candidates.length) {
      setIndex(next);
      setSrc(candidates[next]);
    }
  };

  return (
    <Link to="/" className={`relative flex items-center ${className} hover:opacity-80 transition-opacity`}>
      <img
        src={src}
        onError={handleError}
        alt="All In International Production"
        className="w-12 h-12 object-contain"
      />
      <span className="ml-3 text-xl font-light whitespace-nowrap">
        All In International
      </span>
    </Link>
  );
}