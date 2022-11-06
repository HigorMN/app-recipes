import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './MealsAndDrinks.css';
import './style/Beef.css';
import './style/Breakfast.css';
import './style/Dessert.css';
import './style/Chicken.css';
import './style/Goat.css';
import Context from '../Context/Context';
import CardMeals from '../pages/CardMeals';

export default function Meals() {
  const [meals, setMeals] = useState([]);
  const [mealsCat, setMealsCat] = useState([]);
  const { call, setCall } = useContext(Context);

  useEffect(() => {
    const getMeal = async () => {
      const endPoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const reponse = await (await fetch(endPoint)).json();
      setMeals(reponse.meals.slice(0, Number('12')));
    };
    const getMealCategories = async () => {
      const request = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      const requestJson = await request.json();
      setMealsCat(requestJson.meals.slice(0, Number('5')));
    };
    getMeal();
    getMealCategories();
  }, []);

  const allFilter = async () => {
    const endPoin = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const reponse = await (await fetch(endPoin)).json();
    setMeals(reponse.meals.slice(0, Number('12')));
    setCall(false);
  };

  const handleFilter = async (targets) => {
    const get = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${targets.value}`;
    const getJson = await (await fetch(get)).json();
    setCall(false);
    if (targets.checked) {
      setMeals(getJson.meals.slice(0, Number('12')));
    } else {
      await allFilter();
    }
  };

  return (
    <main className="Recipe__main">
      <div className="Recipe__category__container">
        <label htmlFor="all" className="All" data-testid="All-category-filter">
          <input
            type="checkbox"
            onClick={ () => allFilter() }
            id="all"
          />
          <i />
          <p className="Recipe__category__name">All</p>
        </label>
        {mealsCat.map((element, i) => (
          <label
            htmlFor={ element.strCategory }
            key={ i }
            className={ element.strCategory }
            data-testid={ `${element.strCategory}-category-filter` }
          >
            <input
              key={ i }
              type="checkbox"
              value={ element.strCategory }
              onClick={ ({ target }) => handleFilter(target) }
              id={ element.strCategory }
              name="category"
            />
            <i />
            <p className="Recipe__category__name">{element.strCategory}</p>
          </label>
        ))}
      </div>
      {call ? <CardMeals /> : (
        <div className="Recipes__container__card">
          {meals.map((element, i) => (
            <Link
              key={ i }
              to={ `/app-recipes/meals/${element.idMeal}` }
              className="Recipe__card__name"
            >
              <div
                key={ i }
                data-testid={ `${i}-recipe-card` }
                className="Recipe__card"
              >
                <img
                  src={ element.strMealThumb }
                  data-testid={ `${i}-card-img` }
                  alt={ element.strMeal }
                  className="Recipe__img"
                />
                <div className="Recipe__card__name__container">
                  <p
                    className="Recipe__card__name"
                    data-testid={ `${i}-card-name` }
                  >
                    {element.strMeal}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
