import React, { Component } from 'react';
import styled from "styled-components";
import { HomeContext } from "../index/HomeContext";
import UsersOnlineBtn from '../includes/UsersOnlineBtn';
import RightEndBar from '../includes/RightEndBar';

export default class UsersOnline extends Component {
    constructor() {
        super();
        this.state = {
            onlineToggleWidth: "",
            toggle: false,
            friendsOnlineFixed: false,
        };
        this.friendsOnline = React.createRef();
    }
    componentDidMount() {
        this.frndsOnline = setInterval(() => {
            this.friendsOnlineWidth();
        }, 1000);
    }
    friendsOnlineWidth = () => {
        if (this.context.windowWidth < 900) {
            if (this.friendsOnline.current) {
                this.setState(prevState => {
                    if (prevState.onlineToggleWidth === "" || prevState.onlineToggleWidth < 20) {
                        return {
                            onlineToggleWidth: this.friendsOnline.current.offsetWidth,
                        };
                    } else {
                        clearInterval(this.frndsOnline);
                    }
                });
            }
        } else {
            clearInterval(this.frndsOnline);
        }
    };
    openThis = (to_open) => {
        switch (to_open) {
            case "toggle":
                this.setState(prevState => {
                    return {
                        [to_open]: !prevState.toggle
                    };
                });
                break;
            default:
                this.setState(prevState => {
                    return {
                        [to_open]: true
                    };
                });
                break;
        }
    };
    render() {
        return (
            <HomeContext.Consumer>
                { context => {
                    return (
                        <React.Fragment>
                            <UsersOnlineBtn context={ context } openThis={ this.openThis } />
                            <FriendsOnlineFixed
                                className={ this.state.toggle ? "toggle" : "" }
                                windowWidth={ context.windowWidth }
                                navHeight={ `${context.navHeight}px` }
                                onlineToggleWidth={ `${this.state.onlineToggleWidth}` }
                                ref={ this.friendsOnline }
                            >
                                <RightEndBar />
                            </FriendsOnlineFixed>
                        </React.Fragment>
                    );
                } }
            </HomeContext.Consumer>
        );
    }
}
UsersOnline.contextType = HomeContext;
export const FriendsOnlineFixed = styled.div`
    position:fixed;
    top: ${props => props.navHeight};
    right: -${props => (props.onlineToggleWidth > 20 ? props.onlineToggleWidth : 1000)}px;
    background: rgba(16, 76, 15, 0.2);
    color: white;
    padding: 3px 5px;
    border-radius: 7px 0 0 7px;
    z-index: 10;
    min-height: 87vh;
    max-width: 105px;
    overflow: auto;
    transition:all 0.5s linear;
    &.toggle{
        right: 3px;
    }
`;