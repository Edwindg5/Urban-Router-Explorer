import React, { useState, useEffect } from 'react';
import ChoferesForm from '../molecules/ChoferesForm';

function Choferes() {
  const [choferes, setChoferes] = useState(JSON.parse(localStorage.getItem('choferesData')) || []);
  const [unidadesDisponibles, setUnidadesDisponibles] = useState([]);

  useEffect(() => {
    const unidades = [];
    for (let i = 1; i <= 20; i++) {
      unidades.push(`Unidad ${i}`);
    }
    setUnidadesDisponibles(unidades);
  }, []);

  

  const handleRegister = (chofer) => {
    const newChofer = { ...chofer, id: Date.now() };
    const newChoferes = [...choferes, newChofer];
    setChoferes(newChoferes);
    localStorage.setItem('choferesData', JSON.stringify(newChoferes));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-400 to-blue-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Registrar Chofer</h2>
        <ChoferesForm onRegister={handleRegister} unidadesDisponibles={unidadesDisponibles} />
      </div>
    </div>
  );
}

export default Choferes;
