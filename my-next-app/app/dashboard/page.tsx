
"use client"
import { useState } from 'react';
import Sidebar from './sidbar';
import Booking from './booking';
import Users from './user';
import './style/page.css';

const Dashboard = () => {
  const [selectedSection, setSelectedSection] = useState<string>('Dashboard');

  const renderSection = () => {
    switch (selectedSection) {
      case 'Booking':
        return <Booking />;
      case 'Users':
        return <Users />;
      default:
        return <div>Welcome to the Dashboard!</div>;
    }
  };

  return (
    <div className="container">
      <Sidebar onSelect={setSelectedSection} />
      <main className="main">
        {renderSection()}
      </main>
    </div>
  );
};

export default Dashboard;
