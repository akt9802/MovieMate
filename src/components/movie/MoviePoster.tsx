'use client';

import Image from 'next/image';
import { useState } from 'react';

interface MoviePosterProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
}

export default function MoviePoster({ src, alt, className, sizes }: MoviePosterProps) {
  const [imageSrc, setImageSrc] = useState(src);

  const handleError = () => {
    setImageSrc('/placeholder-movie.svg');
  };

  return (
    <Image
      src={imageSrc}
      alt={alt}
      fill
      className={className}
      sizes={sizes}
      onError={handleError}
    />
  );
}