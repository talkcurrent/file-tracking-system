import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ToggleNavRight = (props) => {
    const [toggle, setToggle] = useState("");
    const [iconHeight, setIconHeight] = useState("");
    const [toggleableWidth, setToggleableWidth] = useState("");
    //
    const toggleable = React.createRef();
    const toggleIconCont = React.createRef();

    useEffect(() => {
        const toggleIcon = toggleIconCont.current;
        if (toggleIcon) {
            if (iconHeight != toggleIcon.clientHeight) {
                getIconHeight(toggleIcon);
            }
        }
        return () => { };
    });

    const getIconHeight = (element) => {
        setIconHeight(element.clientHeight);
    };

    const handleToggleMainMenu = () => {
        setToggle(!toggle);
        setToggleableWidth(toggleable.current.offsetWidth);
    };
    const updateToggleableWidth = () => {
        setToggleableWidth(toggleable.current.offsetWidth);
    };
    return (
        <Nav iconHeight={ iconHeight } toggleableWidth={ toggleableWidth }>
            <div className="menuIcon" ref={ toggleIconCont }>
                <span
                    onClick={ handleToggleMainMenu }
                    className={ `main-menu` }
                >&#9776;</span>
                <div
                    className={ `toggleable-right ${toggle ? "toggle" : ""}` }
                    ref={ toggleable }
                >
                    { props.children }
                </div>
            </div>
        </Nav>
    );
};

export default ToggleNavRight;
export const Nav = styled.div`
    position: fixed;
    right: 0;
    bottom: 0;
    padding: 0 10px;
    border-radius: 4px;
    background: #6c757d;
    z-index: 10;
    .menuIcon {
        color: white;
        font-size: 16px;
        .main-menu{
            cursor: pointer;
        }
        .toggleable-right{
            color: #3f5c75;
            position: fixed;
            top: 3px;
            font-size: ${props => props.windowWidth < 400 ? "smaller"
        : props.windowWidth < 680 ? "small"
            : ""};
            bottom: ${props => Number(props.iconHeight) + 3}px;
            right: ${props => props.toggleableWidth > 20 ? `-${props.toggleableWidth}px` : "-100%"};
            width: 100%;
            padding: 0 6px;
            background: #6c757d;
            border-radius: 0px 7px 7px 0px;
            transition:all 0.7s linear;
            z-index: 10;
            overflow-y: auto;
            box-shadow: 1px 1px 10px 1px grey;
            &.toggle{
                right: 0px;
            }
        }
    }
`;
