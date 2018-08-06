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
import { Grid, Paper, withStyles, Typography, Button } from '@material-ui/core';
import AnnotationItem from '../AnnotationItem';


const styles = theme => ({
  panel: {
    padding: theme.spacing.unit,
    marginTop: 2*theme.spacing.unit,
  },
  subpanel: {
    paddingTop: '1em',
  },
  titleSpacing: {
    marginBottom: '0.5em',
  },
  container: {
    width: '90%',
    margin: 'auto',
  },
  inner: {
    padding: 1.5*theme.spacing.unit,
  }
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

  getWikiLink = (template, lang) => {
    return "http://"+lang+".wikipedia.org/wiki/Template:"+template;
  }

  getMappingPediaLink = (template, lang) => {
    return "http://mappings.dbpedia.org/index.php/Mapping_"+lang+":"+template;
  }

  render() {
    const { classes } = this.props;

    var annotationsList = undefined;
    var statsDiv = undefined;
    if(this.props.templatepage.template != undefined) {
      annotationsList = (
        this.props.templatepage.template.annotations.map(ann => (
          <Grid item xs={6} className={classes.panel}>
            <AnnotationItem annotation={ann} key={ann.id}/>
          </Grid>
        ))
      )

      statsDiv = (
        <div>
          <Typography>
            <b>All annotations: </b> {this.props.templatepage.template.allAnnotations}
          </Typography>
          <Typography>
            <b>Correct: </b> {this.props.templatepage.template.correctAnnotations}
          </Typography>
          <Typography>
            <b>Wrong: </b> {this.props.templatepage.template.wrongAnnotations}
          </Typography>
        </div>
      );
    }
    const wikiLink = this.getWikiLink(this.state.templateName, this.state.lang);
    const mappingPediaLink = this.getMappingPediaLink(this.state.templateName, this.state.lang);
    return (
      <div>
        <Grid container spacing={16} className={classes.container}>
          <Grid item xs={12} className={classes.panel}>
            <Paper className={classes.inner}>
              <Grid container>
              <Grid item xs={12}>
                <Typography variant="display1">
                  {this.state.templateName}
                </Typography>
                <Typography variant="subheading">
                  Template from <a href={wikiLink}>{this.state.lang}.wikipedia.org</a>
                </Typography>
                <Typography variant="subheading">
                  Mappings available on <a href={mappingPediaLink}>mappings.dbpedia.org</a>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <div className={classes.subpanel}>
                  <Typography variant="title" className={classes.titleSpacing}>
                    Template stats
                  </Typography>
                  {statsDiv}
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className={classes.subpanel}>
                  <Typography variant="title" className={classes.titleSpacing}>
                    Edition locks
                  </Typography>
                  <p>This mapping is currently edited by: <b>{"anyone"}</b></p>
                </div>
              </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} className={classes.panel}>
            <Typography variant="headline">
              Available annotations:
            </Typography>
          </Grid>
         {/* <Grid item xs={6} className={classes.panel}> */}
              {annotationsList}
          {/* </Grid>           */}
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
