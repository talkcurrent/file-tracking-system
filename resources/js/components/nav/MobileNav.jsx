import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { WelcomeContext } from '../index/WelcomeContext';

const MobileNav = (props) => {
    const { navHeight, windowWidth } = useContext(WelcomeContext);
    return (
        <MobileNavStyle
            showNav={ props.openNav }
            windowWidth={ windowWidth }
            navHeight={ navHeight }
        >
            <ul className={ "nav-list" }>
                <li className={ "nav-list-items item-label" }>
                    <Link to={ "/our-company" } >ABOUT</Link>
                    <div className="list-drop-down" style={ { backgroundColor: "#af1e2d" } }>
                        <ul className={ "nav-list" }>
                            <li className={ "nav-list-items item" }>
                                <Link to={ "/our-company" } ><div>OUR COMPANY</div></Link>
                            </li>

                        </ul>
                    </div>
                </li>
            </ul>
        </MobileNavStyle>
    );
};

export default MobileNav;

const MobileNavStyle = styled.div`
    position: fixed;
    top: 70px;
    left: ${props => props.showNav === true ? "0" : "100%"};
    width: 100%;
    background: #b2b2b2;
    transition: all ease-in-out 0.4s;
    .nav-list{
        display: grid;
        grid-auto-flow: row;
        justify-self: center;
        width: 100%;
        gap: 1px;
    }
    .nav-list, ul{
        margin: 0;
        /* gap: 1.5rem; */
        list-style: none;
        color: #777777;
        padding: 0;
    }
    .nav-list-items{
        position: relative;
        background: white;
        a{
            display: grid;
            color: inherit;
            text-decoration: none;
            padding-top: 20px;
            padding-bottom: 20px;
            line-height: 20px;
            text-align: center;
            font-size: 18px
        }
        .list-drop-down{
            position: absolute;
            top: 100%;
            left: 0;
            display: none;
            padding: 2px;
            width: ${props => props.windowWidth < 801 ? "" : "100%"};
            a{
                font-size: small;
                display: block;
                padding:0;
                text-align: left;
                div{
                    padding: 10px 22px;
                }
            }
            /* li:hover{

            } */
        }
        &:hover{    
            .list-drop-down{
                display: block;
                z-index: 10;
            }
        }
    }
    .item{
        &:hover{
            a{
                color: white;
            }
        }
    }

    .nav-list-items:hover{
        color: white;
        background-color: #af1e2d;
    }
    /* @media screen and (max-width: 1023px){
        .nav-list > .nav-list-items > a {
            padding-top: 20px;
            padding-bottom: 20px;
            line-height: 20px;
            text-align: center;
            font-size: 18px;
        }
    } */
`;
