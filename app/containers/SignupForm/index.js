/**
 *
 * SignupForm
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
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { Button, withStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import makeSelectSignupForm from './selectors';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    paddingTop: 'em',
  },
  login: {
    width: "100%"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
  },
  menu: {
    width: 200,
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

/* eslint-disable react/prefer-stateless-function */
export class SignupForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
       name: "",
       password: "",
       email: "",
    };
  }

  
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  clickActuator = () => {
    console.log("Click!!: "+this.state.name)
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>

      <Grid container spacing={24}>
        <Grid item xs={3}/>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <form className={classes.container} noValidate autoComplete="off">
              <div className={classes.login}>
                <h1><FormattedMessage {...messages.header} /></h1>
              </div>
              
              <div className={classes.login}>
                <TextField
                  id="name"
                  label="Name"
                  value={this.state.name}
                  className={classes.textField}
                  onChange={this.handleChange('name')}
                  margin="normal"
                />
                <TextField
                  id="password"
                  label="Password"
                  value={this.state.password}
                  className={classes.textField}
                  onChange={this.handleChange('password')}
                  margin="normal"
                />
                <TextField
                  id="email"
                  label="Email"
                  value={this.state.email}
                  className={classes.textField}
                  onChange={this.handleChange('email')}
                  margin="normal"
                />                
                <Button onClick={this.clickActuator}>
                  Signup
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

SignupForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = createStructuredSelector({
  signupform: makeSelectSignupForm(),
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

const withReducer = injectReducer({ key: 'signupForm', reducer });
const withSaga = injectSaga({ key: 'signupForm', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(withStyles(styles)(SignupForm));
