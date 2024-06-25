"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../styles/profile.css";

export default function Profile() {
  const [data, setData] = useState<any>({});

  useEffect(() => {
    axios.get(`http://localhost:8080/api/user/getone/1`)
      .then((resp) => {
        console.log(resp.data);
        setData(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="profile-container">
         <video autoPlay muted loop className="video-background">
        <source src="https://cdn.pixabay.com/video/2019/04/23/23011-332483109_large.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-image">
            <img src={data.image ||"https://th.bing.com/th/id/OIP.urs9CLtRNkSZtaP2K1uOIAHaHa?rs=1&pid=ImgDetMain"} alt="Profile" />
          </div>
          <div className="profile-info">
            <h1>{data.username}</h1>
            <p className="profile-location">{data.address}</p>
            <p className="profile-role">Tourist</p>
            <p className="profile-ranking">Rankings: {data.id}</p>
          </div>
        </div>
        <div className="profile-content">
          <div className="profile-section">
            <h2>Contact Information</h2>
            <div className="profile-details">
              <p><span>Phone:</span> {data.phoneNumber}</p>
              <p><span>Address:</span> {data.address}</p>
              <p><span>Email:</span> {data.email}</p>
              <p><span>Full Name:</span> {data.fullname}</p>
            </div>
          </div>
          <div className="profile-section">
            <h2>Basic Information</h2>
            <div className="profile-details">
              <p><span>Birthday:</span> {data.birthday}</p>
              <p><span>Gender:</span> {data.gender}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}