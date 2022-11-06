import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';

import './Profile.css';

import doneIcon from '../images/doneIcon.svg';
import favoriteIcon from '../images/favoriteIcon.svg';
import logoutIcon from '../images/logoutIcon.svg';

export default function Profile() {
  const [validEmail, setValidEmail] = useState('');

  useEffect(() => {
    const callLocal = () => {
      const email = JSON.parse(localStorage.getItem('user'))
      ?? { email: '' };
      setValidEmail(email.email);
    };

    callLocal();
  }, []);

  const history = useHistory();

  const handleBtnDoneRecipes = () => {
    history.push('/app-recipes/done-recipes');
  };

  const handleBtnFavoriteRecipes = () => {
    history.push('/app-recipes/favorite-recipes');
  };

  const handleBtnLogout = () => {
    localStorage.clear('user');
    history.push('/app-recipes/');
  };
  return (
    <>
      <Header />
      <div className="Profile__container__email">
        <span data-testid="profile-email">
          {validEmail}
        </span>
      </div>
      <div>
        <button
          data-testid="profile-done-btn"
          type="button"
          onClick={ () => handleBtnDoneRecipes() }
          className="Profile__button"
        >
          <img src={ doneIcon } alt="doneIcon" />
          <p>Done Recipes</p>
        </button>
      </div>
      <div>
        <button
          data-testid="profile-favorite-btn"
          type="button"
          onClick={ () => handleBtnFavoriteRecipes() }
          className="Profile__button"
        >
          <img src={ favoriteIcon } alt="favoriteIcon" />
          Favorite Recipes
        </button>
      </div>
      <div>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => handleBtnLogout() }
          className="Profile__button"
        >
          <img src={ logoutIcon } alt="logoutIcon" />
          <p>Logout</p>
        </button>
      </div>
    </>
  );
}
