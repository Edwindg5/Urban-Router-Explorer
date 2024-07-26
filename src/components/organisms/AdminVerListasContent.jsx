import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

function AdminVerListasContent() {
  const [choferes, setChoferes] = useState([]);
  const [totalGanancia, setTotalGanancia] = useState(0);

  useEffect(() => {
    const choferesData = JSON.parse(localStorage.getItem('choferesData')) || [];
    setChoferes(choferesData);
    calculateTotalGanancia(choferesData);
  }, []);

  const calculateTotalGanancia = (choferes) => {
    let total = 0;
    choferes.forEach((chofer) => {
      if (chofer.ganancia) {
        total += chofer.ganancia;
      }
    });
    setTotalGanancia(total);
  };

  const handleEdit = (chofer) => {
    Swal.fire({
      title: 'Editar Conductor',
      html: `
        <input type="text" id="nombre" class="swal2-input" placeholder="Nombre" value="${chofer.nombre}">
        <input type="text" id="telefono" class="swal2-input" placeholder="Teléfono" value="${chofer.telefono}">
        <input type="text" id="unidad" class="swal2-input" placeholder="Unidad" value="${chofer.unidad}">
        <input type="number" id="ganancia" class="swal2-input" placeholder="Ganancia" value="${chofer.ganancia || ''}">
      `,
      preConfirm: () => {
        const nombre = document.getElementById('nombre').value;
        const telefono = document.getElementById('telefono').value;
        const unidad = document.getElementById('unidad').value;
        const ganancia = document.getElementById('ganancia').value;
        if (!nombre || !telefono || !unidad || ganancia === '') {
          Swal.showValidationMessage('Por favor complete todos los campos');
        }
        return { nombre, telefono, unidad, ganancia: parseFloat(ganancia) };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedChofer = { ...chofer, ...result.value };
        const updatedChoferes = choferes.map(c => c.id === chofer.id ? updatedChofer : c);
        setChoferes(updatedChoferes);
        localStorage.setItem('choferesData', JSON.stringify(updatedChoferes));
        calculateTotalGanancia(updatedChoferes);
        Swal.fire('Guardado', 'El conductor ha sido actualizado', 'success');
      }
    });
  };

  const handleShowDetails = (id) => {
    const chofer = choferes.find(c => c.id === id);
    if (chofer) {
      Swal.fire({
        title: 'Detalles del Conductor',
        html: `
          <p><strong>ID:</strong> ${chofer.id}</p>
          <p><strong>Nombre:</strong> ${chofer.nombre}</p>
          <p><strong>Teléfono:</strong> ${chofer.telefono}</p>
          <p><strong>Unidad:</strong> ${chofer.unidad}</p>
          <p><strong>Ganancia:</strong> ${chofer.ganancia}</p>
        `,
        confirmButtonText: 'Cerrar'
      });
    }
  };

  const handleBack = () => {
    // Aquí puedes definir la acción al hacer clic en "Regresar"
    // Por ejemplo, redirigir a otra página o realizar alguna acción específica
    window.history.back(); // Redirige a la página anterior en el historial del navegador
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-400 to-blue-500 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-6">Lista de Conductores</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Unidad</th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Ganancia</th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {choferes.map((chofer) => (
                <tr key={chofer.id} className="even:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200">{chofer.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200">{chofer.unidad}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200">{chofer.ganancia}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200">
                    <button
                      onClick={() => handleEdit(chofer)}
                      className="bg-yellow-500 text-white p-2 rounded mr-2 hover:bg-yellow-700 transition duration-300"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleShowDetails(chofer.id)}
                      className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition duration-300"
                    >
                      Ver Detalles
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200" colSpan="2">Total Ganancia</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200">{totalGanancia}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200"></td>
              </tr>
            </tfoot>
          </table>
        </div>
        <button
          onClick={handleBack}
          className="mt-4 bg-red-500 text-white p-2 rounded hover:bg-red-700 transition duration-300"
        >
          Regresar
        </button>
      </div>
    </div>
  );
}

export default AdminVerListasContent;
