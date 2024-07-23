import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function AdminVerListasContent() {
  const [data, setData] = useState([]);
  const [choferes, setChoferes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const gananciasData = JSON.parse(localStorage.getItem('gananciasData')) || [];
    const choferesData = JSON.parse(localStorage.getItem('choferesData')) || [];
    setData(gananciasData);
    setChoferes(choferesData);
  }, []);

  const handleDeleteData = (id) => {
    const updatedData = data.filter(item => item.id !== id);
    setData(updatedData);
    localStorage.setItem('gananciasData', JSON.stringify(updatedData));
  };

  const handleEditData = (id) => {
    const item = data.find(item => item.id === id);
    const chofer = choferes.find(chofer => chofer.id === parseInt(item.choferId, 10));

    if (item && chofer) {
      Swal.fire({
        title: 'Editar Ganancias y Viajes',
        html: `
          <p>Conductor: ${chofer.nombre}</p>
          <p>Unidad: ${chofer.unidad}</p>
          <input type="date" id="fecha" class="swal2-input" value="${item.fecha}">
          <input type="number" id="ganancias" class="swal2-input" value="${item.ganancias}">
          <input type="number" id="viajes" class="swal2-input" value="${item.viajes}">
        `,
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        preConfirm: () => {
          const fecha = document.getElementById('fecha').value;
          const ganancias = document.getElementById('ganancias').value;
          const viajes = document.getElementById('viajes').value;

          if (!fecha || !ganancias || !viajes) {
            Swal.showValidationMessage('Por favor complete todos los campos');
            return null;
          }

          return { fecha, ganancias, viajes };
        }
      }).then((result) => {
        if (result.isConfirmed && result.value) {
          const updatedData = data.map(item =>
            item.id === id ? { ...item, ...result.value } : item
          );
          setData(updatedData);
          localStorage.setItem('gananciasData', JSON.stringify(updatedData));
          Swal.fire('Guardado!', 'Los datos han sido actualizados.', 'success');
        }
      });
    } else {
      Swal.fire('Error', 'No se encontró el conductor o los datos', 'error');
    }
  };

  const calculateTotalGanancias = () => {
    return data.reduce((total, item) => total + parseFloat(item.ganancias || 0), 0);
  };

  const calculateQuincenalPago = () => {
    const totalGanancias = calculateTotalGanancias();
    return totalGanancias * 0.5;
  };

  const handleBack = () => {
    navigate('/optionsadmin'); 
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-400 to-blue-500">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Ver Listas y Ganancias</h2>
        <table className="min-w-full bg-white border mb-6">
          <thead>
            <tr>
              <th className="px-4 py-2 border">ID Conductor</th>
              <th className="px-4 py-2 border">Fecha</th>
              <th className="px-4 py-2 border">Ganancias</th>
              <th className="px-4 py-2 border">Viajes</th>
              <th className="px-4 py-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map(item => (
                <tr key={item.id}>
                  <td className="px-4 py-2 border">{item.choferId}</td>
                  <td className="px-4 py-2 border">{item.fecha}</td>
                  <td className="px-4 py-2 border">{item.ganancias}</td>
                  <td className="px-4 py-2 border">{item.viajes}</td>
                  <td className="px-4 py-2 border text-center">
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded"
                      onClick={() => handleEditData(item.id)}
                    >
                      Editar
                    </button>
                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded ml-2"
                      onClick={() => handleDeleteData(item.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-4 py-2 border text-center" colSpan="5">
                  No hay datos disponibles
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="flex justify-between">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded"
            onClick={handleBack}
          >
            Regresar
          </button>
          <div>
            <p className="text-lg font-bold">Ganancias Quincenales: ${calculateQuincenalPago().toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminVerListasContent;
