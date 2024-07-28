import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

function UrbansForm({ onRegister }) {
  const [formData, setFormData] = useState({
    vehicle_number: '',
    status: 'En servicio'
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

    const { vehicle_number, status } = formData;

    if (!vehicle_number || !status) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, llene todos los campos',
        confirmButtonText: 'OK'
      });
      return;
    }

    const urbanData = {
      vehicle_number,
      status,
      created_by: 'admin',
      updated_by: 'admin',
      deleted: '0'
    };

    try {
      const response = await axios.post('http://ivy.urbanrouteexplorer.xyz/api/urban', urbanData);
      Swal.fire({
        icon: 'success',
        title: 'Registrado',
        text: 'El vehículo ha sido registrado exitosamente',
        confirmButtonText: 'OK'
      });

      setFormData({
        vehicle_number: '',
        status: 'En servicio'
      });

      onRegister(response.data); // Llama a la función de registro
    } catch (error) {
      console.error('Error registrando vehículo:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al registrar el vehículo. Por favor, inténtelo de nuevo.',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1">Número del Vehículo</label>
        <input 
          type="text" 
          name="vehicle_number" 
          value={formData.vehicle_number} 
          onChange={handleChange} 
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block mb-1">Estado</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="En servicio">En servicio</option>
          <option value="En taller">En taller</option>
          <option value="Fuera de servicio">Fuera de servicio</option>
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

export default UrbansForm;
