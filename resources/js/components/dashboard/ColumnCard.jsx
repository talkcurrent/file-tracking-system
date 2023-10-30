import { trim } from 'lodash';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ColumnCard = (props) => {
    const {
        margin, color, bgc, fontSize, textShadow, iconClass, labelShadow,
        iconColor, viewable, handleClick, cardLink, cardLabel,
        labelColor, cardCount, clickableBtn
    } = props;

    const onClick = () => {
        if (handleClick) {
            handleClick(cardLabel);
        }
    };

    return (
        <ColumnCardStyle
            color={ color }
            bgc={ bgc }
            fontSize={ fontSize }
            textShadow={ textShadow }
            labelShadow={ labelShadow }
            labelColor={ labelColor }
            margin={ margin }
        >
            <div className={ `each-stats-bg` }>
                <i style={ { color: iconColor } } className={ iconClass }></i>
            </div>
            <div className="each-stats-cont">
                <div className="stat-head">{ cardLabel }</div>
                {/* <hr style={ { margin: 0 } } /> */ }
                <div className="stat-content">
                    { trim(cardCount) != "" ? <div className={ `stats-total` }>{ cardCount }</div> : "" }
                    { props.children ?
                        <div className="column-card-cont">
                            { props.children }
                        </div>
                        : "" }
                    { viewable && cardLink != "" ?
                        <div className="view-details">
                            <div className="view-btn">
                                <Link to={ cardLink } className={ 'hrms-button-link' }>
                                    <span><i
                                        style={ { color: "rgba(0, 0, 0, 0.2)" } }
                                        className="fa fa-eye"
                                    ></i> View</span>
                                </Link>
                            </div>
                        </div>
                        : clickableBtn ?
                            <div className="view-details">
                                <div
                                    className="view-btn"
                                    onClick={ () => onClick() }
                                >
                                    <span><i
                                        style={ { color: "rgba(0, 0, 0, 0.2)" } }
                                        className="fa fa-eye"
                                    ></i> View</span>
                                </div>
                            </div>
                            : ""
                    }
                </div>
            </div>
        </ColumnCardStyle>
    );
};

export default ColumnCard;
const ColumnCardStyle = styled.div`
    display: grid;
    background-color:${props => props.bgc};
    color:${props => props.color};
    /* box-shadow:${props => props.textShadow}; */
    /* z-index: 1; */
    .each-stats-bg{
        grid-row: 1;
        grid-column: 1;
        z-index: -1;
        display: grid;
        justify-items: center;
        align-items: center;
        font-size: 600%;
    }
    
    .each-stats-cont{
        grid-row: 1;
        grid-column: 1;
        .stat-head{
            font-size: ${props => props.fontSize};
            text-align: center;
            font-weight: bolder;
            color:${props => props.labelColor};
            text-shadow:${props => props.labelShadow};
        }
        .stat-content{
            position: relative;
            padding: 0px 0px 10px 10px;
            display: grid;
            color: #f5f5f5;
            .stats-total{
                text-align: center;
                text-shadow: 1px 1px 2px black;
                font-size: 1.5rem;
            }
            .view-details{
                display: grid;
                grid-auto-flow: column;
                grid-template-columns: max-content;
                justify-items: center;
                .view-btn{
                    border: 1px solid rgba(0, 0, 0, 0.2);
                    padding: 0 5px;
                    border-radius: 30px;
                    color: #e6e6e6;
                    cursor: pointer;
                    a{
                        text-decoration: none;
                        color: inherit;
                    }
                }
            }
            .column-card-cont{
                border-radius: 4px;
                /* background: #f5f5f5bd; */
                /* padding: 0px 0px 10px 10px; */
                display: grid;
                gap: 1rem;
                color:${props => props.color ? props.color : "#5a6269"};
                width: 95%;
                margin: ${props => props.margin ? props.margin : "11px auto"};
            }
            
        }
    }
`;
