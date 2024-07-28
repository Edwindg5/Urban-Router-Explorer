import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

function ChoferesForm({ unidadesDisponibles, onRegister }) {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    password: ''
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

    const { nombre, email, telefono, password } = formData;

    if (!nombre || !email || !telefono || !password) {
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

    const choferData = {
      full_name: nombre,
      email,
      phone: telefono,
      password,
      role_id: 4, 
      created_by: 'denzel',
      updated_by: 'denzel',
      deleted: '0'
    };

    try {
      const response = await axios.post('http://ivy.urbanrouteexplorer.xyz/api/user', choferData);
      Swal.fire({
        icon: 'success',
        title: 'Registrado',
        text: 'El conductor ha sido registrado exitosamente',
        confirmButtonText: 'OK'
      });

      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        password: ''
      });

      onRegister(response.data); // Llama a la función de registro
    } catch (error) {
      console.error('Error registrando chofer:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al registrar el conductor. Por favor, inténtelo de nuevo.',
        confirmButtonText: 'OK'
      });
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
        <label className="block mb-1">Correo Electrónico</label>
        <input 
          type="email" 
          name="email" 
          value={formData.email} 
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
        <label className="block mb-1">Contraseña</label>
        <input 
          type="password" 
          name="password" 
          value={formData.password} 
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
