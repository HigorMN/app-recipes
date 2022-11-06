import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './utils/renderWithRouter';

const path = 'app-recipes/profile';

describe('Testa a tela Profile', () => {
  test('se os elementos estão na tela e se comportam como esperado', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push(path);
    });

    const email = screen.getByTestId('profile-email');
    expect(email).toBeInTheDocument();

    const btnDone = screen.getByTestId('profile-done-btn');
    expect(btnDone).toBeInTheDocument();

    userEvent.click(btnDone);
    expect(history.location.pathname).toBe('app-recipes/done-recipes');
  });

  test('se ao clicar no btn favRecipes há o comportamento esperado', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push(path);
    });

    const btnFav = screen.getByTestId('profile-favorite-btn');
    expect(btnFav).toBeInTheDocument();

    userEvent.click(btnFav);
    expect(history.location.pathname).toBe('app-recipes/favorite-recipes');
  });

  test('se ao clicar no btn logout há o comportamento esperado', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push(path);
    });

    const btnLogout = screen.getByTestId('profile-logout-btn');
    expect(btnLogout).toBeInTheDocument();

    userEvent.click(btnLogout);
    expect(history.location.pathname).toBe('app-recipes/');
  });
});
