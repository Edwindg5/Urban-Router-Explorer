import React, { useState } from 'react';

function Card({ image, info }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="cursor-pointer p-4 bg-gradient-to-r from-green-400 via-blue-500 to-green-400 text-white rounded-md shadow-md transform transition-transform hover:scale-105 w-full"
      onClick={() => setExpanded(!expanded)}
    >
      <img src={image} alt="Card" className="w-full h-48 object-cover mb-4 rounded-md" />
      <div className={`transition-all duration-300 ${expanded ? 'max-h-full' : 'max-h-12 overflow-hidden'}`}>
        {info}
      </div>
      {expanded && <div className="mt-4">{info}</div>}
    </div>
  );
}

export default Card;
