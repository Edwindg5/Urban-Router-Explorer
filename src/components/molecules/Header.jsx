import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-blue-800 text-white">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-gray-200 rounded-full mr-2">
          <img src={logo} alt="Logo" className="w-full h-full rounded-full" />
        </div>
      </div>
      <nav>
        <Link to="/" className="mr-4">Inicio</Link>
        <Link to="/informacion" className="mr-4">Información</Link>
        <Link to="/estacion" className="mr-4">Estación</Link>
        <Link to="/login" className="mr-4">Login</Link> 
      </nav>
    </header>
  );
}

export default Header;