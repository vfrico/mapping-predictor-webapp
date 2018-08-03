/**
 *
 * VoteAnnotation
 *
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
    console.log("Props updated!!")
    console.log(props)
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
