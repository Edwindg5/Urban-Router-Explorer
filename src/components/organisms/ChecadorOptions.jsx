import React from 'react';
import LinkButtonChecador from '../atoms/LinkButtonChecador';

function ChecadorOptions() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Panel de Checador</h1>
      <div className="flex justify-around">
        <LinkButtonChecador to="/choferes" className="bg-green-600 text-white py-4 px-8 rounded-md hover:bg-green-700 transition duration-300">
          Choferes
        </LinkButtonChecador>
        <LinkButtonChecador to="/urbans" className="bg-blue-600 text-white py-4 px-8 rounded-md hover:bg-blue-700 transition duration-300">
          Urbans
        </LinkButtonChecador>
        <LinkButtonChecador to="/listas" className="bg-purple-600 text-white py-4 px-8 rounded-md hover:bg-purple-700 transition duration-300">
          Listas
        </LinkButtonChecador>
      </div>
    </div>
  );
}

export default ChecadorOptions;