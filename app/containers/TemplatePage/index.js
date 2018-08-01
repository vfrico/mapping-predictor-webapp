/**
 *
 * TemplatePage
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
import makeSelectTemplatePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { loadTemplate } from './actions';
import { Grid, Paper, withStyles } from '@material-ui/core';
import { AnnotationItem } from '../AnnotationItem';


const styles = theme => ({
  panel: {
    padding: theme.spacing.unit,
  },
  container: {
    width: '90%',
    margin: 'auto',
  },
});

/* eslint-disable react/prefer-stateless-function */
export class TemplatePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lang: this.props.match.params.lang,
      templateName: this.props.match.params.templateName,
    }
  }

  componentWillMount() {
    // execute async api call to get template info
    this.props.dispatch(loadTemplate(this.state.templateName, this.state.lang));
  }

  render() {
    const { classes } = this.props;

    var annotationsList = undefined;
    if(this.props.templatepage.template != undefined) {
      annotationsList = (
        this.props.templatepage.template.annotations.map(ann => (
          <AnnotationItem annotation={ann} key={ann.id}/>
        ))
      )
    }

    return (
      <div>
        <Grid container spacing={16} className={classes.container}>
          <Grid item xs={6} className={classes.panel}>
            <Paper>
              <p>{JSON.stringify(this.state)}</p>
              {/* <p>{JSON.stringify(this.props.templatepage)}</p> */}
            </Paper>
          </Grid>
          <Grid item xs={6} className={classes.panel}>
            <Paper>
              {annotationsList}
              {/* <p>{JSON.stringify(this.props.templatepage)}</p> */}
            </Paper>
          </Grid>          
        </Grid>
      </div>
    );
  }
}

TemplatePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  templatepage: makeSelectTemplatePage(),
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

const withReducer = injectReducer({ key: 'templatePage', reducer });
const withSaga = injectSaga({ key: 'templatePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyles(styles),
)(TemplatePage);
