import Image from 'next/image';

interface MoviePosterProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
}

export default function MoviePoster({ src, alt, className, sizes }: MoviePosterProps) {
  const imageSrc = src && src !== 'N/A' ? src : '/placeholder-movie.svg';

  return (
    <Image
      src={imageSrc}
      alt={alt}
      fill
      className={className}
      sizes={sizes}
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.src = '/placeholder-movie.svg';
      }}
    />
  );
}