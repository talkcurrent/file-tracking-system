import React from 'react';
import styled from 'styled-components';

const SearchResult = (props) => {
    return (
        <SearchResultStyle
            maxHeight={ props.maxHeight }
            overflowY={ props.overflowY }
            gap={ props.gap }
        >
            {props.children }
        </SearchResultStyle>
    );
};

export default SearchResult;
const SearchResultStyle = styled.div`
    display: grid;
    gap: ${props => props.gap ? props.gap : "0.5rem"};
    grid-auto-rows: 12px;
    grid-template-rows: max-content;
    max-height: ${props => props.maxHeight};
    overflow-y: ${props => props.overflowY};
`;