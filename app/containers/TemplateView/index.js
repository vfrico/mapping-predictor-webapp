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
import { Button } from '@material-ui/core';
import TemplateItem from '../../components/TemplateItem';

/* eslint-disable react/prefer-stateless-function */
export class TemplateView extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      lang: "es"
    };
    // props.dispatch(defaultAction());
    // this.sleep(4000);
    // console.log("new props");
    // console.log(props);
  }

  componentDidMount() {
    this.props.dispatch(loadTemplates(this.state.lang));
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  callFunction = () => {
    console.log("This is a call");
    this.props.dispatch(loadTemplates());
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
        <div>
          {templatesList}
        </div>
        <Button onClick={this.callFunction}>Call function</Button>
        <p>{JSON.stringify(this.props.templateview)}</p>
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
