import React, { useContext } from 'react';
import styled from 'styled-components';
import { HomeContext } from '../index/HomeContext';
import { MessageContext } from '../index/MessageContext';
import ChatBtn from '../menu/ChatBtn';
import ChatBox from '../Messenger/ChatBox';
import TooltipContents from '../reuseable/TooltipContents';
import NavContent from './NavContent';

const FooterNav = (props) => {
    const { theme, windowWidth } = useContext(HomeContext);
    const m_context = useContext(MessageContext);
    const { chatBox } = m_context;

    return (
        <FooterNavStyle
            theme={ theme }
            windowWidth={ windowWidth }
        >
            <NavContent>
                { chatBox ?
                    <ChatBox></ChatBox>
                    : "" }
            </NavContent>
            <div className="chat-users-btn">
                <ChatBtn
                    color={ theme.nav_color }
                    fontSize={ "large" }
                    countFontSize={ "smaller" }
                    countColor={ "red" }
                    count={ "10" }
                >
                    <TooltipContents
                        padding={ "15px 5px 5px 5px" }
                        width={ "100%" }
                        minWidth={ "150px" }
                        height={ "" }
                    >
                        {/* possible conversations */ }
                        { props.children }
                    </TooltipContents>
                </ChatBtn>
            </div>
        </FooterNavStyle>
    );
};

export default FooterNav;
const FooterNavStyle = styled.div`
    position: fixed;
    visibility: hidden;
    display: grid;
    align-items: center;
    justify-items: center;
    grid-template-columns: ${props => props.windowWidth <= 435 ? "100%" : "10fr auto"};
    bottom: 0;
    right: 0;
    width: 100%;
    z-index: 31;
    color: ${props => props.theme.nav_bgc};
    .chat-users-btn{
        justify-self: end;
        align-self: end;
        padding: 10px;
        margin-right: 1rem;
        visibility: visible;
        background: #f8f9fa;
        border-radius: 10px;
        padding: 8px 16px 0px 6px;
        box-shadow: 0px 0px 4px 0px #6c757d;
        transition: all ease-in-out 0.3s;
        &:hover{
            box-shadow: 0px 0px 15px 0px #6c757d;
        }
    }
`;
