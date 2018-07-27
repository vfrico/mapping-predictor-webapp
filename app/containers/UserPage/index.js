/**
 *
 * UserPage
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
import makeSelectUserPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';


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
export class UserPage extends React.Component {
  render() {
    return (
<div className={classes.root}>
      <Grid container spacing={0}>
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

UserPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userpage: makeSelectUserPage(),
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

const withReducer = injectReducer({ key: 'userPage', reducer });
const withSaga = injectSaga({ key: 'userPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyles(styles),
)(UserPage);
