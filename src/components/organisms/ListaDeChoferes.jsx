import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function ListaDeChoferes() {
  const navigate = useNavigate();
  const [choferes, setChoferes] = useState(JSON.parse(localStorage.getItem('choferesData')) || []);
  const [unidades, setUnidades] = useState(JSON.parse(localStorage.getItem('unidadesData')) || []);
  const [editingChofer, setEditingChofer] = useState(null);
  const [formData, setFormData] = useState({ id: '', nombre: '', telefono: '', unidad: '' });
  const [showTable, setShowTable] = useState('conductores'); // 'conductores' or 'unidades'

  const handleDelete = (id) => {
    const updatedChoferes = choferes.filter(chofer => chofer.id !== id);
    setChoferes(updatedChoferes);
    localStorage.setItem('choferesData', JSON.stringify(updatedChoferes));

    const updatedUnidades = unidades.map(unidad => ({
      ...unidad,
      choferes: unidad.choferes.filter(choferId => choferId !== id)
    }));
    setUnidades(updatedUnidades);
    localStorage.setItem('unidadesData', JSON.stringify(updatedUnidades));

    Swal.fire('Eliminado', 'El chofer ha sido eliminado', 'success');
  };

  const handleEdit = (chofer) => {
    setEditingChofer(chofer.id);
    setFormData({ id: chofer.id, nombre: chofer.nombre, telefono: chofer.telefono, unidad: chofer.unidad });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    const updatedChoferes = choferes.map(chofer =>
      chofer.id === editingChofer ? { ...chofer, ...formData } : chofer
    );
    setChoferes(updatedChoferes);
    localStorage.setItem('choferesData', JSON.stringify(updatedChoferes));

    const updatedUnidades = unidades.map(unidad => {
      if (unidad.nombre === formData.unidad) {
        if (!unidad.choferes.includes(formData.id)) {
          unidad.choferes.push(formData.id);
        }
      } else {
        unidad.choferes = unidad.choferes.filter(choferId => choferId !== formData.id);
      }
      return unidad;
    });
    setUnidades(updatedUnidades);
    localStorage.setItem('unidadesData', JSON.stringify(updatedUnidades));

    setEditingChofer(null);
    Swal.fire('Guardado', 'Los cambios han sido guardados', 'success');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-400 to-blue-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Lista de Choferes y Unidades</h2>
          <button
            onClick={() => navigate('/optionsadmin')}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition duration-300"
          >
            Regresar a Opciones
          </button>
        </div>
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setShowTable('conductores')}
            className={`bg-${showTable === 'conductores' ? 'blue' : 'gray'}-500 text-white p-2 rounded mr-4 hover:bg-${showTable === 'conductores' ? 'blue' : 'gray'}-700 transition duration-300`}
          >
            Conductores
          </button>
          <button
            onClick={() => setShowTable('unidades')}
            className={`bg-${showTable === 'unidades' ? 'blue' : 'gray'}-500 text-white p-2 rounded hover:bg-${showTable === 'unidades' ? 'blue' : 'gray'}-700 transition duration-300`}
          >
            Unidades
          </button>
        </div>
        <div className="overflow-x-auto">
          {showTable === 'conductores' ? (
            <table className="min-w-full bg-white border border-gray-200 mb-6">
              <thead>
                <tr>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Nombre</th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Teléfono</th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Unidad</th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {choferes.map((chofer, index) => (
                  <tr key={index} className="even:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200">{chofer.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200">
                      {editingChofer === chofer.id ? (
                        <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} className="w-full p-2 border rounded" />
                      ) : (
                        chofer.nombre
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200">
                      {editingChofer === chofer.id ? (
                        <input type="text" name="telefono" value={formData.telefono} onChange={handleChange} className="w-full p-2 border rounded" />
                      ) : (
                        chofer.telefono
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200">
                      {editingChofer === chofer.id ? (
                        <input type="text" name="unidad" value={formData.unidad} onChange={handleChange} className="w-full p-2 border rounded" />
                      ) : (
                        chofer.unidad
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200">
                      {editingChofer === chofer.id ? (
                        <>
                          <button onClick={handleSave} className="bg-green-500 text-white p-2 rounded mr-2">Guardar</button>
                          <button onClick={() => setEditingChofer(null)} className="bg-gray-500 text-white p-2 rounded">Cancelar</button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => handleEdit(chofer)} className="bg-yellow-500 text-white p-2 rounded mr-2">Editar</button>
                          <button onClick={() => handleDelete(chofer.id)} className="bg-red-500 text-white p-2 rounded">Eliminar</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Unidad</th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">ID de Conductores</th>
                </tr>
              </thead>
              <tbody>
                {unidades.map((unidad, index) => (
                  <tr key={index} className="even:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200">{unidad.nombre}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200">{unidad.choferes.join(', ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default ListaDeChoferes;
