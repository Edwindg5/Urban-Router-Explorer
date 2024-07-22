import React from 'react';
import { useNotification } from '../atoms/NotificationContext';

const Notifications = () => {
  const { notifications } = useNotification();

  return (
    <div className="fixed top-0 right-0 p-4">
      {notifications.map((notification, index) => (
        <div key={index} className="mb-2 p-4 bg-red-500 text-white rounded-lg shadow-lg">
          {notification}
        </div>
      ))}
    </div>
  );
};

export default Notifications;
