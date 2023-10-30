import React, { Component } from "react";
import styled from "styled-components";
import LoadingBtn from "../reuseable/LoadingBtn";

export default class WelcomeNav extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loginEmail: "",
            loginEmailError: true,
            loginPassword: "",
            loginPasswordError: true,
            remember: false,
            disabledAllInput: false,
            logging_in: false,
            shake: false,
            loginError: false,
            disabled: true,
            animate: "slideLoginDown",
        };
        this.loginHandle = React.createRef();
    }
    handleInputChange = (event) => {
        const { name, dataset } = event.target;
        const target = event.target;
        const value = name === 'remember' ? target.checked : target.value;
        switch (name) {
            case "remember":
                this.setState({
                    [name]: value,
                });
                break;

            default:
                this.setState({
                    [name]: value,
                    [dataset.name]: value.trim().length > 0 ? false : true,
                });
                break;
        }

        setTimeout(() => {
            this.formHasError();
        }, 100);
    };
    formHasError = () => {
        const { loginEmailError, loginPasswordError } = this.state;
        const errors = [loginEmailError, loginPasswordError];
        if (!errors.includes(true)) {
            this.setState({
                disabled: false
            });
        } else {
            this.setState({
                disabled: true
            });
        }
    };
    handleAnimate = (param) => {
        this.setState({
            animate: param,
        });
    };
    handleSubmit = () => {
        if (!this.state.disabled) {
            var data;
            if (this.state.remember) {
                data = {
                    email: this.state.loginEmail,
                    password: this.state.loginPassword,
                    remember: this.state.remember,
                };
            } else {
                data = {
                    email: this.state.loginEmail,
                    password: this.state.loginPassword,
                };
            }
            let token = document.querySelector('meta[name="csrf-token"]').getAttribute("content");
            const url = this.props.admin ? "/adminCheck" : "/login";
            this.setState({
                logging_in: true,
                disabledAllInput: true,
                loginError: false,
                animate: ""
            });
            if (this.state.loginEmail !== "" & this.state.loginPassword !== "") {
                fetch(url, {
                    mode: "cors",
                    method: "POST",
                    body: JSON.stringify(data),
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        "X-CSRF-TOKEN": token
                    }
                })
                    .then(response => {
                        return response.json();
                    })
                    .then(resData => {
                        if (resData.message == undefined) {
                            switch (resData) {
                                case true:
                                    window.location.href = `${location.origin}/home`;
                                    break;
                                case false:
                                    this.setState({
                                        logging_in: false,
                                        disabledAllInput: false,
                                        loginError: true
                                    });
                                    this.handleAnimate("shake");
                                    break;
                            }
                        }
                    })
                    .catch(error => {
                        this.handleAnimate("shake");
                    });
            }
        }
    };
    handleEnterKey = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            if (!this.state.disabled) {
                this.handleSubmit();
            }
        }
    };
    render() {
        const { windowWidth, backgroundColor, admin, login } = this.props;
        const { loginEmailError, loginPasswordError, loginError, animate, disabled, disabledAllInput } = this.state;
        return (
            <NavWelcome
                backgroundColor={ backgroundColor }
                windowWidth={ windowWidth }
                right={ windowWidth <= 300 ? "60px" : "50px" }
            >
                <div className="head-content">
                    <a className=" site-title" href={ admin ? `${location.origin}/after8` : location.origin }>
                        Talk Current
                    </a>
                    <div className="guest-control">
                        <div
                            className={ `guest-login ${animate}` }
                            ref={ this.loginHandle }
                        >
                            <a onClick={ this.props.handleLoginComponent }>Login</a>
                            {
                                login ?
                                    <div
                                        className={ `login-input-cont` }
                                    >
                                        <div className="login-inputs">
                                            {
                                                loginError ?
                                                    <div className="error-text">Wrong credentials</div>
                                                    :
                                                    <React.Fragment></React.Fragment>
                                            }
                                            <div className={ "inputCont" }>
                                                <span className={ 'span-label' }>E-mail</span>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    name="loginEmail"
                                                    data-name="loginEmailError"
                                                    id="loginEmail"
                                                    required
                                                    autoFocus
                                                    onKeyPress={ this.handleEnterKey }
                                                    value={ this.state.loginEmail }
                                                    onChange={ this.handleInputChange }
                                                    disabled={ this.state.disabledAllInput }
                                                    placeholder="e.g aduojoakoh@example.com"
                                                />
                                                <span className={ "span-status" }>
                                                    { this.state.checking ?
                                                        <LoadingBtn text={ "Checking" } />
                                                        :
                                                        <span>{ this.state.checkResultText }</span>
                                                    }
                                                </span>
                                            </div>
                                            <div className={ "inputCont" }>
                                                <span className={ 'span-label' }>Password</span>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    name="loginPassword"
                                                    data-name="loginPasswordError"
                                                    id="loginPassword"
                                                    required
                                                    onKeyPress={ this.handleEnterKey }
                                                    value={ this.state.loginPassword }
                                                    onChange={ this.handleInputChange }
                                                    disabled={ this.state.disabledAllInput }
                                                    placeholder="Set a password"
                                                />
                                            </div>
                                            <div className="login-btns">
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="remember"
                                                        id="remember"
                                                        checked={ this.state.remember }
                                                        onChange={ this.handleInputChange }
                                                    />

                                                    <label className="form-check-label" htmlFor="remember">
                                                        Remember me
                                                    </label>
                                                </div>
                                                <button
                                                    className={ `login-submit` }
                                                    disabled={ disabledAllInput || disabled }
                                                    style={ {
                                                        cursor: `${this.state.disabled ? "not-allowed" : "pointer"}`,
                                                    } }
                                                    onClick={ e => {
                                                        this.handleSubmit(e);
                                                    } }
                                                >
                                                    { this.state.logging_in ?
                                                        <LoadingBtn text={ "Requesting" } />
                                                        :
                                                        "Login"
                                                    }
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <React.Fragment></React.Fragment>
                            }
                        </div>
                    </div>
                </div>
            </NavWelcome>
        );
    }
}
export const NavWelcome = styled.nav`
    display: grid;
    transition: all ease-in 0.5s;
    background-color: ${props =>
        props.backgroundColor === false ? "transparent" : "#54a977"};
    .head-content {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        padding: 3px 8vw 3px 8vw;
        top: 4px;
        width: 100%;
        background-color: transparent;
        color: white;
        z-index: 2;
        @media only screen and (max-width: 400px) {
            /* For mobile phones: */
            width: 100%;
            padding: 2px 0vw 2px 1vw;
            grid-auto-flow: column;
            grid-template-columns: max-content;
            font-size: smaller;
        }

        @media only screen and (max-width: 768px) {
            /* For mobile phones: */
            width: 100%;
            padding: 2px 5vw 2px 5vw;
            grid-auto-flow: column;
            grid-template-columns: max-content;
            font-size: smaller;
        }

        .site-title {
            align-self: center;
            justify-self: start;
            font-size: ${props =>
        props.windowWidth <= 400
            ? "medium"
            : props.windowWidth <= 768
                ? "large" : "x-large"};
            font-family: none;
            font-weight: bolder;
            line-height: normal;
            color: #1d693d;
            text-shadow: 1px 1px 3px #f8fafc, 0 0 5px #f8fafc;
            margin: ${props => props.windowWidth <= 600 ? "0px 8px 0px 0px" : "unset"};;
            padding: ${props => props.windowWidth >= 600 ? "0px 10px 0px 10px" : "unset"};;
    
        }
        .guest-control {
            display: grid;
            grid-auto-flow: column;
            grid-gap: 10px;
            align-self: center;
            justify-self: end;
            a {
                color: #1d693d;
                text-shadow: 1px 1px 3px #f8fafc, 0 0 5px #f8fafc;
            }
            .guest-login, .guest-register {
                cursor: pointer;
                position: relative;
                &.slideLoginDown{
                    .login-input-cont{
                        -webkit-animation-name: fadeInDown;
                        animation-name: fadeInDown;
                        animation-duration: 0.9s;
                        @keyframes fadeInDown {
                            from {
                                opacity: 0;
                                -webkit-transform: translate3d(0, -60%, 0);
                                transform: translate3d(0, -60%, 0);
                            }
                            
                            to {
                                opacity: 1;
                                -webkit-transform: translate3d(0, 0, 0);
                                transform: translate3d(0, 0, 0);
                            }
                        }
                        @-webkit-keyframes fadeInDown {
                            from {
                              opacity: 0;
                              -webkit-transform: translate3d(0, -60%, 0);
                              transform: translate3d(0, -60%, 0);
                            }
                          
                            to {
                              opacity: 1;
                              -webkit-transform: translate3d(0, 0, 0);
                              transform: translate3d(0, 0, 0);
                            }
                        }
                    }
                }
                &.shake{
                    .login-input-cont{
                        -webkit-animation-name: shake;
                        animation-name: shake;
                        animation-duration: 0.9s;
                        @-webkit-keyframes shake {
                            from,
                            to {
                                -webkit-transform: translate3d(0, 0, 0);
                                transform: translate3d(0, 0, 0);
                            }
                            
                            10%,
                            30%,
                            50%,
                            70%,
                            90% {
                                -webkit-transform: translate3d(-10px, 0, 0);
                                transform: translate3d(-10px, 0, 0);
                            }
                            
                            20%,
                            40%,
                            60%,
                            80% {
                                -webkit-transform: translate3d(10px, 0, 0);
                                transform: translate3d(10px, 0, 0);
                            }
                        }
                            
                            @keyframes shake {
                            from,
                            to {
                                -webkit-transform: translate3d(0, 0, 0);
                                transform: translate3d(0, 0, 0);
                            }
                            
                            10%,
                            30%,
                            50%,
                            70%,
                            90% {
                                -webkit-transform: translate3d(-10px, 0, 0);
                                transform: translate3d(-10px, 0, 0);
                            }
                            
                            20%,
                            40%,
                            60%,
                            80% {
                                -webkit-transform: translate3d(10px, 0, 0);
                                transform: translate3d(10px, 0, 0);
                            }
                        }
                                                        
                    }
                }
                .login-input-cont{
                    position: absolute;
                    right: -${props => props.right};
                    margin-top: 11px;
                    .login-inputs{
                        position: relative;
                        padding: 10px 5px 2px 5px;
                        background: rgb(238, 241, 239);
                        min-width: ${props => props.windowWidth <= 300 ? "230px" : "250px"};
                        display: grid;
                        grid-gap: 5px;
                        border-radius: 10px;
                        &:before{
                            content: " ";
                            display: block;
                            height: 20px;
                            right: ${props => props.right};
                            bottom: 100%;
                            position: absolute;
                            border-color: transparent transparent rgb(238,241,239) transparent;
                            border-style: solid;
                            border-width: 11px;
                        }
                        .inputCont{
                            position: relative;
                            border-radius: 7px;
                            .span-label{
                                position: absolute;
                                top: -10px;
                                left: 10px;
                                padding: 0 10px;
                                background: linear-gradient(180deg,#eef1ef,transparent 60%);
                                border-radius: 30%;
                                color: #000000;
                                font-weight: 400;
                                font-size:  ${props => props.windowWidth <= 400 ? "smaller" : props.windowWidth <= 768 ? "small" : ""};
                                line-height: 1.3;
                            }
                            .span-status{
                                position: absolute;
                                top: -10px;
                                right: 0;
                                font-size: smaller;
                                color: red;
                                background: white;
                                line-height: 1.2;
                            }
                            input, select{
                                border: unset;
                                padding: 0 0.75rem;
                                font-size: small;
                                height: 26px;   
                                &:focus{
                                    border: unset;
                                    outline: unset;
                                    box-shadow: none;
                                }
                                &::-webkit-input-placeholder {
                                    color: #a2a2a2;
                                    font-size:  11px;
                                    font-style: italic;
                                }
                                &::-moz-placeholder {
                                color: #a2a2a2;
                                font-style: italic;
                                font-size:  11px;
                                }
                                &:-ms-input-placeholder {
                                color: #a2a2a2;
                                font-size:  11px;
                                font-style: italic;
                                }
                                &::placeholder {
                                color: #a2a2a2;
                                font-size:  11px;
                                font-style: italic;
                                }
                            }
                        }
                        .error-text{
                            max-width: fit-content;
                            color: deeppink;
                            line-height: 0.5;
                            justify-self: end;
                        }
                        .login-btns {
                            display: grid;
                            grid-auto-flow: column;
                            grid-template-columns: max-context;
                            font-size: ${props =>
        props.windowWidth <= 400 ? "smaller" : props.windowWidth <= 768 ? "small" : "unset"};
                            .login-submit {
                                background: #418244;
                                color: white;
                                border-radius: 4px;
                                opacity: 1;
                                transition: all ease-in 0.3s;
                                &:hover {
                                        opacity: 0.6;
                                }
                            }
                            label{
                                color: #33693d;
                            }
                        }
                    }
                    // @keyframes fadeInDown {
                    //     from {
                    //         opacity: 0;
                    //         -webkit-transform: translate3d(0, -100%, 0);
                    //         transform: translate3d(0, -100%, 0);
                    //     }
                        
                    //     to {
                    //         opacity: 1;
                    //         -webkit-transform: translate3d(0, 0, 0);
                    //         transform: translate3d(0, 0, 0);
                    //     }
                    // }
                    // @-webkit-keyframes fadeInDown {
                    //     from {
                    //       opacity: 0;
                    //       -webkit-transform: translate3d(0, -100%, 0);
                    //       transform: translate3d(0, -100%, 0);
                    //     }
                      
                    //     to {
                    //       opacity: 1;
                    //       -webkit-transform: translate3d(0, 0, 0);
                    //       transform: translate3d(0, 0, 0);
                    //     }
                    // }
                }
            }
        }
    }
    a:hover{
        text-decoration: none;
    }
`;

