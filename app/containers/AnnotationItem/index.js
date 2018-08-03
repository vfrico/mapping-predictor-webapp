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
import { Grid, Button, Paper, withStyles } from '@material-ui/core';
import { sendVote } from './actions';
import { VOTE_CORRECT, VOTE_WRONG } from '../../api/defaults';
import BrowserStorage from '../../api/browserStorage';
import VoteAnnotation from '../../components/VoteAnnotation';


const styles = theme => ({
  panel: {
    padding: theme.spacing.unit,
  },
  container: {
    padding: '0.5em 1em',
  },
  buttonContainer: {
    justifyContent: 'space-around',
  },
  innerButtonContainer: {
    flexGrow:1,
    textAlign: 'center'
  },
  error: {
    color: 'red',
  },
});

/* eslint-disable react/prefer-stateless-function */
export class AnnotationItem extends React.Component {

  constructor(props) {
    super(props);
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

  getUserFromStorage = () => {
    const brwst = new BrowserStorage();
    return brwst.getUser();
  }

  sendVoteIncorrect = () => {
    console.log("Wrong mapping")
    const user = this.getUserFromStorage();
    const { username, jwt } = user;
    this.props.dispatch(sendVote(VOTE_WRONG, this.state.id, username, jwt))
  }

  sendVoteValid = () => {
    console.log("Valid mapping")
    const user = this.getUserFromStorage();
    const { username, jwt } = user;
    this.props.dispatch(sendVote(VOTE_CORRECT, this.state.id, username, jwt))
  }

  render() {
    var templateA = this.state.templateA, templateB = this.state.templateB;
    var attributeA = this.state.attributeA, attributeB = this.state.attributeB;
    var propA = this.state.propA, propB = this.state.propB;

    var votes = this.state.votes;

    if (this.props.annotationitem[this.state.id] != undefined &&
        this.props.annotationitem[this.state.id].annotation != undefined) {
          console.log("Annotation: ")
          console.log(this.props.annotationitem);
          const { annotation } = this.props.annotationitem[this.state.id];
          templateA = annotation.templateA;
          templateB = annotation.templateB;
          attributeA = annotation.attributeA;
          attributeB = annotation.attributeB;
          propA = annotation.propA;
          propB = annotation.propB;
          votes = annotation.votes;
          console.log(votes);
    } else {
      console.log("NO Annotation: ")
          console.log(this.props.annotationitem);
    }

    console.log("Votos fuera")
    console.log(votes);
/*
    // TODO: Show advanced information about previous votation
    // Maybe a new component?
    var res = undefined;
    if (this.state.votes != undefined && this.state.votes.length != 0) {
      try {
        res = this.state.votes[0].vote
      }
      catch(e) { }
    }
*/
    var errorMsg = undefined;
    if (this.props.annotationitem[this.state.id] != undefined && 
        this.props.annotationitem[this.state.id].error != undefined) {
      errorMsg = this.props.annotationitem[this.state.id].error.msg;
    }

    const { classes } = this.props;
    
    return (
      <Grid container spacing={8} className={classes.container}>
      <Grid item xs={12}><Paper>
        {/* <Grid item xs={12}>
          
            <Grid container>
              <Grid item xs={6}>
                <b>{this.state.langA}</b>
              </Grid>
              <Grid item xs={6}>
                <b>{this.state.langB}</b>
              </Grid>
            </Grid>
          
        </Grid> */}
        <Grid item xs={12}>
          {/* <Paper> */}
            <Grid container>
              <Grid item xs={6}>
                <b>{templateA}</b>
              </Grid>
              <Grid item xs={6}>
                <b>{templateB}</b>
              </Grid>
            </Grid>
          {/* </Paper> */}
        </Grid>
        <Grid item xs={12}>
          {/* <Paper> */}
            <Grid container>
              <Grid item xs={6}>
                <b>{attributeA}</b>
              </Grid>
              <Grid item xs={6}>
                <b>{attributeB}</b>
              </Grid>
            </Grid>
          {/* </Paper> */}
        </Grid>
        <Grid item xs={12}>
          {/* <Paper> */}
            <Grid container>
              <Grid item xs={6}>
                <b>{propA}</b>
              </Grid>
              <Grid item xs={6}>
                <b>{propB}</b>
              </Grid>
            </Grid>
          {/* </Paper> */}
        </Grid>
        </Paper></Grid>
        <Grid item xs={12}>
        {/* <Grid container style={{alignItems: 'center'}}> */}
        <Grid container className={classes.buttonContainer}>
          {/* <Grid item className={classes.innerButtonContainer}> */}
            <Button onClick={this.sendVoteValid}>
              Correct mapping
            </Button>
          {/* </Grid>
          <Grid item className={classes.innerButtonContainer}> */}
            <Button onClick={this.sendVoteIncorrect}>
              Wrong mapping
            </Button>
          {/* </Grid> */}
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.error}>
          {errorMsg}
        </Grid>
        <Grid item xs={12}>
          <VoteAnnotation votes={votes}>
          </VoteAnnotation>
        </Grid>
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
// const withSaga = injectSaga({ key: 'annotationItem', saga });

export default compose(
  withReducer,
//  withSaga,
  withConnect,
  withStyles(styles),
)(AnnotationItem);
