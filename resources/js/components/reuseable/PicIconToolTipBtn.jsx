import React, { useContext, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { HomeContext } from '../index/HomeContext';
import ToolTip from './ToolTip';
import { Link } from 'react-router-dom';

const PicIconToolTipBtn = (props) => {
    const h_context = useContext(HomeContext);
    //States
    const [elemParams, setParams] = useState({});
    const [toolTip, setToolTip] = useState(false);
    const [btnClass, setBtnClass] = useState(props.class);
    const tooltipBtn = useRef();
    const { ancestor, handleClick, closeable, pointer, overflowY, tooltipMounted } = props;

    useEffect(() => {
        if (document.querySelector(`.${ancestor}`)) {
            document.querySelector(`.${ancestor}`)
                .addEventListener("click", handleToolTipClose, true);
        }
        return () => {
            document.querySelector(`.${ancestor}`)
                .removeEventListener("click", handleToolTipClose, true);
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
        const params = event.target.parentElement.getBoundingClientRect();
        setParams(params);
        setToolTip(!toolTip);
        // console.info(params);
    };
    const handleToolTipClose = (e) => {
        if (!e.target.closest(`.${props.class}`)) {
            setToolTip(false);
        }
    };
    const handleMounted = () => {
        tooltipMounted();
    };
    const updateElemParams = () => {
        // run update on button position to readjust tooltip but only when button tooltip is active
        const params = tooltipBtn.current.parentElement.getBoundingClientRect();
        setParams(params);
    };

    return (
        <EachBtn
            color={ props.textColor }
            padding={ props.padding }
            opacity={ props.opacity }
            display={ props.display }
            backgroundColor={ props.backgroundColor }
            hoverBgColor={ props.hoverBgColor }
            hoverColor={ props.hoverColor }
            borderRadius={ props.borderRadius }
            border={ props.border }
            fontSize={ props.fontSize }
            className={ btnClass }
        >
            {
                props.linkBtn === true ?
                    <Link to={ props.btnLink } className={ `${props.iconClass}` }></Link>
                    :
                    <span ref={ tooltipBtn } className={ `${props.iconClass}` }
                        onClick={ e => { props.toolTip ? handleToolTip(e) : handleClick(e); } }
                    ></span>


            }

            { toolTip ?
                <ToolTip
                    elemParams={ elemParams }
                    closeable={ closeable }
                    overflowY={ overflowY }
                    pointer={ pointer }
                    handleToolTip={ handleToolTip }
                    handleMounted={ handleMounted }
                >
                    { props.children }
                </ToolTip>
                : "" }
        </EachBtn>
    );
};

export default PicIconToolTipBtn;
export const EachBtn = styled.span`
    display:  ${props => props.display};
    position: relative;
    color: ${props => props.color};
    font-size: ${props => props.fontSize ? props.fontSize : ""};
    transition: all ease-in-out 0.3s;
    span{
        padding: ${props => props.padding};
        opacity: ${props => props.opacity};

    }
`;