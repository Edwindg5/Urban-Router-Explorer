import React, { useState } from 'react';
import Swal from 'sweetalert2';
import HorarioForm from '../molecules/HorarioForm';

function HorarioContent() {
  const [formData, setFormData] = useState({
    trabajar: false,
    horaEntrada: '',
    horaSalida: '',
    unidad: ''
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
    const currentData = {
      ...formData,
      timestamp: new Date().toLocaleString()
    };
    
    const existingData = JSON.parse(localStorage.getItem('horarioDataList')) || [];
    existingData.push(currentData);
    localStorage.setItem('horarioDataList', JSON.stringify(existingData));

    // Mostrar la alerta de éxito
    Swal.fire({
      icon: 'success',
      title: 'Datos enviados',
      text: 'Se ha enviado la información exitosamente',
      confirmButtonText: 'OK'
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-400 to-blue-500">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Horario</h2>
        <HorarioForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
      </div>
    </div>
  );
}

export default HorarioContent;
