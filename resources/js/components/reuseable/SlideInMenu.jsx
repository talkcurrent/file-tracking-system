import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import usePrevState from '../customHooks/usePrevState';

const SlideInMenu = (props) => {
    const [top, settop] = useState(-24);
    const [bottom, setbottom] = useState("");
    const [left, setleft] = useState("");
    const [right, setright] = useState("");

    const menuRef = useRef(null);

    useLayoutEffect(() => {
        settop(menuRef.current.clientHeight);
    }, []);

    useEffect(() => {
        settop(2);
    }, []);

    return (
        <SlideInMenuStyle
            padding={ props.padding }
            bgc={ props.bgc }
            justifyItems={ props.justifyItems }
            top={ `${top}px` }
            ref={ menuRef }
        >
            {props.children }
        </SlideInMenuStyle>
    );
};

export default SlideInMenu;
const SlideInMenuStyle = styled.div`
    padding: ${props => props.padding};
    background: ${props => props.bgc};
    display: grid;
    justify-items: ${props => props.justifyItems};
    grid-auto-flow: column;
    white-space: nowrap;
    gap: 2px;
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 100%;
    transition:all 0.4s linear;
    font-size: smaller;

`;
