import React, { useState, useEffect } from 'react';

function GananciasContent() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const gananciasData = JSON.parse(localStorage.getItem('gananciasData')) || [];
    setData(gananciasData);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-400 to-blue-500">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Ganancias y Viajes</h2>
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Fecha</th>
              <th className="px-4 py-2 border">Ganancias</th>
              <th className="px-4 py-2 border">Viajes</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border">{item.fecha}</td>
                  <td className="px-4 py-2 border">{item.ganancias}</td>
                  <td className="px-4 py-2 border">{item.viajes}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-4 py-2 border text-center" colSpan="3">
                  No hay datos disponibles
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GananciasContent;
