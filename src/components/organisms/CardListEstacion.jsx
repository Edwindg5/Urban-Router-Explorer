import React from 'react';
import Card from '../molecules/CardEstacion';
import terminalImage from '../../assets/terminal.jpeg';
import conductor1Image from '../../assets/conductor1.jpeg';
import conductor2Image from '../../assets/conductor2.jpeg';
import imagen6 from '../../assets/imagen6.jpeg'

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
    },
    {
      imageSrc: imagen6,
      imageAlt: 'Nueva Terminal Suchiapa a Tuxtla',
      title: 'Nueva Terminal Suchiapa a Tuxtla',
      description: 'La nueva terminal de Suchiapa a Tuxtla ha sido inaugurada recientemente, ofreciendo servicios mejorados y mayor capacidad para los pasajeros.'
    },
    {
      imageSrc: terminalImage,
      imageAlt: 'Terminal Antigua',
      title: 'Terminal Antigua',
      description: 'La terminal antigua aún opera y ofrece servicios continuos para los pasajeros, manteniendo la calidad y seguridad.'
    },
    {
      imageSrc: terminalImage,
      imageAlt: 'Terminal Renovada',
      title: 'Terminal Renovada',
      description: 'La terminal ha sido renovada con nuevas instalaciones y mayor espacio para el confort de los pasajeros.'
    }
  ];

  return (
    <div className="flex flex-wrap -mx-4 bg-gradient-to-b from-green-400 to-blue-500 p-8 text-white">
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
