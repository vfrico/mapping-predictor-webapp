/**
 *
 * TemplateView
 *
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
import makeSelectTemplateView, { makeTestSelector } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { defaultAction, loadTemplates, loadLangPairs } from './actions';
import TemplateItem from '../../components/TemplateItem';


import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { Button, withStyles, Grid, Typography, Paper, Menu } from '@material-ui/core';
import BrowserStorage from '../../api/browserStorage';


const styles = theme => ({
  container: {
    width: '90%',
    margin: 'auto',
  },
  leftItem: {
    textAlign: 'left',
  },
  rightItem: {
    textAlign: 'right',
  },
  centerItem: {
    textAlign: 'center',
  },
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    paddingRight: 0,
    margin: theme.spacing.unit,
  },
  topFilter: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    paddingRight: 0,
    margin: theme.spacing.unit + "px auto",
    justifyContent: 'center',
  },
  innerFilterElement: {
    marginTop: 2*theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    marginRight: 2*theme.spacing.unit,
  },
  filterDropdown: {
    display: 'flex',
    justifyContent: 'center',
  }
});


/* eslint-disable react/prefer-stateless-function */
export class TemplateView extends React.Component {
  constructor(props) {
    super(props);
    this.brwst = new BrowserStorage();
    var brwlangs = this.brwst.getUserPrefs("langPairs", {
      langPairs: [
        {langA: "en", langB: "es"},
      ]
    });

    this.state = {
      langPair: brwlangs.langPairs[0],
    }

    var brwstate = this.brwst.getUserPrefs("templateview", {
      langPair: brwlangs.langPairs[0],
      descending: true, // Used in sorting function
      sortKey: "wrongAnnotations", // Used in sorting function
      sortFunction: this.numericSort,
      showHelp: true,
    });

    this.state = {
      ... this.state,
      ... brwstate,
      langPairs: brwlangs.langPairs,
    }
    // props.dispatch(defaultAction());
    // this.sleep(4000);
    // console.log("new props");
    console.log(this.state);
  }


  numericSort = (a, b) => {
    if (this.state.descending) {
      return b[this.state.sortKey] - a[this.state.sortKey];
    } else {
      return a[this.state.sortKey] - b[this.state.sortKey];
    }
  }

  handleChangeLangA = event => {
    var langPair = this.state.langPair;
    langPair.langA = event.target.value;
    this.setState({
      langPair,
    });
  };

  handleChangeLangB = event => {
    var langPair = this.state.langPair;
    langPair.langB = event.target.value;
    this.setState({
      langPair,
    });
  };

  componentDidMount() {
    this.callFunction();
  }

