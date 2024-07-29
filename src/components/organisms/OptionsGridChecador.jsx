import React from 'react';
import OptionCardChecador from '../molecules/OptionCardChecador'; //referencia

function OptionsGridChecador() {
  const options = [
    {
      title: 'Unidades',
      description: 'Marcar pasajeros para las unidades que están trabajando.',
      link: '/unidades',
    },
    {
      title: 'Cumplimiento de Horario',
      description: 'Marcar cumplimiento de horario de los choferes.',
      link: '/cumplimiento-horario',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
      {options.map((option) => (
        <OptionCardChecador key={option.title} {...option} />
      ))}
    </div>
  );
}

export default OptionsGridChecador;
