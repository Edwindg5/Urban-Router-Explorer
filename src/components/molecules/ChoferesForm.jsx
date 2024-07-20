import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const unidades = Array.from({ length: 20 }, (_, i) => `Unidad ${i + 1}`);

function ChoferesForm({ onRegister }) {
  const [formData, setFormData] = useState({
    id: '',
    nombre: '',
    telefono: '',
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

    const { id, nombre, telefono } = formData;

    if (!id || !nombre || !telefono) {
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

    const unidadIndex = parseInt(id.charAt(0), 10) % unidades.length;
    const unidad = unidades[unidadIndex];

    const newChofer = {
      ...formData,
      unidad
    };

    const choferesData = JSON.parse(localStorage.getItem('choferesData')) || [];
    choferesData.push(newChofer);
    localStorage.setItem('choferesData', JSON.stringify(choferesData));

    Swal.fire({
      icon: 'success',
      title: 'Registrado',
      text: 'El conductor ha sido registrado exitosamente',
      confirmButtonText: 'OK'
    });

    onRegister(newChofer);

    setFormData({
      id: '',
      nombre: '',
      telefono: '',
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