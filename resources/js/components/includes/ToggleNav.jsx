import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ToggleNav = (props) => {
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

    useEffect(() => {
        document.addEventListener("click", closeMainMenu, true);
        return () => {
            document.removeEventListener("click", closeMainMenu, true);
        };
    }, []);
    const getIconHeight = (element) => {
        setIconHeight(element.clientHeight);
    };

    const handleToggleMainMenu = () => {
        setToggle(!toggle);
        setToggleableWidth(toggleable.current.offsetWidth);
    };
    const closeMainMenu = (e) => {
        if (!e.target.closest(`.menuIcon`)) {
            setToggle(false);
        }
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
                    className={ `toggleable ${toggle ? "toggle" : ""}` }
                    ref={ toggleable }
                >
                    { props.children }
                </div>
            </div>
        </Nav>
    );
};

export default ToggleNav;
export const Nav = styled.div`
    position: fixed;
    left: 0;
    bottom: 0;
    padding: 0 10px;
    border-radius: 4px;
    background: #6c757d;
    z-index: 101;
    .menuIcon {
        color: white;
        font-size: 16px;
        .main-menu{
            cursor: pointer;
        }
        .toggleable{ 
            position: fixed;
            top: 3px;
            font-size: ${props => props.windowWidth < 400 ? "smaller"
        : props.windowWidth < 680 ? "medium"
            : ""};
            bottom: ${props => Number(props.iconHeight) + 3}px;
            left: -${props => props.toggleableWidth > 20 ? props.toggleableWidth : 150}px;
            max-width: 150px;
            padding: 3px 5px;
            background: #6c757d;
            /* border-radius: 0px 7px 7px 0px; */
            transition:all 0.7s linear;
            z-index: 10;
            overflow-y: auto;
            &.toggle{
                left: 0px;
            }
        }
    }
`;
