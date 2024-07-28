import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ChoferesForm({ onRegister }) {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    correo: '',
    contraseña: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { nombre, telefono, correo, contraseña } = formData;

    if (!nombre || !telefono || !correo || !contraseña) {
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

    try {
      const response = await axios.post('http://ivy.urbanrouteexplorer.xyz/api/user', {
        full_name: nombre,
        email: correo,
        phone: telefono,
        role_id: 4, // Suponiendo que '1' es el role_id para chofer
        password: contraseña
      });

      if (response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Registrado',
          text: 'El conductor ha sido registrado exitosamente',
          confirmButtonText: 'OK'
        });

        onRegister(formData);
        setFormData({
          nombre: '',
          telefono: '',
          correo: '',
          contraseña: ''
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al registrar el conductor. Intente nuevamente.',
        confirmButtonText: 'OK'
      });
      console.error('Error registering driver:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4"> 
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
      <div className="flex justify-between">
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition duration-300">
          Registrar
        </button>
        <button type="button" onClick={() => navigate(-1)} className="bg-red-500 text-white p-2 rounded hover:bg-red-700 transition duration-300">
          Regresar
        </button>
      </div>
    </form>
  );
}

export default ChoferesForm;
