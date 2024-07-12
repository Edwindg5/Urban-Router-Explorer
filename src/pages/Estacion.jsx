import React from 'react';
import Heading from '../components/atoms/HeadingEstacion';
import CardList from '../components/organisms/CardListEstacion';

function Estacion() {
  return (
    <div className="p-8">
      <Heading level={1} className="text-4xl font-bold mb-8">Terminal de Suchiapa a Tuxtla</Heading>
      <CardList />
    </div>
  );
}

export default Estacion;