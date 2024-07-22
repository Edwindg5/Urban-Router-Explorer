import React from 'react';
import AdminOptions from '../molecules/AdminOptions';
import WelcomeAdmin from '../atoms/WelcomeAdmin';

function OptionsAdmin() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen bg-gradient-to-b from-green-400 to-blue-500 p-4 text-white">
      <div className="flex justify-center items-center p-4">
        <WelcomeAdmin />
      </div>
      <div className="flex flex-col items-center p-4">
        <h1 className="text-3xl font-bold mb-6">Opciones del Administrador</h1>
        <AdminOptions />
      </div>
    </div>
  );
}

export default OptionsAdmin;
