"use client"
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGooglePlusG, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

const Signup: React.FC = () => {
  const [state, setState] = useState({
    name: '',
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
    const { name, email, password } = state;
    alert(`You are signed up with name: ${name}, email: ${email}, and password: ${password}`);

    setState({
      name: '',
      email: '',
      password: ''
    });
  };

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Create Account</h1>

        
        <input
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
          placeholder="Name"
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

export default Signup;
