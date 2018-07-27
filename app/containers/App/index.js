/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import ButtonAppBar from './ButtonAppBar';
import LoginForm from '../LoginForm';
import UserPage from '../UserPage';
import TemplateView from '../TemplateView';
import { Paper } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

export default function App() {
  const theme = createMuiTheme({
    palette: {
      primary: { main: grey[700] }, // Purple and green play nicely together.
      secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
    },
  });

  return (
    <div>
      <MuiThemeProvider theme={theme}>
        <ButtonAppBar/>
        <Switch>
          <Route exact path="/" component={TemplateView} />
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/user" component={UserPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </MuiThemeProvider>
    </div>
  );
}
