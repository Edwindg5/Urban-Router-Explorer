import React, { useState } from 'react';
import Swal from 'sweetalert2';

function ReporteProblemasContent() {
  const [formData, setFormData] = useState({
    descripcion: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentData = {
      ...formData,
      timestamp: new Date().toLocaleString(),
    };
    
    const existingData = JSON.parse(localStorage.getItem('problemasDataList')) || [];
    existingData.push(currentData);
    localStorage.setItem('problemasDataList', JSON.stringify(existingData));

    // Mostrar la alerta de éxito
    Swal.fire({
      icon: 'success',
      title: 'Problema reportado',
      text: 'Se ha enviado el reporte exitosamente',
      confirmButtonText: 'OK'
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-400 to-blue-500">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Reporte de Problemas</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="descripcion" className="block text-sm font-bold mb-2">Descripción del Problema</label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              rows="4"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md">Enviar</button>
        </form>
      </div>
    </div>
  );
}

export default ReporteProblemasContent;
