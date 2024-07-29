import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

function Unidades() {
  const [unidadesData, setUnidadesData] = useState([]);

  useEffect(() => {
    fetch('http://ivy.urbanrouteexplorer.xyz/api/urban')
      .then(response => response.json())
      .then(data => setUnidadesData(data))
      .catch(error => console.error('Error fetching unidades:', error));
  }, []);

  const handlePasajerosChange = (index, value) => {
    const newUnidadesData = [...unidadesData];
    newUnidadesData[index].pasajeros = value;
    setUnidadesData(newUnidadesData);
  };

  const handleSave = (unidad) => {
    const now = new Date();
    const start_time = now.toISOString().split('T')[1].slice(0, 8);
    const end_time = new Date(now.getTime() + 2 * 60 * 60 * 1000).toISOString().split('T')[1].slice(0, 8);
    const trip_date = now.toISOString().split('T')[0];
    const fare = unidad.pasajeros * 20;

    const viajeData = {
      urban_id: unidad.urban_id,
      trip_date: trip_date,
      start_time: start_time,
      end_time: end_time,
      fare: fare,
      created_by: 'denzel',
      updated_by: 'denzel',
      deleted: '0'
    };

    fetch('http://ivy.urbanrouteexplorer.xyz/api/viaje', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(viajeData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al guardar los datos del viaje');
      }
      return response.json();
    })
    .then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Datos guardados',
        text: 'La información del viaje se ha guardado exitosamente',
        confirmButtonText: 'OK'
      });
    })
    .catch(error => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message,
        confirmButtonText: 'OK'
      });
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-400 to-blue-500 flex flex-col items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Unidades Trabajando</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Número de Vehículo</th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Pasajeros</th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {unidadesData.map((unidad, index) => (
                <tr key={index} className="even:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200">{unidad.urban_id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200">{unidad.vehicle_number}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200">
                    <input
                      type="number"
                      min="0"
                      max="16"
                      value={unidad.pasajeros || ''}
                      onChange={(e) => handlePasajerosChange(index, e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200">
                    <button
                      onClick={() => handleSave(unidad)}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
                    >
                      Guardar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 flex justify-center">
          <Link to="/optionschecador" className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300">
            Regresar
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Unidades;
