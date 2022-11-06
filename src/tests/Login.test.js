import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './utils/renderWithRouter';

describe('Testando a tela de login', () => {
  test('Se os inputs estão na tela', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/app-recipes');
    });
    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const loginSubmitBtn = screen.getByTestId('login-submit-btn');

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(loginSubmitBtn).toBeInTheDocument();
  });

  test('Se o botão é desabilitado e habilitado quando digitado um email e senha valido', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/app-recipes');
    });
    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const loginSubmitBtn = screen.getByTestId('login-submit-btn');

    userEvent.type(inputEmail, 'test');
    expect(loginSubmitBtn.disabled).toBe(true);

    userEvent.clear(inputEmail);
    userEvent.type(inputEmail, 'test@test.com');
    userEvent.type(inputPassword, '123456');
    expect(loginSubmitBtn.disabled).toBe(true);

    userEvent.clear(inputPassword);
    userEvent.type(inputPassword, '1234567');
    expect(loginSubmitBtn.disabled).toBe(false);

    userEvent.click(loginSubmitBtn);
    const emailLocal = JSON.parse(localStorage.getItem('user'));

    expect(history.location.pathname).toBe('/app-recipes/meals');
    expect(emailLocal.email).toBe('test@test.com');
  });
});
