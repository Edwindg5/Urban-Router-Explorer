import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import ButtonOptions from '../atoms/ButtonOptions';

function TarifaForm() {
  const [viajes, setViajes] = useState(0);
  const [pasajeros, setPasajeros] = useState(Array(15).fill(''));
  const [totalPasajeros, setTotalPasajeros] = useState(0);
  const [totalGanado, setTotalGanado] = useState(0);
  const [ganancia, setGanancia] = useState(0);
  const navigate = useNavigate();
  const tarifaDiaria = 2500;

  const handleViajesChange = (e) => {
    const value = e.target.value;
    setViajes(value);
    setPasajeros(Array(parseInt(value)).fill(''));
  };

  const handlePasajerosChange = (index, value) => {
    const newPasajeros = [...pasajeros];
    newPasajeros[index] = value;
    setPasajeros(newPasajeros);
  };

  const calculateData = () => {
    const totalPasajeros = pasajeros.reduce((acc, curr) => acc + parseInt(curr || 0), 0);
    const totalGanado = totalPasajeros * 20;
    const ganancia = totalGanado - tarifaDiaria;

    setTotalPasajeros(totalPasajeros);
    setTotalGanado(totalGanado);
    setGanancia(ganancia);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const fareData = {
      fare_amount: totalGanado,
      effective_date: new Date().toISOString().split('T')[0],
      created_by: 'denzel',
      updated_by: 'denzel',
      deleted: '0'
    };

    // Send data to the API
    fetch('http://ivy.urbanrouteexplorer.xyz/api/tarifa', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(fareData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al enviar la tarifa');
      }
      return response.json();
    })
    .then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Datos enviados',
        text: 'La información se ha enviado exitosamente',
        confirmButtonText: 'OK'
      });
      navigate('/options');
    })
    .catch(error => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message,
        confirmButtonText: 'OK'
      });
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-400 to-blue-500">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Tarifa Diaria</h2>
          <ButtonOptions to="/options" className="bg-red-500 text-white p-2 rounded">Regresar</ButtonOptions>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-lg font-semibold">Tarifa a completar: {tarifaDiaria} pesos</label>
          </div>
          <div className="mb-4">
            <label htmlFor="viajes" className="block text-lg font-semibold">Número de viajes realizados:</label>
            <input
              type="number"
              id="viajes"
              name="viajes"
              min="1"
              max="15"
              value={viajes}
              onChange={handleViajesChange}
              className="w-full p-2 border rounded-lg text-lg"
              required
            />
          </div>
          {Array.from({ length: viajes }).map((_, index) => (
            <div key={index} className="mb-4">
              <label className="block text-lg font-semibold">Pasajeros en viaje {index + 1}:</label>
              <input
                type="number"
                min="0"
                max="16"
                value={pasajeros[index]}
                onChange={(e) => handlePasajerosChange(index, e.target.value)}
                className="w-full p-2 border rounded-lg text-lg"
                required
              />
            </div>
          ))}
          <div className="mb-4">
            <label className="block text-lg font-semibold">Total de pasajeros: {totalPasajeros}</label>
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold">Total ganado: {totalGanado} pesos</label>
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold">
              {totalGanado >= tarifaDiaria ? '¡Has cumplido con la tarifa diaria!' : 'No has cumplido con la tarifa diaria.'}
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold">Ganancia: {ganancia} pesos</label>
          </div>
          <div className="flex justify-between mb-4">
            <button
              type="button"
              onClick={calculateData}
              className="bg-green-500 text-white p-3 rounded-lg text-lg hover:bg-green-700 transition duration-300"
            >
              Calcular
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white p-3 rounded-lg text-lg hover:bg-blue-700 transition duration-300"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TarifaForm;
