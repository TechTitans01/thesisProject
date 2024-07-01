"use client";
import { useEffect, useState } from "react";
import Image from 'next/image';
import "../styles/editprofile.css";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export default function EditProfile() {
  const [fullname, setFullname] = useState<string>("");
  const [file, setFile] = useState<File | any>(null);
  const [username, setUsername] = useState<string>("");
  const [created, setCreated] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [formattedDate, setFormattedDate] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("");
  const [gender, setGender] = useState<string>("");

  const formatDateString = (isoString: string) => {
    const date = new Date(isoString);
    const day = date.getUTCDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getUTCFullYear();
    return `${day} ${month} ${year}`;
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/user/getone/1`)
      .then((resp) => {
        setUsername(resp.data.username);
        setCreated(formatDateString(resp.data.createdAt));
        setImageUrl(resp.data.image);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const uploadImage = () => {
    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", "raslen bg");
    axios
      .post("cloudinary://<your_api_key>:<your_api_secret>@dtyq6i57z", form)
      .then((result) => {
        setImageUrl(result.data.secure_url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const confirmPass = () => {
    if (newPassword !== confirmPassword) {
      toast.error("Error: Passwords do not match");
      return;
    }

    axios
      .put("http://localhost:8080/api/user/updateUser", {
        fullname: fullname,
        phoneNumber: phoneNumber,
        email: email,
        address: address,
        password: password,
        newPassword: newPassword,
        image: imageUrl,
        birthday: birthday,
        gender: gender,
      })
      .then((response: any) => {
        console.log(response.data);
        toast.success("Profile updated successfully!");
      })
      .catch((error: any) => {
        console.error(error);
        toast.error("An error occurred while updating the profile.");
      });
  };

  return (
    <>
      <nav className="navbar">
        <ul className="navbar-list">
          <li className="navbar-item">
            <a href="/" className="navbar-link">
              Home
            </a>
          </li>
          <li className="navbar-item">
            <a href="/contactus" className="navbar-link">
              Contact Us
            </a>
          </li>
          <li className="navbar-item">
            <a href="/logout" className="navbar-link">
              Logout
            </a>
          </li>
        </ul>
      </nav>
      <div className="container">
      <video autoPlay muted loop className="video-background">
        <source src="https://cdn.pixabay.com/video/2019/04/23/23011-332483109_large.mp4" type="video/mp4" />
        
      </video>
        <div className="profile-sidebar">
          <div className="profile-pic">
            <img src={imageUrl||"https://th.bing.com/th/id/OIP.urs9CLtRNkSZtaP2K1uOIAHaHa?rs=1&pid=ImgDetMain"}  />
          </div>
          <div className="upload-photo">
            <button
              className="addProduct-button addProduct-upload-button"
              type="button"
              onClick={() => {
                document.getElementById("fileInput")?.click();
              }}
            >
              Select
            </button>
            <button onClick={() => uploadImage()}>Upload New Photo</button>
            <input
              id="fileInput"
              className="addProduct-file-input"
              type="file"
              onChange={(e: any) => {
                setFile(e.target.files[0]);
              }}
            />
            <p>
              <b>Welcome:</b> {username}
            </p>
          </div>
          <div className="member-since">
            <p>Member Since: {created}</p>
          </div>
          <div>
            <h3>Your Profile</h3>
          </div>
        </div>
        <div className="profile-edit">
          <h2>
            <b>Edit Profile</b>
          </h2>
          <div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  onChange={(e) => setFullname(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="birthday">Birthday</label>
              <input
                type="date"
                id="birthday"
                name="birthday"
                onChange={(e) => setBirthday(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="password">Current Password</label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button type="submit" onClick={() => confirmPass()}>
              Update Info
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}