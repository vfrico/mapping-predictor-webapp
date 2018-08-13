/**
 *
 * AnnotationHelper
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
