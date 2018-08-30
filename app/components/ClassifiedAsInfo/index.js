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
    console.log(votesMap)
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

    const { result, value } = this.getHighestPair(this.props.classificationResult.votesMap);

    return (
      <div>
        <span>{result}</span> with probabaility: <span>{value}</span>
      </div>
    );
  }
}

ClassifiedAsInfo.propTypes = {
  classificationResult: PropTypes.object.isRequired,
};

export default ClassifiedAsInfo;
