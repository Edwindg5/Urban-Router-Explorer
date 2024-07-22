import React, { useState } from 'react';
import Swal from 'sweetalert2';

function ReporteDescriptivo() {
  const [formData, setFormData] = useState({
    reporteGeneral: '',
    reporteFallas: '',
    reporteProblemas: '',
    origen: '',
    destino: ''
  });

  const lugares = ['Tuxtla', 'Suchiapa', 'Teran', 'Jobo', 'Copoya'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingData = JSON.parse(localStorage.getItem('reporteDataList')) || [];
    existingData.push(formData);
    localStorage.setItem('reporteDataList', JSON.stringify(existingData));

    Swal.fire({
      icon: 'success',
      title: 'Reporte Enviado',
      text: 'El reporte ha sido enviado exitosamente.',
      confirmButtonText: 'OK'
    });

    setFormData({
      reporteGeneral: '',
      reporteFallas: '',
      reporteProblemas: '',
      origen: '',
      destino: ''
    });
  };

  return (
    <div className="bg-white p-6 lg:p-10 rounded-lg shadow-lg w-full">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-bold mb-6">Reportes</h2>
        <div className="mt-6">
          <label className="block mb-2 text-lg font-semibold">Reporte General</label>
          <textarea
            name="reporteGeneral"
            value={formData.reporteGeneral}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg text-lg h-32"
          />
        </div>
        <div className="mt-6">
          <label className="block mb-2 text-lg font-semibold">Reporte de Fallas de la Unidad</label>
          <textarea
            name="reporteFallas"
            value={formData.reporteFallas}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg text-lg h-32"
          />
        </div>
        <div className="mt-6">
          <label className="block mb-2 text-lg font-semibold">Reporte de Problemas en la Autopista/Carretera</label>
          <textarea
            name="reporteProblemas"
            value={formData.reporteProblemas}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg text-lg h-32"
          />
        </div>
        <div className="mt-6">
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
        <div className="mt-6">
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
        <button type="submit" className="bg-blue-500 text-white p-3 rounded-lg text-lg hover:bg-blue-700 transition duration-300">
          Enviar Reporte
        </button>
      </form>
    </div>
  );
}

export default ReporteDescriptivo;
