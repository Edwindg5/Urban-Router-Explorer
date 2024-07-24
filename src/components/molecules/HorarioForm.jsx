import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useNotification } from '../atoms/NotificationContext';

function HorarioForm() {
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const [formData, setFormData] = useState({
    id: '',
    trabajar: false,
    horaEntrada: '',
    horaSalida: '',
    unidad: '',
    nombre: '',
    reporteGeneral: '',
    reporteFallas: '',
    reporteProblemas: '',
    origen: '',
    destino: ''
  });

  const lugares = ['Tuxtla', 'Suchiapa', 'Teran', 'Jobo', 'Copoya'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
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

    const currentData = {
      ...formData,
      unidad: chofer.unidad,
      nombre: chofer.nombre,
      timestamp: new Date().toLocaleString()
    };

    const existingHorarioData = JSON.parse(localStorage.getItem('horarioDataList')) || [];
    existingHorarioData.push(currentData);
    localStorage.setItem('horarioDataList', JSON.stringify(existingHorarioData));

    const existingReporteData = JSON.parse(localStorage.getItem('reporteDataList')) || [];
    existingReporteData.push(currentData);
    localStorage.setItem('reporteDataList', JSON.stringify(existingReporteData));

    if (formData.reporteProblemas) {
      addNotification(`Nuevo reporte de problemas: ${formData.reporteProblemas}`);
    }

    Swal.fire({
      icon: 'success',
      title: 'Datos enviados',
      text: `Se ha enviado la información exitosamente. Unidad asignada: ${chofer.unidad}`,
      confirmButtonText: 'OK'
    });

    setFormData({
      id: '',
      trabajar: false,
      horaEntrada: '',
      horaSalida: '',
      unidad: '',
      nombre: '',
      reporteGeneral: '',
      reporteFallas: '',
      reporteProblemas: '',
      origen: '',
      destino: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="mb-10">
        <h2 className="text-2xl lg:text-4xl font-bold mb-6">Horario y Unidad</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-lg font-semibold">ID del Conductor</label>
            <input 
              type="text" 
              name="id" 
              value={formData.id} 
              onChange={handleChange} 
              className="w-full p-3 border rounded-lg text-lg"
            />
          </div>
          <div className="flex items-center space-x-3 mt-6">
            <input 
              type="checkbox" 
              name="trabajar" 
              checked={formData.trabajar} 
              onChange={handleChange} 
              className="form-checkbox h-5 w-5"
            />
            <span className="text-lg">Trabajar hoy</span>
          </div>
          <div>
            <label className="block mb-2 text-lg font-semibold">Hora de Entrada</label>
            <input 
              type="time" 
              name="horaEntrada" 
              value={formData.horaEntrada} 
              onChange={handleChange} 
              className="w-full p-3 border rounded-lg text-lg"
            />
          </div>
          <div>
            <label className="block mb-2 text-lg font-semibold">Hora de Salida</label>
            <input 
              type="time" 
              name="horaSalida" 
              value={formData.horaSalida} 
              onChange={handleChange} 
              className="w-full p-3 border rounded-lg text-lg"
            />
          </div>
          {formData.unidad && (
            <div className="mt-6">
              <p className="text-lg font-bold">Unidad Asignada: {formData.unidad}</p>
            </div>
          )}
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
            <label className="block mb-2 text-lg font-semibold">Destino del Viaje</label>
            <select
              name="destino"
              value={formData.destino}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg text-lg"
            >
              <option value="">Seleccione el destino</option>
              {lugares.map((lugar, index) => (
                <option key={index} value={lugar}>{lugar}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-2xl lg:text-4xl font-bold mb-6">Reportes Descriptivos</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-lg font-semibold">Reporte General</label>
            <textarea
              name="reporteGeneral"
              value={formData.reporteGeneral}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg text-lg h-32"
            />
          </div>
          <div>
            <label className="block mb-2 text-lg font-semibold">Reporte de Fallas de la Unidad</label>
            <textarea
              name="reporteFallas"
              value={formData.reporteFallas}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg text-lg h-32"
            />
          </div>
          <div>
            <label className="block mb-2 text-lg font-semibold">Reporte de Problemas en la Autopista/Carretera</label>
            <textarea
              name="reporteProblemas"
              value={formData.reporteProblemas}
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
