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
 *
 * Copyright 2018 Víctor Fernández <vfrico@gmail.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import ButtonAppBar from './ButtonAppBar';
import LoginForm from '../LoginForm';
import UserPage from '../UserPage';
import TemplateView from '../TemplateView';
import TemplatePage from '../TemplatePage';
import { Paper } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { getUserInfo } from './actions';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';

import injectSaga from 'utils/injectSaga';
import saga from './saga';

const theme = createMuiTheme({
  palette: {
    primary: { main: grey[700] }, // Purple and green play nicely together.
    secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
  },
});

class App extends React.Component {

  //componentDidMount () {
    //this.props.getUserInfoFromStorage();
 // }

  render () {
    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <ButtonAppBar/>
          <Switch>
            <Route exact path="/" component={TemplateView} />
            <Route exact path="/login" component={LoginForm} />
            <Route exact path="/user" component={UserPage} />
            <Route exact path="/template/:lang/:templateName" component={TemplatePage} />
            <Route component={NotFoundPage} />
          </Switch>
        </MuiThemeProvider>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      userInfo: state.get('loginForm')
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      getUserInfoFromStorage: () => {
          dispatch(getUserInfo());
      },
      saveUserInformation: (user, email, jwt, role) => {
        dispatch(saveBrowserUserInfo(user, email, jwt, role));
      }
  };
};

//const withReducer = injectReducer({ key: 'loginForm', reducer });
//const withSaga = injectSaga({ key: 'loginForm', saga });


export default compose(
  //withReducer,
  //withSaga,
  //connect(mapStateToProps, mapDispatchToProps),
)(App);
