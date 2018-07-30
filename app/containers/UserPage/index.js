/**
 *
 * UserPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectUserPage, { makeSelectUserInformation } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { Button, withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { logoutAction } from './actions';
import loginFormReducer from '../LoginForm/reducer';
import buttonAppBarReducer from '../App/reducer';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  root: {
    marginTop: '2em'
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  container: {
    width: "100%",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1em 0',
  }
});

/* eslint-disable react/prefer-stateless-function */
export class UserPage extends React.Component {

  getFromProps = property => {
    console.log(this.props);
    try {
      if (this.props.loginInfo.user != undefined) {
        return this.props.loginInfo.user[property];
      }
    } catch (error) {
      console.log("Error: "+error);
    }
    return false;
  }

  objectIsEmpty = obj => {
    return Object.keys(obj).length === 0 && obj.constructor === Object
  }

  doLogout = ()  => {
    console.log("Execute logout");
    this.props.dispatch(logoutAction(this.getFromProps('username'), this.getFromProps('jwt')));
  }
  render() {
    const { classes } = this.props;
    if (this.objectIsEmpty(this.props.loginInfo)) {
      // If user is empty, then load login component
      this.props.history.push("/login");
    }
    return (
      <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={3}/>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <h1>User page</h1>
            <div className={classes.container}>
              <div className={classes.textField}>
                User: {this.getFromProps('username')}
              </div>
              <div className={classes.textField}>
                Email: {this.getFromProps('email')}
              </div>
            </div>
            {/* <span>{JSON.stringify(this.props.loginInfo)}</span> */}
            <Button onClick={this.doLogout}>
              Logout
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={3}/>
       </Grid>
      </div>
    );
  }
}

UserPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userpage: makeSelectUserPage(),
  loginInfo: makeSelectUserInformation(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

// We need to change the state of loginForm, not of userPage

const withSaga = injectSaga({ key: 'userPage', saga });
// Needs the loginFormReducer to update the state of already logged in user
const withSecondReducer = injectReducer({ key: 'loginForm', reducer: loginFormReducer });
// Needs this reducer to notify Nav Bar the user logout
const withReducerNavBar = injectReducer({ key: 'buttonAppBar', reducer: buttonAppBarReducer });

export default compose(
  withSaga,
  withConnect,
  withStyles(styles),
  withRouter,
  withSecondReducer,
  withReducerNavBar,
)(UserPage);
