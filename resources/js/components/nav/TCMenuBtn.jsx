import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import AuthLeftBar from '../includes/AuthLeftBar';
import { HomeContext } from '../index/HomeContext';

const TCMenuBtn = (props) => {
    const { theme } = useContext(HomeContext);
    const [toggle, settoggle] = useState(false);
    const [toggleableWidth, settoggleableWidth] = useState(120);

    const toggleable = React.createRef();

    const handleToggleMainMenu = () => {
        settoggleableWidth(toggleable.current.offsetWidth);
        settoggle(!toggle);
    };

    useEffect(() => {
        if (document.querySelector(`.mainContainer`)) {
            document.querySelector(`.mainContainer`)
                .addEventListener("click", handleToolTipClose, true);
        }
        return () => {
            if (document.querySelector(`.mainContainer`)) {
                document.querySelector(`.mainContainer`)
                    .removeEventListener("click", handleToolTipClose, true);
            }
        };
    }, []);

    const handleToolTipClose = (e) => {
        const menuBtn = document.querySelector('.main-menu');
        if (e.target != menuBtn && !e.target.closest(`.toggleable`)) {
            settoggle(false);
        }
    };

    const activeClass = location.pathname.split('/').pop();

    return (
        <TCMenuBtnStyle
            navHeight={ props.navHeight }
            navBgc={ theme.nav_bgc }
            navColor={ theme.nav_color }
            toggleableWidth={ toggleableWidth }
        >
            <img
                src={ `/storage/image/talkcurrent_white.png` }
                alt="TC"
                onClick={ e => handleToggleMainMenu() }
                className="rounded-circle menu-image  main-menu"
            />
            <div
                className={ `toggleable ${toggle ? "toggle" : ""}` }
                ref={ toggleable }
            >
                <AuthLeftBar activeClass={ `${activeClass}` } />
            </div>
        </TCMenuBtnStyle>
    );
};

export default TCMenuBtn;
const TCMenuBtnStyle = styled.div`
    color: ${props => props.navBgc};
    font-size: 16px;
    display: inline-block;
    background: ${props => props.navColor};
    border-radius: 50%;
    .main-menu{
        cursor: pointer;
    }
    .menu-image{
        cursor: pointer;
        height: 30px;
        width: 30px;
        object-fit: cover;
        transform: scale(1.3);
    }
    .toggleable{
        position: fixed;
        top: ${props => Number(props.navHeight) + 3}px;
        left: -${props => props.toggleableWidth > 20 ? props.toggleableWidth : 120}px;
        /* width: 120px; */
        max-width: 120px;
        background: rgb(93 192 182 / 21%);
        border-radius: 0px 0px 7px 7px;
        transition:all 0.4s linear;
        z-index: 10;
        &.toggle{
            left: 0px;
            max-height: 90vh;
            overflow: auto;
            padding: 1px 10px;
            box-shadow: 2px 0px 7px #6c757d;
        }
    }
 `;
