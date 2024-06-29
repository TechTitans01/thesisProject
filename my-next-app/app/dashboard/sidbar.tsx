
// use client
import { FC } from 'react';
import './style/sidbar.css';

interface SidebarProps {
  onSelect: (section: string) => void;
}

const Sidebar: FC<SidebarProps> = ({ onSelect }) => {
  return (
    <div className="sidebar">
      <div className="profile">
        <div className="avatar"></div>
        <p className="name">Name Admin</p>
      </div>
      <nav className="nav">
        <ul>
          <li onClick={() => onSelect('Dashboard')}>Dashboard</li>
          <li onClick={() => onSelect('Booking')}>Booking</li>
          <li onClick={() => onSelect('Users')}>Users</li>
          <li onClick={() => onSelect('Messages')}>Messages</li>
          <li onClick={() => onSelect('Programs')}>Programs</li>
          <li onClick={() => onSelect('FAQ')}>FAQ</li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
