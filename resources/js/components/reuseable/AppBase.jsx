import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { HomeContext } from '../index/HomeContext';

const AppBase = (props) => {
    const { theme, navHeight, windowHeight } = useContext(HomeContext);

    const [color, setcolor] = useState("#3f5c75");
    const [bgc, setbgc] = useState("#fcfcfd");
    const [navBgc, setnavBgc] = useState("#0d7739");
    const [navColor, setnavColor] = useState("white");
    const [buttonStyle, setbuttonStyle] = useState("solid");
    const [bgcImg, setbgcImg] = useState("");

    const [navBarHeight, setnavBarHeight] = useState(0);
    const [bodyHeight, setbodyHeight] = useState(0);

    useEffect(() => {
        if (theme.hasOwnProperty("color")) {
            setcolor(theme.color);
            setbgc(theme.background_color);
            setnavBgc(theme.nav_bgc);
            setnavColor(theme.nav_color);
            setbuttonStyle(theme.button_style);
            setbgcImg(theme.background_img);
        }
        return () => { };
    }, [theme]);


    useEffect(() => {
        const bHeight = windowHeight - navHeight;
        setnavBarHeight(navHeight);
        setbodyHeight(bHeight);

        return () => { };
    }, [windowHeight, navHeight]);

    return (
        <AppBaseStyle
            bodyHeight={ bodyHeight }
            setMaxBodyHeight={ props.setMaxBodyHeight }
            color={ color }
            bgc={ bgc }
            width={ props.width }
            margin={ props.margin }
            padding={ props.padding }
            display={ props.display }
            gTR={ props.gTR }
            buttonStyle={ buttonStyle }
            bgcImg={ bgcImg == null || bgcImg == undefined || bgcImg == "" ? `` : `url(/storage/image/${bgcImg})` }
        >
            { props.children }
        </AppBaseStyle>
    );
};

export default AppBase;
export const AppBaseStyle = styled.div`
    position: relative;
    display: ${props => props.display};
    grid-template-rows: ${props => props.gTR};
    color: ${props => props.color};
    background-color: ${props => props.bgc};
    background-image: ${props => props.bgcImg};
    min-height: ${props => props.bodyHeight}px;
    max-height: ${props => props.setMaxBodyHeight ? `${props.bodyHeight}px` : ""};
    padding: ${props => props.padding ? props.padding : "10px 0"};
    width: ${props => props.width};
    margin: ${props => props.margin};
`;
