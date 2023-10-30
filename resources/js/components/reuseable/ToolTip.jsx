import React, { useEffect, useState, useRef, useLayoutEffect, useContext } from 'react';
import styled from 'styled-components';
import Close from './Close';
import usePrevState from '../customHooks/usePrevState';

const ToolTip = (props) => {
    const { windowWidth } = props.context;
    const [absTop, setAbsTop] = useState("");
    const [absLeft, setAbsLeft] = useState("");
    const [absRight, setAbsRight] = useState("");
    const [absBottom, setAbsBottom] = useState("");
    const [arrowAxis, setArrowAxis] = useState("");
    const [arrowPos, setArrowPos] = useState("");
    const [tooltipWidth, settooltipWidth] = useState("");
    const [tooltipHeight, settooltipHeight] = useState("");

    const { fixedTop, fixedBottom, elemParams, closeable, pointer, tooltipBgc } = props;
    const { left, right, top, bottom, height, width } = elemParams;
    const refList = useRef();
    const prevWidth = usePrevState(refList.current ? refList.current.clientWidth : null);
    const prevHeight = usePrevState(refList.current ? refList.current.clientHeight : null);

    useEffect(() => {
        if (refList.current) {
            //compare tooltip prev width and now 
            if (prevWidth != refList.current.clientWidth) {
                //if not same, update width and adjust calculations
                settooltipWidth(refList.current.clientWidth);
            }
            //compare tooltip prev height and now 
            if (prevHeight != refList.current.clientHeight) {
                //if not same, update Height and adjust calculations
                settooltipHeight(refList.current.clientHeight);
            }
        }
        return () => { };
    });
    useLayoutEffect(() => {
        const widthCenter = width / 2;
        const heightCenter = height / 2;
        const absContWidth = refList.current.parentElement.offsetWidth;
        const absContHeight = refList.current.parentElement.offsetHeight;
        const absContWidthCenter = absContWidth / 2;
        const absContWidthCenterY = refList.current.parentElement.offsetHeight / 2;
        const remainWidth = window.innerWidth - right; //length of relative elem to right
        const remainHeight = window.innerHeight - bottom;//heigh of relative elem to bottom
        //left and right: padding: 0 5px
        const padding = 0;
        const pseudoAfter = 18;
        var leftX;
        var topY;
        if (absContWidthCenter > remainWidth && absContHeight > remainHeight) {
            //top right
            // console.info("top Right");
            setArrowPos((windowWidth - (left + (width / 2)) - (pseudoAfter / 2)));
            setAbsLeft("");
            setAbsRight(`${0}px`);
            if (fixedBottom) {
                setArrowAxis("bottomRight");
                setAbsTop(`${top + height + (pseudoAfter / 2)}px`);
                setAbsBottom(``);
            } else {
                setArrowAxis("topRight");
                setAbsTop(``);
                setAbsBottom(`${remainHeight + height + (pseudoAfter / 2)}px`);
            }
        } else if (absContWidthCenter > remainWidth && remainHeight > absContHeight) {
            //Bottom right
            // console.info(windowWidth, left, width);
            setArrowPos((windowWidth - (left + (width / 2)) - (pseudoAfter / 2)));
            setAbsLeft("");
            setAbsRight(`0px`);
            if (fixedTop) {
                setArrowAxis("topRight");
                setAbsTop(``);
                //bottom value must be specified
                setAbsBottom(`${remainHeight + height + (pseudoAfter / 2)}px`);
            } else {
                setArrowAxis("bottomRight");
                setAbsTop(`${top + height + (pseudoAfter / 2)}px`);
                setAbsBottom("");
            }
        } else if (absContWidthCenter > left && absContHeight > remainHeight) {
            //top left
            // console.info("top left");
            setArrowPos((left + (width / 2)) - (pseudoAfter / 2));
            setAbsLeft(`0px`);
            setAbsRight("");
            if (fixedBottom) {
                setArrowAxis("topTool");
                setAbsTop(`${top + height + (pseudoAfter / 2)}px`);
                setAbsBottom(``);
            } else {
                setArrowAxis("bottomTool");
                setAbsTop(``);
                setAbsBottom(`${remainHeight + height + (pseudoAfter / 2)}px`);
            }
        } else if (absContWidthCenter > left && remainHeight > absContHeight) {
            // console.info("bottom left");
            //Bottom left
            setArrowPos((left + (width / 2)) - (pseudoAfter / 2));
            setAbsLeft(`0px`);
            setAbsRight("");
            if (fixedTop) {
                setArrowAxis("bottomTool");
                setAbsTop(``);
                //bottom value must be specified
                setAbsBottom(`${remainHeight + height + (pseudoAfter / 2)}px`);
            } else {
                setArrowAxis("topTool");
                setAbsTop(`${top + height + (pseudoAfter / 2)}px`);
                setAbsBottom("");
            }
        } else if (absContHeight > remainHeight) {
            // console.info("center top");
            setArrowPos(absContWidthCenter - (pseudoAfter / 2));
            setAbsLeft(`${(left + (width / 2)) - (absContWidth / 2)}px`);
            setAbsRight("");
            if (fixedBottom) {
                setArrowAxis("topTool");
                setAbsTop(`${top + height + (pseudoAfter / 2)}px`);
                setAbsBottom(``);
            } else {
                setArrowAxis("bottomTool");
                setAbsTop(``);
                setAbsBottom(`${remainHeight + height + (pseudoAfter / 2)}px`);
            }
        } else if (remainHeight > absContHeight) {
            // console.info("center bottom");
            setArrowPos(absContWidthCenter - (pseudoAfter / 2)); //pseudoAfter/2 means center of arrow
            setAbsLeft(`${(left + (width / 2)) - (absContWidth / 2)}px`);
            setAbsRight("");
            if (fixedTop) {
                setArrowAxis("bottomTool");
                setAbsTop(``);
                //bottom value must be specified
                setAbsBottom(`${remainHeight + height + (pseudoAfter / 2)}px`);
            } else {
                setArrowAxis("topTool");
                setAbsTop(`${top + height + (pseudoAfter / 2)}px`);
                setAbsBottom("");
            }
        }
        return () => { };
    }, [tooltipWidth, tooltipHeight, elemParams]);

    useEffect(() => {
        if (props.handleMounted) {
            props.handleMounted();
        }
        return () => { };
    }, []);
    return (
        <UserToolTip
            absTop={ absTop }
            absLeft={ absLeft }
            absRight={ absRight }
            absBottom={ absBottom }
            arrowPos={ arrowPos }
            windowWidth={ window.innerWidth }
            className={ pointer !== false ? arrowAxis : "" }
            bgc={ tooltipBgc }
            overflowY={ props.overflowY }
            padding={ props.padding }
            maxHeight={ props.maxHeight }
        >
            { closeable ?
                <Close
                    absolute={ true }
                    top={ "0px" } right={ "0px" }
                    bottom={ "" } left={ "" }
                    handleClick={ props.handleToolTip }
                />
                : ""
            }
            <div className="toolTip-list-cont" ref={ refList }>
                { props.children }
            </div>
        </UserToolTip>
    );
};

