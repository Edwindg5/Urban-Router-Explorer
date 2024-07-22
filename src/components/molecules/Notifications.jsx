import React from 'react';
import { useNotification } from '../atoms/NotificationContext';

const Notifications = () => {
  const { notifications } = useNotification();

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden">
      <div className="bg-blue-600 text-white p-4">
        <h2 className="text-lg font-bold">Notificaciones</h2>
      </div>
      <div className="p-4">
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <div key={index} className="bg-blue-100 p-2 mb-2 rounded-md">
              {notification}
            </div>
          ))
        ) : (
          <div className="text-gray-500">No hay notificaciones.</div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
