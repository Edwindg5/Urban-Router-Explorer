import React from 'react';
import { Link } from 'react-router-dom';

function LinkButtonChecador({ to, children, className }) {
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}

export default LinkButtonChecador;