/**
 *
 * AnnotationItem
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
import { sendVote, sendLock, deleteLock, getAnnotationHelper } from './actions';
import { VOTE_CORRECT, VOTE_WRONG } from '../../api/defaults';
import BrowserStorage from '../../api/browserStorage';
import VoteAnnotation from '../../components/VoteAnnotation';
import AnnotationHelper from '../../components/AnnotationHelper';
import ClassifiedAsInfo from '../../components/ClassifiedAsInfo';


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
  paperContent: {
    fontSize: '15px',
  }
});

/* eslint-disable react/prefer-stateless-function */
export class AnnotationItem extends React.Component {

  constructor(props) {
    super({
      ...props,
      lastShuffled: (new Date()).getTime(),
    });
    // this.state = {
    //   shuffle: 
    // }
    this.lastShuffled = (new Date()).getTime();
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

  sendUnlockAnnotation = () => {
    console.log("Send unlock for annotation " + this.props.annotation.id);
    this.props.dispatch(deleteLock(this.props.annotation.id, this.props.user));
  }


  sendLockAnnotation = () => {
    console.log("Send lock for annotation " + this.props.annotation.id);
    this.props.dispatch(sendLock(this.props.annotation.id, this.props.user));
  }

  getHelpers = () => {
    console.log("Get helpers for annotation " + this.props.annotation.id);
    this.props.dispatch(getAnnotationHelper(this.props.annotation.id));
    this.lastShuffled = (new Date()).getTime();
  }
  render() {
    var templateA = this.props.annotation.templateA;
    var templateB = this.props.annotation.templateB;
    var attributeA = this.props.annotation.attributeA;
    var attributeB = this.props.annotation.attributeB;
    var propA = this.props.annotation.propA;
    var propB = this.props.annotation.propB;
    var classificationResult = this.props.annotation.classificationResult;
    var votes = this.props.annotation.votes;

    var locks = this.props.annotation.locks;
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
          locks = annotation.locks;
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

    var lockComponent = undefined;

    // Lock
    if ((locks == undefined || locks.length == 0) && 
        this.props.allLocks != undefined &&
        this.props.allLocks.length == 0 &&
        role >= 1) {
      // Only show `Lock Mapping` button if the mapping is "free"
      lockComponent = (
        <div>
          <Typography>
              Lock mapping edition
          </Typography>
          <Button variant="contained" 
                  onClick={this.sendLockAnnotation}>
            Lock mapping
          </Button>
        </div>
      );
    } else {
      // Annotation and mapping is locked
      var user = undefined;
      locks.forEach(element => {
        user = element.user.username;
      });

      var unlockButton = undefined;
      if (user == this.props.user.username) {
        unlockButton = (
          <Button variant="contained" 
                  onClick={this.sendUnlockAnnotation}>
            Unlock mapping
          </Button>
        );
      }

      if (user == undefined || user == "") {
        // If mapping is locked, hide lock box information
        lockComponent = (<div/>);
      } else {
        lockComponent = (
          <div>
            <Typography>
              This annotation is currently locked by {user}
            </Typography>
            {unlockButton}
          </div>
        )
      }
    }

    // Helper:
    var HelperElement = undefined;
    if (this.props.annotationitem[this.props.annotation.id] != undefined &&
        this.props.annotationitem[this.props.annotation.id].helpers != undefined) {
      
      HelperElement = (
        <AnnotationHelper helpers={this.props.annotationitem[this.props.annotation.id].helpers}
        shuffle={this.lastShuffled}
        />
      );
    }


    const { classes } = this.props;
    
    return (
      <Paper className={classes.annotation}>
      <Grid container spacing={8} className={classes.container}>
      <Grid item xs={12} className={classes.paperContent}>
        <Paper>
        <Grid item xs={12}>
            <Grid container>
              <Grid item xs={2}></Grid>
              <Grid item xs={5} style={{textAlign:'center'}}>
                {this.props.annotation.langA}
              </Grid>
              <Grid item xs={5} style={{textAlign:'center'}}>
                {this.props.annotation.langB}
              </Grid>
            </Grid>
        </Grid>
        <Grid item xs={12}>
            <Grid container>
              <Grid item xs={2}>
                Infobox
              </Grid>
              <Grid item xs={5}>
                <b>{templateA}</b>
              </Grid>
              <Grid item xs={5}>
                <b>{templateB}</b>
              </Grid>
            </Grid>
        </Grid>
        <Grid item xs={12}>
            <Grid container>
              <Grid item xs={2}>
                Attribute
              </Grid>
              <Grid item xs={5}>
                <b>{attributeA}</b>
              </Grid>
              <Grid item xs={5}>
                <b>{attributeB}</b>
              </Grid>
            </Grid>
        </Grid>
        <Grid item xs={12}>
            <Grid container>
              <Grid item xs={2}>
                Property
              </Grid>
              <Grid item xs={5}>
                <b>{propA}</b>
              </Grid>
              <Grid item xs={5}>
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
              Consistent relation
            </Button>
            <Button variant="contained" 
                    className={classes.error}
                    onClick={this.sendVoteIncorrect}>
              Inconsistent relation
            </Button>
            <Button onClick={this.getHelpers}>
              help
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.error}>
          {errorMsg}
        </Grid>
        <Grid item xs={12} className={HelperElement == undefined? classes.hide : ""}>
          {HelperElement}
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
          <ClassifiedAsInfo classificationResult={classificationResult}/>
          {/* {classifiedAs} */}
        </Grid>
        <Grid item xs={12}>{/*
          <Typography>
            Lock mapping edition
          </Typography>
          <Button onClick={this.sendLockAnnotation}>
            Lock mapping
          </Button>
          {JSON.stringify(locks) */} 
          {lockComponent}
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
  allLocks: PropTypes.array,
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
