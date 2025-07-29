import { useState, useEffect } from 'react';

interface SEOOptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  sizes?: string;
  srcSet?: string;
}

const SEOOptimizedImage = ({ 
  src, 
  alt, 
  width, 
  height, 
  className = "", 
  loading = "lazy",
  priority = false,
  sizes,
  srcSet
}: SEOOptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [webpSrc, setWebpSrc] = useState('');
  const [avifSrc, setAvifSrc] = useState('');

  useEffect(() => {
    // Generate WebP and AVIF versions
    const generateFormats = () => {
      const baseSrc = src.replace(/\.(jpg|jpeg|png)$/i, '');
      const extension = src.match(/\.(jpg|jpeg|png)$/i)?.[0] || '';
      
      setWebpSrc(`${baseSrc}.webp`);
      setAvifSrc(`${baseSrc}.avif`);
    };

    generateFormats();
  }, [src]);

  // Generate responsive srcSet if not provided
  const generateSrcSet = (baseSrc: string) => {
    if (srcSet) return srcSet;
    if (!width) return '';
    
    const sizes = [0.5, 1, 1.5, 2];
    return sizes
      .map(scale => {
        const scaledWidth = Math.round(width * scale);
        return `${baseSrc.replace(/\.(jpg|jpeg|png|webp|avif)$/i, `_${scaledWidth}w.$1`)} ${scaledWidth}w`;
      })
      .join(', ');
  };

  return (
    <picture className={className}>
      {/* AVIF format for modern browsers */}
      <source 
        srcSet={generateSrcSet(avifSrc) || avifSrc} 
        type="image/avif" 
        sizes={sizes}
      />
      
      {/* WebP format for broader support */}
      <source 
        srcSet={generateSrcSet(webpSrc) || webpSrc} 
        type="image/webp" 
        sizes={sizes}
      />
      
      {/* Fallback to original format */}
      <img
        src={src}
        srcSet={generateSrcSet(src)}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : loading}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        sizes={sizes}
        className={`${className} ${!isLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setHasError(true);
          setIsLoaded(true);
        }}
        style={{
          aspectRatio: width && height ? `${width}/${height}` : undefined,
          objectFit: 'cover',
          maxWidth: '100%',
          height: 'auto'
        }}
      />
      
      {/* Loading placeholder */}
      {!isLoaded && !hasError && (
        <div 
          className="flex items-center justify-center bg-muted animate-pulse absolute inset-0"
          style={{ 
            aspectRatio: width && height ? `${width}/${height}` : undefined
          }}
        >
          <div className="text-muted-foreground text-sm">Loading...</div>
        </div>
      )}
      
      {/* Error fallback */}
      {hasError && (
        <div 
          className="flex items-center justify-center bg-muted border border-border"
          style={{ 
            width: width || '100%', 
            height: height || 'auto',
            aspectRatio: width && height ? `${width}/${height}` : undefined
          }}
        >
          <div className="text-muted-foreground text-sm">Image unavailable</div>
        </div>
      )}
    </picture>
  );
};

export default SEOOptimizedImage;