import React, { useState } from 'react';
import UrbansForm from '../molecules/UrbansForm';

function Urbans() {
  const [urbans, setUrbans] = useState([]);

  const handleRegister = (newUrban) => {
    setUrbans((prevUrbans) => [...prevUrbans, newUrban]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-400 to-blue-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Registrar Vehículo</h2>
        <UrbansForm onRegister={handleRegister} />
      </div>
    </div>
  );
}

export default Urbans;
