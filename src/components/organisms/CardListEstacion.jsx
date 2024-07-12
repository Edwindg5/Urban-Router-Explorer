import React from 'react';
import Card from '../molecules/CardEstacion';
import terminalImage from '../../assets/terminal.jpeg';
import conductor1Image from '../../assets/conductor1.jpeg';
import conductor2Image from '../../assets/conductor2.jpeg';

function CardListEstacion() {
  const cards = [
    {
      imageSrc: terminalImage,
      imageAlt: 'Terminal Suchiapa a Tuxtla',
      title: 'Terminal Suchiapa a Tuxtla',
      description: 'La terminal de Suchiapa a Tuxtla ofrece servicios de transporte confiables y seguros. Está equipada con instalaciones modernas para asegurar la comodidad de los pasajeros.'
    },
    {
      imageSrc: conductor1Image,
      imageAlt: 'Conductor 1',
      title: 'Conductor Juan Pérez',
      description: 'Juan Pérez es uno de nuestros conductores más experimentados, con más de 10 años de experiencia en el transporte de pasajeros. Conduce de manera segura y eficiente.'
    },
    {
      imageSrc: conductor2Image,
      imageAlt: 'Conductor 2',
      title: 'Conductor María López',
      description: 'María López se destaca por su amabilidad y profesionalismo. Lleva más de 5 años trabajando con nosotros y siempre recibe elogios de los pasajeros por su excelente servicio.'
    }
  ];

  return (
    <div className="flex flex-wrap -mx-4">
      {cards.map((card, index) => (
        <div key={index} className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
          <Card
            imageSrc={card.imageSrc}
            imageAlt={card.imageAlt}
            title={card.title}
            description={card.description}
          />
        </div>
      ))}
    </div>
  );
}

export default CardListEstacion;