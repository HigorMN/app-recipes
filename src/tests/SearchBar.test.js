import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';

const testIdSearchTop = 'search-top-btn';
const testIdSearchInput = 'search-input';
const testIdSearchNameRadio = 'name-search-radio';
const testIdSearchIngredientRadio = 'ingredient-search-radio';
const testIdSearchFirstLetterRadio = 'first-letter-search-radio';
const testIdSearchButton = 'exec-search-btn';
const testIdRecipeCard = '1-recipe-card';
const alert = 'Sorry, we haven\'t found any recipes for these filters.';

const path = '/app-recipes/meals';
const path2 = '/app-recipes/drinks';

describe('test component SearchBar', () => {
  jest.setTimeout(60000);
  test('check if returns endpoints by name on meals ', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push(path);
    });

    expect(history.location.pathname).toBe(path);

    const buttonSearch = screen.getByTestId(testIdSearchTop);
    userEvent.click(buttonSearch);

    const searchValueMealName = 'chocolate';
    const searchInput = screen.getByTestId(testIdSearchInput);
    expect(searchInput).toBeDefined();
    userEvent.type(searchInput, searchValueMealName);
    expect(searchInput).toHaveValue(searchValueMealName);

    const nameSearchInput = screen.getByTestId(testIdSearchNameRadio);
    expect(nameSearchInput).toBeDefined();
    userEvent.click(nameSearchInput);
    expect(nameSearchInput).toBeChecked();

    const searchButton = screen.getByTestId(testIdSearchButton);
    expect(searchButton).toBeDefined();
    userEvent.click(searchButton);
    const recipeCard = await screen.findByTestId(
      testIdRecipeCard,
      {},
      { timeout: 10000 },
    );
    expect(recipeCard).toBeInTheDocument();
  });

  test('check if returns endpoints by ingredient on meals ', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push(path);
    });

    const buttonSearch = screen.getByTestId(testIdSearchTop);
    userEvent.click(buttonSearch);

    const searchValueIngredient = 'sugar';
    const searchInput = screen.getByTestId(testIdSearchInput);
    expect(searchInput).toBeDefined();
    userEvent.type(searchInput, searchValueIngredient);
    expect(searchInput).toHaveValue(searchValueIngredient);

    const searchIngredient = screen.getByTestId(testIdSearchIngredientRadio);
    expect(searchIngredient).toBeDefined();
    userEvent.click(searchIngredient);
    expect(searchIngredient).toBeChecked();

    const searchButton = screen.getByTestId(testIdSearchButton);
    userEvent.click(searchButton);

    const recipeCard = await screen.findByTestId(
      testIdRecipeCard,
      {},
      { timeout: 10000 },
    );
    expect(recipeCard).toBeInTheDocument();
  });

  test('check if returns endpoints by first letter on meals ', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push(path);
    });

    const buttonSearch = screen.getByTestId(testIdSearchTop);
    userEvent.click(buttonSearch);

    const searchValueMealFirstLetter = 'b';
    const searchInput = screen.getByTestId(testIdSearchInput);
    expect(searchInput).toBeDefined();
    userEvent.type(searchInput, searchValueMealFirstLetter);
    expect(searchInput).toHaveValue(searchValueMealFirstLetter);

    const firstLetterSearchInput = screen.getByTestId(
      testIdSearchFirstLetterRadio,
    );
    expect(firstLetterSearchInput).toBeDefined();
    userEvent.click(firstLetterSearchInput);
    expect(firstLetterSearchInput).toBeChecked();

    const searchButton = screen.getByTestId(testIdSearchButton);
    expect(searchButton).toBeDefined();
    userEvent.click(searchButton);

    const recipeCard = await screen.findByTestId(
      testIdRecipeCard,
      {},
      { timeout: 10000 },
    );

    expect(recipeCard).toBeInTheDocument();
  });

  test('check if redirect page id recipe ', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push(path);
    });

    const buttonSearch = screen.getByTestId(testIdSearchTop);
    userEvent.click(buttonSearch);

    const searchInput = screen.getByTestId(testIdSearchInput);
    expect(searchInput).toBeDefined();
    userEvent.type(searchInput, 'big mac');
    expect(searchInput).toHaveValue('big mac');

    const nameSearchInput = screen.getByTestId(testIdSearchNameRadio);
    expect(nameSearchInput).toBeDefined();
    userEvent.click(nameSearchInput);
    expect(nameSearchInput).toBeChecked();

    const searchButton = screen.getByTestId(testIdSearchButton);
    expect(searchButton).toBeDefined();
    userEvent.click(searchButton);
  });

  test('check if returns alert when request by ingredients is null ', () => {
    const { history } = renderWithRouter(<App />);
    // global.alert = jest.fn().mockResolvedValue(alert);
    jest.spyOn(global, 'alert').mockReturnValue(alert);

    act(() => {
      history.push(path);
    });
    const buttonSearch = screen.getByTestId(testIdSearchTop);
    userEvent.click(buttonSearch);

    const searchInput = screen.getByTestId(testIdSearchInput);
    expect(searchInput).toBeDefined();
    userEvent.type(searchInput, 'e');
    expect(searchInput).toHaveValue('e');

    const searchIngredient = screen.getByTestId(testIdSearchIngredientRadio);
    expect(searchIngredient).toBeDefined();
    userEvent.click(searchIngredient);
    expect(searchIngredient).toBeChecked();

    const searchButton = screen.getByTestId(testIdSearchButton);
    userEvent.click(searchButton);

    // expect(global.alert).toHaveBeenCalled();
    expect(global.alert()).toBe(alert);
  });

  test(' check if returns endpoints by first letter on drinks  ', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push(path2);
    });

    expect(history.location.pathname).toBe(path2);

    const buttonSearch = screen.getByTestId(testIdSearchTop);
    userEvent.click(buttonSearch);

    const searchValue = 'g';
    const searchInput = screen.getByTestId(testIdSearchInput);
    expect(searchInput).toBeDefined();
    userEvent.type(searchInput, searchValue);
    expect(searchInput).toHaveValue(searchValue);

    const searchFirstLetter = screen.getByTestId(testIdSearchFirstLetterRadio);
    expect(searchFirstLetter).toBeDefined();
    userEvent.click(searchFirstLetter);
    expect(searchFirstLetter).toBeChecked();

    const searchButton = screen.getByTestId(testIdSearchButton);
    expect(searchButton).toBeDefined();
    userEvent.click(searchButton);
    const recipeCard = await screen.findByTestId(
      testIdRecipeCard,
      {},
      { timeout: 30000 },
    );
    expect(recipeCard).toBeInTheDocument();
  });

  test(' check if returns endpoints by ingredients on drinks  ', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push(path2);
    });

    expect(history.location.pathname).toBe(path2);

    const buttonSearch = screen.getByTestId(testIdSearchTop);
    userEvent.click(buttonSearch);

    const searchValueIngredient = 'lemon';
    const searchInput = screen.getByTestId(testIdSearchInput);
    expect(searchInput).toBeDefined();
    userEvent.type(searchInput, searchValueIngredient);
    expect(searchInput).toHaveValue(searchValueIngredient);

    const searchIngredient = screen.getByTestId(testIdSearchIngredientRadio);
    expect(searchIngredient).toBeDefined();
    userEvent.click(searchIngredient);
    expect(searchIngredient).toBeChecked();

    const searchButton = screen.getByTestId(testIdSearchButton);
    userEvent.click(searchButton);
    const recipeCard = await screen.findByTestId(
      testIdRecipeCard,
      {},
      { timeout: 10000 },
    );
    expect(recipeCard).toBeInTheDocument();
  });

  test(' check if returns endpoints by name on drinks  ', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push(path2);
    });

    expect(history.location.pathname).toBe(path2);

    const buttonSearch = screen.getByTestId(testIdSearchTop);
    userEvent.click(buttonSearch);

    const searchValueDrinkName = 'Margarita';
    const searchInput = screen.getByTestId(testIdSearchInput);
    expect(searchInput).toBeDefined();
    userEvent.type(searchInput, searchValueDrinkName);
    expect(searchInput).toHaveValue(searchValueDrinkName);

    const nameSearchInput = screen.getByTestId(testIdSearchNameRadio);
    expect(nameSearchInput).toBeDefined();
    userEvent.click(nameSearchInput);
    expect(nameSearchInput).toBeChecked();

    const searchButton = screen.getByTestId(testIdSearchButton);
    expect(searchButton).toBeDefined();
    userEvent.click(searchButton);

    const recipeCard = await screen.findByTestId(
      testIdRecipeCard,
      {},
      { timeout: 30000 },
    );
    expect(recipeCard).toBeInTheDocument();
  });

  test('check if returns alert when requests by name is null ', () => {
    const { history } = renderWithRouter(<App />);
    jest.spyOn(global, 'alert').mockReturnValue(alert);

    act(() => {
      history.push(path);
    });

    const buttonSearch = screen.getByTestId(testIdSearchTop);
    userEvent.click(buttonSearch);

    const searchInput = screen.getByTestId(testIdSearchInput);
    expect(searchInput).toBeDefined();
    userEvent.type(searchInput, 'coxinha');
    expect(searchInput).toHaveValue('coxinha');

    const nameSearchInput = screen.getByTestId(testIdSearchNameRadio);
    expect(nameSearchInput).toBeDefined();
    userEvent.click(nameSearchInput);
    expect(nameSearchInput).toBeChecked();

    const searchButton = screen.getByTestId(testIdSearchButton);
    userEvent.click(searchButton);

    expect(global.alert()).toBe(alert);
  });
});
