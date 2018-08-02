/**
 *
 * AnnotationItem
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectAnnotationItem from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { Grid, Button } from '@material-ui/core';
import { sendVote } from './actions';
import { VOTE_CORRECT, VOTE_WRONG } from '../../api/defaults';

/* eslint-disable react/prefer-stateless-function */
export class AnnotationItem extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      attributeA: props.annotation.attributeA,
      attributeB:props.annotation.attributeB,
      // classA: props.annotation.classA,
      // classB: props.annotation.classB,
      langA: props.annotation.langA,
      langB: props.annotation.langB,
      propA: props.annotation.propA,
      propB: props.annotation.propB,
      templateA: props.annotation.templateA,
      templateB: props.annotation.templateB,
      id: props.annotation.id,
      votes: props.annotation.votes
    }
  }

  sendVoteIncorrect() {
    console.log("Wrong mapping")
    this.props.dispatch(sendVote(VOTE_CORRECT, this.state.id, user, jwt))
  }

  sendVoteValid() {
    console.log("Valid mapping")
    this.props.dispatch(sendVote(VOTE_WRONG, this.state.id, user, jwt))
  }

  render() {

    // TODO: Show advanced information about previous votation
    // Maybe a new component?
    var res = undefined;
    if (this.state.votes != undefined && this.state.votes.length != 0) {
      try {
        res = this.state.votes[0].vote
      }
      catch(e) { }
    }

    return (
      <Grid container>
        <Grid item xs={6}>
          <b>{this.state.langA}</b>
          <p>{this.state.templateA}</p>
          <p>{this.state.attributeA}</p>
          <p>{this.state.propA}</p>
        </Grid>
        <Grid item xs={6}>
          <b>{this.state.langB}</b>
          <p>{this.state.templateB}</p>
          <p>{this.state.attributeB}</p>
          <p>{this.state.propB}</p>
        </Grid>
        <Grid item xs={12}>
        <Button onClick={this.sendVoteValid}>
          Valid mapping
        </Button>
        <Button onClick={this.sendVoteIncorrect}>
          Incorrect mapping
        </Button>
        </Grid>
        {res}
      </Grid>
    );
  }
}

AnnotationItem.propTypes = {
  dispatch: PropTypes.func.isRequired,
  annotation: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  annotationitem: makeSelectAnnotationItem(),
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

const withReducer = injectReducer({ key: 'annotationItem', reducer });
const withSaga = injectSaga({ key: 'annotationItem', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AnnotationItem);
