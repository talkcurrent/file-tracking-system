import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { WelcomeContext } from '../index/WelcomeContext';

const SectionMain = (props) => {
    const { navHeight, windowWidth } = useContext(WelcomeContext);
    return (
        <SectionMainStyle
            width={ props.width }
            height={ props.height }
            windowWidth={ windowWidth }
            padding={ props.padding }
            bgc={ props.bgc }
        >
            <div className="overflow-scroll">
                { props.children }
            </div>
        </SectionMainStyle>
    );
};

export default SectionMain;
const SectionMainStyle = styled.main`
        margin: 0 auto;
        width: ${props => props.width};
        height: ${props => props.height};
        padding: ${props => props.windowWidth < 768 ? "0px" : "60px"} 15px;
        grid-column: 1;
        grid-row: 1;
        z-index: 10;
        background: ${props => props.bgc ? props.bgc : "rgba(0,0,0,0.4)"};
        overflow: auto;
        display: grid;
        .overflow-scroll{
            margin: 0 auto;
        }
`;
