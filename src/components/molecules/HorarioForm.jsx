import React, { useState } from 'react';
import Swal from 'sweetalert2';

function HorarioForm() {
  const [formData, setFormData] = useState({
    trabajar: false,
    horaEntrada: '',
    horaSalida: '',
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
    if (!formData.horaEntrada || !formData.horaSalida) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, llene todos los campos',
        confirmButtonText: 'OK'
      });
      return;
    }

    const currentData = {
      ...formData,
      timestamp: new Date().toLocaleString()
    };

    const existingData = JSON.parse(localStorage.getItem('horarioDataList')) || [];
    existingData.push(currentData);
    localStorage.setItem('horarioDataList', JSON.stringify(existingData));

    Swal.fire({
      icon: 'success',
      title: 'Datos enviados',
      text: 'Se ha enviado la información exitosamente',
      confirmButtonText: 'OK'
    });

    setFormData({
      trabajar: false,
      horaEntrada: '',
      horaSalida: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center space-x-2">
        <input 
          type="checkbox" 
          name="trabajar" 
          checked={formData.trabajar} 
          onChange={handleChange} 
          className="form-checkbox"
        />
        <span>Trabajar hoy</span>
      </div>
      <div>
        <label className="block mb-1">Hora de Entrada</label>
        <input 
          type="time" 
          name="horaEntrada" 
          value={formData.horaEntrada} 
          onChange={handleChange} 
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block mb-1">Hora de Salida</label>
        <input 
          type="time" 
          name="horaSalida" 
          value={formData.horaSalida} 
          onChange={handleChange} 
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="flex justify-between">
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition duration-300">
          Enviar
        </button>
        <button type="button" onClick={() => window.location.href = "/options"} className="bg-red-500 text-white p-2 rounded hover:bg-red-700 transition duration-300">
          Regresar
        </button>
      </div>
    </form>
  );
}

export default HorarioForm;
