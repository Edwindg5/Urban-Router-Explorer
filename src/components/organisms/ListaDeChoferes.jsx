import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

function ListaDeChoferes() { 
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [urbans, setUrbans] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editingUrban, setEditingUrban] = useState(null);
  const [formDataUser, setFormDataUser] = useState({ id: '', name: '', phone: '', email: '' });
  const [formDataUrban, setFormDataUrban] = useState({ id: '', vehicle_number: '', selectedUser: '' });
  const [showTable, setShowTable] = useState('conductores'); // 'conductores' or 'unidades'

  useEffect(() => {
    fetchChoferes();
    const storedUnidades = JSON.parse(localStorage.getItem('unidadesData')) || [];
    setUnidades(storedUnidades);
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

  const handleEditUser = (user) => {
    setEditingUser(user.id);
    setFormDataUser({ id: user.id, name: user.name, phone: user.phone, email: user.email });
  };

  const handleChangeUser = (e) => {
    const { name, value } = e.target;
    setFormDataUser({ ...formDataUser, [name]: value });
  };

  const handleSaveUser = async () => {
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

  const handleEditUrban = (urban) => {
    setEditingUrban(urban.id);
    setFormDataUrban({ id: urban.id, vehicle_number: urban.vehicle_number, selectedUser: urban.user_id });
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
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index} className="even:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200">{user.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200">
                      {editingUser === user.id ? (
                        <input type="text" name="name" value={formDataUser.name} onChange={handleChangeUser} className="w-full p-2 border rounded" />
                      ) : (
                        user.name
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200">
                      {editingUser === user.id ? (
                        <input type="text" name="phone" value={formDataUser.phone} onChange={handleChangeUser} className="w-full p-2 border rounded" />
                      ) : (
                        user.phone
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200">
                      {editingUser === user.id ? (
                        <input type="text" name="email" value={formDataUser.email} onChange={handleChangeUser} className="w-full p-2 border rounded" />
                      ) : (
                        user.email
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200">
                      {editingUser === user.id ? (
                        <>
                          <button onClick={handleSaveUser} className="bg-green-500 text-white p-2 rounded mr-2">Guardar</button>
                          <button onClick={() => setEditingUser(null)} className="bg-gray-500 text-white p-2 rounded">Cancelar</button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => handleEditUser(user)} className="bg-yellow-500 text-white p-2 rounded mr-2">Editar</button>
                          <button onClick={() => handleDeleteUser(user.id)} className="bg-red-500 text-white p-2 rounded">Eliminar</button>
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
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Número de Vehículo</th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Conductor</th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {unidades.map((unidad, index) => (
                  <tr key={index} className="even:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200">{urban.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200">
                      {editingUrban === urban.id ? (
                        <input type="text" name="vehicle_number" value={formDataUrban.vehicle_number} onChange={handleChangeUrban} className="w-full p-2 border rounded" />
                      ) : (
                        urban.vehicle_number
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200">
                      {editingUrban === urban.id ? (
                        <select name="selectedUser" value={formDataUrban.selectedUser} onChange={handleChangeUrban} className="w-full p-2 border rounded">
                          <option value="">Seleccione un conductor</option>
                          {users.map(user => (
                            <option key={user.id} value={user.id}>{user.name}</option>
                          ))}
                        </select>
                      ) : (
                        users.find(user => user.id === urban.user_id)?.name || 'No asignado'
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200">
                      {editingUrban === urban.id ? (
                        <>
                          <button onClick={handleSaveUrban} className="bg-green-500 text-white p-2 rounded mr-2">Guardar</button>
                          <button onClick={() => setEditingUrban(null)} className="bg-gray-500 text-white p-2 rounded">Cancelar</button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => handleEditUrban(urban)} className="bg-yellow-500 text-white p-2 rounded mr-2">Editar</button>
                          <button onClick={() => handleDeleteUrban(urban.id)} className="bg-red-500 text-white p-2 rounded">Eliminar</button>
                        </>
                      )}
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
