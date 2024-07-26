import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

function GananciasContent() {
  const [formData, setFormData] = useState({
    id: '',
    ganancia: '',
    horas: '',
    fecha: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleRegisterGanancia = (e) => {
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

    const newGanancia = { ...formData, nombre: chofer.nombre };
    chofer.ganancias = chofer.ganancias || [];
    chofer.ganancias.push(newGanancia);

    const updatedChoferesData = choferesData.map(c => c.id === chofer.id ? chofer : c);
    localStorage.setItem('choferesData', JSON.stringify(updatedChoferesData));

    setFormData({
      id: '',
      ganancia: '',
      horas: '',
      fecha: ''
    });

    Swal.fire({
      icon: 'success',
      title: 'Ganancia registrada',
      text: 'La ganancia ha sido registrada exitosamente',
      confirmButtonText: 'OK'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-400 to-blue-500 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Registrar Ganancia</h2>
        <form onSubmit={handleRegisterGanancia}>
          <div className="mb-4">
            <label htmlFor="id" className="block text-gray-700 font-bold mb-2">ID de Conductor:</label>
            <input
              type="text"
              id="id"
              name="id"
              value={formData.id}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="ganancia" className="block text-gray-700 font-bold mb-2">Ganancia:</label>
            <input
              type="number"
              id="ganancia"
              name="ganancia"
              value={formData.ganancia}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="horas" className="block text-gray-700 font-bold mb-2">Horas Trabajadas:</label>
            <input
              type="number"
              id="horas"
              name="horas"
              value={formData.horas}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="fecha" className="block text-gray-700 font-bold mb-2">Fecha:</label>
            <input
              type="date"
              id="fecha"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-700 transition duration-300"
          >
            Registrar Ganancia
          </button>
        </form>
      </div>
    </div>
  );
}

export default GananciasContent;
