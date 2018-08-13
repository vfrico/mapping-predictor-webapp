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
import { Grid } from '@material-ui/core';
// import styled from 'styled-components';

/* eslint-disable react/prefer-stateless-function */
class VoteAnnotation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      votes: props.votes,
    }
  }

  componentWillReceiveProps = (props) => {
    //console.log("Props updated!!")
    //console.log(props)
    this.setState({
      votes: props.votes,
    })
  }

  render() {

    const votes = this.state.votes;

    var correct = 0, wrong = 0;

    votes.forEach(vote => {
      if (vote.vote != undefined) {
        if (vote.vote == VOTE_CORRECT) {
          correct += 1;
        } 
        else if (vote.vote == VOTE_WRONG) {
          wrong += 1;
        }
      } 
      
    });

    return (
      <Grid container>
        <Grid item xs={6}>
          Correct: {correct}
        </Grid>
        <Grid item xs={6}>
          Wrong: {wrong}
        </Grid>
      </Grid>
    );
  }
}

VoteAnnotation.propTypes = {
  votes: PropTypes.array.isRequired,
};

export default VoteAnnotation;
