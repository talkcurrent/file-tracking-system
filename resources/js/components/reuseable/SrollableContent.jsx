import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import Title from './Title';
import PrevNextControl from './PrevNextControl';
import useTheme from '../customHooks/useTheme';

const SrollableContent = (props) => {
    const [scrolledLeft, setscrolledLeft] = useState(0);
    const [prevShow, setprevShow] = useState(false);
    const [nextShow, setnextShow] = useState(false);
    const [firstChildWidth, setfirstChildWidth] = useState(0);
    const [scrollContextReady, setscrollContextReady] = useState(false);

    const theme = useTheme();
    const { windowWidth } = props;
    const scrollXElem = React.useRef();
    //calculate first container element width
    const config = { attributes: true, childList: true, subtree: true };

    const callback = (mutationList, observer) => {
        for (const mutation of mutationList) {
            if (mutation.addedNodes.length) {
                updateFirstChildWidth();
                handleScrollContentCont(true);
            } else {
                handleScrollContentCont(false);
            }
        }
    };
    const observer = new MutationObserver(callback);

    useEffect(() => {
        observer.observe(scrollXElem.current, config);
        return () => { observer.disconnect(); };
    }, []);

    const updateFirstChildWidth = () => {
        scrollXElem.current && scrollXElem.current.children[0] ?
            setfirstChildWidth(scrollXElem.current.children[0].offsetWidth + 10)
            : "";
    };

    const handleScrollContentCont = (bool) => {
        setscrollContextReady(bool);
    };

    const handleScroll = (e) => {
        const elem = scrollXElem.current;
        const scrolledLeft = elem.scrollLeft;
        const physicalWidth = elem.offsetWidth; //width including padding
        const scrollableElemWidth = elem.scrollWidth; //width of entire element that may be scrolled

        setprevShow(scrolledLeft > 0);
        setnextShow(scrollableElemWidth > (scrolledLeft + physicalWidth));
    };

    useEffect(() => {
        const scrolled_Left = scrollXElem.current.scrollLeft;
        const physical_Width = scrollXElem.current.offsetWidth; //width including padding and scroolbar
        const scrollable_ElemWidth = scrollXElem.current.scrollWidth; //width of entire element that may be scrolled
        setprevShow(scrolled_Left > 0);
        setnextShow(scrollable_ElemWidth > (scrolled_Left + physical_Width));
        updateFirstChildWidth();
    }, [scrollContextReady]);

    const handlePrev = () => {
        var scrollAmount = 0;
        var slideTimer = setInterval(function () {
            // test to prevent cannot read property scrollLeft on null
            if (scrollXElem.current) {
                scrollXElem.current.scrollLeft -= 10;
                scrollAmount += 10;
                if (scrollAmount >= firstChildWidth) {
                    window.clearInterval(slideTimer);
                }
            } else {
                window.clearInterval(slideTimer);
            }
        }, 25);

    };
    const handleNext = () => {
        var scrollAmount = 0;
        var slideTimer = setInterval(function () {
            // test to prevent cannot read prperty scrollLeft on null
            if (scrollXElem.current) {
                scrollXElem.current.scrollLeft += 10;
                scrollAmount += 10;
                if (scrollAmount >= firstChildWidth) {

                    window.clearInterval(slideTimer);
                }
            } else {
                window.clearInterval(slideTimer);
            }
        }, 25);
    };

    return (
        <SrollableContentStyle
            padding={ props.padding }
            bgc={ props.bgc }
            theme={ theme }
            width={ props.width }
            observerContPad={ props.observerContPad }
            autoColumns={ props.autoColumns }
            autoRows={ props.autoRows }
            justifyItems={ props.justifyItems }
        >
            {props.title ?
                <Title
                    color={ props.titleColor } mBottom={ "0.5rem" }
                    windowWidth={ windowWidth }
                    boxShadow={ props.boxShadow }
                    textAlign={ 'center' }
                >{ props.title }</Title>
                : "" }

            <div className="scroller-shield">
                <div className="scroller-cont">
                    <div className="observer-cont">
                        <div className="section-middle-contents" dir="ltr"
                            ref={ scrollXElem }
                            onScroll={ e => handleScroll(e) }
                        >
                            { props.children }
                        </div>
                    </div>
                </div>
            </div>
            <PrevNextControl
                windowWidth={ windowWidth }
                handlePrev={ handlePrev }
                handleNext={ handleNext }
                bgc={ "radial-gradient(#41474c, transparent)" }
                color={ "white" }
                prevShow={ prevShow }
                nextShow={ nextShow }
            />
        </SrollableContentStyle >
    );
};

export default SrollableContent;
export const SrollableContentStyle = styled.div`
    position: relative;
    width: ${props => props.width};
    margin: 0 auto;
    overflow: hidden;
    border-radius: 5px;
    padding: 0.5rem 0;
    .scroller-shield{
        position: relative;
        background: ${props => props.theme.cardsBgc};
        width: 100%;
        color: #5a6269;
        .scroller-cont{
            position: relative;
            width: 100%;
            overflow: hidden;
            background: ${props => props.bgc};
            .observer-cont{
                /* display: grid; */
                padding: ${props => props.observerContPad};
                overflow: hidden;
                /* grid-auto-flow: column;
                grid-template-columns: max-content;
                padding: 10px 0;
                .observer-left, .observer-right{
                    width: 2px;
                } */
                .section-middle-contents{
                    overflow-y: hidden;
                    overflow-x: scroll;
                    /* scroll-snap-type: x mandatory; */
                    scroll-padding: 6px;
                    /* padding: ${props => props.padding}; */
                    display: grid;
                    grid-auto-flow: column;
                    grid-auto-columns: ${props => props.autoColumns};
                    justify-items: ${props => props.justifyItems};
                    /* grid-template-columns: repeat(auto-fill,minmax(250px,1fr)); */
                    grid-auto-rows: ${props => props.autoRows};
                    grid-gap: 10px;
                    position: relative;
                    width: 99%;
                    margin-bottom: -45px;
                    padding-bottom: 50px;
                    padding-top: 6px;
                    padding-right: 3px;
                    padding-left: 3px;
                    div{
                        scroll-snap-align: start;
                        scroll-snap-stop: always;
                    }
                }
            }
        }
    }
`;
