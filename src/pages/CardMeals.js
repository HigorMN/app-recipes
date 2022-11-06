import React, { useContext } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import Context from '../Context/Context';

export default function CardMeals() {
  const { recipesData } = useContext(Context);
  return (
    <div className="Recipes__container__card">
      {recipesData.map((recipe, index) => (
        <Link
          key={ recipe.idMeal }
          to={ `/app-recipes/meals/${recipe.idMeal}` }
          className="Recipe__card__name"
        >
          <div data-testid={ `${index}-recipe-card` } className="Recipe__card">
            <img
              data-testid={ `${index}-card-img` }
              src={ recipe.strMealThumb }
              alt={ recipe.strMeal }
              className="Recipe__img"
            />
            <div className="Recipe__card__name__container">
              <p data-testid={ `${index}-card-name` }>{recipe.strMeal}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
