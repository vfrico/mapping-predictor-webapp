/**
 *
 * UserPage
 *
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
import { Button, withStyles, Typography, TextField } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { logoutAction, sumbitTriplesCSV, sendClassifyByLang } from './actions';
import loginFormReducer from '../LoginForm/reducer';
import buttonAppBarReducer from '../App/reducer';
import { API_ROUTE } from '../../api/defaults';

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
  error: {
    color: "red",
  },
  container: {
    width: "100%",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1em 0',
  },
  innerContainer: {
    width: "90%",
    margin: "2em",
  },
  centerContainer: {
    width: "50%",
    margin: "auto",
  },
  hide: {
    visibility: 'collapse',
  },
});

/* eslint-disable react/prefer-stateless-function */
export class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      langA: "",
      langB: "",
    }
  }


  getFromProps = property => {
    //console.log(this.props);
    try {
      if (this.props.loginInfo.user != undefined) {
        return this.props.loginInfo.user[property];
      }
    } catch (error) {
      console.log("Error: "+error);
    }
    return false;
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleChangeFile = name => event => {
    this.setState({
      [name]: event.target,
    });
  }

  objectIsEmpty = obj => {
    return Object.keys(obj).length === 0 && obj.constructor === Object
  }

  doLogout = ()  => {
    console.log("Execute logout");
    this.props.dispatch(logoutAction(this.getFromProps('username'), this.getFromProps('jwt')));
  }

  sendFile = () => {
    console.log(this.state);
    this.props.dispatch(sumbitTriplesCSV(this.state.langA, this.state.langB, this.state.file));
  }

  classifyLangs = () => {
    console.log("Classify langs")
    const { langA_classify, langB_classify } = this.state;
    this.props.dispatch(sendClassifyByLang(langA_classify, langB_classify));
  }

  render() {
    const { classes } = this.props;
    if (this.objectIsEmpty(this.props.loginInfo)) {
      // If user is empty, then load login component
      this.props.history.push("/login");
    }

    // Error handling
    var errorElement = undefined;
    if (this.props.loginInfo.error != undefined) {
      
      var errormsg = "";
      //console.log(this.props.loginInfo.error)
      if (this.props.loginInfo.error.error != undefined) {
        errormsg  = JSON.stringify(this.props.loginInfo.error.error)
      }
      
      errorElement = <span className={classes.error}>
        Error is: {errormsg}</span>;
    }

    // Error for admin
    var errorAdminElement = undefined;
    var isInformative = false;
    if (this.props.userpage.response != undefined) {
      var ok = this.props.userpage.response.code >= 200 && 
               this.props.userpage.response.code < 300;
      errorAdminElement = (
        <span className={ok? "": classes.error}>
          {ok? "" : "Error is: "}{this.props.userpage.response.msg}
        </span>
      )
    }
    console.log(this.props)
    var userRole;
    try {
      userRole = this.props.loginInfo.user.role;
    } catch (e) {
      userRole = "NO_ROLE";
    }
    
    return (
      <div className={classes.root}>
      <Grid container spacing={16} className={classes.centerContainer}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <h1>User page</h1>
            <div className={classes.container}>
              <div className={classes.textField}>
                User: {this.getFromProps('username')}
              </div>
              <div className={classes.textField}>
                Email: {this.getFromProps('email')}
              </div>
              <div className={classes.textField}>
                Role: {this.getFromProps('role')}
              </div>
            </div>
            {/* <span>{JSON.stringify(this.props.loginInfo)}</span> */}
            {errorElement}<br/>
            <Button onClick={this.doLogout}>
              Logout
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} className={userRole === "ADMIN" ? "" : classes.hide}>
          <Paper>
          <div className={classes.container}>
            <Typography variant="display1">
              Admin section
            </Typography>
            <div className={classes.innerContainer}>
              <Typography variant="title" paragraph>
                Load annotations
              </Typography>
              <Typography variant="body1" paragraph>
                It is possible to add more annotations by uploading a CSV file that contains
                the annotations with their respective M, C and TB attributes.
              </Typography>
              <Typography variant="body1" paragraph>
                The system needs to know also the two languages that involves each annotation. 
                At this moment, you should only submit one language pair at once.
              </Typography>
              <Typography variant="body1" paragraph>
                You can check out some examples&nbsp;
                <a href="https://github.com/vfrico/mapping-predictor-backend/tree/master/src/main/resources/csv">
                  here
                </a>.
              </Typography>
              <Typography variant="body1" paragraph>
                Note: The triples will not be overriden by sending a CSV file. They will 
                be added to the existing ones
              </Typography>
              {/* <form action={base+queryParams} method="post" enctype="multipart/form-data"> */}
                <TextField
                  id="langA"
                  label="Lang from"
                  type="text"
                  value={this.state.langA}
                  className={classes.textField}
                  onChange={this.handleChange('langA')}
                  margin="normal"
                />
                <TextField
                  id="langB"
                  label="Lang to"
                  type="text"
                  value={this.state.langB}
                  className={classes.textField}
                  onChange={this.handleChange('langB')}
                  margin="normal"
                />
                {/* <label for="file">Filename:</label> */}
                <input type="file" 
                       name="file" 
                       onChange={this.handleChangeFile('file')}
                       id="file" />
                {/* <input type="submit" name="submit" value="Submit" /> */}
                <Button variant="contained" onClick={this.sendFile}>
                  Upload CSV
                </Button>
              {/* </form> */}
            </div>
            <br/>
            <div className={classes.innerContainer}>
              <Typography variant="title" paragraph>
                Classify triples
              </Typography>
              <Typography paragraph>
                The system only can classify the annotations by a language pair. You have to select 
                which are the language codes that has to be classified.
              </Typography>
              <Typography paragraph>
                The previous classification result will been overriden.
              </Typography>
              <TextField
                  id="langA"
                  label="Lang from"
                  type="text"
                  value={this.state.langA_classify}
                  className={classes.textField}
                  onChange={this.handleChange('langA_classify')}
                  margin="normal"
                />
              <TextField
                  id="langB"
                  label="Lang to"
                  type="text"
                  value={this.state.langB_classify}
                  className={classes.textField}
                  onChange={this.handleChange('langB_classify')}
                  margin="normal"
                />
                <Button variant="contained" onClick={this.classifyLangs}>
                  Classify
                </Button>
            </div>
          </div>
          {errorAdminElement}
          </Paper>
        </Grid>
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
const withThisReducer = injectReducer({ key: 'userPage', reducer: reducer });
export default compose(
  withSaga,
  withConnect,
  withStyles(styles),
  withRouter,
  withSecondReducer,
  withReducerNavBar,
  withThisReducer,
)(UserPage);
