import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import ConductoresTable from './ConductoresTable';
import UnidadesTable from './UnidadesTable';
import ButtonListaDeChoferes from '../atoms/ButtonListaDeChoferes';

function ListaDeChoferes() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [urbans, setUrbans] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editingUrban, setEditingUrban] = useState(null);
  const [formDataUser, setFormDataUser] = useState({ id: '', name: '', phone: '', email: '' });
  const [formDataUrban, setFormDataUrban] = useState({ id: '', vehicle_number: '', selectedUser: '' });
  const [showTable, setShowTable] = useState('conductores');

  useEffect(() => {
    fetchChoferes();
    const storedUrbans = JSON.parse(localStorage.getItem('unidadesData')) || [];
    setUrbans(storedUrbans);
  }, []);

  const fetchChoferes = async () => {
    try {
      const response = await axios.get('http://ivy.urbanrouteexplorer.xyz/api/user');
      const choferesData = response.data.map(chofer => ({
        id: chofer.user_id,
        name: chofer.full_name,
        phone: chofer.phone,
        email: chofer.email
      }));
      setUsers(choferesData);
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
      await axios.put(`http://ivy.urbanrouteexplorer.xyz/api/user/${formDataUser.id}`, {
        full_name: formDataUser.name,
        phone: formDataUser.phone,
        email: formDataUser.email
      });
      const updatedUsers = users.map(user =>
        user.id === editingUser ? { ...user, ...formDataUser } : user
      );
      setUsers(updatedUsers);
      setEditingUser(null);
      Swal.fire('Guardado', 'Los cambios han sido guardados', 'success');
    } catch (error) {
      console.error('Error saving user:', error);
      Swal.fire('Error', 'Hubo un problema al guardar los cambios.', 'error');
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://ivy.urbanrouteexplorer.xyz/api/user/${id}`);
      const updatedUsers = users.filter(user => user.id !== id);
      setUsers(updatedUsers);
      Swal.fire('Eliminado', 'El chofer ha sido eliminado', 'success');
    } catch (error) {
      console.error('Error deleting user:', error);
      Swal.fire('Error', 'Hubo un problema al eliminar el chofer.', 'error');
    }
  };

  const handleEditUrban = (urban) => {
    setEditingUrban(urban.id);
    setFormDataUrban({ id: urban.id, vehicle_number: urban.vehicle_number, selectedUser: urban.user_id });
  };

  const handleChangeUrban = (e) => {
    const { name, value } = e.target;
    setFormDataUrban({ ...formDataUrban, [name]: value });
  };

  const handleSaveUrban = async () => {
    try {
      await axios.put(`http://ivy.urbanrouteexplorer.xyz/api/urban/${formDataUrban.id}`, {
        vehicle_number: formDataUrban.vehicle_number,
        user_id: formDataUrban.selectedUser
      });
      const updatedUrbans = urbans.map(urban =>
        urban.id === editingUrban ? { ...urban, ...formDataUrban } : urban
      );
      setUrbans(updatedUrbans);
      setEditingUrban(null);
      Swal.fire('Guardado', 'Los cambios han sido guardados', 'success');
    } catch (error) {
      console.error('Error saving urban:', error);
      Swal.fire('Error', 'Hubo un problema al guardar los cambios.', 'error');
    }
  };

  const handleDeleteUrban = async (id) => {
    try {
      await axios.delete(`http://ivy.urbanrouteexplorer.xyz/api/urban/${id}`);
      const updatedUrbans = urbans.filter(urban => urban.id !== id);
      setUrbans(updatedUrbans);
      Swal.fire('Eliminado', 'La unidad ha sido eliminada', 'success');
    } catch (error) {
      console.error('Error deleting urban:', error);
      Swal.fire('Error', 'Hubo un problema al eliminar la unidad.', 'error');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-400 to-blue-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Lista de Choferes y Unidades</h2>
          <ButtonListaDeChoferes onClick={() => navigate('/optionsadmin')} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition duration-300">
            Regresar
          </ButtonListaDeChoferes>
        </div>
        <div className="flex justify-center mb-6">
          <ButtonListaDeChoferes onClick={() => setShowTable('conductores')} className={`bg-${showTable === 'conductores' ? 'blue' : 'gray'}-500 text-white p-2 rounded mr-4 hover:bg-${showTable === 'conductores' ? 'blue' : 'gray'}-700 transition duration-300`}>
            Conductores
          </ButtonListaDeChoferes>
          <ButtonListaDeChoferes onClick={() => setShowTable('unidades')} className={`bg-${showTable === 'unidades' ? 'blue' : 'gray'}-500 text-white p-2 rounded hover:bg-${showTable === 'unidades' ? 'blue' : 'gray'}-700 transition duration-300`}>
            Unidades
          </ButtonListaDeChoferes>
        </div>
        <div className="overflow-x-auto">
          {showTable === 'conductores' ? (
            <ConductoresTable
              users={users}
              editingUser={editingUser}
              formDataUser={formDataUser}
              handleChangeUser={handleChangeUser}
              handleSaveUser={handleSaveUser}
              handleEditUser={handleEditUser}
              handleDeleteUser={handleDeleteUser}
            />
          ) : (
            <UnidadesTable
              urbans={urbans}
              users={users}
              editingUrban={editingUrban}
              formDataUrban={formDataUrban}
              handleChangeUrban={handleChangeUrban}
              handleSaveUrban={handleSaveUrban}
              handleEditUrban={handleEditUrban}
              handleDeleteUrban={handleDeleteUrban}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ListaDeChoferes;