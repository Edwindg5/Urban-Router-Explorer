import React from 'react';
import TableListaDeChoferes from '../molecules/TableListaDeChoferes';
import TableRowListaDeChoferes from '../molecules/TableRowListaDeChoferes';
import ButtonListaDeChoferes from '../atoms/ButtonListaDeChoferes';
import Input from '../atoms/InputListaDeChoferes';
import Select from '../atoms/SelectListaDeChoferes';

function UnidadesTable({
  urbans,
  users,
  editingUrban,
  formDataUrban,
  handleChangeUrban,
  handleSaveUrban,
  handleEditUrban,
  handleDeleteUrban,
}) {
  const userOptions = users.map(user => ({
    value: user.id,
    label: user.name,
  }));

  return (
    <TableListaDeChoferes headers={['ID', 'Número de Vehículo', 'Chofer Asignado', 'Acciones']}>
      {urbans.map((urban, index) => (
        <TableRowListaDeChoferes key={index} className="even:bg-gray-50">
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200">{urban.id}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200">
            {editingUrban === urban.id ? (
              <Input
                type="text"
                name="vehicle_number"
                value={formDataUrban.vehicle_number}
                onChange={handleChangeUrban}
                className="w-full p-2 border rounded"
              />
            ) : (
              urban.vehicle_number
            )}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200">
            {editingUrban === urban.id ? (
              <Select
                name="selectedUser"
                value={formDataUrban.selectedUser}
                onChange={handleChangeUrban}
                options={[{ value: '', label: 'Seleccionar chofer' }, ...userOptions]}
                className="w-full p-2 border rounded"
              />
            ) : (
              users.find(user => user.id === urban.user_id)?.name || 'No asignado'
            )}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200">
            {editingUrban === urban.id ? (
              <ButtonListaDeChoferes onClick={handleSaveUrban} className="bg-green-500 text-white p-2 rounded hover:bg-green-700 transition duration-300">
                Guardar
              </ButtonListaDeChoferes>
            ) : (
              <>
                <ButtonListaDeChoferes
                  onClick={() => handleEditUrban(urban)}
                  className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-700 transition duration-300 mr-2"
                >
                  Editar
                </ButtonListaDeChoferes>
                <ButtonListaDeChoferes
                  onClick={() => handleDeleteUrban(urban.id)}
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

export default UnidadesTable;