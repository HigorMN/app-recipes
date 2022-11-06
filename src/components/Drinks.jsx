import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './MealsAndDrinks.css';
import './style/Alldrick.css';
import './style/Drink.css';
import './style/Cocktail.css';
import './style/Shake.css';
import './style/Other.css';
import './style/Cocoa.css';
import Context from '../Context/Context';
import CardDrinks from '../pages/CardDrink';

export default function Drinks() {
  const [drinks, setDrinks] = useState([]);
  const [drinksCat, setDrinksCat] = useState([]);
  const { call, setCall } = useContext(Context);

  useEffect(() => {
    const getCocktail = async () => {
      const endPoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const reponse = await (await fetch(endPoint)).json();
      setDrinks(reponse.drinks.slice(0, Number('12')));
    };
    const getDrinkCategories = async () => {
      const request = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      const requestJson = await request.json();
      setDrinksCat(requestJson.drinks.slice(0, Number('5')));
    };
    getCocktail();
    getDrinkCategories();
  }, []);

  const allFilter2 = async () => {
    const endPoin = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const reponse = await (await fetch(endPoin)).json();
    setDrinks(reponse.drinks.slice(0, Number('12')));
    setCall(false);
  };

  const handleFilter2 = async (targets) => {
    const get = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${targets.value}`;
    const getJson = await (await fetch(get)).json();
    setCall(false);
    if (targets.checked) {
      setDrinks(getJson.drinks.slice(0, Number('12')));
    } else {
      await allFilter2();
    }
  };

  return (
    <main className="Recipe__main">
      <div className="Recipe__category__container">
        <label htmlFor="Alldrick" className="Alldrick" data-testid="All-category-filter">
          <input
            type="checkbox"
            onClick={ () => allFilter2() }
            id="Alldrick"
          />
          <i />
          <p className="Recipe__category__name">All</p>
        </label>
        {drinksCat.map((element, i) => (
          <label
            htmlFor={ element.strCategory }
            key={ i }
            data-testid={ `${element.strCategory}-category-filter` }
            className={ element.strCategory === 'Other/Unknown'
              ? 'Other' : element.strCategory }
          >
            <input
              key={ i }
              type="checkbox"
              value={ element.strCategory }
              id={ element.strCategory }
              onClick={ ({ target }) => handleFilter2(target) }
            />
            <i />
            <p className="Recipe__category__name">{element.strCategory}</p>
          </label>
        ))}
      </div>
      {call ? <CardDrinks /> : (
        <div className="Recipes__container__card">
          {drinks.map((element, i) => (
            <Link
              key={ i }
              to={ `/app-recipes/drinks/${element.idDrink}` }
              className="Recipe__card__name"
            >
              <div
                id={ element.idDrink }
                key={ i }
                className="Recipe__card"
                data-testid={ `${i}-recipe-card` }
              >
                <img
                  src={ element.strDrinkThumb }
                  data-testid={ `${i}-card-img` }
                  alt={ element.strDrink }
                  className="Recipe__img"
                />
                <div className="Recipe__card__name__container">
                  <p data-testid={ `${i}-card-name` }>{element.strDrink}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
