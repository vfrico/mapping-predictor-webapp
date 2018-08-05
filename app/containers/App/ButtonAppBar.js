import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { MuiThemeProvider, withStyles, createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { get } from 'immutable';

import { fromJS } from 'immutable';

import { getUserInfo } from './actions';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import loginFormReducer from '../LoginForm/reducer';

import injectSaga from 'utils/injectSaga';
import saga from './saga';
import StyledLink from '../../components/StyledLink';

const whiteColor = {
  color: 'white'
};

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
    ... whiteColor
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
    ... whiteColor,
  },
  textLink: {
    textDecoration: 'none',
    ... whiteColor,
  },
  button: {
    ... whiteColor,
  }
};

class ButtonAppBar extends React.Component {

  componentDidMount() {
    this.props.getUserInfoFromStorage();
  }
/*
  constructor(props) {
    super(props)
    this.props = props;
  }*/

  render () {
    const { classes } = this.props;

    var userInfo = {};
    if (this.props.userInfo != undefined) {
      userInfo = this.props.userInfo.toJS();
    }

    var loggedIn, rightComponent;

    //console.log("Info: "+JSON.stringify(userInfo)+", de tipo: "+typeof(userInfo))
    if (userInfo.user != undefined) {
      loggedIn = 'yes';
      rightComponent = <StyledLink to="/user">
        <IconButton>
          <AccountCircle />
        </IconButton>
      </StyledLink>;
    } else {
      loggedIn = 'no';
      rightComponent = <StyledLink to="/login">
        <Button className={classes.button}>
          Login
        </Button>
      </StyledLink>;
    }

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar className={classes.button}>
            <IconButton className={classes.menuButton} aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="title" className={classes.flex}>
              <Link to="/" className={classes.textLink}>DBpedia mappings</Link>
              {/* {JSON.stringify(userInfo)} {loggedIn} */}
            </Typography>
            {rightComponent}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  userInfo: PropTypes.object,
};

const mergePropsObject = (obj1, obj2) => {
  try {
    var merged = { ... obj1.toJS(), ... obj2.toJS()}
    return fromJS(merged)
  } catch (e) {
    return fromJS({})
  }
}

const mapStateToProps = (state) => {
  return {
      userInfo: mergePropsObject(state.get('buttonAppBar'), state.get('loginForm'))
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      getUserInfoFromStorage: () => {
        dispatch(getUserInfo());
    },
  };
};

const withReducer = injectReducer({ key: 'buttonAppBar', reducer });
const withSaga = injectSaga({ key: 'buttonAppBar', saga });
// Needs the loginFormReducer to update the state of already logged in user
const withSecondReducer = injectReducer({ key: 'loginForm', reducer: loginFormReducer });


export default compose(
  withReducer,
  withSaga,
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
  withSecondReducer,
)(ButtonAppBar);