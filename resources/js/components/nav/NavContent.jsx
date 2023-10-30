import React, { useContext } from 'react';
import styled from 'styled-components';
import { HomeContext } from '../index/HomeContext';

const NavContent = (props) => {
    const { windowWidth } = useContext(HomeContext);
    return (
        <NavContentStyle
            bgc={ props.bgc }
            bShadow={ props.bShadow }
            bRadius={ props.bRadius }
            width={ props.width }
            padding={ props.padding }
            windowWidth={ windowWidth }
        >
            {props.children }
        </NavContentStyle>
    );
};

export default NavContent;
const NavContentStyle = styled.div`
    visibility: visible;
    display: inline-grid;
    grid-auto-flow: column;
    align-items: center;
    justify-items: center;
    gap: 10px;
    background-color: ${props => props.bgc};
    box-shadow: ${props => props.bShadow};
    border-radius: ${props => props.bRadius};
    width: ${props => props.width};
    line-height: normal;
    padding: ${props => props.padding};
`;
