import React from 'react';
import HorarioForm from '../molecules/HorarioForm';

function HorarioContent() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-400 to-blue-500">
      <div className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Horario y Unidad</h2>
        </div>
        <HorarioForm />
      </div>
    </div>
  );
}

export default HorarioContent;
