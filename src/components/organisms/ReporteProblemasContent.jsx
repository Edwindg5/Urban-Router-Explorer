import React, { useState } from 'react';
import { useNotification } from '../atoms/NotificationContext';

const ReporteProblemasContent = () => {
    const [problemas, setProblemas] = useState('');
    const { addNotification } = useNotification();
  
    const handleSubmit = (e) => {
      e.preventDefault();
      addNotification(`Nuevo problema reportado: ${problemas}`);
      setProblemas('');
    };
  
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Reporte de Problemas en la Autopista/Carretera</h2>
          <textarea
            value={problemas}
            onChange={(e) => setProblemas(e.target.value)}
            className="w-full p-3 border rounded-lg mb-4"
            placeholder="Describe el problema..."
          />
          <button type="submit" className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300">
            Enviar Reporte
          </button>
        </form>
      </div>
    );
  };
export default ReporteProblemasContent;
