/**
 *
 * LoginForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectLoginForm from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { Button, withStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import UserForm from '../../components/UserForm';

const styles = theme => ({
  container: {
    // display: 'flex',
    // flexWrap: 'wrap',
    paddingTop: 'em',
  },
  login: {
    width: "100%",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
  root: {
    // flexGrow: 1,
    marginTop: '2em'
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

/* eslint-disable react/prefer-stateless-function */
export class LoginForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        userName: "",
        password: "",
        email: "",
        signUp: false,
    };
  }

  
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  sendLoginForm = () => {
    console.log("Click!!: "+this.state.name)

    // TODO: if is a signup, first create the user and then login
  }

  changeToSignUp = () => {
    console.log("sign up");
    this.setState({signUp: true})
    console.log("state.signUp:"+this.state.signUp);
  }

  changeToLogIn = () => {
    console.log("log in");
    this.setState({signUp: false})
    console.log("state.signUp:"+this.state.signUp);
  }

  render() {
    const { classes } = this.props;

    let emailForm;
    let buttonText;

    if (this.state.signUp) {
      emailForm = <div>
        <TextField
          id="email"
          label="Email"
          value={this.state.email}
          className={classes.textField}
          onChange={this.handleChange('email')}
          margin="normal"
        />

        <p>Do you already have an account? <span onClick={this.changeToLogIn}>Log in</span></p>

        </div>;

      buttonText = "Sign up";
    } else {
      emailForm = <div>
        <p>Need a new account? <span onClick={this.changeToSignUp}>Sign up</span></p>
        </div>;
      buttonText = "Log in";
    }

    return (
      <div className={classes.root}>
      <Grid container spacing={40}>
        <Grid item xs={3}/>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <form className={classes.container} noValidate autoComplete="off">
              <div className={classes.login}>
                <h1>{buttonText}</h1>
              </div>
              <p>{JSON.stringify(this.state)}</p>
              <div className={classes.login}>
                <TextField
                  id="userName"
                  label="Username"
                  value={this.state.userName}
                  className={classes.textField}
                  onChange={this.handleChange('userName')}
                  margin="normal"
                />
                <TextField
                  id="password"
                  label="Password"
                  type="password"
                  value={this.state.password}
                  className={classes.textField}
                  onChange={this.handleChange('password')}
                  margin="normal"
                />
                {emailForm}
                
                <Button onClick={this.sendLoginForm}>
                  {buttonText}
                </Button>
              </div>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={3}/>
       </Grid>
      </div>
    );
  }
}

LoginForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = createStructuredSelector({
  loginform: makeSelectLoginForm(),
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

const withReducer = injectReducer({ key: 'loginForm', reducer });
const withSaga = injectSaga({ key: 'loginForm', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(withStyles(styles)(LoginForm));
