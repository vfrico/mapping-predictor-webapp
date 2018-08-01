/**
 *
 * TemplateItem
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import { Paper, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import StyledLink from '../StyledLink';

// import styled from 'styled-components';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    margin: theme.spacing.unit,
  },
  leftItem: {
    textAlign: 'left',
  },
  rightItem: {
    textAlign: 'right',
  },
});

/* eslint-disable react/prefer-stateless-function */
class TemplateItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lang: props.template.lang,
      name: props.template.template,
    }
  }
  render() {
    const { classes } = this.props;

    var linkRoute = "/template/"+this.state.lang+"/"+this.state.name;

    return (
      <StyledLink to={linkRoute}>
        <Paper className={classes.root}
              elevation={2}>
          <Grid container>
            <Grid item className={classes.leftItem} xs={10}>
              <Typography className={classes.text}>{this.state.name}</Typography>
            </Grid>
            <Grid item className={classes.rightItem} xs={2}>
              <Typography className={classes.text}>{this.state.lang}</Typography>
            </Grid>
          </Grid>
        </Paper>
      </StyledLink>
    );
  }
}

TemplateItem.propTypes = {
  template: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TemplateItem);
