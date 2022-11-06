import React from 'react';
import './Footer.css';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function Footer() {
  const history = useHistory();

  return (
    <footer className="footer" data-testid="footer">
      <button
        onClick={ () => history.push('app-recipes/drinks') }
        type="button"
        className="left"
      >
        <img src={ drinkIcon } alt="Drink icon" data-testid="drinks-bottom-btn" />
      </button>

      <button
        onClick={ () => history.push('app-recipes/meals') }
        type="button"
        className="right"
      >
        <img data-testid="meals-bottom-btn" src={ mealIcon } alt="Meal icon" />
      </button>
    </footer>
  );
}
