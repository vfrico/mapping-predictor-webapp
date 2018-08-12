/**
 *
 * TemplateView
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
import makeSelectTemplateView, { makeTestSelector } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { defaultAction, loadTemplates } from './actions';
import TemplateItem from '../../components/TemplateItem';


import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { Button, withStyles, Grid, Typography, Paper } from '@material-ui/core';
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
    var brwstate = this.brwst.getUserPrefs("templateview", {
      lang: "es",
      descending: true, // Used in sorting function
      sortKey: "wrongAnnotations", // Used in sorting function
      sortFunction: this.numericSort,
    });
    this.state = {
      ... brwstate,
    }
    // props.dispatch(defaultAction());
    // this.sleep(4000);
    // console.log("new props");
    // console.log(props);
  }


  numericSort = (a, b) => {
    if (this.state.descending) {
      return b[this.state.sortKey] - a[this.state.sortKey];
    } else {
      return a[this.state.sortKey] - b[this.state.sortKey];
    }
  }

  handleChange = event => {
    this.setState({
      lang: event.target.value,
    });
  };

  componentDidMount() {
    this.callFunction();
  }

  componentWillUpdate(nextProps, nextState) {
    console.log("update: "+JSON.stringify(nextState));
    this.brwst.saveUserPrefs("templateview", nextState);
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /* Calls the API to get templates */
  callFunction = () => {
    this.props.dispatch(loadTemplates(this.state.lang));
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

    const { classes } = this.props;

    return (
      <div className={classes.container}>
        
        <Grid container className={classes.topFilter}>
          <Grid item xs={3}>
            <Typography 
              className={classes.innerFilterElement}
              style={{textAlign:'right', marginTop: '21px'}}>
              Filter templates by language: 
            </Typography>
          </Grid>
          <Grid item xs={1} className={classes.filterDropdown}>
            <TextField
              id="templates-lang"
              select
              value={this.state.lang}
              onChange={this.handleChange}
              margin="normal">
            >
              <MenuItem value="es">Spanish</MenuItem>
              <MenuItem value="el">Greek</MenuItem>
              <MenuItem value="de">German</MenuItem>
              <MenuItem value="nl">Dutch</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={3}>
            <Button onClick={this.callFunction}
                    className={classes.innerFilterElement}
                    style={{textAlign:'left'}}>
                Get templates
              </Button>
          </Grid>
        </Grid>
        
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
          {templatesItems}
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
