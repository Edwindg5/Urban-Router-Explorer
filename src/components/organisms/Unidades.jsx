import React, { useState, useEffect } from 'react';

function Unidades() {
  const [unidadesData, setUnidadesData] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('unidades')) || [];
    setUnidadesData(data);
  }, []);

  return (
    <div>
      <h2>Unidades Trabajando</h2>
      <table>
        <thead>
          <tr>
            <th>Unidad</th>
            <th>Pasajeros</th>
          </tr>
        </thead>
        <tbody>
          {unidadesData.map((unidad, index) => (
            <tr key={index}>
              <td>{unidad.nombre}</td>
              <td>{unidad.pasajeros}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Unidades;
