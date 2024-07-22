

import React from 'react';

function ButtonOptionsChecador({ className, onClick, children, ...props }) {
  return (
    <button
      className={`py-2 px-4 rounded-md transition duration-300 ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

export default ButtonOptionsChecador;