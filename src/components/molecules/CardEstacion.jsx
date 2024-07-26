import React from 'react';
import Image from '../atoms/ImageEstacion';
import Heading from '../atoms/HeadingEstacion';
import Text from '../atoms/TextEstacion';

function CardEstacion({ imageSrc, imageAlt, title, description }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <Image src={imageSrc} alt={imageAlt} className="w-full h-48 object-cover" />
      <div className="p-6">
        <Heading level={2} className="text-2xl font-bold mb-2">{title}</Heading>
        <Text className="text-gray-700">{description}</Text>
      </div>
    </div>
  );
  
}

export default CardEstacion;