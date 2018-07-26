import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { MuiThemeProvider, withStyles, createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';

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
  const styles = {

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
          </Typography>
          <Link to="/login">
            <Button className={classes.button}>
              Login
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);