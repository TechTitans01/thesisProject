

// use client
import { FC, useEffect, useState } from 'react';
import axios from 'axios';
import './style/user.css';

interface User {
  name: string;
}

const Users: FC = () => {
  const [users, setUsers] = useState<User[]>([]); // Specify the type of 'users'

  useEffect(() => {
    axios.get('http://localhost:8080/api/user/getall')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the users!", error);
      });
  }, []);

  return (
    <div className="users">
      <h3>Users</h3>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            <img  className="user-avatar" src={user.image} alt="" srcset="" />
            <span>{user.username}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
