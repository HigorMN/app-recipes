import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Login from './pages/Login';
import Provider from './Context/Provider';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Profile from './pages/Profile';
import RecipeDetails from './pages/RecipeDetails';
import Recipes from './pages/Recipes';
import Header from './components/Header';
import RecipeInProgress from './pages/RecipeInProgress';

export default function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="app-recipes/" component={ Login } />
        <Route path="app-recipes/done-recipes" component={ DoneRecipes } />
        <Route path="app-recipes/favorite-recipes" component={ FavoriteRecipes } />
        <Route exact path="app-recipes/drinks">
          <Header />
          <Recipes />
          <Footer />
        </Route>
        <Route exact path="app-recipes/meals">
          <Header />
          <Recipes />
          <Footer />
        </Route>
        <Route exact path="app-recipes/profile">
          <Profile />
          <Footer />
        </Route>
        <Route exact path="app-recipes/meals/:id" component={ RecipeDetails } />
        <Route exact path="app-recipes/drinks/:id" component={ RecipeDetails } />
        <Route
          exact
          path="app-recipes/meals/:id/in-progress"
          component={ RecipeInProgress }
        />
        <Route
          exact
          path="app-recipes/drinks/:id/in-progress"
          component={ RecipeInProgress }
        />
      </Switch>
    </Provider>
  );
}
