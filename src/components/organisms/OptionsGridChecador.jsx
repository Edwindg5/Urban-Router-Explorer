import React from 'react';
import OptionCard from '../molecules/OptionCardChecador';
import OptionCardChecador from '../molecules/OptionCardChecador';

function OptionsGridChecador() {
  const options = [
    {
      title: 'Choferes',
      description: 'Gestión de información de los choferes.',
      link: '/choferes',
    },
    {
      title: 'Urbans',
      description: 'Gestión de información de los Urbans.',
      link: '/urbans',
    },
    {
      title: 'Listas',
      description: 'Gestión de listas y reportes.',
      link: '/listas',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {options.map((option) => (
        <OptionCardChecador key={option.title} {...option} />
      ))}
    </div>
  );
}

export default OptionsGridChecador;