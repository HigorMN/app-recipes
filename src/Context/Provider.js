import React, { useMemo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Context from './Context';

export default function Provider({ children }) {
  const [searchBarAppear, setSearchBarAppear] = useState(false);
  const [inputFIlter, setInputFIlter] = useState('');
  const [radioIngredient, setRadioIngredient] = useState(false);
  const [radioName, setRadioName] = useState(false);
  const [radioFl, setRadioFl] = useState(false);
  const [apiMeal, setApiMeal] = useState([]);
  const [apiDrink, setApiDrink] = useState([]);
  const [typeRecipe, setTypeRecipe] = useState('');

  const [ingredientsApi, setIngredientsApi] = useState([]);
  const [ingredientsApiName, setIngredientsApiName] = useState([]);
  const [ingredientsApiFl, setIngredientsApiFl] = useState([]);
  const [recipesData, setRecipesData] = useState([]);
  const [call, setCall] = useState(false);

  const history = useHistory();
  const MaxRecipes = 12;
  const alert = 'Sorry, we haven\'t found any recipes for these filters.';

  const appearSearchBar = useCallback(() => {
    setSearchBarAppear(!searchBarAppear);
  }, [searchBarAppear]);

  const handleInputFilter = (string) => {
    setInputFIlter(string);
  };
  const handleFilterIngredient = (ingredient) => {
    setRadioIngredient(ingredient);
  };
  const handleFilterName = (name) => {
    setRadioName(name);
  };
  const handleFilterFIrstLetter = (firstLetter) => {
    setRadioFl(firstLetter);
  };

  const fetchIngredients = useCallback(async () => {
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputFIlter}`;
    const response = await (await fetch(url)).json();
    if (response.meals === null) {
      global.alert(alert);
    } else if (response.meals.length === 1) {
      history.push(`/app-recipes/meals/${response.meals[0].idMeal}`);
    } else {
      setIngredientsApi(response);
      setRecipesData(response.meals.slice(0, MaxRecipes));
    }
  }, [history, inputFIlter]);

  const fetchIngredientsName = useCallback(async () => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputFIlter}`;
    const response = await (await fetch(url)).json();

    if (response.meals === null) {
      global.alert(alert);
    } else if (response.meals.length === 1) {
      history.push(`/app-recipes/meals/${response.meals[0].idMeal}`);
    } else {
      setIngredientsApiName(response);
      setRecipesData(response.meals.slice(0, MaxRecipes));
    }
  }, [history, inputFIlter]);

  const fetchIngredientsFirstLetter = useCallback(async () => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${inputFIlter}`;
    const response = await (await fetch(url)).json();
    if (response.meals === null) {
      global.alert(alert);
    } else if (response.meals.length === 1) {
      history.push(`/app-recipes/meals/${response.meals[0].idMeal}`);
    } else {
      setIngredientsApiFl(response);
      setRecipesData(response.meals.slice(0, MaxRecipes));
    }
  }, [history, inputFIlter]);

  const fetchDrinkIngr = useCallback(async () => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${inputFIlter}`;
    const response = await (await fetch(url)).json();
    if (response.drinks === null) {
      global.alert(alert);
    } else if (response.drinks.length === 1) {
      history.push(`/app-recipes/drinks/${response.drinks[0].idDrink}`);
    } else {
      setIngredientsApi(response);
      setRecipesData(response.drinks.slice(0, MaxRecipes));
    }
  }, [history, inputFIlter]);

  const fetchDrinkName = useCallback(async () => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputFIlter}`;
    const response = await (await fetch(url)).json();
    if (response.drinks === null) {
      global.alert(alert);
    } else if (response.drinks.length === 1) {
      history.push(`/app-recipes/drinks/${response.drinks[0].idDrink}`);
    } else {
      setIngredientsApiName(response);
      setRecipesData(response.drinks.slice(0, MaxRecipes));
    }
  }, [history, inputFIlter]);

  const fetchDrinkFl = useCallback(async () => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${inputFIlter}`;
    const response = await (await fetch(url)).json();
    if (response.drinks === null) {
      global.alert(alert);
    } else if (response.drinks.length === 1) {
      history.push(`/app-recipes/drinks/${response.drinks[0].idDrink}`);
    } else {
      setIngredientsApiFl(response);
      setRecipesData(response.drinks.slice(0, MaxRecipes));
    }
  }, [history, inputFIlter]);

  const setDrinksFilterAPi = useCallback(() => {
    const text = '/app-recipes/drinks';
    const route = history.location.pathname;
    if (route === text && radioIngredient === true) {
      fetchDrinkIngr();
    }
    if (route === text && radioName === true) {
      fetchDrinkName();
    }
    if (route === text && radioFl === true) {
      if (inputFIlter.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      }
      fetchDrinkFl();
    }
  }, [
    fetchDrinkFl,
    fetchDrinkIngr,
    fetchDrinkName,
    history.location.pathname,
    inputFIlter.length,
    radioFl,
    radioIngredient,
    radioName,
  ]);

  const setMealsFilterAPi = useCallback(() => {
    const text = '/app-recipes/meals';
    const route = history.location.pathname;
    if (route === text && radioIngredient === true) {
      fetchIngredients();
    }
    if (route === text && radioName === true) {
      fetchIngredientsName();
    }
    if (route === text && radioFl === true) {
      if (inputFIlter.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      }
      fetchIngredientsFirstLetter();
    }
    setDrinksFilterAPi();
    setCall(true);
  }, [
    fetchIngredients,
    fetchIngredientsFirstLetter,
    fetchIngredientsName,
    history.location.pathname,
    inputFIlter.length,
    radioFl,
    radioIngredient,
    radioName,
    setDrinksFilterAPi,
  ]);

  const contextValue = useMemo(
    () => ({
      searchBarAppear,
      appearSearchBar,
      inputFIlter,
      handleInputFilter,
      handleFilterIngredient,
      handleFilterName,
      handleFilterFIrstLetter,
      radioIngredient,
      radioName,
      radioFl,
      setMealsFilterAPi,
      ingredientsApi,
      ingredientsApiName,
      ingredientsApiFl,
      setDrinksFilterAPi,
      recipesData,
      apiMeal,
      setApiMeal,
      apiDrink,
      setApiDrink,
      typeRecipe,
      setTypeRecipe,
      setCall,
      call,
    }),
    [
      searchBarAppear,
      appearSearchBar,
      inputFIlter,
      radioIngredient,
      radioName,
      radioFl,
      setMealsFilterAPi,
      ingredientsApi,
      ingredientsApiName,
      ingredientsApiFl,
      setDrinksFilterAPi,
      recipesData,
      apiMeal,
      apiDrink,
      typeRecipe,
      call,
    ],
  );

  return <Context.Provider value={ contextValue }>{children}</Context.Provider>;
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
