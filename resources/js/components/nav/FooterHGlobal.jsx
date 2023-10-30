import React, { Component } from 'react';
import styled from "styled-components";

export default class FooterHGlobal extends Component {
    render() {
        return (
            <Footer>
                <div>
                    <div className={ 'footer-list' }>
                        <a onClick={ e => this.handleDialog("linkDialog", e) }>Privacy policy</a>
                        <a onClick={ e => this.handleDialog("hgPlansDialog", e) }>About us</a>
                    </div>
                </div>
                <div>
                    <span>Talk current &#169; 2020</span>
                </div>
            </Footer>
        );
    }
}
export const Footer = styled.nav`
    color: #33693d;
    font-size: small;
    background: linear-gradient(180deg, transparent, #e9ecef);
    .footer-list{
        a{
            margin-left: 1rem;
            cursor: pointer;
        }
    }
`;
