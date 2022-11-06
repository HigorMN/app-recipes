import React, { useContext } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import Context from '../Context/Context';

export default function CardDrinks() {
  const { recipesData } = useContext(Context);
  return (
    <div className="Recipes__container__card">
      {recipesData.map((recipe, index) => (
        <Link
          key={ recipe.idDrink }
          to={ `/app-recipes/drinks/${recipe.idDrink}` }
          className="Recipe__card__name"
        >
          <div
            data-testid={ `${index}-recipe-card` }
            className="Recipe__card"
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ recipe.strDrinkThumb }
              alt={ recipe.strDrink }
              className="Recipe__img"
            />
            <div className="Recipe__card__name__container">
              <p data-testid={ `${index}-card-name` }>{recipe.strDrink}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
