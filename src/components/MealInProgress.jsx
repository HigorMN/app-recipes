import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../Context/Context';
import { localStorageDoneRecipes, localStorageInProgressRecipes } from '../serviceLocal';
import ButtonFavoriteRecipe from './ButtonFavoriteRecipe';
import ButtonShareRecipe from './ButtonShareRecipe';
import MealDetailsHeader from '../images/MealDetailsHeader.svg';

import './MealsAndDrick.css';
import './Buttons-favorite-share.css';
import './InProgress.css';

export default function MealInProgress() {
  const [mealData, setMealData] = useState([]);
  const [mealVideoId, setMealVideoId] = useState('');
  const [mealIngredients, setMealIngredients] = useState([]);
  const [finishDisible, setFinishDisible] = useState(true);

  const history = useHistory();
  const id = history.location.pathname.split('/')[3];

  const getLocal = localStorageInProgressRecipes();

  if (!Object.keys(getLocal.meals).includes(id)) {
    getLocal.meals[id] = [];
  }

  const { setApiMeal, setTypeRecipe } = useContext(Context);

  useEffect(() => {
    const requestApi = async () => {
      const endPoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const response = await (await fetch(endPoint)).json();
      setMealData(response.meals[0]);
      setApiMeal(response.meals[0]);

      const Ingredients = Object.entries(response.meals[0])
        .filter((e) => e[0].includes('strIngredient') && e[1] !== '' && e[1] !== null)
        .map((e) => e[1]);

      setTypeRecipe('meal');
      setMealIngredients(Ingredients);
      setMealVideoId(response.meals[0].strYoutube.split('=')[1]);
    };
    requestApi();
  }, [id, setApiMeal, setTypeRecipe]);

  const handleCheckbox = (target, element) => {
    if (target.checked) {
      target.parentNode.className = 'Recipe__label scratched';
      getLocal.meals[id] = [...getLocal.meals[id], element];
      localStorage.setItem('inProgressRecipes', JSON.stringify(getLocal));
      if (JSON.stringify(getLocal.meals[id]) === JSON.stringify(mealIngredients)) {
        setFinishDisible(false);
      } else {
        setFinishDisible(true);
      }
    } else {
      target.parentNode.className = 'Recipe__label';
      const arrayLocalId = [...getLocal.meals[id]];
      const index = arrayLocalId.indexOf(element);
      arrayLocalId.splice(index, 1);
      getLocal.meals[id] = arrayLocalId;
      localStorage.setItem('inProgressRecipes', JSON.stringify(getLocal));
    }
  };

  const finishRecipe = () => {
    const getLocalDone = localStorageDoneRecipes();
    const dateNow = new Date();

    const recipe = {
      id,
      nationality: mealData.strArea,
      name: mealData.strMeal,
      category: mealData.strCategory,
      image: mealData.strMealThumb,
      tags: mealData.strTags.split(','),
      alcoholicOrNot: '',
      type: 'meal',
      doneDate: dateNow.toISOString(),
    };

    localStorage.setItem('doneRecipes', JSON.stringify([...getLocalDone, recipe]));
    history.push('/app-recipes/done-recipes');
  };

  return (
    <>
      <header className="Recipe-header">
        <nav className="Btns__share__favorite__container">
          <div className="Recipe__category__container">
            <img src={ MealDetailsHeader } alt="Drink Details Header" />
            <p data-testid="recipe-category">{mealData.strCategory}</p>
          </div>
          <div className="Btns__container">
            <ButtonShareRecipe />
            <ButtonFavoriteRecipe />
          </div>
        </nav>
        <img
          src={ mealData.strMealThumb }
          alt={ mealData.strMeal }
          data-testid="recipe-photo"
          className="recipe-photo"
        />
        <h1 data-testid="recipe-title" className="recipe-title">{mealData.strMeal}</h1>
      </header>
      <main className="Foods-recipe-main">
        <h1 className="recipe-titles">Ingredients</h1>
        <div data-testid="instructions" className="Foods-recipe-ingredient">
          {mealIngredients.map((e, index) => (
            <label
              htmlFor={ e }
              key={ index }
              data-testid={ `${index}-ingredient-step` }
              className={ getLocal.meals[id].includes(e)
                ? 'Recipe__label scratched' : 'Recipe__label' }
            >
              <input
                type="checkbox"
                id={ e }
                checked={ getLocal.meals[id].includes(e) || onchange }
                onClick={ ({ target }) => handleCheckbox(target, e) }
                className="checkbox"
              />
              <p className="Recipe__Ingredient__name">{e}</p>
            </label>
          ))}
        </div>
        <h1 className="recipe-titles">Instructions</h1>
        <div className="Foods-recipe-instructions">
          <p data-testid="instructions">
            {mealData.strInstructions}
          </p>
        </div>
        <h1 className="recipe-titles">Video</h1>
        <div>
          <iframe
            width="100%"
            height="205"
            src={ `https://www.youtube.com/embed/${mealVideoId}?controls=1` }
            title="YouTube video player"
            data-testid="video"
            name="Vídeo"
          />
        </div>
      </main>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ finishDisible }
        onClick={ finishRecipe }
        className="start-recipe-btn"
      >
        finish recipe
      </button>
    </>
  );
}
