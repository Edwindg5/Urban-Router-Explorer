import React, { useState, useEffect } from 'react';

function CumplimientoHorario() {
  const [horarioData, setHorarioData] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('horarioDataList')) || [];
    setHorarioData(data);
  }, []);

  return (
    <div>
      <h2>Choferes y su Cumplimiento de Horario</h2>
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border px-4 py-2">Unidad</th>
            <th className="border px-4 py-2">Hora de Entrada</th>
            <th className="border px-4 py-2">Hora de Salida</th>
            <th className="border px-4 py-2">Trabajó Hoy</th>
          </tr>
        </thead>
        <tbody>
          {horarioData.map((horario, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{horario.unidad}</td>
              <td className="border px-4 py-2">{horario.horaEntrada}</td>
              <td className="border px-4 py-2">{horario.horaSalida}</td>
              <td className="border px-4 py-2">{horario.trabajar ? 'Sí' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CumplimientoHorario;
