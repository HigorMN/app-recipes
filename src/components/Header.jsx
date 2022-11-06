import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import Context from '../Context/Context';
import './Header.css';

import logoRecipesapp from '../images/logoRecipesapp.svg';
import Bell from '../images/Bell.svg';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import favoriteIcon from '../images/favoriteIcon.svg';
import perfilIcon from '../images/perfilIcon.svg';
import doneIcon from '../images/doneIcon.svg';

const rotaProfile = '/app-recipes/profile';
const rotaMeals = '/app-recipes/meals';
const rotaDrinks = '/app-recipes/drinks';

export default function Header() {
  const { appearSearchBar, searchBarAppear } = useContext(Context);
  const history = useHistory();

  const route = history.location.pathname;
  const setTitles = () => {
    const rota = history.location.pathname;
    if (rota === rotaProfile) {
      return 'Profile';
    }
    if (rota === rotaMeals) {
      return 'Meals';
    }
    if (rota === rotaDrinks) {
      return 'Drinks';
    }
    if (rota === '/app-recipes/done-recipes') {
      return 'Done Recipes';
    }
    if (rota === '/app-recipes/favorite-recipes') {
      return 'Favorite Recipes';
    }
  };

  const setImg = () => {
    const rota = history.location.pathname;

    switch (rota) {
    case rotaMeals:
      return mealIcon;
    case rotaDrinks:
      return drinkIcon;
    case '/app-recipes/favorite-recipes':
      return favoriteIcon;
    case rotaProfile:
      return perfilIcon;
    case '/app-recipes/done-recipes':
      return doneIcon;
    default:
      return mealIcon;
    }
  };

  return (
    <>
      <header className="Header__container">
        <div className="Header__container__1">
          <Link to="/app-recipes/meals">
            <img src={ Bell } alt="campaninha" />
            <img className="Header__logo" src={ logoRecipesapp } alt="logo Recipes app" />
          </Link>
        </div>
        <div className="Header__container__2">
          {(route === rotaMeals || route === rotaDrinks) && (
            <button onClick={ appearSearchBar } type="button" className="Header__button">
              <img
                data-testid="search-top-btn"
                src={ searchIcon }
                alt="search=icon"
              />
            </button>
          )}
          <button
            className="Header__button"
            type="button"
            onClick={ () => history.push('/app-recipes/profile') }
          >
            <img
              data-testid="profile-top-btn"
              src={ profileIcon }
              alt="profile-icon"
            />
          </button>
        </div>
      </header>
      <div className="Recipe__title__container">
        <img src={ setImg() } alt="meal icon" />
        <h1 data-testid="page-title">{setTitles()}</h1>
      </div>
      {searchBarAppear && <SearchBar />}
    </>
  );
}
