import React, { memo, useEffect, useState, useContext, useLayoutEffect } from "react";
import styled from "styled-components";
import { HomeContext } from "../index/HomeContext";
import { Link, Route, Switch } from "react-router-dom";
import ProfileUserBlock from "../includes/ProfileUserBlock";
import AwaitResponse from "../reuseable/AwaitResponse";
import AuthLeftBar from "../includes/AuthLeftBar";
import usePrevState from '../customHooks/usePrevState';
import Loading from "../reuseable/Loading";
import TCMenuBtn from "./TCMenuBtn";
import EditableDiv from "../reuseable/EditableDiv";
import FormSelInput from "../reuseable/FormSelInput";
import NavContent from "./NavContent";
import FriendsBtn from "../menu/FriendsBtn";
import ClubBtn from "../menu/ClubBtn";
import NotificationBtn from "../menu/NotificationBtn";
import PageBtn from "../menu/PageBtn";
import CartBtn from "../menu/CartBtn";
import SearchBtn from "../menu/SearchBtn";
import { SearchContext } from "../index/SearchContext";

const SearchNav = (props) => {
    const { searching, handleUserSearch } = useContext(SearchContext);

    const [showFavoriteMenu, setshowFavoriteMenu] = useState(false);
    const [toggle, settoggle] = useState(false);
    const [toggleableWidth, settoggleableWidth] = useState(120);
    const [toggleableWidthStable, settoggleableWidthStable] = useState(false);
    //search
    const [searchCategory, setsearchCategory] = useState("");
    const [searchKeys, setsearchKeys] = useState("");
    const nav = React.createRef();
    const toggleable = React.createRef();

    const prevToggleableWidth = usePrevState(toggleableWidth);
    const { theme, navHeight, windowWidth, pageUser, authUser, updateNavHeight } = useContext(HomeContext);

    useEffect(() => {
        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, []);

    useLayoutEffect(() => {
        if (nav.current) {
            updateNavHeight(nav.current.offsetHeight);
        }
        return () => { };
    }, [toggle]);

    useEffect(() => {
        if (navHeight != nav.current.offsetHeight) {
            updateNavHeight(nav.current.offsetHeight);
        }
        return () => { };
    });
    const handleClick = (e) => {
        if (!e.target.closest(".drop-menu") && !e.target.classList.contains("favorite")) {
            setshowFavoriteMenu(false);
        }
        if (!e.target.closest(".toggleable") && !e.target.classList.contains("main-menu")) {
            settoggle(false);
        }
    };
    const handleToggleFavoriteMenu = (e) => {
        setshowFavoriteMenu(!showFavoriteMenu);
    };
    const handleToggleMainMenu = () => {
        settoggleableWidth(toggleable.current.offsetWidth);
        settoggle(!toggle);
    };
    const handleCategoryChange = (e) => {
        const { value } = e.target;
        setsearchCategory(value.replace(/\s\s+/g, " "));
    };

    useEffect(() => {
        if (searchKeys != "" && !searching) {
            handleUserSearch(searchKeys);
        }
        return () => { };
    }, [searchKeys]);

    const handleOninput = (e) => {
        const target = e.target;
        const { textContent } = target;
        setsearchKeys(textContent.trim());
    };

    const activeClass = location.pathname.split('/').pop();

    return (
        <ThisNav
            navHeight={ `${navHeight}` }
            toggleableWidth={ toggleableWidth }
            windowWidth={ windowWidth }
            theme={ theme }
        >
            <nav id={ `global-nav` } ref={ nav }>
                <div className="navigationBar">
                    <TCMenuBtn navHeight={ `${navHeight}` } />
                    { windowWidth > 450 ?
                        <Link to={ `/home` }>
                            <div className="navbarBrand" style={ { color: theme.nav_color } }>
                                <span>TalkCurrent</span>
                            </div>
                        </Link>
                        : "" }
                    <NavContent
                        bgc={ "inherit" }
                        bShadow={ "" }
                        bRadius={ "" }
                        width={ "100%" }
                        padding={ "8px 0 0 0" }
                    >
                        <SearchBtn
                            color={ theme.nav_color }
                            fontSize={ "large" }
                        >
                            <EditableDiv
                                placeholder={ "Search anything..." }
                                width={ '100%' }
                                miniHeight={ 'auto' }
                                padding={ '0 10px' }
                                borderRadius={ '30px' }
                                searchBar={ true }
                                overflow={ "visible" }
                                searching={ searching }
                                handleOninput={ handleOninput }
                                handleSearch={ handleUserSearch }
                                handleCategorySelect={ handleCategoryChange }
                                searchByCategory={ true }
                                categoryValue={ searchCategory.trim() != "" ? searchCategory : props.categoryValue }
                            >
                                { props.children }
                            </EditableDiv>
                        </SearchBtn>
                        <FriendsBtn
                            color={ theme.nav_color }
                            fontSize={ "large" }
                            countFontSize={ "smaller" }
                            countColor={ "silver" }
                            count={ "10" }
                        >

                        </FriendsBtn>

                        <ClubBtn
                            color={ theme.nav_color }
                            fontSize={ "large" }
                            countFontSize={ "smaller" }
                            countColor={ "silver" }
                            count={ "10" }
                        >

                        </ClubBtn>

                        <NotificationBtn
                            color={ theme.nav_color }
                            fontSize={ "large" }
                            countFontSize={ "smaller" }
                            countColor={ "silver" }
                            count={ "10" }
                        >

                        </NotificationBtn>

                        <PageBtn
                            color={ theme.nav_color }
                            fontSize={ "large" }
                            countFontSize={ "smaller" }
                            countColor={ "whitesmoke" }
                            countBgc={ "red" }
                            count={ "10" }
                        >

                        </PageBtn>

                        <CartBtn
                            color={ theme.nav_color }
                            fontSize={ "large" }
                            countFontSize={ "smaller" }
                            countColor={ "silver" }
                            count={ "10" }
                        >

                        </CartBtn>

                    </NavContent>
                    {/* Right Side Of Navbar */ }
                    <div className="authenticationLink">
                        {/* { user.profilePic ? */ }
                        <img
                            src={ `/storage/image/post_1619455976_9799d38f6319ff8b330ea2940d38d58d_0.jpg` }
                            alt="DP"
                            className="rounded-circle  mx-auto"
                            style={ { background: " #e6eaed", width: "30px", height: "30px", display: "block", objectFit: "cover" } }
                        />
                        {/* : ""
                        } */}

                    </div>
                </div>
            </nav>
        </ThisNav>
    );

};
export default memo(SearchNav);
export const ThisNav = styled.div`
    background-color: ${props => props.theme.nav_bgc};
    position: sticky;
    top: 0;
    z-index: 30;
    height: max-content;
    .navigationBar {
        display: grid;
        grid-auto-flow: column;
        grid-template-columns: ${props => props.windowWidth <= 450 ? "1fr 20fr 1fr" : "auto auto 10fr auto"};
        align-items: center;
        justify-items:start;
        gap: 10px;
        padding: 0px 10px 0px 10px;
        box-shadow: 1px 0px 5px 0px silver;
        a{
            text-decoration: none;
        }
        .navbarBrand {
            letter-spacing: 2px;
            background: whitesmoke;
            padding: 0 3px;
            border-radius: 10px;
        }
        .notificationNav{
            display: grid;
            ul {
                list-style: none;
                padding: 0;
                margin: 0;
                display: grid;
                grid-auto-flow: column;
                grid-gap: ${props => props.windowWidth < 400 ? "4px" : props.windowWidth < 768 ? "10px" : "15px"};
                .messages{
                    background: transparent;
                    align-self: stretch;
                    height: 100%;
                    border: unset;
                    color: green;
                    display: block;
                    background-image: url("/storage/image/message_white.png");
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: contain;
                    padding: ${props =>
        props.windowWidth <= 400 ?
            "9px"
            : props.windowWidth <= 600 ?
                "9px"
                : "11px"};
                }
                .club{
                    background: transparent;
                    align-self: stretch;
                    height: 100%;
                    border: unset;
                    color: green;
                    border-radius: 0px 7px 7px 0px;
                    display: block;
                    opacity: 0.8;
                    background-image: url("/storage/image/club_white.png");
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: contain;
                    padding: ${props =>
        props.windowWidth <= 400 ?
            "9px"
            : props.windowWidth <= 600 ?
                "9px"
                : "11px"};
                }
                .shop{
                    background: transparent;
                    align-self: stretch;
                    height: 100%;
                    border: unset;
                    color: green;
                    border-radius: 0px 7px 7px 0px;
                    display: block;
                    background-image: url("/storage/image/shopping_white.png");
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: contain;
                    padding: ${props =>
        props.windowWidth <= 400 ?
            "9px"
            : props.windowWidth <= 600 ?
                "9px"
                : "11px"};
                }
                > li {
                    float: left;
                    position: relative;
                    color: white;
                    margin: 0 2px;
                    padding: 0 5px;
                    cursor: pointer;
                    &:hover {
                        background: darkgreen;
                    }
                    a{
                        color: white;
                        text-decoration:none;
                    }
                    .drop-menu li:hover {
                        background: darkgreen;
                        color: #000000;
                    }
                }
                .user-favorite{
                    position: relative;
                    .drop-menu {
                        position: fixed;
                        top: ${props => Number(props.navHeight) + 3}px;
                        right: 1rem;
                        width: max-content;
                        max-width: 100%;
                        overflow-x: auto;
                        overflow-y: hidden;
                        display: grid;
                        grid-gap: 2px;
                        transition: all ease-in-out 1s;
                        li {
                            background: ${props => props.theme.hasOwnProperty('color') ? props.theme.nav_color : "transparent"};
                            width: 100%;
                            margin: 0;
                            text-align: center;
                            opacity: 0;
                            transition: all ease-in-out 1s;
                        }
                    }
                    &.showFavoriteMenu{
                        .drop-menu{
                            perspective: 1000px;
                            li:nth-child(1) {
                                animation-name: menu2;
                                animation-duration: 200ms;
                                animation-delay: -100ms;
                                animation-timing-function: ease-in-out;
                                animation-fill-mode: forwards;
                            }
                            li:nth-child(2) {
                                animation-name: menu2;
                                animation-duration: 200ms;
                                animation-delay: 0ms;
                                animation-timing-function: ease-in-out;
                                animation-fill-mode: forwards;
                            }
                            li:nth-child(3) {
                                animation-name: menu2;
                                animation-duration: 200ms;
                                animation-delay: 100ms;
                                animation-timing-function: ease-in-out;
                                animation-fill-mode: forwards;
                            }
                            li:nth-child(4) {
                                animation-name: menu2;
                                animation-duration: 200ms;
                                animation-delay: 200ms;
                                animation-timing-function: ease-in-out;
                                animation-fill-mode: forwards;
                            }
                            @keyframes menu2 {
                                0% {
                                    opacity: 0;
                                    transform: scale(0.3) translateY(-60px);
                                }
                                100% {
                                    opacity: 1;
                                    transform: scale(1) translateY(0px);
                                }
                            }
                        }
                    }
                }
            }
        }


        .authenticationLink {
            display: flex;
            align-items: center;
            justify-self: end;
            .nav-link {
                @media only screen and (max-width: 900px) {
                    /* For mobile phones: */
                    display: none;
                }
            }
        }
    }
`;
