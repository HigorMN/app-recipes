import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import logoRecipes from '../images/logoRecipes.png';
import tomate from '../images/tomate.png';

const PASSWORD_MIN = 6;

export default function Login() {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    history.push('app-recipes/meals');
    localStorage.setItem('user', JSON.stringify({ email }));
  };

  return (
    <main>
      <div className="header-login">
        <img src={ logoRecipes } alt="Logo recipes" className="login-logo" />
        <img src={ tomate } alt="Tomate" className="login-tomate" />
      </div>
      <form onSubmit={ handleSubmit } className="center login-form">
        <h1 className="login-title">LOGIN</h1>
        <input
          type="email"
          name="email"
          value={ email }
          onChange={ ({ target: { value } }) => setEmail(value) }
          data-testid="email-input"
          placeholder="Email"
          className="login-input"
        />
        <input
          type="password"
          name="password"
          value={ senha }
          onChange={ ({ target: { value } }) => setSenha(value) }
          data-testid="password-input"
          placeholder="Password"
          className="login-input"
        />
        <button
          type="submit"
          disabled={ !(senha.length > PASSWORD_MIN && /\S+@\S+\.\S+/.test(email)) }
          data-testid="login-submit-btn"
          className="login-button"
        >
          ENTER
        </button>
      </form>
    </main>
  );
}
