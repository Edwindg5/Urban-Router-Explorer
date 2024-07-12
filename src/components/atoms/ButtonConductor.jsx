import React from 'react';
import { Link } from 'react-router-dom';

function ButtonConductor({ to, children, onClick, type = "button", className = "" }) {
  if (to) {
    return (
      <Link to={to} className={`p-2 bg-blue-500 text-white rounded ${className}`}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={`p-2 bg-blue-500 text-white rounded ${className}`}>
      {children}
    </button>
  );
}

export default ButtonConductor;
