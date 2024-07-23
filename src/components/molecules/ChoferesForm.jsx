import React, { useState } from 'react';

function ChoferesForm({ onRegister, unidadesDisponibles }) {
  const [formData, setFormData] = useState({
    nombre: '',
    unidad: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(formData);
    setFormData({
      nombre: '',
      unidad: ''
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-lg font-semibold mb-2">Nombre</label>
        <input 
          type="text" 
          name="nombre" 
          value={formData.nombre} 
          onChange={handleChange} 
          className="w-full p-3 border rounded-lg text-lg" 
        />
      </div>
      <div className="mb-4">
        <label className="block text-lg font-semibold mb-2">Unidad</label>
        <select 
          name="unidad" 
          value={formData.unidad} 
          onChange={handleChange} 
          className="w-full p-3 border rounded-lg text-lg"
        >
          <option value="">Seleccione una unidad</option>
          {unidadesDisponibles.map((unidad, index) => (
            <option key={index} value={unidad}>{unidad}</option>
          ))}
        </select>
      </div>
      <button type="submit" className="bg-blue-500 text-white p-3 rounded-lg text-lg hover:bg-blue-700 transition-colors">
        Registrar
      </button>
    </form>
  );
}

export default ChoferesForm;
