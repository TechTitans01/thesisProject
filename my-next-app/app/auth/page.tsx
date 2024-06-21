"use client"

import React, { useState } from 'react';
import Head from 'next/head';
import LoginPage from './login/login';
import SignupPage from './siginup/signup';
import '../styles/auth.css';

const AuthPage: React.FC = () => {
  const [type, setType] = useState<'signIn' | 'signUp'>('signIn');
  const handleOnClick = (text: 'signIn' | 'signUp') => {
    if (text !== type) {
      setType(text);
    }
  };

  const containerClass = `container ${type === 'signUp' ? 'right-panel-active' : ''}`;

  return (
    <div className="rf">
    
      <div className={containerClass} id="container">
        <SignupPage />
        <LoginPage />
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button className="ghost" id="signIn" onClick={() => handleOnClick('signIn')}>
              <svg width="180px" height="60px" viewBox="0 0 180 60">
          <polyline points="179,1 179,59 1,59 1,1 179,1" />
          <polyline points="179,1 179,59 1,59 1,1 179,1" />
        </svg>
  <span>Sign In</span>
</button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className="ghost" id="signUp" onClick={() => handleOnClick('signUp')}>
              <svg width="180px" height="60px" viewBox="0 0 180 60">
          <polyline points="179,1 179,59 1,59 1,1 179,1" />
          <polyline points="179,1 179,59 1,59 1,1 179,1" />
        </svg>
  <span>Sign Up</span>
</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
