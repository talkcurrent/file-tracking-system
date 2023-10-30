import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import ScrollerX from './ScrollerX';

const Accordion = (props) => {
    const [expanded, setexpanded] = useState(false);
    const [contentHolderHeight, setcontentHolderHeight] = useState(200);

    const {
        maxHeight, minHeight, bgc, color, h_text, h_fontSize, h_color, h_bgc,
        fontFamily, h_fontWeight, pad, h_pad
    } = props;

    const accordionCont = useRef(null);
    const contentHolder = useRef(null);

    useEffect(() => {
        if (contentHolderHeight != contentHolder.current.offsetHeight) {
            setcontentHolderHeight(contentHolder.current.offsetHeight);
        }
    });

    const handleExpand = async () => {
        if (expanded) {
            setexpanded(false);
        } else {
            setcontentHolderHeight(contentHolder.current.offsetHeight);
            setexpanded(true);
        }


    };

    return (
        <AccordionStyle
            maxHeight={ maxHeight }
            contentHolderHeight={ contentHolderHeight }
            bgc={ bgc }
            color={ color }
            h_fontSize={ h_fontSize }
            h_color={ h_color }
            h_bgc={ h_bgc }
            fontFamily={ fontFamily }
            h_fontWeight={ h_fontWeight }
            pad={ pad }
            h_pad={ h_pad }
        >
            <div
                className="accordion-head"
                onClick={ () => handleExpand() }
            >
                <ScrollerX>
                    <span>{ h_text }</span>
                </ScrollerX>
                { expanded ?
                    <i className="fas fa-minus"></i>
                    :
                    <i className="fas fa-plus"></i>
                }
            </div>
            <div className={ `accordion-content${expanded ? " opened" : " closed"}` } ref={ accordionCont }>
                <div className="content-holder" ref={ contentHolder }>
                    { props.children }
                </div>
            </div>

        </AccordionStyle>
    );
};

export default Accordion;

const AccordionStyle = styled.div`
    background:${props => props.bgc};
    color:${props => props.color};
    font-family:${props => props.fontFamily};
    padding:${props => props.pad};

    .accordion-head{
        display: grid;
        grid-auto-flow: column;
        grid-template-columns: max-content;
        align-items: center;
        font-size:${props => props.h_fontSize};
        color:${props => props.h_color};
        background:${props => props.h_bgc};
        font-weight:${props => props.h_fontWeight};
        padding:${props => props.h_pad};
        cursor: pointer;
        .fas{
            justify-self: end;
            transition: ease-in-out 0.3s;
            padding-right: 0.5rem;
        }
    }

    .accordion-content{
        height: 0;
        max-height: ${props => props.maxHeight}px;
        overflow-y: auto;
        transition: ease-in-out 0.3s;
        &.opened{
            height: ${props => props.contentHolderHeight}px;
        }
    }

`;