import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function ChoferesForm({ unidadesDisponibles }) {
  const [formData, setFormData] = useState({
    id: '',
    nombre: '',
    telefono: '',
    correo: '',
    contraseña: '',
    unidad: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { id, nombre, telefono, correo, contraseña, unidad } = formData;

    if (!id || !nombre || !telefono || !correo || !contraseña || !unidad) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, llene todos los campos',
        confirmButtonText: 'OK'
      });
      return;
    }

    if (!/^\d{10}$/.test(telefono)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El número telefónico debe tener 10 dígitos',
        confirmButtonText: 'OK'
      });
      return;
    }

    const choferesData = JSON.parse(localStorage.getItem('choferesData')) || [];
    const choferesPorUnidad = choferesData.filter(chofer => chofer.unidad === unidad);

    if (choferesPorUnidad.length >= 2) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Cada unidad solo puede tener 2 conductores',
        confirmButtonText: 'OK'
      });
      return;
    }

    choferesData.push(formData);
    localStorage.setItem('choferesData', JSON.stringify(choferesData));

    Swal.fire({
      icon: 'success',
      title: 'Registrado',
      text: 'El conductor ha sido registrado exitosamente',
      confirmButtonText: 'OK'
    });

    setFormData({
      id: '',
      nombre: '',
      telefono: '',
      correo: '',
      contraseña: '',
      unidad: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 "> 
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
        <label className="block mb-1">Nombre Completo</label>
        <input 
          type="text" 
          name="nombre" 
          value={formData.nombre} 
          onChange={handleChange} 
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block mb-1">Número Telefónico</label>
        <input 
          type="text" 
          name="telefono" 
          value={formData.telefono} 
          onChange={handleChange} 
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block mb-1">Correo Electrónico</label>
        <input 
          type="email" 
          name="correo" 
          value={formData.correo} 
          onChange={handleChange} 
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block mb-1">Contraseña</label>
        <input 
          type="password" 
          name="contraseña" 
          value={formData.contraseña} 
          onChange={handleChange} 
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block mb-1">Unidad</label>
        <select 
          name="unidad" 
          value={formData.unidad} 
          onChange={handleChange} 
          className="w-full p-2 border rounded"
        >
          <option value="">Seleccione una unidad</option>
          {unidadesDisponibles.map((unidad, index) => (
            <option key={index} value={unidad}>{unidad}</option>
          ))}
        </select>
      </div>
      <div className="flex justify-between">
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition duration-300">
          Registrar
        </button>
        <button type="button" onClick={() => navigate('/optionsadmin')} className="bg-red-500 text-white p-2 rounded hover:bg-red-700 transition duration-300">
          Regresar
        </button>
      </div>
    </form>
  );
}

export default ChoferesForm;
