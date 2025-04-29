import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const FallbackImage = ({ 
  src, 
  fallback = "/noimage.png", 
  alt = " ",
  width,
  height,
  ...props 
}) => {
    const [imgSrc, setImgSrc] = useState(src || fallback);
    
    useEffect(() => {
        if (!src) {
            setImgSrc(fallback);
            return;
        }

        const img = new window.Image();
        img.src = src;
        
        img.onload = () => setImgSrc(src);
        img.onerror = () => setImgSrc(fallback);
    }, [src]);

    return (
      <Image
          src={imgSrc}
          alt={alt}
          width={width}
          height={height}
          onError={() => setImgSrc(fallback)} // Additional error handling
          {...props}
      />
    );
}

export default FallbackImage;