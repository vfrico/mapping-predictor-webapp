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
import { Grid, Button, Paper, withStyles, Typography } from '@material-ui/core';
import { sendVote, sendLock } from './actions';
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
  annotation: {
    margin: '0.5em',
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
  correct: {
    color: 'green',
  },
  hide: {
    visibility: 'collapse',
  },
});

/* eslint-disable react/prefer-stateless-function */
export class AnnotationItem extends React.Component {

  constructor(props) {
    super(props);
  }
/*
  getUserFromStorage = () => {
    const brwst = new BrowserStorage();
    return brwst.getUser();
  }*/

  sendVoteIncorrect = () => {
    console.log("Wrong mapping")
    //const user = this.getUserFromStorage();
    const { username, jwt } = this.props.user;
    this.props.dispatch(sendVote(VOTE_WRONG, this.props.annotation.id, username, jwt))
  }

  sendVoteValid = () => {
    console.log("Valid mapping")
    //const user = this.getUserFromStorage();
    const { username, jwt } = this.props.user;
    this.props.dispatch(sendVote(VOTE_CORRECT, this.props.annotation.id, username, jwt))
  }

  sendLockAnnotation = () => {
    console.log("Send lock for annotation " + this.props.annotation.id);
    this.props.dispatch(sendLock(this.props.annotation.id, this.props.user));
  }

  render() {
    var templateA = this.props.annotation.templateA;
    var templateB = this.props.annotation.templateB;
    var attributeA = this.props.annotation.attributeA;
    var attributeB = this.props.annotation.attributeB;
    var propA = this.props.annotation.propA;
    var propB = this.props.annotation.propB;
    var classifiedAs = this.props.annotation.classificationResult.classifiedAs;

    var votes = this.props.annotation.votes;

    /**
     * 0 -> undefined = no loged in. Can see annotations
     * 1 -> Mapper user: 0 + can lock mappings
     * 2 -> Annotator user: 1 + can vote annotations
     * 100 -> Admin user: same as 2
     */
    var role = 0;
    if (this.props.user.role == "ADMIN") {
      role = 100;
    } else if (this.props.user.role == "MAPPER") {
      role = 1;
    } else if (this.props.user.role == "ANNOTATOR") {
      role = 2;
    }

    // update vars from properties received from saga
    if (this.props.annotationitem[this.props.annotation.id] != undefined &&
        this.props.annotationitem[this.props.annotation.id].annotation != undefined) {
          const { annotation } = this.props.annotationitem[this.props.annotation.id];
          templateA = annotation.templateA;
          templateB = annotation.templateB;
          attributeA = annotation.attributeA;
          attributeB = annotation.attributeB;
          propA = annotation.propA;
          propB = annotation.propB;
          votes = annotation.votes;
    }

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
    if (this.props.annotationitem[this.props.annotation.id] != undefined && 
        this.props.annotationitem[this.props.annotation.id].error != undefined) {
      errorMsg = this.props.annotationitem[this.props.annotation.id].error.msg;
    }

    const { classes } = this.props;
    
    return (
      <Paper className={classes.annotation}>
      <Grid container spacing={8} className={classes.container}>
      <Grid item xs={12}><Paper>
        <Grid item xs={12}>
            <Grid container>
              <Grid item xs={6}>
                <b>{templateA}</b>
              </Grid>
              <Grid item xs={6}>
                <b>{templateB}</b>
              </Grid>
            </Grid>
        </Grid>
        <Grid item xs={12}>
            <Grid container>
              <Grid item xs={6}>
                <b>{attributeA}</b>
              </Grid>
              <Grid item xs={6}>
                <b>{attributeB}</b>
              </Grid>
            </Grid>
        </Grid>
        <Grid item xs={12}>
            <Grid container>
              <Grid item xs={6}>
                <b>{propA}</b>
              </Grid>
              <Grid item xs={6}>
                <b>{propB}</b>
              </Grid>
            </Grid>
        </Grid>
        </Paper></Grid>
        <Grid item xs={12} className={role < 2 ? classes.hide : ""}>
        <Grid container className={classes.buttonContainer}>
            <Button variant="contained"
                    className={classes.correct}
                    onClick={this.sendVoteValid}>
              Correct mapping
            </Button>
            <Button variant="contained" 
                    className={classes.error}
                    onClick={this.sendVoteIncorrect}>
              Wrong mapping
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.error}>
          {errorMsg}
        </Grid>
        <Grid item xs={12}>
          <Typography>
            Other users voted:
          </Typography>
          <VoteAnnotation votes={votes}/>
        </Grid>
        <Grid item xs={12}>
          <Typography>
            Classified as
          </Typography>
          {classifiedAs}
        </Grid>
        <Grid item xs={12}>
          <Typography>
            Lock mapping edition
          </Typography>
          <Button onClick={this.sendLockAnnotation}>
            Lock mapping
          </Button>
        </Grid>
      </Grid>
      </Paper>
    );
  }
}

AnnotationItem.propTypes = {
  dispatch: PropTypes.func.isRequired,
  annotation: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
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
