/**
 *
 * ClassifiedAsInfo
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

/* eslint-disable react/prefer-stateless-function */
class ClassifiedAsInfo extends React.Component {

  getHighestPair = (votesMap) => {
    if (votesMap.WRONG_MAPPING > 0.5) {
      return {
        result: "Inconsitent relation",
        value: votesMap.WRONG_MAPPING,
      }
    } else {
      return {
        result: "Consistent relation",
        value: votesMap.CORRECT_MAPPING,
      }
    }
  }

  render() {

    //var { result, value } = this.getHighestPair(this.props.classificationResult.votesMap);
    var value = this.props.classificationResult.votesMap.CORRECT_MAPPING;
    value = value * 100;
    return (
      <div>
        <span>Consistent</span> with probabaility: <span>{value}%</span>
      </div>
    );
  }
}

ClassifiedAsInfo.propTypes = {
  classificationResult: PropTypes.object.isRequired,
};

export default ClassifiedAsInfo;
