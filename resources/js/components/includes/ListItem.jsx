import React from 'react';
import styled from 'styled-components';

const ListItem = (props) => {
    const { margin, padding, bgc, gtc } = props;
    return (
        <ListItemStyle
            margin={ margin }
            padding={ padding }
            bgc={ bgc }
            gtc={ gtc }
        >
            {props.children }
        </ListItemStyle>
    );
};

export default ListItem;

const ListItemStyle = styled.div`
    display: grid;
    margin: ${props => props.margin};
    padding: ${props => props.padding};
    background: ${props => props.bgc};
    grid-template-columns: ${props => props.gtc};
    align-items: center;

    &:nth-child(even) {
        background: #e6e6e6;
        color: black;
    }
    &:nth-child(odd) {
        background: #dbe5ef;
        color: black;
    }
`;