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
      id: props.annotation.id
    }
  }

  render() {
    return (
      <Grid container>
        <Grid item>
          <b>{this.state.langA}</b>
          <p>{this.state.templateA}</p>
          <p>{this.state.attributeA}</p>
          <p>{this.state.propA}</p>
        </Grid>
        →
        <Grid item>
          <b>{this.state.langB}</b>
          <p>{this.state.templateB}</p>
          <p>{this.state.attributeB}</p>
          <p>{this.state.propB}</p>
        </Grid>
        <Button>
          Valid mapping
        </Button>
        <Button>
          Incorrect mapping
        </Button>
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
