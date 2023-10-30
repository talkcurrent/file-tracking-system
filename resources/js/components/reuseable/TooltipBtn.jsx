import React, { useContext, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import ToolTip from './ToolTip';
import { Link } from 'react-router-dom';
import AnimateBtn from './AnimateBtn';
import LoadingBtn from './LoadingBtn';

const TooltipBtn = (props) => {
    //States
    const [elemParams, setParams] = useState({});
    const [toolTip, setToolTip] = useState(false);
    const [btnClass, setBtnClass] = useState(props.class);
    // styles
    const [textColor, settextColor] = useState("");
    const [backgroundColor, setbackgroundColor] = useState("");

    const tooltipBtn = useRef();
    const {
        ancestor, handleClick, onMouseDown, loadingText, closeable,
        context, tooltipBgc, fixedTop, fixedBottom
    } = props;

    useEffect(() => {
        if (document.querySelector(`.${ancestor}`)) {
            document.querySelector(`.${ancestor}`)
                .addEventListener("click", handleToolTipClose, true);
        }
        return () => {
            if (document.querySelector(`.${ancestor}`)) {
                document.querySelector(`.${ancestor}`)
                    .removeEventListener("click", handleToolTipClose, true);
            }
        };
    }, []);

    useEffect(() => {
        if (toolTip) {
            document.addEventListener('scroll', updateElemParams, true);
        }
        return () => {
            document.removeEventListener('scroll', updateElemParams, true);
        };
    }, [toolTip]);

    useEffect(() => {
        if (props.closeTooltip) {
            setToolTip(false);
        }
    }, [props.closeTooltip]);
    useEffect(() => {
        settextColor(props.textColor);
        setbackgroundColor(props.backgroundColor);

    }, []);

    const handleToolTip = (event) => {
        const params = event.target.parentElement.getBoundingClientRect();
        setParams(params);
        setToolTip(!toolTip);
    };
    const handleToolTipClose = (e) => {
        if (!e.target.closest(`.${props.class}`)) {
            setToolTip(false);
        }
    };
    const handleMounted = () => {
        props.tooltipMounted ?
            props.tooltipMounted()
            : "";
    };
    const updateElemParams = () => {
        // run update on button position to readjust tooltip but only when button tooltip is active
        const params = tooltipBtn.current.parentElement.getBoundingClientRect();
        setParams(params);
    };

    return (
        <EachBtn
            color={ textColor }
            backgroundColor={ backgroundColor }
            hoverBgColor={ props.hoverBgColor }
            hoverColor={ props.hoverColor }
            borderRadius={ props.borderRadius }
            border={ props.border }
            padding={ props.padding }
            lineHeight={ props.lineHeight }
            fontSize={ props.fontSize }
            letterSpacing={ props.letterSpacing }
            fontWeight={ props.fontWeight }
            fontFamily={ props.fontFamily }
            width={ props.width }
            align={ props.align }
            justify={ props.justify }
            className={ btnClass }
        >
            {
                props.linkBtn === true ?
                    <Link to={ props.btnLink }>
                        <button ref={ tooltipBtn }
                            className={ "tooltip-btn" }>{ props.btnText }</button>
                    </Link>
                    : props.animateBtn === true ?
                        <span ref={ tooltipBtn }>
                            <AnimateBtn
                                btnText={ props.btnText }
                                animateBgColor={ props.backgroundColor }
                                color={ props.textColor }
                                loading={ props.disabled }
                                loadingText={ loadingText }
                                handleClick={ props.toolTip ? handleToolTip : handleClick }
                            />
                        </span>
                        : props.onMouseDown ?
                            <button
                                className={ "tooltip-btn" }
                                disabled={ props.disabled }
                                ref={ tooltipBtn }
                                style={ { color: textColor, backgroundColor: backgroundColor } }
                                onMouseDown={ e => {
                                    props.onMouseDown(e);
                                    props.toolTip ? handleToolTip(e) : handleClick(e);
                                } }

                            >{ props.btnText }</button>
                            :
                            <button ref={ tooltipBtn }
                                className={ `tooltip-btn` }
                                disabled={ props.disabled }
                                style={ { color: textColor, backgroundColor: backgroundColor } }
                                onClick={ e => {
                                    props.toolTip ? handleToolTip(e) : handleClick(e);
                                } }

                            >
                                <span>{ props.loadingText && props.loadingText != "" ? <LoadingBtn text={ loadingText } /> : props.btnText }</span>
                            </button>

            }

            { toolTip ?
                <ToolTip
                    context={ context }
                    tooltipBgc={ tooltipBgc }
                    fixedTop={ fixedTop }
                    fixedBottom={ fixedBottom }
                    elemParams={ elemParams }
                    padding={ props.tooltipPadding }
                    closeable={ closeable }
                    handleToolTip={ handleToolTip }
                    handleMounted={ handleMounted }
                >
                    { props.children }
                </ToolTip>
                : "" }
        </EachBtn>
    );
};

export default TooltipBtn;
export const EachBtn = styled.div`
    position: relative;
    display: inherit;
    color: ${props => props.textColor};
    align-items: ${props => props.align};
    justify-self: ${props => props.justify};
    font-size: ${props => props.fontSize};
    .tooltip-btn{
        background: ${props => props.backgroundColor};
        color: inherit;
        padding: ${props => props.padding};
        border: ${props => props.border} !important;
        border-radius: ${props => props.borderRadius};
        transition: all ease-in-out 0.3s;
        width: ${props => props.width ? props.width : "max-content"};
        font-size: inherit;
        letter-spacing: ${props => props.letterSpacing ? props.letterSpacing : ""};
        font-weight: ${props => props.fontWeight ? props.fontWeight : ""};
        font-family: ${props => props.fontFamily ? props.fontFamily : ""};
        line-height: ${props => props.lineHeight};
        &:hover{
            opacity: 0.8;
            background: ${props => props.hoverBgColor};
            color: ${props => props.hoverColor};
        }
        &:focus{
            outline:unset;
            border: unset;
        }
        span{
            color: inherit;
        }

    }
`;