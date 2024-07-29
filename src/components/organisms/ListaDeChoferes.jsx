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
  const [formDataUser, setFormDataUser] = useState({ id: '', full_name: '', phone: '', email: '' });
  const [formDataUrban, setFormDataUrban] = useState({ id: '', vehicle_number: '', status: '', selectedUser: '' });
  const [showTable, setShowTable] = useState('conductores'); // 'conductores' or 'unidades'

  useEffect(() => {
    // Fetch users and urbans from the API
    const fetchData = async () => {
      try {
        const usersResponse = await axios.get('http://ivy.urbanrouteexplorer.xyz/api/user');
        setUsers(usersResponse.data);
        const urbansResponse = await axios.get('http://ivy.urbanrouteexplorer.xyz/api/urban');
        setUrbans(urbansResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://ivy.urbanrouteexplorer.xyz/api/user/${id}`);
      setUsers(users.filter(user => user.id !== id));
      Swal.fire('Eliminado', 'El conductor ha sido eliminado', 'success');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user.id);
    setFormDataUser({ id: user.id, full_name: user.full_name, phone: user.phone, email: user.email });
  };

  const handleChangeUser = (e) => {
    const { name, value } = e.target;
    setFormDataUser({ ...formDataUser, [name]: value });
  };

  const handleSaveUser = async () => {
    try {
      await axios.put(`http://ivy.urbanrouteexplorer.xyz/api/user/${formDataUser.id}`, formDataUser);
      setUsers(users.map(user => user.id === formDataUser.id ? formDataUser : user));
      setEditingUser(null);
      Swal.fire('Guardado', 'Los cambios han sido guardados', 'success');
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const handleDeleteUrban = async (id) => {
    try {
      await axios.delete(`http://ivy.urbanrouteexplorer.xyz/api/urban/${id}`);
      setUrbans(urbans.filter(urban => urban.id !== id));
      Swal.fire('Eliminado', 'La unidad ha sido eliminada', 'success');
    } catch (error) {
      console.error('Error deleting urban:', error);
    }
  };

  const handleEditUrban = (urban) => {
    setEditingUrban(urban.id);
    setFormDataUrban({ id: urban.id, vehicle_number: urban.vehicle_number, status: urban.status, selectedUser: urban.user_id });
  };

  const handleChangeUrban = (e) => {
    const { name, value } = e.target;
    setFormDataUrban({ ...formDataUrban, [name]: value });
  };

  const handleSaveUrban = async () => {
    try {
      await axios.put(`http://ivy.urbanrouteexplorer.xyz/api/urban/${formDataUrban.id}`, formDataUrban);
      setUrbans(urbans.map(urban => urban.id === formDataUrban.id ? formDataUrban : urban));
      setEditingUrban(null);
      Swal.fire('Guardado', 'Los cambios han sido guardados', 'success');
    } catch (error) {
      console.error('Error saving urban:', error);
    }
  };

  const handleAssignUserToUrban = (urbanId, userId) => {
    const updatedUrbans = urbans.map(urban => {
      if (urban.id === urbanId) {
        return { ...urban, user_id: userId };
      }
      return urban;
    });
    setUrbans(updatedUrbans);
    localStorage.setItem('urbans', JSON.stringify(updatedUrbans));
    Swal.fire('Asignado', 'El conductor ha sido asignado a la unidad', 'success');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-400 to-blue-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Lista de Conductores y Unidades</h2>
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
                {users.filter(user => user.role === 4).map((user, index) => (
                  <tr key={index} className="even:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200">{user.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200">
                      {editingUser === user.id ? (
                        <input type="text" name="full_name" value={formDataUser.full_name} onChange={handleChangeUser} className="w-full p-2 border rounded" />
                      ) : (
                        user.full_name
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
                          <button onClick={() => setEditingUser(null)} className="bg-red-500 text-white p-2 rounded">Cancelar</button>
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
            <table className="min-w-full bg-white border border-gray-200 mb-6">
              <thead>
                <tr>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Número de Vehículo</th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Estado</th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Conductor</th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {urbans.map((urban, index) => (
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
                        <input type="text" name="status" value={formDataUrban.status} onChange={handleChangeUrban} className="w-full p-2 border rounded" />
                      ) : (
                        urban.status
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200">
                      {editingUrban === urban.id ? (
                        <select name="selectedUser" value={formDataUrban.selectedUser} onChange={handleChangeUrban} className="w-full p-2 border rounded">
                          <option value="">Seleccione un conductor</option>
                          {users.filter(user => user.role === 4).map(user => (
                            <option key={user.id} value={user.id}>{user.full_name}</option>
                          ))}
                        </select>
                      ) : (
                        users.find(user => user.id === urban.user_id)?.full_name || 'Sin asignar'
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200">
                      {editingUrban === urban.id ? (
                        <>
                          <button onClick={handleSaveUrban} className="bg-green-500 text-white p-2 rounded mr-2">Guardar</button>
                          <button onClick={() => setEditingUrban(null)} className="bg-red-500 text-white p-2 rounded">Cancelar</button>
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
