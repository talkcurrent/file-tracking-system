import React, { useContext } from 'react';
import styled from 'styled-components';
import { HomeContext } from '../index/HomeContext';

const AttrVal = (props) => {
    const { windowWidth } = useContext(HomeContext);
    const { label, justifySelf, width } = props;
    return (
        <AttrValStyle
            windowWidth={ windowWidth }
            justifySelf={ justifySelf }
            width={ width }
        >
            <div className={ "inputCont" } >
                <span className=" span-label">
                    <div className="span-label-inside">
                        <span className={ 'span' }>{ label }</span>
                    </div>
                </span>
                { props.children }
            </div>
        </AttrValStyle>
    );
};

export default AttrVal;
const AttrValStyle = styled.div`
    justify-self: ${props => props.justifySelf};
    width: ${props => props.width};
    .inputCont{
        position: relative;
        border-radius: 10px;
        margin-bottom: 5px;
        .span-label{
            position: absolute;
            top: -13px;
            left: 10px;
            padding: 0 10px;
            background: linear-gradient(180deg,rgba(0, 0, 0, 0.06),#ffff 60%);
            border-radius: 30%;
            color: #3f5c86;
            font-weight: 600;
            letter-spacing: 1.5px;
            line-height: 1.3;
            text-shadow: -1px -1px 1px white;
            font-size:  ${props => props.windowWidth <= 400 ? "smaller" : props.windowWidth <= 768 ? "small" : ""};
            .span-label-inside{
                position: relative;
                .tooltip-insider{
                    background: white;
                    width: 200px;
                    p{
                        margin: 0;
                        text-shadow: unset;
                    }
                }
            }
        }
    }
`;
