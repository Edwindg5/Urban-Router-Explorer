import React, { useState } from 'react';
import Swal from 'sweetalert2';

function ReporteHorario() {
  const [formData, setFormData] = useState({
    id: '',
    trabajar: false,
    horaEntrada: '',
    horaSalida: '',
    unidad: '',
    nombre: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
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
      unidad: chofer.unidad,
      nombre: chofer.nombre,
      timestamp: new Date().toLocaleString()
    };

    const existingData = JSON.parse(localStorage.getItem('horarioDataList')) || [];
    existingData.push(currentData);
    localStorage.setItem('horarioDataList', JSON.stringify(existingData));

    Swal.fire({
      icon: 'success',
      title: 'Datos enviados',
      text: `Se ha enviado la información exitosamente. Unidad asignada: ${chofer.unidad}`,
      confirmButtonText: 'OK'
    });

    setFormData({
      id: '',
      trabajar: false,
      horaEntrada: '',
      horaSalida: '',
      unidad: '',
      nombre: '',
    });
  };

  return (
    <div className="bg-white p-6 lg:p-10 rounded-lg shadow-lg w-full">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-bold mb-6">Horario de control</h2>
        <div>
          <label className="block mb-2 text-lg font-semibold">ID del Conductor</label>
          <input 
            type="text" 
            name="id" 
            value={formData.id} 
            onChange={handleChange} 
            className="w-full p-3 border rounded-lg text-lg"
          />
        </div>
        <div className="flex items-center space-x-3 mt-6">
          <input 
            type="checkbox" 
            name="trabajar" 
            checked={formData.trabajar} 
            onChange={handleChange} 
            className="form-checkbox h-5 w-5"
          />
          <span className="text-lg">Trabajar hoy</span>
        </div>
        <div className="mt-6">
          <label className="block mb-2 text-lg font-semibold">Hora de Entrada</label>
          <input 
            type="time" 
            name="horaEntrada" 
            value={formData.horaEntrada} 
            onChange={handleChange} 
            className="w-full p-3 border rounded-lg text-lg"
          />
        </div>
        <div className="mt-6">
          <label className="block mb-2 text-lg font-semibold">Hora de Salida</label>
          <input 
            type="time" 
            name="horaSalida" 
            value={formData.horaSalida} 
            onChange={handleChange} 
            className="w-full p-3 border rounded-lg text-lg"
          />
        </div>
        {formData.unidad && (
          <div className="mt-6">
            <p className="text-lg font-bold">Unidad Asignada: {formData.unidad}</p>
          </div>
        )}
        <button type="submit" className="bg-blue-500 text-white p-3 rounded-lg text-lg hover:bg-blue-700 transition duration-300">
          Enviar
        </button>
      </form>
    </div>
  );
}

export default ReporteHorario;
