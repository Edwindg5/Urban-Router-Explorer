import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import ButtonOptions from '../atoms/ButtonOptions';

function ReporteForm() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    report_date: '',
    descripcion: '',
    trip_date: '',
    start_time: '',
    end_time: '',
    fare: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    for (const key in formData) {
      if (formData[key] === '') {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `El campo ${key} no puede estar vacío`,
          confirmButtonText: 'OK'
        });
        return;
      }
    }

    const reportData = {
      report_date: formData.report_date,
      descripcion: formData.descripcion,
      created_by: 'denzel',
      updated_by: 'denzel',
      deleted: '0'
    };

    const tripData = {
      trip_date: formData.trip_date,
      start_time: formData.start_time,
      end_time: formData.end_time,
      fare: formData.fare,
      created_by: 'denzel',
      updated_by: 'denzel',
      deleted: '0'
    };

    try {
      // Send report data to API
      const reportResponse = await fetch('http://ivy.urbanrouteexplorer.xyz/api/reporte', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reportData)
      });

      if (!reportResponse.ok) {
        throw new Error('Error al enviar el reporte');
      }

      // Send trip data to API
      const tripResponse = await fetch('http://ivy.urbanrouteexplorer.xyz/api/viaje', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(tripData)
      });

      if (!tripResponse.ok) {
        throw new Error('Error al enviar el viaje');
      }

      Swal.fire({
        icon: 'success',
        title: 'Datos enviados',
        text: 'La información se ha enviado exitosamente',
        confirmButtonText: 'OK'
      });

      setFormData({
        report_date: '',
        descripcion: '',
        trip_date: '',
        start_time: '',
        end_time: '',
        fare: ''
      });

      navigate('/options');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message,
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-400 to-blue-500">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Reporte del Conductor</h2>
          <ButtonOptions to="/options" className="bg-red-500 text-white p-2 rounded">Regresar</ButtonOptions>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block mb-2 text-lg font-semibold">Fecha del Reporte</label>
              <input
                type="date"
                name="report_date"
                value={formData.report_date}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg text-lg"
              />
            </div>
            <div>
              <label className="block mb-2 text-lg font-semibold">Descripción del Reporte</label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg text-lg"
              />
            </div>
            <div>
              <label className="block mb-2 text-lg font-semibold">Fecha del Viaje</label>
              <input
                type="date"
                name="trip_date"
                value={formData.trip_date}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg text-lg"
              />
            </div>
            <div>
              <label className="block mb-2 text-lg font-semibold">Hora de Inicio</label>
              <input
                type="time"
                name="start_time"
                value={formData.start_time}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg text-lg"
              />
            </div>
            <div>
              <label className="block mb-2 text-lg font-semibold">Hora de Finalización</label>
              <input
                type="time"
                name="end_time"
                value={formData.end_time}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg text-lg"
              />
            </div>
            <div>
              <label className="block mb-2 text-lg font-semibold">Cantidad de Pasajeros</label>
              <input
                type="number"
                name="fare"
                max="16"
                value={formData.fare}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg text-lg"
              />
            </div>
          </div>
          <div className="flex justify-between">
            <button type="submit" className="bg-blue-500 text-white p-3 rounded-lg text-lg hover:bg-blue-700 transition duration-300">
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReporteForm;
