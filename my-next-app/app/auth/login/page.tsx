// components/SignInForm.tsx
import React, { ChangeEvent, FormEvent, useState } from 'react';

const SignInForm: React.FC = () => {
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
        <div className="social-container">
          <a href="#" className="social">
            <i className="fab fa-facebook-f" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-google-plus-g" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-linkedin-in" />
          </a>
        </div>
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
      </form>
    </div>
  );
};

export default SignInForm;
