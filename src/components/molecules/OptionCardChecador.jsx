import React from 'react';
import LinkButtonChecador from '../atoms/LinkButtonChecador';

function OptionCardChecador({ title, description, link }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="mb-4">{description}</p>
      <LinkButtonChecador to={link} className="bg-blue-600 text-white hover:bg-blue-700">
        Ir a {title}
      </LinkButtonChecador>
    </div>
  );
}

export default OptionCardChecador;