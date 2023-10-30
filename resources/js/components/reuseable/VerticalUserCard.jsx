import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';

const VerticalUserCard = (props) => {
    const { bShadow, cardBgc, cardElemBgc,
        gtr, cardImgUrl, fSize, lHeight,
        windowWidth, handleClick, margin, cardElemGap
    } = props;

    useEffect(() => {

        return () => { };
    }, []);

    const handleOnClick = (action, e) => {
        if (handleClick) {
            handleClick(action, e);
        }
    };

    return (
        <Card
            bShadow={ bShadow }
            margin={ margin }
            cardBgc={ cardBgc }
            cardElemBgc={ cardElemBgc }
            gtr={ gtr }
            gap={ cardElemGap }
            fSize={ fSize }
            lHeight={ lHeight }
        >
            <div
                className="card-elem icon"
                onClick={ e => handleOnClick("image", e) }
            >
                <img src={ cardImgUrl } alt="" />
            </div>
            <div className="card-elem" onClick={ e => handleOnClick("label", e) }>
                { props.children }
            </div>
        </Card>
    );
};

export default VerticalUserCard;
const Card = styled.div`
    display: grid;
    grid-template-rows: ${props => props.gtr};
    position: relative;
    gap: 2px;
    padding: 3px;
    box-shadow: ${props => props.bShadow};
    margin: ${props => props.margin};
    background: ${props => props.cardBgc};
    color: #343a40;
    font-size: ${props => props.fSize};
    line-height: ${props => props.lHeight};
    border-radius: 5px;
    cursor: default;
    .icon{
        display: grid;
        justify-items: center;
        align-items: center;
        /* box-shadow: 1px 0px 0px 0px #e1e1e1;
        padding: 0 4px 0 0; */
        img{
            max-width: 100%;
            /* height: 100%; */
            object-fit: contain;
            /* opacity: 0.4; */
            border-radius: 10px;
        }
    }
    .card-elem{
        display: grid;
        gap: ${props => props.gap};
        background: ${props => props.cardElemBgc};
        .stats{
            display: grid;
            grid-auto-flow: column;
            border-radius: 5px;
            padding-left: 4px;
            .card-label{
                font-family: serif;
            }
            a{
                justify-self: center;
            }
        }
    }
`;