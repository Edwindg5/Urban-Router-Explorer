import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

function CumplimientoHorario() {
  const [conductores, setConductores] = useState([]);
  const [horarioData, setHorarioData] = useState([]);

  useEffect(() => {
    fetch('http://ivy.urbanrouteexplorer.xyz/api/user')
      .then(response => response.json())
      .then(data => {
        const conductores = data.filter(user => user.role_id === 4);
        setConductores(conductores);
      })
      .catch(error => console.error('Error fetching conductores:', error));
  }, []);

  const handleHorarioChange = (index, field, value) => {
    const newHorarioData = [...horarioData];
    if (!newHorarioData[index]) {
      newHorarioData[index] = { user_id: conductores[index].user_id };
    }
    newHorarioData[index][field] = value;
    setHorarioData(newHorarioData);
  };

  const handleSave = (index) => {
    const now = new Date();
    const horario = horarioData[index];
    const work_date = now.toISOString().split('T')[0];
    const created_by = 'denzel';
    const updated_by = 'denzel';
    const deleted = '0';

    const horarioTrabajoData = {
      user_id: horario.user_id,
      work_date: work_date,
      start_time: horario.start_time,
      end_time: horario.end_time,
      created_by: created_by,
      updated_by: updated_by,
      deleted: deleted,
    };

    fetch('http://ivy.urbanrouteexplorer.xyz/api/horario_trabajo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(horarioTrabajoData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al guardar los datos del horario de trabajo');
      }
      return response.json();
    })
    .then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Datos guardados',
        text: 'La información del horario de trabajo se ha guardado exitosamente',
        confirmButtonText: 'OK'
      });
    })
    .catch(error => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message,
        confirmButtonText: 'OK'
      });
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-400 to-blue-500 flex flex-col items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Choferes y su Cumplimiento de Horario</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Nombre</th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Hora de Entrada</th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Hora de Salida</th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {conductores.map((conductor, index) => (
                <tr key={index} className="even:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200">{conductor.user_id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200">{conductor.full_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200">
                    <input
                      type="time"
                      value={horarioData[index]?.start_time || ''}
                      onChange={(e) => handleHorarioChange(index, 'start_time', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200">
                    <input
                      type="time"
                      value={horarioData[index]?.end_time || ''}
                      onChange={(e) => handleHorarioChange(index, 'end_time', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200">
                    <button
                      onClick={() => handleSave(index)}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
                    >
                      Guardar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 flex justify-center">
          <Link to="/optionschecador" className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300">
            Regresar
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CumplimientoHorario;
