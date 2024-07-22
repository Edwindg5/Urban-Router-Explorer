import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BellIcon } from '@heroicons/react/outline';
import { useNotification } from '../atoms/NotificationContext';
import logo from '../../assets/logo.png';

function Header() {
  const { notifications } = useNotification();
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    setUnreadCount(notifications.length);
  }, [notifications]);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      setUnreadCount(0); // Reset unread count when notifications are viewed
    }
  };

  return (
    <header className="flex justify-between items-center p-4 bg-blue-800 text-white relative z-50">
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
        {/* Icono de notificación */}
        <button 
          onClick={toggleNotifications} 
          className="relative bg-red-500 text-white p-2 rounded-full focus:outline-none"
        >
          <BellIcon className="w-6 h-6" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full h-5 w-5 text-xs flex items-center justify-center">
              {unreadCount}
            </span>
          )}
          {showNotifications && (
            <div className="absolute right-0 mt-2 bg-white text-black p-4 rounded-lg shadow-lg w-64 z-50">
              <h3 className="text-xl font-bold mb-2">Notificaciones</h3>
              <ul>
                {notifications.map((notification, index) => (
                  <li key={index} className="mb-2 border-b pb-2">{notification}</li>
                ))}
              </ul>
            </div>
          )}
        </button>
      </nav>
    </header>
  );
}

export default Header;
