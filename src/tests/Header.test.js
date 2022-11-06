import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';
import Header from '../components/Header';
import Provider from '../Context/Provider';

describe('test component Header', () => {
  test('test buttons component header', () => {
    const { history } = renderWithRouter(
      <Provider>
        <Header />
      </Provider>,
    );

    const profileButton = screen.getByTestId('profile-top-btn');
    expect(profileButton).toBeDefined();
    userEvent.click(profileButton);
    expect(history.location.pathname).toBe('/profile');
  });

  test('check if it renders the title Profile in the component Profile', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('app-recipes/profile');
    });

    const titleProfile = screen.getByRole('heading', { name: /profile/i });
    expect(titleProfile).toBeInTheDocument();
  });

  test('check if it renders the title  Meals in the component Meals', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('app-recipes/meals');
    });

    expect(history.location.pathname).toBe('app-recipes/meals');
    const titleMeals = screen.getByTestId('page-title', { name: /meals/i });
    expect(titleMeals).toBeInTheDocument();
  });
  test('check if it renders the title Drinks in the component Drinks', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('app-recipes/drinks');
    });
    expect(history.location.pathname).toBe('app-recipes/drinks');
    const titleDrinks = screen.getByRole('heading', { name: /drinks/i });
    const buttonSearch = screen.getByTestId('search-top-btn');
    userEvent.click(buttonSearch);
    expect(titleDrinks).toBeInTheDocument();
  });
  test('check if it renders the title Done Recipes in the component Done Recipes', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('app-recipes/done-recipes');
    });

    const titleDoneRecipes = screen.getByRole('heading', {
      name: /done recipes/i,
    });
    expect(titleDoneRecipes).toBeInTheDocument();
  });
  test('check if it renders the title Favorite Recipes in the component Favorite Recipes', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('app-recipes/favorite-recipes');
    });

    const titleFavoriteRecipes = screen.getByRole('heading', {
      name: /favorite recipes/i,
    });
    expect(titleFavoriteRecipes).toBeInTheDocument();
  });
});
