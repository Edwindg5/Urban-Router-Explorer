import React, { useState } from 'react';

function Card({ image, info }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="cursor-pointer p-4 bg-gradient-to-r from-green-400 via-blue-500 to-green-400 text-white rounded-md"
      onClick={() => setExpanded(!expanded)}
    >
      <img src={image} alt="Card" className="w-full h-24 object-cover mb-2 rounded-md" />
      {expanded && <div className="mt-2">{info}</div>}
    </div>
  );
}

export default Card;