  componentWillUpdate(nextProps, nextState) {
    this.brwst.saveUserPrefs("templateview", nextState);
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /* Calls the API to get templates */
  callFunction = () => {
    this.props.dispatch(loadTemplates(this.state.langPair.langA,this.state.langPair.langB));
    this.props.dispatch(loadLangPairs());
  }

  loadTemplates = () => {
    this.props.dispatch(loadTemplates(this.state.langPair.langA,this.state.langPair.langB));
  }

  

  changeToNumericSort = (key) => {
    var desc = this.state.descending;
    if (this.state.sortKey == key) {
      desc = !desc;
    }
    this.setState({
      descending: desc,
      sortKey: key,
      sortFunction: this.numericSort,
    });
  }

  getSortingCaret = (key) => {
    if(this.state.sortKey == key) {
      if (this.state.descending) {
        return "▼";
      } else {
        return "▲";
      }
    }
  }

  showHelp = () => {
    this.setState({
      showHelp: true,
    })
  }

  hideHelp = () => {
    this.setState({
      showHelp: false,
    })
  }

  getLanguageFromIsoCode = (code) => {
    switch(code) {
      case "es":
        return "Spanish";
      case "en":
        return "English";
      case "el":
        return "Greek";
      case "nl":
        return "Dutch";
      case "de":
        return "German";
      default:
        return code;
    }
  }

  render() {

    var templatesItems = undefined;
    if (this.props.templateview.templates != undefined) {
      var templatesList = this.props.templateview.templates;

      // sort list
      templatesList = templatesList.sort(this.state.sortFunction)

      templatesItems = templatesList.map(t => {
        return <TemplateItem template={t} key={t.template}/>
      })
    }

    var validLangPairs = this.state.langPairs;
    if (this.props.templateview.langPairs != undefined) {
      validLangPairs = this.props.templateview.langPairs;
    }


    var errorMsg = undefined;
    if (this.props.templateview.error != undefined) {
      errorMsg = this.props.templateview.error.msg;
    }
    const { classes } = this.props;

    var langsA = Array.from(new Set(validLangPairs.map(element => element.langA)));
    var langsB = Array.from(new Set(validLangPairs.map(element => element.langB)));
    ///console.log(langsA, langsB);
    //var itemsMenuLangA = ;
    //var itemsMenuLangB = new Array(langsB).map(element => <MenuItem value={element}>{element}</MenuItem>)

    return (
      <div className={classes.container}>
        {this.state.showHelp ? (
        <Grid container className={classes.root}>
        <Paper style={{
          width: "100%",
          padding: "1em",
        }}>
          <Typography variant="title" paragraph>
            Help
          </Typography>
          <Typography paragraph>
            This web application allows you to vote for annotations to improve 
            the quality and consistency of DBpedia mappings across all languages.
          </Typography>
          <Typography paragraph>
            An annotation is a concept that relates two Wikipedia Infobox attributes, in two
            languages. An annotation can be correct or wrong. You can view all the annotations
            related with one template by selecting one of the templates shown below.
          </Typography>
          <Typography paragraph>
            In this view you can filter all the templates by the language and by the language
            of the annotations which is related.
          </Typography>
          <Button onClick={this.hideHelp}
                className={classes.innerFilterElement}
                style={{textAlign:'left'}}>
            Hide help
          </Button>
        </Paper>
        </Grid>
      ) : "" }
        <Grid container className={classes.topFilter}>
          <Grid item xs={3}>
            <Typography 
              className={classes.innerFilterElement}
              style={{textAlign:'right', marginTop: '21px'}}>
              Get templates in
            </Typography>
          </Grid>
          <Grid item xs={5} className={classes.filterDropdown}>
          <TextField
              id="templates-lang-B"
              select
              value={this.state.langPair.langB}
              onChange={this.handleChangeLangB}
              margin="normal">
            >
            {langsB.map(element => {
              return (
                <MenuItem value={element}>{this.getLanguageFromIsoCode(element)}</MenuItem>
              )
            })}
            </TextField>
            &nbsp;
            <Typography 
              className={classes.innerFilterElement}
              style={{textAlign:'right', marginTop: '21px'}}>
              that contains relations in 
            </Typography>
            &nbsp;
            <TextField
              id="templates-lang-A"
              select
              value={this.state.langPair.langA}
              onChange={this.handleChangeLangA}
              margin="normal">
            >
            {langsA.map(element => {
              return (
                <MenuItem value={element}>{this.getLanguageFromIsoCode(element)}</MenuItem>
              )
            })}
            </TextField>
            
          </Grid>
          <Grid item xs={4}>
            <Button onClick={this.loadTemplates}
                    className={classes.innerFilterElement}
                    style={{textAlign:'left'}}>
                Get templates
              </Button>
              {this.state.showHelp ? "" : <Button onClick={this.showHelp}
                    className={classes.innerFilterElement}
                    style={{textAlign:'left'}}>
                Show help
            </Button> }
          </Grid>
        </Grid>
        <p>{errorMsg}</p>
        <div>
          <div className={classes.root}>
          <Grid container>
            <Grid item className={classes.leftItem} xs={8}>
              <Typography className={classes.text}><b>Template name</b></Typography>
            </Grid>
            <Grid item className={classes.centerItem} xs={1}>
              <Typography className={classes.text}><b>Language</b></Typography>
            </Grid>
            <Grid item className={classes.centerItem} xs={1}>
              <Typography className={classes.text}
                          onClick={() => this.changeToNumericSort('allAnnotations')}>
                <b>All</b>
                {this.getSortingCaret('allAnnotations')}
              </Typography>
            </Grid>
            <Grid item className={classes.centerItem} xs={1}>
              <Typography className={classes.text}
                          onClick={() => this.changeToNumericSort('correctAnnotations')}>
                <b>Correct</b>
                {this.getSortingCaret('correctAnnotations')}
              </Typography>
            </Grid>
            <Grid item className={classes.centerItem} xs={1}>
              <Typography className={classes.text}
                          onClick={() => this.changeToNumericSort('wrongAnnotations')}>
                <b>Wrong</b>
                {this.getSortingCaret('wrongAnnotations')}
              </Typography>
            </Grid>
          </Grid>
          </div>
          {templatesItems != undefined && templatesItems.length > 0 ?
            templatesItems :
            (<Typography>No annotations with the current language pair selected.</Typography>)  
        }
        </div>
        {/* <p>{JSON.stringify(this.props.templateview)}</p>
        <p>{JSON.stringify(this.state)}</p> */}
      </div>
    );
  }
}

TemplateView.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  templateview: makeSelectTemplateView(),
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

const withReducer = injectReducer({ key: 'templateView', reducer });
const withSaga = injectSaga({ key: 'templateView', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyles(styles),
)(TemplateView);