export default ToolTip;
export const UserToolTip = styled.div`
    /* unset sup or sub default stylings incase tooltip is in those element */
    font-size: small;
    line-height: normal;
    vertical-align: unset; 
    /* unsetting ends */
    position: fixed;
    width: max-content;
    max-width: ${props => props.windowWidth <= 400 ?
        `100vw`
        : props.windowWidth <= 768 ?
            `60vw`
            : `${props.windowWidth / 2}px`};
    /* max-height: 80vh; *//* let inner container control this*/
    border-radius: 5px;
    z-index: 32;
    /* margin-right: 0.6rem; */
    /* overflow-y: auto; */
    /* padding: ${props => props.windowWidth <= 400 && props.padding ? props.padding : "5px"}; */
    background: ${props => props.bgc};
    border: 1px solid #a2a2a2;
    box-shadow: 1px 3px 6px #a2a2a2, -2px 1px 5px #a2a2a2;
    top: ${props => props.absTop};
    left: ${props => props.absLeft};
    right: ${props => props.absRight};
    bottom: ${props => props.absBottom};
    -webkit-animation: toggle .3s cubic-bezier(0.895,0.030,0.685,0.220) forwards;
    animation: toggle .3s cubic-bezier(0.895,0.030,0.685,0.220) forwards;

    @keyframes toggle {
        from {
            opacity: 0;
            /* transform: scale(0.3); */
        }
        to {
            opacity: 1;
            /* transform: scale(1) */
        }
    }
    .toolTip-list-cont{
        padding: ${props => props.padding ? props.padding : "5px"};
        max-width: ${props => props.windowWidth <= 400 ?
        `100vw`
        : props.windowWidth <= 768 ?
            `60vw`
            : `${props.windowWidth / 2}px`};
        max-height: ${props => props.maxHeight};
        overflow-y: ${props => props.overflowY !== false ? "auto" : "unset"};
    }
    &.topRight{
        &::after {
            /* content: " ";
            position: absolute;
            bottom: 100%;
            left: ${props => props.arrowPos}px;
            border-width: 10px;
            border-style: solid;
            border-color: transparent transparent white transparent; */
            
            content: " ";
            position: absolute;
            bottom: -9px;
            right: ${props => props.arrowPos}px;
            height: 18px;
            z-index: -1;
            width: 18px;
            transform: rotate(45deg);
            border-style: solid;
            border-width: 1px;
            background: #ffffff;
            border-color: rgba(0, 0, 0, 0) #a2a2a2 #a2a2a2  rgba(0, 0, 0, 0);
        }
    }
    &.bottomRight{
        &::after {
            content: " ";
            position: absolute;
            top: -9px;
            right: ${props => props.arrowPos}px;
            height: 18px;
            z-index: -1;
            width: 18px;
            transform: rotate(45deg);
            border-style: solid;
            border-width: 1px;
            background: #ffffff;
            border-color: #a2a2a2 rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) #a2a2a2;
        }
    }
    &.topTool{
        &::after {
            content: " ";
            position: absolute;
            top: -9px;
            left: ${props => props.arrowPos}px;
            height: 18px;
            z-index: -1;
            width: 18px;
            transform: rotate(45deg);
            border-style: solid;
            border-width: 1px;
            background: #ffffff;
            border-color: #a2a2a2 rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) #a2a2a2;
        }
    }
    &.bottomTool{
        &::after {
            content: " ";
            position: absolute;
            bottom: -9px;
            left: ${props => props.arrowPos}px;
            height: 18px;
            z-index: -1;
            width: 18px;
            transform: rotate(45deg);
            border-style: solid;
            border-width: 1px;
            background: #ffffff;
            border-color: rgba(0, 0, 0, 0) #a2a2a2 #a2a2a2  rgba(0, 0, 0, 0);
        }
    }
`;