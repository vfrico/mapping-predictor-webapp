/**
 *
 * VoteAnnotation
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
import { VOTE_CORRECT, VOTE_WRONG } from '../../api/defaults';
import { Grid, Popper, Button, Fade, Paper, Typography, ListItem, List } from '@material-ui/core';

// import styled from 'styled-components';

/* eslint-disable react/prefer-stateless-function */
class VoteAnnotation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      votes: props.votes,
      anchorEl: null,
      open: false,
    }
  }

  componentWillReceiveProps = (props) => {
    //console.log("Props updated!!")
    //console.log(props)
    this.setState({
      votes: props.votes,
    })
  }

  handleClick = event => {
    const { currentTarget } = event;
    this.setState(state => ({
      anchorEl: currentTarget,
      open: !state.open,
    }));
  };

  render() {

    const votes = this.state.votes;

    var correct = 0, wrong = 0;
    var usernames = [];

    votes.forEach(vote => {
      if (vote.vote != undefined) {
        if (vote.vote == VOTE_CORRECT) {
          correct += 1;
        } 
        else if (vote.vote == VOTE_WRONG) {
          wrong += 1;
        }
        usernames.push(vote.user.username);
      } 
      
    });
    const { anchorEl, open } = this.state;
    const id = open ? 'simple-popper' : null;
    return (
      <Grid container>
        <Grid item xs={4}>
          Consistent: {correct}
        </Grid>
        <Grid item xs={4}>
          Inconsistent: {wrong}
        </Grid>
        <Grid item xs={4}>
          <Button variant="contained" onClick={this.handleClick}>
            See voters
          </Button>
          <Popper id={id} open={open} anchorEl={anchorEl} transition>
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper>
                <List subheader={<li />}>
                  {usernames.map(username => (
                    <ListItem>{username}</ListItem>
                  ))}
                </List>
              </Paper>
            </Fade>
          )}
          </Popper>
        </Grid>
      </Grid>
    );
  }
}

VoteAnnotation.propTypes = {
  votes: PropTypes.array.isRequired,
};

export default VoteAnnotation;
