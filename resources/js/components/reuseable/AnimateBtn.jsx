import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { randNumWitRange } from './randNumWitRange';
import LoadingBtn from './LoadingBtn';

const AnimateBtn = (props) => {
    const [direction, setDirection] = useState("to-right");
    var tymout;
    const handleHover = () => {
        const value = randNumWitRange(4);
        switch (value) {
            case 0:
                tymout = setTimeout(() => {
                    setDirection("to-right");
                }, 300);//because animation transition took 0.3s to finish
                break;
            case 1:
                tymout = setTimeout(() => {
                    setDirection("to-left");
                }, 300);
                break;
            case 2:
                tymout = setTimeout(() => {
                    setDirection("to-bottom");
                }, 300);
                break;
            case 3:
                tymout = setTimeout(() => {
                    setDirection("to-top");
                }, 300);
                break;
        }
    };
    useEffect(() => {
        return () => { clearTimeout(tymout); };
    }, [direction]);

    const { btnText, animateBgColor, color, loading, boxShadow, disabled, loadingText, handleClick, params } = props;
    return (
        <UploadBtn
            direction={ direction }
            animateBgColor={ animateBgColor }
            color={ color }
            boxShadow={ boxShadow }
            loadingSomething={ loading ? true : false }
        >
            <button
                onMouseLeave={ handleHover }
                onClick={ e => handleClick(e) }
                disabled={ loading }
            >
                <span className={ `${loading != true && direction}` }></span>
                <span className={ `btn-text` }>{ loading ? <LoadingBtn text={ loadingText } /> : btnText }</span>
            </button>
        </UploadBtn>
    );
};

export default AnimateBtn;
export const UploadBtn = styled.div`
    display: grid;
    justify-items: center;
    align-self: center;
    /* margin-bottom: 5px; */
    position: relative;
    overflow: hidden;
    padding: 4px;
    button{
        outline-color: unset;
        background: transparent;
        border: unset;
        color: ${props => props.color};
        padding: 0px 5px;
        border-radius: 30px;
        position: relative;
        overflow: hidden;
        transition: all ease-in-out 0.3s;
        z-index: 1;
        box-shadow: ${props => props.boxShadow};
        &:focus{
            outline: unset;
            box-shadow: 0 0 3px #00a84f;
        }
        .to-right, .to-left, .to-bottom, .to-top{
            position: absolute;
            background:${props => props.animateBgColor};
            z-index: -1;
            transition: all ease-in-out 0.3s;
            opacity: 0.7;
        }
        .to-right{
            top: 0;
            left: 0;
            bottom: 0;
            right: unset;
            width: 0;
        }
        .to-left{
            top: 0;
            bottom: 0;
            right: 0;
            width: 0;
        }
        .to-bottom{
            top: 0;
            left: 0;
            right:0;
            height: 0;
        }
        .to-top{
            left: 0;
            bottom: 0;
            right: 0;
            height: 0;
        }

        &:hover{
            color: ${props => props.loadingSomething != true ? "white" : props.color};
            .to-left{
                width: 100%;
            }
            .to-right{
                width: 100%;
            }
            .to-bottom{
                height: 100%;
            }
            .to-top{
                height: 100%;
            }
        }
    }
`;