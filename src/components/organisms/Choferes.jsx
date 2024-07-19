import React, { useState } from 'react';
import ChoferesForm from '../molecules/ChoferesForm';

function Choferes() {
  const [choferes, setChoferes] = useState(JSON.parse(localStorage.getItem('choferes')) || []);

  const handleRegister = (chofer) => {
    const newChoferes = [...choferes, chofer];
    setChoferes(newChoferes);
    localStorage.setItem('choferes', JSON.stringify(newChoferes));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-400 to-blue-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Registrar Chofer</h2>
        <ChoferesForm onRegister={handleRegister} />
      </div>
    </div>
  );
}

export default Choferes;