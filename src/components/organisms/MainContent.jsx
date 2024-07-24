import React, { useState } from 'react';
import Card from '../atoms/Card';
import Carousel from '../molecules/Carousel';
import imagen2 from '../../assets/imagen2.jpeg';
import imagen3 from '../../assets/imagen3.jpeg';
import imagen4 from '../../assets/imagen4.jpeg';
import imagen5 from '../../assets/imagen5.jpeg'; 
import imagen6 from '../../assets/imagen6.jpeg'; 
import imagen7 from '../../assets/imagen7.png';

function MainContent() {

  const cardsData = [
    { image: imagen2, info: 'Ruta: Suchiapa -> Tuxtla. Paradas: Parque Central, Plaza de la Tecnología, Universidad Politécnica. Frecuencia: Cada 30 minutos. Precio: $20.' },
    { image: imagen3, info: 'Ruta: Tuxtla -> Suchiapa. Paradas: Plaza Crystal, Chedraui, Parque Central. Frecuencia: Cada 45 minutos. Precio: $18.' },
    { image: imagen4, info: 'Ruta: Terminal -> Parque Central. Paradas: Mercado, Universidad Politécnica, Parque Central. Frecuencia: Cada 20 minutos. Precio: $15.' },
    { image: imagen2, info: 'Ruta: Terminal -> Universidad. Paradas: Hospital, Mercado, Universidad. Frecuencia: Cada 25 minutos. Precio: $17.' },
    { image: imagen5, info: 'Ruta: Mercado -> Parque Central. Paradas: Universidad, Plaza Crystal. Frecuencia: Cada 35 minutos. Precio: $14.' }, 
    { image: imagen6, info: 'Ruta: Universidad -> Mercado. Paradas: Parque Central, Chedraui. Frecuencia: Cada 40 minutos. Precio: $16.' }, 
  ];

  return (
    <main className="flex flex-col items-center p-4 bg-gradient-to-b from-green-400 to-blue-500 text-white min-h-screen">
      <section className="w-full max-w-screen-lg text-center mb-4">
        <h1 className="text-4xl font-bold mb-6">Urban Router Explorer</h1>
        <Carousel />
      </section>
      <section className="w-full max-w-screen-lg bg-white bg-opacity-30 text-black p-8 rounded-lg shadow-lg mb-6">
        <h2 className="text-3xl font-bold mb-4">Información de la Terminal de Suchiapa a Tuxtla</h2>
        <p>La terminal de Suchiapa ofrece rutas diarias hacia Tuxtla Gutiérrez, con múltiples paradas en puntos estratégicos como el Parque Central, la Plaza de la Tecnología y la Universidad Politécnica. Estas rutas facilitan la movilidad de los habitantes y visitantes, asegurando un transporte seguro y eficiente.</p>
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 w-full max-w-screen-lg">
        {cardsData.map((card, index) => (
          <Card key={index} image={card.image} info={card.info} />
        ))}
      </section>
      <section className="w-full max-w-screen-lg text-center mb-4">
        <h2 className="text-2xl mb-4">Encuéntranos</h2>
        <p>En este lugar encontrarás información y localización de nuestras rutas.</p>
        <div className="w-full h-64 mt-4">
          <img src={imagen7} alt="Mapa o Información" className="w-full h-full object-cover rounded-lg shadow-lg" />
        </div>
      </section>
    </main>
  );
}

export default MainContent;
