"use client"
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { usePathname } from "next/navigation";
import "../../styles/chat.css"

const socket = io('http://localhost:8080'); 
import { useAuth } from "../../context/authcontex/Authcontex";
import axios from 'axios';
import Image from 'next/image';

export default function Chat  ( )  {
  const [messageInput, setMessageInput] = useState<string>('');
  const [messages, setMessages] = useState<any>([]);
  const pathname = usePathname();
  const [imageFreind, setImage] = useState<any>({});
  const freindId = pathname.split("/")[2]
  const { user } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const {token}=useAuth()
  const [userr,set]=useState<any>(JSON.parse(localStorage?.getItem("user")||"{}"))
  const [ usee,  setuse] = useState<any>({});
 
  const { logOut } = useAuth();
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
};



  useEffect(()=>{
    axios.get(`http://localhost:8080/api/user/getone/${freindId}`)
    .then((resp) => {
      console.log(resp.data);
      setImage(resp.data.image);
    })
    .catch((err) => {
      console.log(err);
    });

    axios.get(`http://localhost:8080/api/user/getone/${userr.id}`)
    .then((resp) => {
      console.log(resp.data);
      setuse(resp.data);
    })
    .catch((err) => {
      console.log(err);
    });
  },[freindId])

  useEffect(() => {
   
    socket.emit('joinRoom', userr.id);
    console.log(user);

    // Listen for new messages
    // socket.on('newMessage', (message) => {
    //   setMessages((prevMessages: any) => [...prevMessages, message]);
    // });

    return () => {
      
      socket.off('newMessage');
    };
  }, [freindId]);

  const sendMessage = () => {
    const messageData = {
      content: messageInput,
      senderId: userr.id,
      receiverId: freindId,
    };

    socket.emit('sendMessage', messageData);
    setMessageInput('');
  };

  // useEffect(() => {
  //   axios.get(`http://localhost:8080/api/chat/messages/${userr.id}/${freindId}`)
  //     .then((resp) => {
  //       setMessages(resp.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });

    


  // },[messages] ); 

  useEffect(() => {
    axios.get(`http://localhost:8080/api/chat/messages/${userr.id}/${freindId}`)
      .then((resp) => {
        const sortedMessages = resp.data.sort((a:any, b:any) => a.id - b.id);
        setMessages(sortedMessages);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [messages]);

  return (
<><nav id="navBar" className='navbar-white'>
    <Image className="logo" src="/img/logotr.png" width={120} height={120} alt="dtg" quality={75} priority={false}/>
    <ul className='nav-links'>
        <li><a href="/" className="active">Home</a></li>
        <li><a href="/contactus" className="active">Contact Us</a></li>
      
    </ul>
    {!token ? (
            <a href="/auth" className="register-btn">
             
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



    <div className="chat-container">
      <div className="chat-header">
        Chat Room
      </div>
      <div className="chat-messages">
        {messages.map((msg: any, index: number) => (
          <div key={index} className={`chat-message ${msg.senderId === userr.id ? 'user' : 'friend'}`}>
            <img src={msg.senderId === userr.id ? usee.image : imageFreind} alt="User Profile" />
            <div className="message-content">
              {msg.content}
            </div>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
    </> );
};