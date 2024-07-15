import React from 'react';
import Card from '../atoms/Card';
import Carousel from '../molecules/Carousel';
import imagen2 from '../../assets/imagen2.jpeg';
import imagen3 from '../../assets/imagen3.jpeg';
import imagen4 from '../../assets/imagen4.jpeg';
import imagen7 from '../../assets/imagen7.png';

function MainContent() {
  const cardsData = [
    { image: imagen2, info: 'Ruta: Suchiapa -> Tuxtla. Paradas: Parque Central, Plaza de la Tecnología.' },
    { image: imagen3, info: 'Ruta: Tuxtla -> Suchiapa. Paradas: Plaza Crystal, Chedraui.' },
    { image: imagen4, info: 'Ruta: Terminal -> Parque Central. Paradas: Mercado, Universidad Politécnica.' },
    { image: imagen2, info: 'Ruta: Terminal -> Universidad. Paradas: Hospital, Mercado.' },
  ];

  return (
    <main className="flex flex-col items-center p-4 bg-gradient-to-b from-green-400 to-blue-500 text-white">
      <section className="w-full max-w-screen-md text-center mb-4">
        <h1 className="text-3xl font-bold mb-2">Suchiapa Necesita A los Colectivos</h1>
        <Carousel />
      </section>
      <section className="w-full max-w-screen-md bg-white bg-opacity-30 text-black p-4 rounded-lg shadow-lg mb-4">
        <h2 className="text-2xl font-bold mb-2">Información de la Terminal de Suchiapa a Tuxtla</h2>
        <p>La terminal de Suchiapa ofrece rutas diarias hacia Tuxtla Gutiérrez, con múltiples paradas en puntos estratégicos como el Parque Central, la Plaza de la Tecnología y la Universidad Politécnica. Estas rutas facilitan la movilidad de los habitantes y visitantes, asegurando un transporte seguro y eficiente.</p>
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 w-full max-w-screen-md">
        {cardsData.map((card, index) => (
          <Card key={index} image={card.image} info={card.info} />
        ))}
      </section>
      <section className="w-full max-w-screen-md text-center mb-4">
        <h2 className="text-xl mb-2">Encuéntranos</h2>
        <p>En este lugar encontrarás información y localización de nuestras rutas.</p>
        <div className="w-full h-48 mt-4">
          <img src={imagen7} alt="Mapa o Información" className="w-full h-full object-cover rounded-lg shadow-lg" />
        </div>
      </section>
    </main>
  );
}

export default MainContent;
