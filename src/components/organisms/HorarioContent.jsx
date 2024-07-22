import React from 'react';
import HorarioForm from '../molecules/HorarioForm';

function HorarioContent() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-green-400 to-blue-500 p-4 lg:p-8">
      <div className="relative bg-white p-6 lg:p-10 rounded-lg shadow-lg w-full lg:max-w-6xl">
        <HorarioForm />
      </div>
    </div>
  );
}

export default HorarioContent;
