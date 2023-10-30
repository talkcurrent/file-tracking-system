import React from 'react';
import styled from 'styled-components';

const List = (props) => {
    return (
        <ListStyle
            nthChild={ props.nthChild }
            nthChildBgc={ props.nthChildBgc }
            gtc={ props.gtc }
            padding={ props.padding }
            gap={ props.gap }
        >
            {props.children }
        </ListStyle>
    );
};

export default List;

const ListStyle = styled.div`
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: ${props => props.gtc};
    padding: ${props => props.padding};
    gap: ${props => props.gap};
    &:nth-child(${props => props.nthChild}) {
        background: ${props => props.nthChildBgc};
    }
`;