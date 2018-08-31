/**
 *
 * TemplateItem
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
    paddingRight: 0,
    margin: theme.spacing.unit,
  },
  leftItem: {
    textAlign: 'left',
  },
  rightItem: {
    textAlign: 'right',
  },
  centerItem: {
    textAlign: 'center',
  },  
});

/* eslint-disable react/prefer-stateless-function */
class TemplateItem extends React.Component {
  constructor(props) {
    super(props);
    /*this.state = {
      lang: props.template.lang,
      name: props.template.template,
    }*/
  }
  render() {
    const { classes } = this.props;

    var linkRoute = "/template/"+this.props.template.lang+"/"+this.props.template.template;

    return (
      <StyledLink to={linkRoute}>
        <Paper className={classes.root}
              elevation={2}>
          <Grid container>
            <Grid item className={classes.leftItem} xs={6}>
              <Typography className={classes.text}>{this.props.template.template}</Typography>
            </Grid>
            <Grid item className={classes.centerItem} xs={1}>
              <Typography className={classes.text}>{this.props.template.lang}</Typography>
            </Grid>
            <Grid item className={classes.centerItem} xs={1}>
              <Typography className={classes.text}>{this.props.template.allAnnotations}</Typography>
            </Grid>
            <Grid item className={classes.centerItem} xs={1}>
              <Typography className={classes.text}>{this.props.template.correctAnnotations}</Typography>
            </Grid>
            <Grid item className={classes.centerItem} xs={1}>
              <Typography className={classes.text}>{this.props.template.wrongAnnotations}</Typography>
            </Grid>
            <Grid item className={classes.centerItem} xs={1}>
              <Typography className={classes.text}>{this.props.template.relativeWrong}%</Typography>
            </Grid>
            <Grid item className={classes.centerItem} xs={1}>
              <Typography className={classes.text}>{this.props.template.templateUsages}</Typography>
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
