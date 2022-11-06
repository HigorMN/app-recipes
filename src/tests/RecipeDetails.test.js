import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './utils/renderWithRouter';
import { mockFavoriteLocal, mockLocalInProgress, removeLocalStorage, setLocalStorage } from './utils/mockLocalStorage';

const pathName = '/app-recipes/meals/52772';
const favBtnId = 'favorite-btn';

describe('Testando o RecipeDetails', () => {
  jest.setTimeout(30000);
  test('Se a api de meals:id é chamado e as recomendações de bebidas', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/app-recipes/meals/52771');
    });

    const ingrediente = await screen.findByTestId('1-ingredient-name-and-measure', {}, { timeout: 30000 });
    expect(ingrediente).toBeInTheDocument();

    const recomend = await screen.findByTestId('1-recommendation-card', {}, { timeout: 30000 });
    expect(recomend).toBeInTheDocument();
  });

  jest.setTimeout(30000);
  test('Testando se a api de drinks:id é chamado e as recomendações de comida', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/app-recipes/drinks/178319');
    });

    const ingrediente = await screen.findByTestId('1-ingredient-name-and-measure', {}, { timeout: 30000 });
    expect(ingrediente).toBeInTheDocument();

    const recomend = await screen.findByTestId('1-recommendation-card', {}, { timeout: 30000 });
    expect(recomend).toBeInTheDocument();
  });

  jest.setTimeout(30000);
  test('se os comportamentos esperados acontecem ao clicar no botão FavoritRecpe ', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push(pathName);
    });

    const btnFavRecipe = await screen.findByTestId(favBtnId, {}, { timeout: 30000 });
    expect(btnFavRecipe).toBeInTheDocument();
    expect(btnFavRecipe).toHaveAttribute('src', 'whiteHeartIcon.svg');

    userEvent.click(btnFavRecipe);
    expect(btnFavRecipe).toHaveAttribute('src', 'blackHeartIcon.svg');

    const favLocal = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(favLocal.length).toBe(1);
  });

  test('', () => {
    setLocalStorage('inProgressRecipes', mockLocalInProgress);
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push(pathName);
    });

    const btnContinue = screen.getByText(/start recipe/i);
    expect(btnContinue).toBeInTheDocument();
    userEvent.click(btnContinue);

    expect(history.location.pathname).toBe('/app-recipes/meals/52772/in-progress');

    removeLocalStorage('inProgressRecipes');
  });

  test('', () => {
    setLocalStorage('favoriteRecipes', mockFavoriteLocal);
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push(pathName);
    });

    const btnfavorite = screen.getByTestId(favBtnId);
    expect(btnfavorite).toBeInTheDocument();
    userEvent.click(btnfavorite);

    removeLocalStorage('favoriteRecipes');

    userEvent.click(btnfavorite);
  });

  test('teste drink', () => {
    const mockClipboard = {
      writeText: jest.fn(),
    };
    global.navigator.clipboard = mockClipboard;
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/app-recipes/drinks/178319');
    });

    const btnfavorite = screen.getByTestId(favBtnId);
    expect(btnfavorite).toBeInTheDocument();
    userEvent.click(btnfavorite);

    const shareBtn = screen.getByTestId('share-btn');
    userEvent.click(shareBtn);
  });
});
