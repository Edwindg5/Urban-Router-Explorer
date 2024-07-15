import React from 'react';
import { Link } from 'react-router-dom';

function ButtonLinkAdmin({ to, image, children }) {
  return (
    <Link
      to={to}
      className="flex flex-col items-center bg-gray-200 rounded-lg shadow-md hover:bg-gray-300 transition duration-300 p-4"
    >
      <img src={image} alt={children} className="w-24 h-24 mb-2" />
      <span className="text-black font-bold">{children}</span>
    </Link>
  );
}

export default ButtonLinkAdmin;
