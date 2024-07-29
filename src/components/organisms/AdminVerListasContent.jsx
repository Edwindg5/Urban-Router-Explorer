import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

function Reportes() {
  const [reportes, setReportes] = useState([]);
  const [totalGanancia, setTotalGanancia] = useState(0);

  useEffect(() => {
    fetch('http://ivy.urbanrouteexplorer.xyz/api/reporte')
      .then((response) => response.json())
      .then((data) => setReportes(data))
      .catch((error) => console.error('Error fetching reportes:', error));
  }, []);

  const handleDeleteReporte = (reporteId) => {
    fetch(`http://ivy.urbanrouteexplorer.xyz/api/reporte/${reporteId}`, {
      method: 'DELETE',
    })
      .then(() => {
        const updatedReportes = reportes.filter((reporte) => reporte.reporte_id !== reporteId);
        setReportes(updatedReportes);
        Swal.fire('Eliminado', 'El reporte ha sido eliminado', 'success');
      })
      .catch((error) => console.error('Error deleting reporte:', error));
  };

  const handleCalculateGanancia = () => {
    fetch('http://ivy.urbanrouteexplorer.xyz/api/tarifa')
      .then((response) => response.json())
      .then((data) => {
        const total = data.reduce((acc, tarifa) => acc + parseFloat(tarifa.fare_amount || 0), 0);
        setTotalGanancia(total);
      })
      .catch((error) => console.error('Error fetching tarifa:', error));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-400 to-blue-500 flex flex-col items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Reportes</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Reporte ID</th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Fecha de Creación</th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Descripción</th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {reportes.map((reporte) => (
                <tr key={reporte.reporte_id} className="even:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200">{reporte.reporte_id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200">{new Date(reporte.created_at).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200">{reporte.descripcion}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200">
                    <button
                      onClick={() => handleDeleteReporte(reporte.reporte_id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700 transition duration-300"
                    >
                      Borrar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 flex justify-center space-x-4">
          <button
            onClick={handleCalculateGanancia}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300"
          >
            Calcular Ganancia Total
          </button>
          <Link
            to="/optionsadmin"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
          >
            Regresar
          </Link>
        </div>
        <div className="mt-4 text-center">
          <p className="text-lg font-bold">Ganancia Total: ${totalGanancia.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}

export default Reportes;
