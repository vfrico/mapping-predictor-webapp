/**
 *
 * UserForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import { Button, withStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


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


class UserForm extends React.Component {

  constructor(props) {
    super(props);
    this.state  = {
        name: "",
        password: "",
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
      <Grid container spacing={50}>
        <Grid item xs={3}/>
        <Grid item xs={6}>
          
          <Paper className={classes.paper}>
            <form className={classes.container} noValidate autoComplete="off">
              <div className={classes.login}>
                <h1><FormattedMessage {...messages.header} /></h1>
              </div>
              <p>{JSON.stringify(this.props)}</p>
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
                  type="password"
                  value={this.state.password}
                  className={classes.textField}
                  onChange={this.handleChange('password')}
                  margin="normal"
                />
                <p onClick={this.clickActuator}>Hello</p>
                <Button onClick={this.clickActuator}>
                  Login
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

UserForm.propTypes = {
  user: PropTypes.string,
  password: PropTypes.string,
  email: PropTypes.string,
};

export default withStyles(styles)(UserForm);
