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
    if(this.props.templatepage.template != undefined) {
      annotationsList = (
        this.props.templatepage.template.annotations.map(ann => (
          <AnnotationItem annotation={ann} key={ann.id}/>
        ))
      )
    }
    const wikiLink = this.getWikiLink(this.state.templateName, this.state.lang);
    const mappingPediaLink = this.getMappingPediaLink(this.state.templateName, this.state.lang);
    return (
      <div>
        <Grid container spacing={16} className={classes.container}>
          <Grid item xs={6} className={classes.panel}>
            <Paper className={classes.inner}>
              <Typography variant="display1">
                {this.state.templateName}
              </Typography>
              <br/>
              <Typography variant="subheading">
                Template from <a href={wikiLink}>{this.state.lang}.wikipedia.org</a>
              </Typography>
              <Typography variant="subheading">
                Mappings available on <a href={mappingPediaLink}>mappings.dbpedia.org</a>
              </Typography>
              <br/>
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
              <br/>
              <div>
                <Typography variant="title">
                  Edition locks
                </Typography>
                <p>This mapping is currently edited by: {"anyone"}</p>
                <Button>
                  Request lock
                </Button>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={6} className={classes.panel}>
              {annotationsList}
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
