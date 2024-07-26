import React from 'react';
import LinkButtonChecador from '../atoms/LinkButtonChecador';

function OptionCardChecador({ title, description, link }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1 hover:scale-105">
      <h3 className="text-xl font-bold mb-4 text-gray-800">{title}</h3>
      <p className="mb-4 text-gray-600">{description}</p>
      <LinkButtonChecador to={link} className="bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
        Ir a {title}
      </LinkButtonChecador>
    </div>
  );
}

export default OptionCardChecador;
