import React, { useState, useEffect } from 'react';
import image9 from '../../assets/image9.jpeg'
import image11 from '../../assets/image11.jpeg';
import imagen3 from '../../assets/imagen3.jpeg';

function Carousel() {
  const images = [image9, image11, imagen3];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); 
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-96 overflow-hidden rounded-lg shadow-lg">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Imagen ${index + 1}`}
          className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
    </div>
  );
}

export default Carousel;
