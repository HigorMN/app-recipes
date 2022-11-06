import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './utils/renderWithRouter';
import { removeLocalStorage } from './utils/mockLocalStorage';

const checkId01 = '0-ingredient-step';
const btnFinishId = 'finish-recipe-btn';

describe('Testando o RecipeInProgress', () => {
  jest.setTimeout(60000);
  test('Meal in progress', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('app-recipes/meals/52771/in-progress');
    });

    const findCheck01 = await screen.findByTestId(checkId01, {}, { timeout: 10000 });

    expect(findCheck01).toBeInTheDocument();

    const allCheck = screen.getAllByTestId(/ingredient-step/i);

    allCheck.forEach((e) => {
      userEvent.click(e);
    });

    allCheck.forEach((e) => {
      userEvent.click(e);
    });

    allCheck.forEach((e) => {
      userEvent.click(e);
    });

    const btnFinish = screen.getByTestId(btnFinishId);
    expect(btnFinish.disabled).toBe(false);
    userEvent.click(btnFinish);
    removeLocalStorage('doneRecipes');
    removeLocalStorage('inProgressRecipes');
  });

  jest.setTimeout(60000);
  test('Drink in progress', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('app-recipes/drinks/178319/in-progress');
    });

    const findCheck01 = await screen.findByTestId(checkId01, {}, { timeout: 10000 });

    expect(findCheck01).toBeInTheDocument();

    const allCheck = screen.getAllByTestId(/ingredient-step/i);

    allCheck.forEach((e) => {
      userEvent.click(e);
    });

    allCheck.forEach((e) => {
      userEvent.click(e);
    });

    allCheck.forEach((e) => {
      userEvent.click(e);
    });

    const btnFinish = screen.getByTestId(btnFinishId);
    expect(btnFinish.disabled).toBe(false);
    userEvent.click(btnFinish);
    removeLocalStorage('doneRecipes');
    removeLocalStorage('inProgressRecipes');
  });
});
