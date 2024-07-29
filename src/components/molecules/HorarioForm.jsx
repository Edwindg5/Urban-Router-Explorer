import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useNotification } from '../atoms/NotificationContext';
import axios from 'axios';

function HorarioForm() {
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const [formData, setFormData] = useState({
    work_date: '',
    start_time: '',
    end_time: '',
    origen: '',
    notas: ''
  });

  const lugares = ['Tuxtla', 'Suchiapa', 'Teran', 'Jobo', 'Copoya'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Guardar en la base de datos
      await axios.post('http://ivy.urbanrouteexplorer.xyz/api/horario_trabajo', {
        work_date: formData.work_date,
        start_time: formData.start_time,
        end_time: formData.end_time,
        created_by: 'denzel',
        updated_by: 'denzel',
        deleted: '0'
      });

      // Guardar origen y notas en local storage
      localStorage.setItem('origen', formData.origen);
      localStorage.setItem('notas', formData.notas);

      Swal.fire({
        icon: 'success',
        title: 'Datos enviados',
        text: 'Se ha enviado la información exitosamente.',
        confirmButtonText: 'OK'
      });

      setFormData({
        work_date: '',
        start_time: '',
        end_time: '',
        origen: '',
        notas: ''
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al enviar los datos. Inténtalo de nuevo más tarde.',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="mb-10">
        <h2 className="text-2xl lg:text-4xl font-bold mb-6">Horario del Conductor</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-lg font-semibold">Fecha del Horario</label>
            <input 
              type="date" 
              name="work_date" 
              value={formData.work_date} 
              onChange={handleChange} 
              className="w-full p-3 border rounded-lg text-lg"
            />
          </div>
          <div>
            <label className="block mb-2 text-lg font-semibold">Hora de Entrada</label>
            <input 
              type="time" 
              name="start_time" 
              value={formData.start_time} 
              onChange={handleChange} 
              className="w-full p-3 border rounded-lg text-lg"
            />
          </div>
          <div>
            <label className="block mb-2 text-lg font-semibold">Hora de Salida</label>
            <input 
              type="time" 
              name="end_time" 
              value={formData.end_time} 
              onChange={handleChange} 
              className="w-full p-3 border rounded-lg text-lg"
            />
          </div>
          <div>
            <label className="block mb-2 text-lg font-semibold">Origen del Viaje</label>
            <select
              name="origen"
              value={formData.origen}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg text-lg"
            >
              <option value="">Seleccione el origen</option>
              {lugares.map((lugar, index) => (
                <option key={index} value={lugar}>{lugar}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-2 text-lg font-semibold">Notas Personales</label>
            <textarea
              name="notas"
              value={formData.notas}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg text-lg h-32"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-6">
        <button type="submit" className="bg-blue-500 text-white p-3 rounded-lg text-lg hover:bg-blue-700 transition duration-300">
          Enviar
        </button>
        <button type="button" onClick={() => navigate('/options')} className="bg-red-500 text-white p-3 rounded-lg text-lg hover:bg-red-700 transition duration-300">
          Regresar
        </button>
      </div>
    </form>
  );
}

export default HorarioForm;
