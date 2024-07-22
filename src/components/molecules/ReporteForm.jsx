import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function ReporteForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: '',
    reporteDescriptivo: '',
    reporteFallas: '',
    reporteProblemas: '',
    origen: '',
    destino: '',
  });

  const lugares = ['Tuxtla', 'Suchiapa', 'Teran', 'Jobo', 'Copoya'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const choferesData = JSON.parse(localStorage.getItem('choferesData')) || [];
    const chofer = choferesData.find(c => c.id === formData.id);

    if (!chofer) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Conductor no encontrado',
        confirmButtonText: 'OK'
      });
      return;
    }

    const currentData = {
      ...formData,
      nombre: chofer.nombre,
      timestamp: new Date().toLocaleString()
    };

    const existingData = JSON.parse(localStorage.getItem('reporteDataList')) || [];
    existingData.push(currentData);
    localStorage.setItem('reporteDataList', JSON.stringify(existingData));

    Swal.fire({
      icon: 'success',
      title: 'Reporte enviado',
      text: 'Se ha enviado el reporte exitosamente',
      confirmButtonText: 'OK'
    });

    setFormData({
      id: '',
      reporteDescriptivo: '',
      reporteFallas: '',
      reporteProblemas: '',
      origen: '',
      destino: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1">ID del Conductor</label>
        <input 
          type="text" 
          name="id" 
          value={formData.id} 
          onChange={handleChange} 
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block mb-1">Reporte Descriptivo</label>
        <textarea 
          name="reporteDescriptivo" 
          value={formData.reporteDescriptivo} 
          onChange={handleChange} 
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block mb-1">Reporte de Fallas de la Unidad</label>
        <textarea 
          name="reporteFallas" 
          value={formData.reporteFallas} 
          onChange={handleChange} 
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block mb-1">Reporte de Problemas en la Carretera</label>
        <textarea 
          name="reporteProblemas" 
          value={formData.reporteProblemas} 
          onChange={handleChange} 
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block mb-1">Origen</label>
        <select 
          name="origen" 
          value={formData.origen} 
          onChange={handleChange} 
          className="w-full p-2 border rounded"
        >
          <option value="">Seleccione un lugar</option>
          {lugares.map((lugar, index) => (
            <option key={index} value={lugar}>{lugar}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block mb-1">Destino</label>
        <select 
          name="destino" 
          value={formData.destino} 
          onChange={handleChange} 
          className="w-full p-2 border rounded"
        >
          <option value="">Seleccione un lugar</option>
          {lugares.map((lugar, index) => (
            <option key={index} value={lugar}>{lugar}</option>
          ))}
        </select>
      </div>
      <div className="flex justify-between">
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition duration-300">
          Enviar
        </button>
        <button type="button" onClick={() => navigate('/options')} className="bg-red-500 text-white p-2 rounded hover:bg-red-700 transition duration-300">
          Regresar
        </button>
      </div>
    </form>
  );
}

export default ReporteForm;
