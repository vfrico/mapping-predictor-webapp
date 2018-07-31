/**
 *
 * TemplateItem
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

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

    return (
      <Paper className={classes.root}
             elevation={2}>
        <Grid container>
          <Grid item className={classes.leftItem} xs={10}>
            {this.state.name}
          </Grid>
          <Grid item className={classes.rightItem} xs={2}>
            {this.state.lang}
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

TemplateItem.propTypes = {
  template: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TemplateItem);
