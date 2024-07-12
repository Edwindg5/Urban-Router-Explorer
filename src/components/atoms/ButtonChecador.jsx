import React from 'react';

function ButtonChecador({ type, onClick, children, className }) {
  return (
    <button type={type} onClick={onClick} className={className}>
      {children}
    </button>
  );
}

export default ButtonChecador;