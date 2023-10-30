import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HorizontalUserCard = (props) => {
    const { handleClick, bShadow, cardBgc, cardElemBgc, gtc, cardImgUrl, cardLink, fSize, lHeight } = props;

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
            cardBgc={ cardBgc }
            cardElemBgc={ cardElemBgc }
            gtc={ gtc }
            fSize={ fSize }
            lHeight={ lHeight }
        >
            {cardLink && cardLink != "" ?
                <Link to={ cardLink }>
                    <div
                        className="card-elem icon"
                        onClick={ e => handleOnClick("image", e) }
                    >
                        <img src={ cardImgUrl } alt="" />
                    </div>
                </Link>
                :
                <div
                    className="card-elem icon"
                    onClick={ e => handleOnClick("image", e) }
                >
                    <img src={ cardImgUrl } alt="" />
                </div>
            }
            <div className="card-elem" onClick={ e => handleOnClick("label", e) }>
                { props.children }
            </div>
        </Card>
    );
};

export default HorizontalUserCard;
const Card = styled.div`
    display: grid;
    grid-template-columns: ${props => props.gtc};
    position: relative;
    grid-gap: 2px;
    padding: 3px;
    box-shadow: ${props => props.bShadow};
    background: ${props => props.cardBgc};
    color: #343a40;
    font-size: ${props => props.fSize};
    line-height: ${props => props.lHeight};
    border-radius: 5px;
    cursor: default;
    margin: 2px;
    a{
        text-decoration: none;
        color: inherit;
    }
    .icon{
        display: grid;
        justify-items: center;
        align-items: center;
        box-shadow: 1px 0px 0px 0px #e1e1e1;
        padding: 0 4px 0 0;
        img{
            max-width: 100%;
            height: 100%;
            object-fit: contain;
            opacity: 0.4;
        }
    }
    .card-elem{
        display: grid;
        grid-gap: 2px;
        background: ${props => props.cardElemBgc};
        height: 100%;
        width: 100%;
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