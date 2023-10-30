import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const AlbumList = (props) => {
    const [absTop, setAbsTop] = useState("");
    const [absLeft, setAbsLeft] = useState("");
    const [absRight, setAbsRight] = useState("");
    const [absBottom, setAbsBottom] = useState("");
    const [arrowAxis, setArrowAxis] = useState("");
    const [arrowPos, setArrowPos] = useState("");

    const controller = new AbortController();
    const { authUser, album_name, elemParams } = props;
    const { left, right, top, bottom, height, width } = elemParams;
    const refList = React.createRef();

    useEffect(() => {
        const widthCenter = width / 2;
        const heightCenter = height / 2;
        const absContWidth = refList.current.clientWidth;
        const absContHeight = refList.current.clientHeight;
        const absContWidthCenter = absContWidth / 2;
        const absContWidthCenterY = refList.current.clientHeight / 2;
        const remainWidth = window.innerWidth - right; //length of relative elem to right
        const remainHeight = window.innerHeight - bottom;//heigh of relative elem to bottom
        //left and right: padding: 0 5px
        const padding = 5;
        var leftX;
        var topY;
        // console.info(absContWidthCenter > left, remainHeight > absContHeight, absContHeight > remainHeight);
        if (absContWidthCenter > remainWidth && absContHeight > remainHeight) {
            setArrowAxis("bottomTool");
            setArrowPos(absContWidth - 20);
            setAbsTop("unset");
            setAbsLeft("unset");
            setAbsRight(0);
            setAbsBottom(`${height + padding}px`);
        } else if (absContWidthCenter > remainWidth && remainHeight > absContHeight) {
            setArrowAxis("topTool");
            setArrowPos(absContWidth - 20);
            setAbsTop(`${height + padding}px`);//5px for small offset 
            setAbsLeft("unset");
            setAbsRight(0);
            setAbsBottom("unset");
        } else if (absContWidthCenter > left && absContHeight > remainHeight) {
            setArrowAxis("bottomTool");
            setArrowPos(20);
            setAbsTop(`unset`);//5px for small offset 
            setAbsLeft(0);
            setAbsRight("unset");
            setAbsBottom(`${height + padding}px`);
        } else if (absContWidthCenter > left && remainHeight > absContHeight) {
            setArrowAxis("topTool");
            setArrowPos(20);
            setAbsTop(`${height + padding}px`);//5px for small offset 
            setAbsLeft(0);
            setAbsRight("unset");
            setAbsBottom("unset");
        } else if (absContHeight > remainHeight) {
            setArrowAxis("bottomTool");
            setArrowPos(absContWidthCenter - padding);
            setAbsTop(`unset`);
            setAbsLeft(`${(widthCenter - absContWidthCenter) - padding}px`);
            setAbsRight("unset");
            setAbsBottom(`${height + padding}px`);//terget elem height plus 5px padding
        } else if (remainHeight > absContHeight) {
            setArrowAxis("topTool");
            setArrowPos(absContWidthCenter - padding); //-5px for the absCont padding
            setAbsTop(`${height + padding}px`);//5px for small offset 
            setAbsLeft(`${(widthCenter - absContWidthCenter) - padding}px`);
            setAbsRight("unset");
            setAbsBottom("unset");
        }
        return () => { };
    }, []);

    return (
        <UserAlbum
            absTop={ absTop }
            absLeft={ absLeft }
            absRight={ absRight }
            absBottom={ absBottom }
            arrowPos={ arrowPos }
            windowWidth={ window.innerWidth }
            className={ arrowAxis }
        >
            <div className="dropdown-list" ref={ refList }>
                <div style={ { color: "white" } }><h5>Move to:</h5></div>
                <div className={ `album-list` }>
                    <span>Uploads</span>
                    <button>To here</button>
                </div>
                <div className={ `album-list` }>
                    <span>Private</span>
                    <button>To here</button>
                </div>
                <div className={ `album-list` }>
                    <span>Profile</span>
                    <button>To here</button>
                </div>
                <div className={ `album-list` }>
                    <span>Saved</span>
                    <button>To here</button>
                </div>
                <div className={ `album-list` }>
                    <span>Others</span>
                    <button>To here</button>
                </div>
            </div>
        </UserAlbum>
    );
};

export default AlbumList;
export const UserAlbum = styled.div`
    position: absolute;
    padding: 0 5px 5px 5px;
    width: max-content;
    max-width: ${props => props.windowWidth / 2}px;
    max-height: ${props => window.innerHeight / 2}px;
    border-radius: 5px;
    z-index: 3;
    background: #88a188;
    top: ${props => props.absTop};
    left: ${props => props.absLeft};
    right: ${props => props.absRight};
    bottom: ${props => props.absBottom};
    -webkit-animation: toggle .2s cubic-bezier(0.895,0.030,0.685,0.220) forwards;
    animation: toggle .2s cubic-bezier(0.895,0.030,0.685,0.220) forwards;
    .dropdown-list{
        display: grid;
        grid-gap: 4px;
        .album-list{
            padding: 0px 5px;
            background: #f8f9fa;
            font-size: small;
            display: grid;
            grid-template-columns: 1fr 1fr;
            cursor: pointer;
            button{
                justify-self: end;
                font-size: small;
                color: #f8f9fa;
                border-radius: 10px;
                background: #88a188;
                padding: 0 4px;
                align-self: center;
            }
        }
    }
    @keyframes toggle {
        from {
            opacity: 0;
            transform: scale(0.3);
        }
        to {
            opacity: 1;
            transform: scale(1)
        }
    }
    &.topTool{
        &::after {
            content: " ";
            position: absolute;
            bottom: 100%;
            left: ${props => props.arrowPos}px;
            border-width: 10px;
            border-style: solid;
            border-color: transparent transparent #87a188 transparent;
        }
    }
    &.bottomTool{
        &::after {
            content: " ";
            position: absolute;
            top: 100%; /* At the bottom of the tooltip */
            left:  ${props => props.arrowPos}px;
            border-width: 10px;
            border-style: solid;
            border-color: #87a188 transparent transparent transparent;
        }
    }
`;