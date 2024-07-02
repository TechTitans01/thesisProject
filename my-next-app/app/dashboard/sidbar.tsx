// use client
import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faCalendarAlt, faUsers, faEnvelope, faTv, faQuestionCircle, faHotel } from '@fortawesome/free-solid-svg-icons';
import './style/sidbar.css';

interface SidebarProps {
  onSelect: (section: string) => void;
}

const Sidebar: FC<SidebarProps> = ({ onSelect }) => {
  return (
    <div className="sidebar">
      <div className="profile">
      </div>
      <nav className="nav">
        <ul>
          
          <li onClick={() => onSelect('Booking')}>
            <FontAwesomeIcon icon={faCalendarAlt} /> <span>Booking</span>
          </li>
          <li onClick={() => onSelect('Users')}>
            <FontAwesomeIcon icon={faUsers} /> <span>Users</span>
          </li>
          <li onClick={() => onSelect('Messages')}>
            <FontAwesomeIcon icon={faEnvelope} /> <span>Messages</span>
          </li>
          <li onClick={() => onSelect('Distination')}>
            <FontAwesomeIcon icon={faTv} /> <span>Distination</span>
          </li>
          <li onClick={() => onSelect('FAQ')}>
            <FontAwesomeIcon icon={faQuestionCircle} /> <span>FAQ</span>
          </li>
          <li onClick={() => onSelect('Hotels')}>
            <FontAwesomeIcon icon={faHotel} /> <span>Hotels</span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
