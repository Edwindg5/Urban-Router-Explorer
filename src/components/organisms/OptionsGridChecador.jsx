import React from 'react';
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
    {
      title: 'Horario',
      description: 'Escoje su horario y su unidad para el día que trabajar.',
      link: '/horario',
    },
    {
      title: 'Reportes',
      description: 'Hacer reportes sobre algún problema o algo.',
      link: '/reporte-problemas',
    },
    {
      title: 'Ganancias',
      description: 'Verifica las ganancias y viajes que lleva hechos.',
      link: '/ganancias',
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
