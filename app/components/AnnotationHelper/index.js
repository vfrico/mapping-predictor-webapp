/**
 *
 * AnnotationHelper
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

/* eslint-disable react/prefer-stateless-function */
class AnnotationHelper extends React.Component {

  getRelatedTriples = () => {
    return this.props.helpers.relatedTriples;
  }

  getRelevantObjects = () => {
    var objectList = [];
    this.getRelatedTriples().forEach(element => {
      objectList.push(element.object);
    });
    return objectList.slice(0, 2);
  }

  render() {

    var linkItems = undefined;
    const objectsToUse = this.getRelevantObjects();
    if (objectsToUse.length > 0) {
      linkItems = (
        objectsToUse.map(element => {
          return <p><a href={element} target="_blank">{element}</a></p>
        })
      );
    }

    return (
      <div>
        {linkItems}
        {/*JSON.stringify(this.getRelevantObjects())*/}
        {/*JSON.stringify(this.props.helpers)*/}
      </div>
    );
  }
}

AnnotationHelper.propTypes = {
  helpers: PropTypes.object.isRequired,
};

export default AnnotationHelper;
