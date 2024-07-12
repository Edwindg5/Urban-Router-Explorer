import React from 'react';
import ButtonOptions from '../atoms/ButtonOptions';

function TallerContent() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-400 to-blue-500">
      <h1 className="text-3xl font-bold mb-6">Taller</h1>
      <ButtonOptions to="/options">Regresar</ButtonOptions>
    </div>
  );
}

export default TallerContent;