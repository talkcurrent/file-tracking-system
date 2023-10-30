import React, { useContext } from 'react';
import styled from 'styled-components';
import { HomeContext } from '../index/HomeContext';

const ActionUsers = (props) => {
    const { theme, windowWidth } = useContext(HomeContext);
    const { action, dpWidth, dpHeight, lineHeight } = props;
    return (
        <ActionUsersStyle
            windowWidth={ windowWidth }
            lineHeight={ lineHeight }
            bgc={ theme.cardsBgc }
            dpWidth={ dpWidth ? dpWidth : "7vh" }
            dpHeight={ dpHeight ? dpHeight : "7vh" }
        >
            <div className="box-user-img">
                <img
                    src={ `/storage/image/${action.user_dp.name}` }
                    className="img-responsive mx-auto "
                />
            </div>
            <div className={ `box-user-info` }>
                <div className={ `box-user-name` }>
                    { `${action.user_name}` }
                </div>
                <div className={ `box-user-i-i` }>
                    { props.children }
                </div>
            </div>
        </ActionUsersStyle>
    );
};

export default ActionUsers;
export const ActionUsersStyle = styled.div`
    display: grid;
    background: ${props => props.bgc};
    overflow: hidden;
    grid-template-columns: max-content;
    grid-auto-flow: column;
    grid-gap: 2px;
    padding: 0px 25px 0px 0px;
    position: relative;
    border-radius: 5px 5px 0 0;
    .box-user-img {
        position: relative;
        display: grid;
        justify-items: center;
        img {
            width: ${props => props.dpWidth};
            height: ${props => props.dpHeight};
            border-radius: 50%;
            object-fit: cover;
        }
    }
    .box-user-info {
        color: ${props => props.color};
        display: grid;
        line-height: normal;
        padding: 0px 0px 0px 2px;
        box-shadow: -1px 0px 0px 0px #efefef;
        .box-user-i-i{
            line-height:${props => props.lineHeight} ;
            color: rgba(0, 0, 0, 0.5);
            font-size: small;
            font-weight: 400;
        }
        .box-user-name {
            color: darkgreen;
            font-weight: bold;
            font-size: small;
            line-height: normal;
        }
        .box-user-btns {
            font-size: smaller;
            display: grid;
            grid-auto-flow: column;
            justify-items: center;
            align-items: center;
            padding: 2px 0;
        }
    }
    .box-user-menu {
        display: block;
        position: absolute;
        right: 5px;
        top: 0px;
        border-radius: 50%;

        .menu-lock {
            position: relative;
            padding: 0px;

            .option-icon {
                display: grid;
                align-items: start;
                justify-items: center;
                padding: 0px;

                span {
                    align-self: start;
                    padding: 0px 0px 3px 0px;
                    font-weight: bolder;
                    color: rgb(136, 161, 136);
                    line-height: normal;
                    font-size: 110%;
                }
            }

            .menu-dropdown {
                display: none;
                position: absolute;
                grid-auto-flow: column;
                top: 1px;
                grid-gap: 2vw;
                padding: 0px 0px 0px 5px;
                background: rgba(255, 255, 255);
                border: 1px solid rgb(226, 222, 222);
                right: 100%;
                border-radius: 7px;
            }
        }

        &:hover {
            .menu-dropdown {
                display: grid;
            }
        }
    }
`;
