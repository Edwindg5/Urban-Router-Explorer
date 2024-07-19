import React from 'react';
import { Link } from 'react-router-dom';

function ButtonOptions({ to, className, children }) {
  const combinedClassName = `${className} p-2 rounded`;
  
  return (
    <Link to={to} className={combinedClassName}>
      {children}
    </Link>
  );
}

export default ButtonOptions;
