import React from 'react';
import Card from '../atoms/Card';
import imagen1 from '../../assets/imagen1.jpeg';
import imagen2 from '../../assets/imagen2.jpeg';
import imagen3 from '../../assets/imagen3.jpeg';
import imagen4 from '../../assets/imagen4.jpeg';

function MainContent() {
  const cardsData = [
    { image: imagen1, info: 'Información 1' },
    { image: imagen2, info: 'Información 2' },
    { image: imagen3, info: 'Información 3' },
    { image: imagen4, info: 'Información 4' },
  ];

  return (
    <main className="flex flex-col items-center p-4 bg-gradient-to-b from-green-400 to-blue-500 text-white">
      <section className="w-full max-w-screen-md text-center mb-4">
        <h1 className="text-2xl mb-2">Suchiapa Necesita A los Colectivos</h1>
        <div className="w-full h-48 mb-4">
          <img src={imagen1} alt="Imagen Principal" className="w-full h-full object-cover" />
        </div>
      </section>
      <section className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
        {cardsData.map((card, index) => (
          <Card key={index} image={card.image} info={card.info} />
        ))}
      </section>
      <section className="w-full max-w-screen-md text-center mb-4">
        <h2 className="text-xl mb-2">ENCUENTRANOS</h2>
        <p>En este lugar información y localización</p>
        <div className="w-full h-48 mt-4">
          <img src={imagen2} alt="Mapa o Información" className="w-full h-full object-cover" />
        </div>
      </section>
    </main>
  );
}

export default MainContent;