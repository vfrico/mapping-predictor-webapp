/**
 *
 * StyledLink
 *
 */



import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


const StyledLink = styled(Link)`
    text-decoration: none;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

export default (props) => <StyledLink {...props} />;
/*
import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function StyledLink() {
  return <div />;
}

StyledLink.propTypes = {};

export default StyledLink;
*/