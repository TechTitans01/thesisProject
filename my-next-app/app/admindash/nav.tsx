
import './dashstyle/nav.css';

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <div className="profile">
        <div className="avatar"></div>
        <p className="name">Name Admin</p>
      </div>
      <nav className="nav">
        <ul>
          <li>Dashboard</li>
          <li>Booking</li>
          <li>Users</li>
          <li>Messages</li>
          <li>Programs</li>
          <li>FAQ</li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
