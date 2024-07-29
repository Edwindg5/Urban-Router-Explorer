import React, { useState } from 'react';
import Card from '../atoms/Card';
import Carousel from '../molecules/Carousel';
import image9 from '../../assets/image9.jpeg';
import imagen3 from '../../assets/imagen3.jpeg';
import imagen4 from '../../assets/imagen4.jpeg';
import imagen5 from '../../assets/imagen5.jpeg';
import imagen6 from '../../assets/imagen6.jpeg';
import imagen7 from '../../assets/imagen7.png';
import image14 from '../../assets/image14.jpeg';

function MainContent() {

  const cardsData = [
    { image: image9, info: 'Ruta: Suchiapa -> Tuxtla. Paradas: Parque Central, Plaza de la Tecnología, Universidad Politécnica. Frecuencia: Cada 30 minutos. Precio: $20.' },
    { image: imagen3, info: 'Ruta: Tuxtla -> Suchiapa. Paradas: Plaza Crystal, Chedraui, Parque Central. Frecuencia: Cada 45 minutos. Precio: $18.' },
    { image: imagen4, info: 'Ruta: Terminal -> Parque Central. Paradas: Mercado, Universidad Politécnica, Parque Central. Frecuencia: Cada 20 minutos. Precio: $15.' },
    { image: image14, info: 'Ruta: Terminal -> Universidad. Paradas: Hospital, Mercado, Universidad. Frecuencia: Cada 25 minutos. Precio: $17.' },
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
        <p>En este lugar encontrarás información sobre la terminal en Suchiapa.</p>
        <div className="w-full h-64 mt-4">
          <a href="https://www.google.com/maps/place/Transporte+Colectivo+Suchiapa-Tuxtla/@16.6238414,-93.101153,3a,75y,336.88h,90t/data=!3m7!1e1!3m5!1s5YGsD78b9CRdNuWB9EYd9Q!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fpanoid%3D5YGsD78b9CRdNuWB9EYd9Q%26cb_client%3Dsearch.gws-prod.gps%26w%3D86%26h%3D86%26yaw%3D336.87692%26pitch%3D0%26thumbfov%3D100!7i16384!8i8192!4m11!1m2!2m1!1sterminales+su+chiapa!3m7!1s0x85ecd61e9e0de243:0xebd77c6881c5a157!8m2!3d16.623852!4d-93.101184!10e5!15sChR0ZXJtaW5hbGVzIHN1IGNoaWFwYZIBFnRyYW5zcG9ydGF0aW9uX3NlcnZpY2XgAQA!16s%2Fg%2F11bzrjglcc?coh=205409&entry=ttu" target="_blank" rel="noopener noreferrer">
            <img src={imagen7} alt="Mapa o Información" className="w-full h-full object-cover rounded-lg shadow-lg" />
          </a>
        </div>
      </section>
    </main>
  );
}

export default MainContent;
