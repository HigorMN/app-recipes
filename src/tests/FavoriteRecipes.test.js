import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import { mockFavRecipeLocal } from './utils/mockLocalStorage';

const testid = '0-horizontal-image';
const testid2 = '0-horizontal-name';
const favBtnId = 'favorite-btn';
const fav = '0-horizontal-favorite-btn';
const fav2 = '1-horizontal-favorite-btn';
const share = '0-horizontal-share-btn';
const share2 = '1-horizontal-share-btn';
const role = 'src';
const func = (ele) => expect(ele).toHaveAttribute(role, 'whiteHeartIcon.svg');
const func2 = (ele) => expect(ele).toHaveAttribute(role, 'blackHeartIcon.svg');
const path1 = '/app-recipes/favorite-recipes';

describe('testando a paginda de receitas favoritas', () => {
  jest.setTimeout(40000);
  it('testando se os elemento são renderizados', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/app-recipes/meals/52771');
    });
    const btnFavRecipe = await screen.findByTestId(favBtnId, {}, { timeout: 30000 });
    expect(btnFavRecipe).toBeInTheDocument();
    func(btnFavRecipe);

    userEvent.click(btnFavRecipe);
    func2(btnFavRecipe);
    const favLocal = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(favLocal.length).toBe(1);
    act(() => {
      history.push(path1);
    });
    expect(history.location.pathname).toBe(path1);
    const filter1 = screen.getByTestId(/filter-by-all-btn/i);

    const filter3 = screen.getByTestId(/filter-by-drink-btn/i);
    const img = screen.getByTestId(testid);

    expect(filter1).toBeInTheDocument();

    expect(filter3).toBeInTheDocument();
    expect(img).toBeInTheDocument();

    userEvent.click(filter1);
    const img2 = await screen.findByTestId(testid);
    expect(img2).toBeInTheDocument();
    userEvent.click(filter3);
    expect(img2).not.toBeInTheDocument();
    const filter2 = screen.getByTestId(/filter-by-meal-btn/i);
    expect(filter2).toBeInTheDocument();
    userEvent.click(filter2);
  });

  it('testando se os elemento são renderizados', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/app-recipes/drinks/15997');
    });
    const btnFavRecipe = await screen.findByTestId(favBtnId, {}, { timeout: 30000 });
    expect(btnFavRecipe).toBeInTheDocument();
    func(btnFavRecipe);

    userEvent.click(btnFavRecipe);
    func2(btnFavRecipe);

    act(() => {
      history.push(path1);
    });
    expect(history.location.pathname).toBe(path1);
    const filter1 = screen.getByTestId(/filter-by-all-btn/i);
    const filter3 = screen.getByTestId(/filter-by-meal-btn/i);
    const img = screen.getByTestId(testid2);

    expect(filter1).toBeInTheDocument();

    expect(filter3).toBeInTheDocument();
    expect(img).toBeInTheDocument();

    userEvent.click(filter1);
    const img2 = await screen.findByTestId(testid2);
    expect(img2).toBeInTheDocument();
    userEvent.click(filter3);
    expect(img2).not.toBeInTheDocument();
    const filter2 = screen.getByTestId(/filter-by-drink-btn/i);
    expect(filter2).toBeInTheDocument();
    userEvent.click(filter2);
  });
  it('testando os botões - drinks', async () => {
    const mockClipboard = {
      writeText: jest.fn(),
    };
    global.navigator.clipboard = mockClipboard;
    Object.defineProperty(global, 'localStorage', { value: {
      getItem: () => mockFavRecipeLocal,
      setItem: () => undefined,
    } });
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push(path1);
    });
    const shareBtn = screen.getByTestId(share2);
    expect(shareBtn).toBeInTheDocument();
    const favBtn = screen.getByTestId(fav2);
    expect(favBtn).toBeInTheDocument();
    userEvent.click(shareBtn);
    userEvent.click(favBtn);
  });
  it('testando os botões - meals', async () => {
    jest.spyOn(global, 'fetch');
    const mockClipboard = {
      writeText: jest.fn(),
    };
    global.navigator.clipboard = mockClipboard;
    Object.defineProperty(global, 'localStorage', { value: {
      getItem: () => mockFavRecipeLocal,
      setItem: () => undefined,
    } });
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push(path1);
    });

    const shareBtn = screen.getByTestId(share);
    expect(shareBtn).toBeInTheDocument();
    const favBtn = screen.getByTestId(fav);
    expect(favBtn).toBeInTheDocument();
    expect(favBtn).toHaveAttribute('src', 'blackHeartIcon.svg');
    userEvent.click(shareBtn);
    const link = screen.getByTestId('link-copied');
    expect(link).toBeInTheDocument();
    userEvent.click(favBtn);
  });
});
