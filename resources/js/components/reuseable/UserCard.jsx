import React, { useContext } from 'react';
import styled from 'styled-components';
import { HomeContext } from '../index/HomeContext';

const UserCard = (props) => {
    const { theme } = useContext(HomeContext);
    const { user, bRadius, imgWidth, imgHeight, fontSize } = props;
    return (
        <UserCardStyle
            bRadius={ bRadius }
            imgWidth={ imgWidth }
            imgHeight={ imgHeight }
            headColor={ theme.headColor }
        >
            <div className={ "card-user-img" }>
                <img
                    src={ `/storage/image/${user.profilePic}` }
                    alt={ user.firstname }
                    style={ { justifySelf: "center" } }
                />
            </div>
            <div className={ "card-user-infos" }>
                <div className={ "card-user-name" }>{ `${user.firstname} ${user.lastname}` }</div>
                <div className={ "card-user-details" }>
                    { props.children }
                </div>
            </div>
        </UserCardStyle>
    );
};

export default UserCard;
export const UserCardStyle = styled.div`
    display: grid;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    width: 100%;
    height: 100%;
    grid-auto-flow: column;
    grid-template-columns: max-content;
    grid-gap: 5px;
    text-align: start;
    .card-user-img{
        justify-self: center;
        align-self: center;
        img{
            border-radius: ${props => props.bRadius};
            width: ${props => props.imgWidth};
            height: ${props => props.imgHeight};
            object-fit: cover;
            cursor: pointer;
        }
    }
    .card-user-infos{
        overflow: auto;
        white-space: nowrap;
        .card-user-name{
            font-size: ${props => props.fontSize};
            color: ${props => props.headColor};
        }
        .card-user-details{
            color: #828282;
            font-style: italic;
            font-family: serif;
        }
    }
`;
