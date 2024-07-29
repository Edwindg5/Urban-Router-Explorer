import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

function ListaDeChoferes() {
  const navigate = useNavigate();
  const [choferes, setChoferes] = useState([]);
  const [unidades, setUnidades] = useState([]);
  const [editingChofer, setEditingChofer] = useState(null);
  const [formData, setFormData] = useState({ id: '', nombre: '', telefono: '', email: '' });
  const [showTable, setShowTable] = useState('conductores'); // 'conductores' o 'unidades'

  useEffect(() => {
    fetchChoferes();
    fetchUnidades();
  }, []);

  const fetchChoferes = async () => {
    try {
      const response = await axios.get('http://ivy.urbanrouteexplorer.xyz/api/user');
      const choferesData = response.data.map(chofer => ({
        id: chofer.user_id,
        nombre: chofer.full_name,
        telefono: chofer.phone,
        email: chofer.email
      }));
      setChoferes(choferesData);
    } catch (error) {
      console.error('Error fetching choferes:', error);
    }
  };

  const fetchUnidades = async () => {
    try {
      const response = await axios.get('http://ivy.urbanrouteexplorer.xyz/api/urban');
      const unidadesData = response.data.map(unidad => ({
        id: unidad.urban_id,
        numero: unidad.vehicle_number,
        status: unidad.status
      }));
      setUnidades(unidadesData);
    } catch (error) {
      console.error('Error fetching unidades:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://ivy.urbanrouteexplorer.xyz/api/user/${id}`);
      const updatedChoferes = choferes.filter(chofer => chofer.id !== id);
      setChoferes(updatedChoferes);
      Swal.fire('Eliminado', 'El chofer ha sido eliminado', 'success');
    } catch (error) {
      console.error('Error deleting chofer:', error);
      Swal.fire('Error', 'Hubo un problema al eliminar el chofer.', 'error');
    }
  };

  const handleEdit = (chofer) => {
    setEditingChofer(chofer.id);
    setFormData({ id: chofer.id, nombre: chofer.nombre, telefono: chofer.telefono, email: chofer.email });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://ivy.urbanrouteexplorer.xyz/api/user/${formData.id}`, {
        full_name: formData.nombre,
        phone: formData.telefono,
        email: formData.email
      });
      const updatedChoferes = choferes.map(chofer =>
        chofer.id === editingChofer ? { ...chofer, ...formData } : chofer
      );
      setChoferes(updatedChoferes);
      setEditingChofer(null);
      Swal.fire('Guardado', 'Los cambios han sido guardados', 'success');
    } catch (error) {
      console.error('Error saving chofer:', error);
      Swal.fire('Error', 'Hubo un problema al guardar los cambios.', 'error');
    }
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
            Regresar
          </button>
        </div>
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setShowTable('conductores')}
            className={`${
              showTable === 'conductores' ? 'bg-blue-500' : 'bg-gray-500'
            } text-white p-2 rounded mr-4 hover:bg-blue-700 transition duration-300`}
          >
            Conductores
          </button>
          <button
            onClick={() => setShowTable('unidades')}
            className={`${
              showTable === 'unidades' ? 'bg-blue-500' : 'bg-gray-500'
            } text-white p-2 rounded hover:bg-blue-700 transition duration-300`}
          >
            Unidades
          </button>
        </div>
        <div className="overflow-x-auto">
          {showTable === 'conductores' ? (
            <div>
              <table className="min-w-full bg-white border border-gray-200 mb-6">
                <thead>
                  <tr>
                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Nombre
                    </th>
                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Teléfono
                    </th>
                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {choferes.map((chofer) => (
                    <tr key={chofer.id} className="even:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200">
                        {chofer.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200">
                        {editingChofer === chofer.id ? (
                          <input
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                          />
                        ) : (
                          chofer.nombre
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200">
                        {editingChofer === chofer.id ? (
                          <input
                            type="text"
                            name="telefono"
                            value={formData.telefono}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                          />
                        ) : (
                          chofer.telefono
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200">
                        {editingChofer === chofer.id ? (
                          <input
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                          />
                        ) : (
                          chofer.email
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200">
                        {editingChofer === chofer.id ? (
                          <>
                            <button
                              onClick={handleSave}
                              className="bg-green-500 text-white p-2 rounded mr-2"
                            >
                              Guardar
                            </button>
                            <button
                              onClick={() => setEditingChofer(null)}
                              className="bg-gray-500 text-white p-2 rounded"
                            >
                              Cancelar
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => handleEdit(chofer)}
                              className="bg-yellow-500 text-white p-2 rounded mr-2"
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => handleDelete(chofer.id)}
                              className="bg-red-500 text-white p-2 rounded"
                            >
                              Eliminar
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {choferes.length === 0 && <p>No hay conductores disponibles.</p>}
            </div>
          ) : (
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Número del Vehículo
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody>
                {unidades.map((unidad) => (
                  <tr key={unidad.id} className="even:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200">
                      {unidad.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200">
                      {unidad.numero}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200">
                      {unidad.status}
                    </td>
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
