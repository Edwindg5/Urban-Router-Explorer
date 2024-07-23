import React, { useState } from 'react';
import Swal from 'sweetalert2';

function GananciasContent() {
  const [id, setId] = useState('');
  const [ganancias, setGanancias] = useState('');
  const [choferes, setChoferes] = useState([]);

  useEffect(() => {
    const choferesData = JSON.parse(localStorage.getItem('choferesData')) || [];
    setChoferes(choferesData);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const chofer = choferes.find(c => c.id === parseInt(id, 10));
    if (!chofer) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Conductor no encontrado',
        confirmButtonText: 'OK'
      });
      return;
    }

    const data = {
      id: id,
      ganancias: parseFloat(ganancias),
      timestamp: new Date().toLocaleString()
    };

    const existingData = JSON.parse(localStorage.getItem('gananciasData')) || [];
    existingData.push(data);
    localStorage.setItem('gananciasData', JSON.stringify(existingData));

    Swal.fire({
      icon: 'success',
      title: 'Datos registrados',
      text: `Se han registrado las ganancias exitosamente para ${chofer.nombre}`,
      confirmButtonText: 'OK'
    });

    setId('');
    setGanancias('');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-400 to-blue-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Registrar Ganancias</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">ID del Conductor</label>
            <input 
              type="text" 
              value={id} 
              onChange={(e) => setId(e.target.value)} 
              className="w-full p-3 border rounded-lg text-lg" 
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Ganancias</label>
            <input 
              type="text" 
              value={ganancias} 
              onChange={(e) => setGanancias(e.target.value)} 
              className="w-full p-3 border rounded-lg text-lg" 
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white p-3 rounded-lg text-lg hover:bg-blue-700 transition-colors">
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default GananciasContent;
