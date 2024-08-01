import React from 'react';
import TableListaDeChoferes from '../molecules/TableListaDeChoferes';
import TableRowListaDeChoferes from '../molecules/TableRowListaDeChoferes';
import ButtonListaDeChoferes from '../atoms/ButtonListaDeChoferes';
import InputListaDeChoferes from '../atoms/InputListaDeChoferes';

function ConductoresTable({
  users,
  editingUser,
  formDataUser,
  handleChangeUser,
  handleSaveUser,
  handleEditUser,
  handleDeleteUser,
}) {
  return (
    <TableListaDeChoferes headers={['ID', 'Nombre', 'Teléfono', 'Email', 'Acciones']}>
      {users.map((user, index) => (
        <TableRowListaDeChoferes key={index} className="even:bg-gray-50">
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200">{user.id}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200">
            {editingUser === user.id ? (
              <InputListaDeChoferes
                type="text"
                name="name"
                value={formDataUser.name}
                onChange={handleChangeUser}
                className="w-full p-2 border rounded"
              />
            ) : (
              user.name
            )}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200">
            {editingUser === user.id ? (
              <InputListaDeChoferes
                type="text"
                name="phone"
                value={formDataUser.phone}
                onChange={handleChangeUser}
                className="w-full p-2 border rounded"
              />
            ) : (
              user.phone
            )}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200">
            {editingUser === user.id ? (
              <InputListaDeChoferes
                type="text"
                name="email"
                value={formDataUser.email}
                onChange={handleChangeUser}
                className="w-full p-2 border rounded"
              />
            ) : (
              user.email
            )}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200">
            {editingUser === user.id ? (
              <ButtonListaDeChoferes onClick={handleSaveUser} className="bg-green-500 text-white p-2 rounded hover:bg-green-700 transition duration-300">
                Guardar
              </ButtonListaDeChoferes>
            ) : (
              <>
                <ButtonListaDeChoferes
                  onClick={() => handleEditUser(user)}
                  className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-700 transition duration-300 mr-2"
                >
                  Editar
                </ButtonListaDeChoferes>
                <ButtonListaDeChoferes
                  onClick={() => handleDeleteUser(user.id)}
                  className="bg-red-500 text-white p-2 rounded hover:bg-red-700 transition duration-300"
                >
                  Eliminar
                </ButtonListaDeChoferes>
              </>
            )}
          </td>
        </TableRowListaDeChoferes>
      ))}
    </TableListaDeChoferes>
  );
}

export default ConductoresTable;