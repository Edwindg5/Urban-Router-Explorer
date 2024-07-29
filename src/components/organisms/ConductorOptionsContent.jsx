import React from 'react';
import Option from '../molecules/Option';

function ConductorOptionsContent() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-green-400 to-blue-500">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">MENU CONDUCTOR</h2>
        <div className="flex flex-col items-center">
          <Option to="/horario" label="Horario" />
          <Option to="/reporte" label="Reportes" />
          <Option to="/ganancias" label="Tarifa" />
        </div>
      </div>
    </div>
  );
}

export default ConductorOptionsContent;
