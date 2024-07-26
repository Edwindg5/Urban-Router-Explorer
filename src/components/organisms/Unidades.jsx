import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Unidades() {
  const [unidadesData, setUnidadesData] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('unidades')) || [];
    setUnidadesData(data);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-400 to-blue-500 flex flex-col items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Unidades Trabajando</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Unidad</th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Pasajeros</th>
              </tr>
            </thead>
            <tbody>
              {unidadesData.map((unidad, index) => (
                <tr key={index} className="even:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200">{unidad.nombre}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200">{unidad.pasajeros}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 flex justify-center">
          <Link to="/optionschecador" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Regresar
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Unidades;
