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
import BrowserStorage from '../../api/browserStorage';


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
    const brwst = new BrowserStorage();
    this.state = {
      lang: this.props.match.params.lang,
      templateName: this.props.match.params.templateName,
      // It is easier (and maybe faster too) to read from local Storage than from App state :(
      user: brwst.getUser(),
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
    const wikiLink = this.getWikiLink(this.state.templateName, this.state.lang);
    const mappingPediaLink = this.getMappingPediaLink(this.state.templateName, this.state.lang);
    
    // Locks
    var usersLock = [];
    if (this.props.templatepage.template != undefined &&
        this.props.templatepage.template.locks != undefined) {
      this.props.templatepage.template.locks.forEach(element => {
        usersLock.push(element.user.username);
      });
    }
    var usersLockSet = new Set(usersLock);
    usersLock = new Array(...usersLockSet);

    var lockInfoComponent = undefined;
    if (usersLock == undefined || usersLock.length == 0) {
      lockInfoComponent = (
        <p>This template is not being edited by anyone</p>
      );
    } else if (usersLockSet.has(this.state.user.username)) {
      lockInfoComponent = (
        <p>
          You own the lock of this mapping. 
          You can edit the mapping on 
          this <a href={mappingPediaLink}
                  target="_blank">link</a>. 
          Once the mapping is corrected, 
          please, release the lock on the 
          corresponding annotation.
        </p>
      )
    } else {
      lockInfoComponent = (
        <p>This mapping is currently edited by: <b>{usersLock.join(", ")}</b></p>
      );
    }

    var annotationsList = undefined;
    var statsDiv = undefined;
    if(this.props.templatepage.template != undefined) {
      annotationsList = (
        this.props.templatepage.template.annotations.map(ann => (
          <Grid item xs={6} className={classes.panel}>
            <AnnotationItem annotation={ann} 
                            user={this.state.user} 
                            allLocks={usersLock}
                            key={ann.id}/>
          </Grid>
        ))
      )

      statsDiv = (
        <div>
          <Typography>
            <b>Template usages: </b> {this.props.templatepage.template.templateUsages}
          </Typography>          
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
    return (
      <div>
        <Grid container spacing={16} className={classes.container}>
          <Grid item xs={12} className={classes.panel}>
            <Paper className={classes.inner}>
              <Grid container>
              <Grid item xs={12}>
                <Typography variant="display1">
                {this.state.lang}:{this.state.templateName}
                </Typography>
                <Typography variant="subheading">
                  Template from <a target="_blank" href={wikiLink}>{this.state.lang}.wikipedia.org</a>
                </Typography>
                <Typography variant="subheading">
                  Mappings available on <a target="_blank" href={mappingPediaLink}>mappings.dbpedia.org</a>
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
                  {lockInfoComponent}
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
  templatepage: PropTypes.object.isRequired,
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
