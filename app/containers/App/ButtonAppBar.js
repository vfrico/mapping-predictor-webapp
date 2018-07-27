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
  button: {
    ... whiteColor,
  }
};

function ButtonAppBar(props) {
  const { classes } = props;

  var userInfo = {};
  if (props.userInfo != undefined) {
    userInfo = props.userInfo.toJS();
  }

  var loggedIn, rightComponent;

  console.log("Info: "+JSON.stringify(userInfo)+", de tipo: "+typeof(userInfo))
  if (userInfo.user != undefined) {
    loggedIn = 'yes';
    rightComponent = <Link to="/user">
      <IconButton>
        <AccountCircle />
      </IconButton>
    </Link>;
  } else {
    loggedIn = 'no';
    rightComponent = <Link to="/login">
      <Button className={classes.button}>
        Login
      </Button>
    </Link>;
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.button}>
          <IconButton className={classes.menuButton} aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="title" className={classes.flex}>
            News 
            {/* {JSON.stringify(userInfo)} {loggedIn} */}
          </Typography>
          {rightComponent}
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  userInfo: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
      userInfo: state.get('loginForm')
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      onMenuClick: (id) => {
          dispatch();
      }
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
)(ButtonAppBar);