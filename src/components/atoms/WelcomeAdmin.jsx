import React from 'react';

function WelcomeAdmin() {
  return (
    <div className="flex flex-col items-center bg-white bg-opacity-50 text-black p-8 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold mb-4">Bienvenido Administrador</h1>
      <p className="text-lg">Seleccione una opción en el panel de la derecha para comenzar.</p>
    </div>
  );
}

export default WelcomeAdmin;
