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
import { Button, Typography } from '@material-ui/core';

/* eslint-disable react/prefer-stateless-function */
class AnnotationHelper extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      relatedTriplesA: this.getRelatedTriples("A", 1),
      relatedTriplesB: this.getRelatedTriples("B", 1),
      langA: this.props.helpers.langA,
      langB: this.props.helpers.langB,
      lastShuffle: this.props.shuffle,
    }
  }

  componentWillReceiveProps = (props) => {
    try {
      // Shuffle props if a new shuffle value is injected
      if (this.state.lastShuffle != props.shuffle) {
        this.setState({
          lastShuffle: props.shuffle,
        })
        this.shuffle();
      }
    } catch (e) {
      console.log(e);
    }
  }

  shuffle = () => {
    console.log("SHUFFLE")
    this.setState({
      relatedTriplesA: this.getRelatedTriples("A", 1),
      relatedTriplesB: this.getRelatedTriples("B", 1),
    })
  }

  getRelatedTriples = (lang, maxItems) => {
    var list = [];
    if (lang === "A") {
      list = new Array(... new Set(this.props.helpers.relatedTriplesA));
    } else if (lang === "B") {
      list = new Array(... new Set(this.props.helpers.relatedTriplesB));
    } else {
      list = new Array(... new Set(this.props.helpers.relatedTriples));
    }
    var chosenRelatedTriples = [];
    for (var i = 0; i < maxItems; i++) {
      var { item, list } = this.getRandom(list);
      chosenRelatedTriples.push(item);
    }
    return chosenRelatedTriples;
    //return this.props.helpers.relatedTriples;
  }

  getRandom = (list) => {
    var i = Math.floor(Math.random()*list.length);
    return { "item": list.splice(i, 1)[0], "list": list };
  }

  getRelevantSubjects = () => {
    var subjectList = [];
    this.getRelatedTriples().forEach(element => {
      subjectList.push(element.subject);
    });
    return subjectList;//.slice(0, 2);
  }

  getRelevantObjects = () => {
    var objectList = [];
    this.getRelatedTriples().forEach(element => {
      objectList.push(element.object);
    });
    return objectList;//new Array(... new Set(objectList));//.slice(0, 2);
  }

  urlShortener = (url) => {
    var newUrl = url.replace("http://dbpedia.org/resource/", "dbr:");
    newUrl = newUrl.replace("http://dbpedia.org/ontology/", "dbo:");
    newUrl = newUrl.replace("http://es.dbpedia.org/resource/", "dbr_es:");
    return newUrl;
  }

  genLinkItems = (objectsToUse) => {
    var linkItems = undefined;
    if (objectsToUse != undefined && objectsToUse.length > 0) {
      linkItems = (
        objectsToUse.map(element => {          
          var subject = this.urlShortener(element.subject);
          var predicate = this.urlShortener(element.predicate);
          var object = this.urlShortener(element.object);
          return (
          <p>
            <a href={element.subject} target="_blank">{subject}</a>
            <span> - </span>
            <a href={element.predicate} target="_blank">{predicate}</a>
            <span> - </span>
            <a href={element.object} target="_blank">{object}</a>
          </p>
          );
        })
      );
    }
    return linkItems;
  }

  render() {

    var linkItemsA = this.genLinkItems(this.state.relatedTriplesA);
    var linkItemsB = this.genLinkItems(this.state.relatedTriplesB);

    return (
      <div>
        <Typography>
          Entities related: 
        </Typography>
        <Typography><b>{this.state.langA}: </b></Typography>{linkItemsA}
        <Typography><b>{this.state.langB}: </b></Typography>{linkItemsB}
        {/*JSON.stringify(this.getRelevantObjects())*/}
        {/*JSON.stringify(this.props.helpers)*/}
      </div>
    );
  }
}

AnnotationHelper.propTypes = {
  helpers: PropTypes.object.isRequired,
  shuffle: PropTypes.string,
};

export default AnnotationHelper;
