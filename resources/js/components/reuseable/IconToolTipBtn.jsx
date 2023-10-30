import React, { useContext, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import ToolTip from './ToolTip';
import { Link } from 'react-router-dom';

const IconToolTipBtn = (props) => {
    //States
    const [elemParams, setParams] = useState({});
    const [toolTip, setToolTip] = useState(false);
    const tooltipBtn = useRef();
    const [btnClass, setBtnClass] = useState(props.class);
    const { ancestor, handleClick, closeable, pointer, overflowY, tooltipMounted,
        maxHeight, padding, context, tooltipBgc, fixedTop, fixedBottom } = props;

    useEffect(() => {
        if (ancestor && document.querySelector(`.${ancestor}`)) {
            document.querySelector(`.${ancestor}`)
                .addEventListener("click", handleToolTipClose, true);
        }
        return () => {
            if (ancestor && document.querySelector(`.${ancestor}`)) {
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
        if (props.closeTooltip && toolTip) {
            setToolTip(false);
        }
    }, [props.closeTooltip]);

    const handleToolTip = (event) => {
        event.preventDefault();
        const params = event.target.parentElement.getBoundingClientRect();
        setParams(params);
        setToolTip(!toolTip);
    };
    const handleToolTipClose = (e) => {

        if (!e.target.closest(`.${props.class}`)) {
            setToolTip(false);
        }
    };
    const updateElemParams = () => {
        // run update on button position to readjust tooltip but only when button tooltip is active
        const params = tooltipBtn.current.parentElement.getBoundingClientRect();
        setParams(params);
    };

    const handleMounted = () => {
        tooltipMounted();
    };
    return (
        <EachBtn
            color={ props.textColor }
            btnPadding={ props.btnPadding }
            display={ props.display }
            backgroundColor={ props.backgroundColor }
            hoverBgColor={ props.hoverBgColor }
            hoverColor={ props.hoverColor }
            borderRadius={ props.borderRadius }
            border={ props.border }
            fontSize={ props.fontSize }
            fontWeight={ props.fontWeight }
            className={ btnClass }
        >
            {
                props.linkBtn === true ?
                    <Link to={ props.btnLink }>
                        <i className={ `${props.iconClass} cursor-pointer` }></i>
                    </Link>
                    : props.onMouseDown ?
                        <i className={ `${props.iconClass} cursor-pointer` }
                            ref={ tooltipBtn }
                            onMouseDown={ e => { props.toolTip ? handleToolTip(e) : handleClick(e); } }
                        ></i>
                        :
                        <i className={ `${props.iconClass} cursor-pointer` }
                            ref={ tooltipBtn }
                            onClick={ e => { props.toolTip ? handleToolTip(e) : handleClick(e); } }
                        ></i>


            }

            { toolTip ?
                <ToolTip
                    elemParams={ elemParams }
                    tooltipBgc={ tooltipBgc }
                    fixedTop={ fixedTop }
                    fixedBottom={ fixedBottom }
                    closeable={ closeable }
                    overflowY={ overflowY }
                    pointer={ pointer }
                    maxHeight={ maxHeight }
                    padding={ padding }
                    context={ context }
                    handleToolTip={ handleToolTip }
                    handleMounted={ handleMounted }
                >
                    { props.children }
                </ToolTip>
                : "" }
        </EachBtn>
    );
};

export default IconToolTipBtn;
export const EachBtn = styled.div`
    display:  ${props => props.display};
    position: relative;
    color: ${props => props.color};
    border: ${props => props.border};
    font-size: ${props => props.fontSize ? props.fontSize : ""};
    i{
        font-weight: ${props => props.fontWeight};
        padding: ${props => props.btnPadding};
    }
    a{
        text-decoration: none;
        color: inherit;
    }
`;