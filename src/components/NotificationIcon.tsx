import React, { useState } from 'react';

interface Notification {
  id: number;
  message: string;
}

const NotificationIcon: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, message: 'New message received' },
    { id: 2, message: 'Task overdue' },
    { id: 3, message: 'Reminder: Meeting at 3 PM' },
  ]);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };


  const deleteNotification = (id: number) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };

  return (
    <div className="relative inline-block">
      <button onClick={handleToggle} className="bg-transparent border-none cursor-pointer p-0">
        <span className="material-symbols-outlined text-yellow-500 text-2xl">notifications_active</span>
        {notifications.length > 0 && <span className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded-full leading-none">{notifications.length}</span>}
      </button>
      {isOpen && (
        <div className="absolute top-full right-0 bg-white border border-gray-300 rounded p-2 z-10 w-60 text-left text-black shadow-md">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div key={notification.id} className="flex items-center justify-between py-1 border-b last:border-b-0">
                <p>{notification.message}</p>
                <button onClick={() => deleteNotification(notification.id)} className="border-none rounded cursor-pointer p-1 mx-1 bg-red-100 hover:bg-red-200"><span className="material-symbols-outlined text-red-500 align-middle text-lg">delete</span></button>
              </div>
            ))
          ) : (
            <p>No new notifications</p>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationIcon;