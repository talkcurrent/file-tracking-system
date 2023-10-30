import React from 'react';
import styled from 'styled-components';

const PrevNextControl = (props) => {
    const { windowWidth, handlePrev, handleNext, prevShow, nextShow } = props;
    return (
        <React.Fragment>
            { prevShow ?
                <PrevControlStyle
                    windowWidth={ windowWidth }
                >
                    <div
                        className="scroll-prev-bg"
                        onClick={ e => handlePrev() }
                    >
                        <div className="scroll-prev-icon"></div>
                    </div>
                </PrevControlStyle>
                : ""
            }
            { nextShow ?
                <NextControlStyle
                    windowWidth={ windowWidth }
                >
                    <div
                        className="scroll-next-bg"
                        onClick={ e => handleNext() }
                    >
                        <div className="scroll-next-icon"></div>
                    </div>
                </NextControlStyle>
                : ""
            }
        </React.Fragment>
    );
};

export default PrevNextControl;
export const NextControlStyle = styled.div`
    display: grid;
    align-items: center;
    justify-items: center;
    position: absolute;
    top: 0;
    right:  0;
    bottom: 0;
    visibility: hidden;
    z-index: 2; 
    .scroll-next-bg{
        visibility: visible;
        display: grid;
        align-items: center;
        justify-items: center;
        border-radius: 50%;
        background: radial-gradient(#41474c, transparent);
        height: 25px;
        width: 25px;
        .scroll-next-icon{
            height: 10px;
            width: 10px;
            margin: 0 5px 0 0;
            border: 2px solid;
            border-right-color: white;
            border-left-color: #ffff0000;
            border-top-color: white;
            border-bottom-color: #ff149300;
            transform: rotate(45deg);
            transition: all ease-in-out 0.4s;
        }
    }
`;
export const PrevControlStyle = styled.div`
    display: grid;
    align-items: center;
    justify-items: center;
    position: absolute;
    top: 0;
    left:  0;
    bottom: 0;
    visibility: hidden;
    z-index: 2;
    .scroll-prev-bg{
        visibility: visible;
        border-radius: 50%;
        background: radial-gradient(#41474c, transparent);
        display: grid;
        align-items: center;
        justify-items: center;
        height: 25px;
        width: 25px;
        .scroll-prev-icon{
            height: 10px;
            width: 10px;
            margin: 0 0 0 5px;
            border: 2px solid;
            border-right-color: #ffff0000;
            border-left-color: white;
            border-top-color: #ffff0000;
            border-bottom-color: white;
            transform: rotate(45deg);
            transition: all ease-in-out 0.4s;
        }
    }
`;
