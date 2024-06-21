"use client"
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGooglePlusG, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

const Login: React.FC = () => {
  const [state, setState] = useState({
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

  const handleOnSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    const { email, password } = state;
    alert(`You are logged in with email: ${email} and password: ${password}`);

    setState({
      email: '',
      password: ''
    });
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Sign in</h1>
       
        <span>or use your account</span>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
        />
        <a href="#">Forgot your password?</a>
        <button type="submit">Sign In</button>
        <div className="social-container">
          <a href="#" className="social" style={{ color: '#3b5998' }}>
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          <a href="#" className="social" style={{ color: '#db4437' }}>
            <FontAwesomeIcon icon={faGooglePlusG} />
          </a>
          <a href="#" className="social" style={{ color: '#0e76a8' }}>
            <FontAwesomeIcon icon={faLinkedinIn} />
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;
