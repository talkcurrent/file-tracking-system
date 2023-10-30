import React, { useState, useEffect, useContext, useRef } from 'react';
import styled from 'styled-components';
import useSelection from '../customHooks/useSelection';

const ScrollerX = (props) => {
    const { windowWidth } = props;
    const [prevShow, setprevShow] = useState(false);
    const [nextShow, setnextShow] = useState(false);
    const [scrollContextReady, setscrollContextReady] = useState(false);

    const scrollXElem = React.useRef();

    const elem = useRef(null);
    const config = { attributes: true, childList: true, subtree: true };

    const callback = (mutationList, observer) => {
        for (const mutation of mutationList) {
            if (mutation.addedNodes.length) {
                handleScrollContentCont(false);
            } else {
                handleScrollContentCont(true);
            }
        }
    };
    const observer = new MutationObserver(callback);

    useEffect(() => {
        if (scrollXElem.current) {
            observer.observe(scrollXElem.current.children[0], config);
        }
        return () => {
            if (scrollXElem.current) {
                observer.disconnect();
            }
        };
    }, []);

    useEffect(() => {
        const editable = scrollXElem.current.querySelector('[contenteditable=true]');
        if (editable) {
            editable.addEventListener("input", handleScrollPos, true);
        }
        return () => {
            if (editable) {
                editable.removeEventListener("input", handleScrollPos, true);
            }
        };
    }, []);

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

    const handleScrollPos = () => {
        // if no text after cursor position scroll content full left
        // only run this for cursor at d end to prevent scroll during editing 
        //this will work for elem with only text children
        var selection = useSelection();
        if (selection.rangeCount) {
            var range = selection.getRangeAt(0);
            let rangeCont = range.commonAncestorContainer.parentElement;
            if (!(rangeCont.getAttribute("contenteditable") === "true")) {
                rangeCont = rangeCont.closest('[contenteditable=true]');
            }
            if (rangeCont && rangeCont.childNodes.length) {//only work if list is 1
                const elem = scrollXElem.current;
                const scrolledLeft = elem.scrollLeft;
                const physicalWidth = elem.offsetWidth; //width including padding
                const scrollableElemWidth = elem.scrollWidth;
                if ((range.endOffset === rangeCont.textContent.length) && scrolledLeft > 0) {
                    scrollXElem.current.scrollLeft = scrollableElemWidth - physicalWidth;
                }
            }
        }
    };
    useEffect(() => {
        if (scrollXElem.current) {
            const scrolled_Left = scrollXElem.current.scrollLeft;
            const physical_Width = scrollXElem.current.offsetWidth; //width including padding and scroolbar
            const scrollable_ElemWidth = scrollXElem.current.scrollWidth; //width of entire element that may be scrolled

            setprevShow(scrolled_Left > 0);
            setnextShow(scrollable_ElemWidth > (scrolled_Left + physical_Width));
        }
    }, [scrollContextReady]);

    return (
        <ScrollerXStyle
            margin={ props.margin }
            bRadius={ props.bRadius }
            padding={ props.padding }
            shadow={ prevShow && nextShow ? "inset 0 -5px 4px black" :
                prevShow ?
                    "inset 3px -5px 3px grey"
                    : nextShow ? "inset -1px -5px 5px grey"
                        : "" }
            onClick={ e => props.handleOnClick ? props.handleOnClick(e) : {} }
        >
            <div
                ref={ scrollXElem }
                onScroll={ e => handleScroll(e) }
                className="scroller-x"
            >
                <div
                    className="scrollable-text"
                >
                    { props.children }
                </div>
            </div>
        </ScrollerXStyle>
    );
};

export default ScrollerX;
export const ScrollerXStyle = styled.div`
    overflow: hidden;
    margin-bottom: ${props => (props.margin ? props.margin + 9 : 0)}px;
    margin-top: ${props => (props.margin ? 3 : 0)}px;
    border-radius: ${props => props.bRadius};
    display: grid;
    align-items: center;
    .scroller-x{
        overflow-y: hidden;
        overflow-x: scroll;
        margin-bottom: -50px;
        padding-bottom: 50px;
        box-shadow: ${props => props.shadow};
        /* padding: ${props => props.padding}; */
        .scrollable-text{
            white-space: nowrap;
            width: max-content;
            padding: 0 0 0 4px;
        }
    }
`;
