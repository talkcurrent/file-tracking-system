import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Form from '../reuseable/Form';
import FormInput from '../reuseable/FormInput';

const LoginCard = (props) => {
    const {
        bgc, msg, loginIn,
        animateShake, windowWidth, handleLogin
    } = props;

    const [field, setfield] = useState({
        e_mail: "", password: "", remember: false
    });
    const [errorField, seterrorField] = useState({
        e_mail: false, password: false
    });
    const [animateName, setanimateName] = useState("");

    useEffect(() => {
        if (animateShake) {
            setanimateName("shake");
        } else {
            setanimateName("");
        }
        return () => { };
    });

    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        // const str = value.replace(/\s\s+/g, " ");
        switch (name) {
            case "e_mail":
                setfield({ ...field, [name]: value.trim() });
                seterrorField({ ...errorField, [name]: false });
                break;
            case "remember":
                setfield({ ...field, [name]: checked });
                break;
            default:
                setfield({ ...field, [name]: value });
                seterrorField({ ...errorField, [name]: false });
                break;
        }
    };

    const handleEnterKey = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            if (!loginIn) {
                handleSubmit();
            }
        }
    };

    const handleSubmit = () => {
        const { e_mail, password, remember } = field;

        var submitable = true;
        var copyErrorField = errorField;

        for (const key in field) {
            copyErrorField[key] = field[key] == "";
            if (field[key] === "") {
                submitable = false;
            }
        }
        seterrorField({ ...copyErrorField });

        if (submitable) {
            handleLogin(e_mail, password, remember);
        }
    };

    return (
        <LoginCardStyle
            className={ `${animateName}` }
            padding={ props.padding }
            bgc={ props.bgc }
            margin={ props.margin }
            width={ props.width }
            bShadow={ props.bShadow }
        >
            <div className="login-input-cont" style={ { display: "grid" } }>
                <Form
                    gap={ "10px" }
                    processing={ loginIn }
                    progressText={ "Login in" }
                    btnSubmitText={ "Login" }
                    handleSubmit={ handleSubmit }
                    disabled={ loginIn }
                    submitBtnBgc={ "#2196F3" }
                    submitBtnColor={ "white" }
                >
                    <FormInput
                        type={ "text" }
                        inputTextColor={ "#2196F3" }
                        thisValue={ field.e_mail }
                        handleChange={ handleChange }
                        handleKeypress={ handleEnterKey }
                        handleKeyUp={ () => { } }
                        label={ "E-mail" }
                        disabled={ loginIn }
                        nameUniq={ "e_mail" }
                        placeholder={ "e.g alabura@gmail.com" }
                        error={ errorField.e_mail }
                        height={ "1.9rem" }
                    />
                    <FormInput
                        type={ "password" }
                        inputTextColor={ "#2196F3" }
                        thisValue={ field.password }
                        handleChange={ handleChange }
                        handleKeypress={ handleEnterKey }
                        handleKeyUp={ () => { } }
                        label={ "Password" }
                        disabled={ loginIn }
                        nameUniq={ "password" }
                        placeholder={ "********" }
                        error={ errorField.password }
                        height={ "1.9rem" }
                    />
                    { props.msg !== "" ?
                        <div className="error">{ props.msg }</div>
                        : "" }
                </Form>
            </div>
        </LoginCardStyle>
    );
};

export default LoginCard;

const LoginCardStyle = styled.div`
    position: relative;
    display: grid;
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
    .login-input-cont{
        padding: ${props => props.padding};
        background:${props => props.bgc};
        margin: ${props => props.margin};
        width: ${props => props.width};
        border-radius: 5px;
        box-shadow: ${props => props.bShadow};
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
    .error{
        font-size: small;
        color: deeppink;
        text-align: center;
    }
`;