import { NextPage } from 'next';
import Sidebar from '../components/Layout';
import '../styles/Dashboard.css';

const Dashboard: NextPage = () => {
  return (
    <Sidebar>
      <div className="dashboard">
        <div className="card">
          <h3>Booking</h3>
          <div className="chart"></div>
          <p>824 Over Last Month 2.4%</p>
        </div>
        <div className="card">
          <h3>Registration</h3>
          <div className="chart"></div>
          <p>1023 Users Have Registered</p>
        </div>
        <div className="users">
          <h3>Users</h3>
          <ul>
            {Array.from({ length: 10 }).map((_, index) => (
              <li key={index}>
                <div className="user-avatar"></div>
                <span>#445656 User Name</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
