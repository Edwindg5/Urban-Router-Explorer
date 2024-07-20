import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function HorarioForm() {
  const [formData, setFormData] = useState({
    id: '',
    trabajar: false,
    horaEntrada: '',
    horaSalida: '',
    unidad: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });

    if (name === 'id') {
      const choferesData = JSON.parse(localStorage.getItem('choferesData')) || [];
      const chofer = choferesData.find((c) => c.id === value);
      setFormData((prevFormData) => ({
        ...prevFormData,
        unidad: chofer ? chofer.unidad : ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.id || !formData.horaEntrada || !formData.horaSalida) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, llene todos los campos',
        confirmButtonText: 'OK'
      });
      return;
    }

    const choferesData = JSON.parse(localStorage.getItem('choferesData')) || [];
    const chofer = choferesData.find((c) => c.id === formData.id);

    if (!chofer) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'ID de conductor no válido',
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
    }).then(() => {
      navigate('/options');
    });

    setFormData({
      id: '',
      trabajar: false,
      horaEntrada: '',
      horaSalida: '',
      unidad: ''
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
      {formData.unidad && (
        <div className="text-lg font-bold mb-4">
          Unidad asignada: {formData.unidad}
        </div>
      )}
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
        <button type="button" onClick={() => navigate('/options')} className="bg-red-500 text-white p-2 rounded hover:bg-red-700 transition duration-300">
          Regresar
        </button>
      </div>
    </form>
  );
}

export default HorarioForm;
