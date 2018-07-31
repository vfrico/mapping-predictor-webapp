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
import { Button } from '@material-ui/core';


/* eslint-disable react/prefer-stateless-function */
export class TemplateView extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      lang: "es",
    };
    // props.dispatch(defaultAction());
    // this.sleep(4000);
    // console.log("new props");
    // console.log(props);
  }

  handleChange = event => {
    this.setState({
      lang: event.target.value,
    });
  };

  componentDidMount() {
    this.callFunction();
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /* Calls the API to get templates */
  callFunction = () => {
    this.props.dispatch(loadTemplates(this.state.lang));
  }

  render() {

    var templatesList = undefined;
    if (this.props.templateview.templates != undefined) {
      
      templatesList = this.props.templateview.templates.map(t => {
        return <TemplateItem template={t}/>
      })
    }

    return (
      <div>
        {/* <FormattedMessage {...messages.header} /> */}

        <TextField
          id="templates-lang"
          select
          label="Templates language"
          value={this.state.lang}
          onChange={this.handleChange}
          margin="normal"
        >
          <MenuItem value="es">es</MenuItem>
          <MenuItem value="en">en</MenuItem>
        </TextField>
        <Button onClick={this.callFunction}>Get templates</Button>

        <div>
          {templatesList}
        </div>
        <p>{JSON.stringify(this.props.templateview)}</p>
        <p>{JSON.stringify(this.state)}</p>
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
)(TemplateView);
