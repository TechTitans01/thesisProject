"use client"
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { usePathname } from "next/navigation";
import "../../styles/chat.css"

const socket = io('http://localhost:8080'); 
import { useAuth } from "../../context/authcontex/Authcontex";
import axios from 'axios';

export default function Chat  ( )  {
  const [messageInput, setMessageInput] = useState<string>('');
  const [messages, setMessages] = useState<any>([]);
  const pathname = usePathname();
  const [imageFreind, setImage] = useState<any>({});
  const freindId = pathname.slice(pathname.length - 1);
  const { user } = useAuth();



  useEffect(()=>{
    axios.get(`http://localhost:8080/api/user/getone/${freindId}`)
    .then((resp) => {
      console.log(resp.data);
      setImage(resp.data.image);
    })
    .catch((err) => {
      console.log(err);
    });
  },[freindId])

  useEffect(() => {
   
    socket.emit('joinRoom', user.id);
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
      senderId: user.id,
      receiverId: freindId,
    };

    socket.emit('sendMessage', messageData);
    setMessageInput('');
  };

  useEffect(() => {
    axios.get(`http://localhost:8080/api/chat/messages/${user.id}/${freindId}`)
      .then((resp) => {
        setMessages(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });

    


  }, [messages]); 

  return (
    <div className="chat-container">
      <div className="chat-header">
        Chat Room
      </div>
      <div className="chat-messages">
        {messages.map((msg: any, index: number) => (
          <div key={index} className={`chat-message ${msg.senderId === user.id ? 'user' : 'friend'}`}>
            <img src={msg.senderId === user.id ? user.image : imageFreind} alt="User Profile" />
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
  );
};
