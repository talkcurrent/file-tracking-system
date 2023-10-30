import React, { memo, useEffect, useState, useContext, useLayoutEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import useTheme from "../customHooks/useTheme";
import { WelcomeContext } from "../index/WelcomeContext";
import FormInput from "../reuseable/FormInput";
import IconToolTipBtn from '../reuseable/IconToolTipBtn';
import MobileNav from "./MobileNav";

const NavBar = (props) => {
    const {
        navHeight, windowWidth, klass,
        handleIconMouseEnter, handleIconMouseLeave
    } = useContext(WelcomeContext);
    const [toggle, settoggle] = useState(false);
    const [top, settop] = useState("-64px");
    const [eleExist, seteleExist] = useState(false);
    const [openNav, setopenNav] = useState(false);
    const [form, setform] = useState({
        searchKey: ""
    });
    const path = useRef();
    const theme = useTheme();
    let history = useHistory();

    useEffect(() => {
        path.current = history.location.pathname;
        const hoveredable = document.querySelectorAll(".nav-list-items > a");
        const hovereIcon = document.querySelectorAll(".img-icon");
        if (!eleExist && (hoveredable.length || hovereIcon.length)) {
            seteleExist(true);
        }
    });

    useEffect(() => {
        const hoveredable = document.querySelectorAll(".nav-list-items > a");
        const hovereIcon = document.querySelectorAll(".img-icon");

        if (hoveredable.length) {
            Array.from(hoveredable).forEach(elem => {
                elem.addEventListener("mouseenter", () => { handleMouseEnter(elem); });
                elem.addEventListener("mouseleave", () => { handleMouseLeave(elem); });
            });
        }
        if (hovereIcon.length) {
            Array.from(hovereIcon).forEach(elem => {
                elem.addEventListener("mouseenter", () => { iconMouseEnter(elem); });
                elem.addEventListener("mouseleave", () => { iconMouseLeave(elem); });
            });
        }
        return () => {
            if (hoveredable.length) {
                Array.from(hoveredable).forEach(elem => {
                    elem.removeEventListener("mouseenter", () => { handleMouseEnter(elem); });
                    elem.removeEventListener("mouseleave", () => { handleMouseLeave(elem); });
                });
            }
            if (hovereIcon.length) {
                Array.from(hovereIcon).forEach(elem => {
                    elem.removeEventListener("mouseenter", () => { iconMouseEnter(elem); });
                    elem.removeEventListener("mouseleave", () => { iconMouseLeave(elem); });
                });
            }

        };
    }, [eleExist]);

    const handleMouseEnter = (elem) => {
        elem.style.backgroundColor = "#af1e2d";
    };
    const handleMouseLeave = (elem) => {
        elem.style.backgroundColor = "";
    };
    const iconMouseEnter = (elem) => {
        handleIconMouseEnter(elem);
    };
    const iconMouseLeave = () => {
        handleIconMouseLeave([]);
    };

    const handleChange = async (e) => {
        const { name, value } = e.target;
        const str = value.replace(/\s\s+/g, " ");
        setform({ ...form, [name]: useStrCapitalize(str) });

    };
    const toggleSearch = (e) => {
        if (!form.searchKey.trim().length && top === "-64px") {
            settop("0px");
        } else {
            settop("-64px");
        }
    };
    const toggleNav = (e) => {
        setopenNav(!openNav);
    };
    const openApplication = (e) => {
        const url = `/application`;
        window.history.pushState({}, '', url);
    };
    return (
        <ThisNav
            navHeight={ `${navHeight}` }
            windowWidth={ windowWidth }
            theme={ theme }
            top={ top }
            width={ props.width }
            padding={ props.padding }
        >
            <div className="nav-top-container">
                <div className="brand-block" >
                    { windowWidth >= "1024" ?
                        <React.Fragment>
                            <div className="input-search-block">
                                <input type="text" name="s"
                                    onChange={ e => handleChange(e) }
                                    id="search" maxLength="500" autoFocus="autofocus"
                                    placeholder="Search" value="" className="form-control"
                                    required=""
                                />
                            </div>
                        </React.Fragment>
                        : ""
                    }
                    <div className="brand-apply">
                        <div className="company-brand">
                            <Link to="/">
                                <img style={ { width: windowWidth < 500 ? "81px" : "" } } src="/storage/image/envoynav.png" alt="envoy-air" />
                            </Link>
                            { windowWidth >= "601" ?
                                <React.Fragment>
                                    <img
                                        style={ { width: windowWidth < 500 ? "81px" : "" } }
                                        src="/storage/image/envoylogo.png" alt="envoy-air" style={ { padding: "0 15px" } } />
                                </React.Fragment>
                                : ""
                            }
                        </div>
                        <React.Fragment>
                            { !(path.current == "/application") ?
                                <Link to={ `${path.current == "/application" ? "#" : "/application"}` }
                                    className="apply-btn"
                                    style={ { width: windowWidth < 500 ? "82px" : "" } }
                                >
                                    <span>APPLY NOW</span>
                                    <i className={ "fas fa-angle-right" } style={ { fontSize: "x-large" } }></i>
                                </Link>
                                :
                                <div
                                    className="apply-btn"
                                    style={ { width: windowWidth < 500 ? "82px" : "" } }
                                >
                                    <span>APPLY NOW</span>
                                    <i className={ "fas fa-angle-right" } style={ { fontSize: "x-large" } }></i>
                                </div>
                            }
                        </React.Fragment>
                        { windowWidth < "1024" ?
                            <div className="menu-bars"
                                onClick={ e => toggleNav(e) }
                            >
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </div>
                            : ""
                        }
                    </div>

                </div>
                { windowWidth >= "1024" ?
                    <React.Fragment>
                        <div className="search-btn">
                            <div className="search-icon"
                                style={ { padding: "5px", } }
                                onClick={ e => toggleSearch(e) }
                            >
                                <i className="fas fa-search"></i>
                            </div>
                        </div>
                    </React.Fragment>
                    : ""
                }
                { windowWidth < "1024" ?
                    <MobileNav openNav={ openNav } />
                    : ""
                }
            </div>
            { windowWidth >= "1024" ?
                <div className="nav-bottom-block">
                    <ul className={ "nav-list" }>
                        <li className={ "nav-list-items" }>
                            <Link to={ "/our-company" }>ABOUT</Link>
                            <div className="list-drop-down">
                                <ul>
                                    <li className={ "nav-list-items" }>
                                        <Link to={ "/our-company" } ><div>OUR COMPANY</div></Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                    { windowWidth >= "1170" ?
                        <div className="brand-icon">
                            <a href="http://" target="_blank" rel="noopener noreferrer" className={ "img-icon" }>
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="http://" target="_blank" rel="noopener noreferrer" className={ "img-icon" }>
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="http://" target="_blank" rel="noopener noreferrer"
                                className={ "img-icon insta" }
                                style={ { display: "grid" } }
                            >
                                { !klass.includes("insta") ?
                                    <img src="/storage/image/instagram.png" alt="" />
                                    :
                                    <img src="/storage/image/instagram-red.png" alt="" />
                                }
                            </a>
                            <a href="http://" target="_blank" rel="noopener noreferrer"
                                className={ "img-icon youtube" }
                                style={ { display: "grid" } }
                            >
                                { !klass.includes("youtube") ?
                                    <img src="/storage/image/youtube-white.png" alt="" />
                                    :
                                    <img src="/storage/image/youtube-red.png" alt="" className={ "" } />
                                }
                            </a>
                            <a href="http://" target="_blank" rel="noopener noreferrer" className={ "img-icon" }>
                                <i className="fab fa-linkedin"></i>
                            </a>
                        </div>
                        : ""
                    }
                </div>
                : ""
            }

        </ThisNav>
    );

};
export default memo(NavBar);
export const ThisNav = styled.div`
    position: sticky;
    top: 0;
    z-index: 30;
    background-color: ${props => props.theme.nav_bgc};
    display: grid;
    /* position: relative; */
    .nav-top-container{
        display: grid;
        position: relative;
        background-color: ${props => props.theme.nav_bgc};
        grid-template-columns: 6fr auto;
        grid-column: 1;
        grid-row: 1;
        z-index: 11;
        top: ${props => props.windowWidth >= 1024 ? props.top : ""};
        transition: all ease-in-out 0.4s;
        .brand-block{
            position: relative;
            display: grid;
            gap: 4px;
            margin: 0 auto;
            width: ${props => props.width};
            padding: ${props => props.windowWidth < 1024 ? "0 15px" : ""};
            .input-search-block{
                align-self: end;
                justify-self: end;
                #search{
                    color: #777777;
                    width: 250px;
                    height: 60px;
                    padding: 0 5px 0 22px;
                    background: transparent;
                    border: none;
                    outline: none;
                    font-size: 16px;
                    box-shadow: none;
                    border: 3px double rgba(204, 204, 204, 0.45);
                    box-sizing: border-box;
                    -moz-box-sizing: border-box;
                    -webkit-box-sizing: border-box;
                    transition: all ease-in-out 0.4s;
                }
            }
            .brand-apply{
                display: grid;
                grid-auto-flow: column;
                /* margin-left: 2rem;
                padding-left: 15px; */
                .company-brand{
                    padding: ${props => props.windowWidth < 1024 ? "15px 0" : ""};
                    justify-self: start;
                    display: grid;
                    grid-auto-flow: column;
                    align-items: center;
                }
                
                .apply-btn{
                    background-color: #af1e2d;
                    justify-self: end;
                    align-self: ${props => props.windowWidth < 500 ? "center" : ""};
                    position: relative;
                    height: ${props => props.windowWidth < 500 ? "40px" : "66px"};
                    margin-right: 33px;
                    display: grid;
                    grid-auto-flow: column;
                    align-items: center;
                    gap: 4px;
                    font-size: medium;
                    line-height: normal;
                    padding: 0 8px 0 8px;
                    color: white;
                    text-decoration: none;
                    &::before{
                        content: " ";
                        position: absolute;
                        top: 0;
                        left: -33px;
                        border-right: 33px solid #af1e2d;
                        border-top: ${props => props.windowWidth < 500 ? "40px" : "66px"} solid transparent;
                    }
                    &::after{
                        content: " ";
                        position: absolute;
                        top: 0;
                        left: 100%;
                        border-left: 33px solid #af1e2d;
                        border-bottom: ${props => props.windowWidth < 500 ? "40px" : "66px"} solid transparent;
                    }
                    &:hover:before{
                        border-right: 33px solid rgb(0, 92, 195);
                    }
                    &:hover:after{
                        border-left: 33px solid rgb(0, 92, 195);
                    }
                    &:hover{
                        background-color: rgb(0, 92, 195);
                        color: #af1e2d;
                    }
                }
                .menu-bars{
                    justify-self: end;
                    align-self: center;
                    position: relative;
                    margin-right: 15px;
                    padding: 10px;
                    margin-bottom: 8px;
                    background-color: transparent;
                    background-image: none;
                    border: 1px solid transparent;
                    border-radius: 100%;
                    display: grid;
                    gap: 4px;
                    .icon-bar{
                        display: block;
                        width: 22px;
                        height: 4px;
                        border-radius: 1px;
                        background-color: #af1e2d;
                    }
                    &:hover{
                        background-color: #af1e2d;
                        .icon-bar{
                            background-color: white;
                        }
                    }
                }
            }
        }
        .search-btn{
            display: grid;
            align-items: ${props => props.top == "0px" ? "start" : "end"};
            justify-items: end;
            padding: 10px;
            width: 65px;
            transition: all ease-in-out 0.4s;
            position: absolute;
            right: 0;
            top: 0;
            /* width: 20vw; */
            height: 100%;
            .search-icon{
                position: relative;
                color: rgb(0,92,195);
                border: unset;
                font-size: 20px;
                padding: 5px;
                &:hover{
                    color: #af1e2d;
                }
            }
        }

    }
    .nav-bottom-block{
        display: grid;
        grid-template-columns: ${props => props.windowWidth >= "1170" ? "7fr 2fr" : "7fr 0.9fr"};
        align-items: center;
        background: #1565bf;
        grid-column: 1;
        grid-row: 1;
        height: max-content;
        align-self: end;
        margin-bottom: 21px;
        padding: 4px;
        height: 45px;
        max-height: 45px;
        .nav-list{
            display: grid;
            grid-auto-flow: column;
            justify-self: end;
        }
        .nav-list, ul{
            margin: 0;
            /* gap: 1.5rem; */
            list-style: none;
            color: white;
            padding: 0;
            background-color: #1565bf;
        }
        .nav-list-items{
            position: relative;
            a{
                padding: 12px 22px;
                color: inherit;
                text-decoration: none;
                font-size: medium;
            }
            .list-drop-down{
                position: absolute;
                top: 137%;
                left: 0;
                display: none;
                a{
                    display: block;
                    padding:0;
                    div{
                        padding: 10px 22px;
                    }
                }
            }
            &:hover{                
                .list-drop-down{
                    display: block;
                }
            }
        }
        .brand-icon{
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            justify-self: start;
            margin-left: 30px;
            align-items: center;
            gap: 2px;
            a{
                text-decoration: none;
                color: white;
                padding: 0 5px;
                font-size: 22px;
                img{
                    height: 22px;;
                    width: 22px;
                    align-items: center;

                }
                &:hover{                
                    color: #af1e2d;
                }
            }
        }
    }


    .authenticationLink {
        display: flex;
        align-items: center;
        .nav-link {
            @media only screen and (max-width: 900px) {
                /* For mobile phones: */
                display: none;
            }
        }
    }
`;
