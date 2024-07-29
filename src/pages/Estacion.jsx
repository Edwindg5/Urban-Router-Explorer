import React from 'react';
import Heading from '../components/atoms/HeadingEstacion';
import CardList from '../components/organisms/CardListEstacion';

function Estacion() {
  return (
    <div className="bg-gradient-to-b from-green-400 to-blue-500 min-h-screen flex flex-col items-center text-white">
      <div className="p-8 w-full max-w-screen-lg">
        <Heading level={1} className="text-4xl font-bold mb-8">Terminal de Suchiapa a Tuxtla</Heading>
        <CardList />
      </div>
    </div>
  );
}

export default Estacion;
