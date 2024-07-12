import React from 'react';
import ButtonOptions from '../atoms/ButtonOptions';

function HorarioForm({ formData, handleChange, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-center mb-2">Trabajaras el día de mañana?</label>
        <div className="flex justify-center items-center">
          <label className="mr-2">No</label>
          <input
            type="checkbox"
            name="trabajar"
            checked={formData.trabajar}
            onChange={handleChange}
            className="mr-2"
          />
          <label>Si</label>
        </div>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Hora de Entrada</label>
        <select
          name="horaEntrada"
          value={formData.horaEntrada}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Seleccionar...</option>
          <option value="6:00 AM">6:00 AM</option>
          <option value="7:00 AM">7:00 AM</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Hora de Salida</label>
        <select
          name="horaSalida"
          value={formData.horaSalida}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Seleccionar...</option>
          <option value="6:00 PM">6:00 PM</option>
          <option value="7:00 PM">7:00 PM</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Qué unidad utilizarás?</label>
        <select
          name="unidad"
          value={formData.unidad}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Seleccionar...</option>
          <option value="Unidad 1">Unidad 1</option>
          <option value="Unidad 2">Unidad 2</option>
        </select>
      </div>
      <div className="flex justify-between">
        <ButtonOptions to="/options">Salir</ButtonOptions>
        <button type="submit" className="p-2 bg-green-500 text-white rounded">Enviar</button>
      </div>
    </form>
  );
}

export default HorarioForm;
