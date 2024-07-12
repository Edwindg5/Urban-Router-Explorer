import React from 'react';
import { Link } from 'react-router-dom';

function ButtonOptions({ to, children, ...props }) {
  return (
    <Link to={to} {...props} className="p-2 bg-gray-300 text-black rounded">
      {children}
    </Link>
  );
}

export default ButtonOptions;
