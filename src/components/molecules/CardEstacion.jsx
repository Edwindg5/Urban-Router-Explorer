import React from 'react';

function CardEstacion({ imageSrc, imageAlt, title, description }) {
  return (
    <div className="bg-white bg-opacity-30 text-black p-4 rounded-lg shadow-lg">
      <img src={imageSrc} alt={imageAlt} className="w-full h-48 object-cover rounded-lg mb-4" />
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default CardEstacion;
