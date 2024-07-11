import React, { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import axios from 'axios';

interface Notification {
  id: number;
  message: string;
  created_at: string;
}

const socket: Socket = io('http://localhost:8080');

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);

  useEffect(() => {
    axios.get<Notification[]>('http://localhost:8080/notifications')
      .then((resp) => {
        setNotifications(resp.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    socket.on('notification', (notification: Notification) => {
      setNotifications((prevNotifications) => [notification, ...prevNotifications]);
      setUnreadCount((prevCount) => prevCount + 1); 
    });

    return () => {
      socket.off('notification');
    };
  }, []);

  const clearNotifications = () => {
    setUnreadCount(0);
  };

  return (
    <div>
      <h2>Notifications</h2>
      <button onClick={clearNotifications}>
        Notifications non lues: {unreadCount}
      </button>
      <ul>
        {notifications.map((notif) => (
          <li key={notif.id}>{notif.message} - {new Date(notif.created_at).toLocaleString()}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
