import React from 'react';
import styled from 'styled-components';
import Close from './Close';

const SelectedUsers = (props) => {
    const { userLists, windowWidth, handleUserDel } = props;
    return (
        <SelectedUsersStyle windowWidth={ windowWidth }>
            { userLists.length ?
                userLists.map((result, key) => {
                    return (
                        <div className="each-u-cont marginR" key={ key }>
                            <div className="each-user-name">
                                <span>{ `${result.firstname} ${result.lastname}` }</span>
                            </div>
                            <Close handleClick={ e => handleUserDel(result.id) } obj={ result } absolute={ false } />
                        </div>
                    );
                })
                : ""
            }
        </SelectedUsersStyle>
    );
};

export default SelectedUsers;
export const SelectedUsersStyle = styled.div`
    font-size:${props => props.windowWidth <= 400 ? `smaller` : "small"};
    .each-u-cont{
        position: relative;
        display: inline-grid;
        grid-auto-flow: column;
        grid-template-columns: max-content;
        margin-right: 5px;
        background: rgb(0 0 0 / 9%);
        border-radius: 5px;
        margin-bottom: 3px

    }
`;
