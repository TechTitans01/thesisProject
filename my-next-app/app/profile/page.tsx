"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../styles/profile.css";
import { useAuth } from "../context/authcontex/Authcontex";
export default function Profile() {


  const {token}=useAuth()
  const [dropdownOpen, setDropdownOpen] = useState(false);

  
  const toggleDropdown = () => {
      setDropdownOpen(!dropdownOpen);
  };
  const [data, setData] = useState<any>({});
  const { user } = useAuth();
  const { logOut } = useAuth();
  useEffect(() => {
    axios.get(`http://localhost:8080/api/user/getone/${user.id}`)
      .then((resp) => {
        console.log(resp.data);
        setData(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (<>
  <nav id="navBar" className='navbar-white'>
    {/* <Image className="logo" src="/img/travel.jpg" width={100} height={100} alt="dtg" quality={75} priority={false}/> */}
    <ul className='nav-links'>
        <li><a href="/" className="active">Home</a></li>
        <li><a href="/contactus" className="active">contact us</a></li>
      
    </ul>
    {!token ? (
            <a href="/auth" className="register-btn">
              {" "}
              Register Now
            </a>
          ) : (
            <div className="toggle-container">
              <div className="toggle-option active">
                <img
                  className="noti"
                  src="https://th.bing.com/th/id/OIP.EkL3E_EYbt08OV84-Dm2GwAAAA?rs=1&pid=ImgDetMain"
                  alt="notification"
                />
              </div>
              <div className="toggle-option" onClick={toggleDropdown}>
                <img
                  className="usee"
                  src="https://img.icons8.com/ios-glyphs/30/000000/user--v1.png"
                  alt="User"
                />
              </div>
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <ul>
                    <li>
                      <a href="/editprofile">Edit Profile</a>
                    </li>
                   
                    <li>
                      <a href="/auth" onClick={()=>{logOut()}}>Logout</a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
    </nav>
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
    </>
  );
}