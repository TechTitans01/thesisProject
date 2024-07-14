"use client";

import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useAuth } from '../../context/authcontex/Authcontex';
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { signIn } from 'next-auth/react';
import "./signup.css"

const SignupPage: React.FC = () => {
  const { signupAction } = useAuth();
  const router = useRouter();
  const [state, setState] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleOnSubmit = async (evt: FormEvent) => {
    evt.preventDefault();
    const { username, email, password } = state;

    try {
      await signupAction({ username, email, password });
      
      setState({
        username: '',
        email: '',
        password: ''
      });
      router.push("/editprofile")
    } catch (error) {
      alert('Signup failed');
      console.error('Error:', error);
    }
  };

  const handleSocialLogin = (provider: string) => {
    signIn(provider);
  };

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Create Account</h1>
        <div className="social-container">
          <FontAwesomeIcon
            icon={faGoogle}
            className="social-icon"
            onClick={() => handleSocialLogin('google')}
          />
          <FontAwesomeIcon
            icon={faFacebook}
            className="social-icon"
            onClick={() => handleSocialLogin('facebook')}
          />
          <FontAwesomeIcon
            icon={faLinkedin}
            className="social-icon"
            onClick={() => handleSocialLogin('linkedin')}
          />
        </div>
        <span>or use your email for registration</span>
        <input
          type="text"
          name="username"
          value={state.username}
          onChange={handleChange}
          placeholder="Username"
        />
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupPage;
