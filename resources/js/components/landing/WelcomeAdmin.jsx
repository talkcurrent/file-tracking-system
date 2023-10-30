import { trim } from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import useFetch from '../customHooks/useFetch';
import { WelcomeContext } from '../index/WelcomeContext';
import LoginCard from '../nav/LoginCard';

const WelcomeAdmin = (props) => {
    const [state, setstate] = useState({
        loginIn: false, statusMsg: "", loginFailed: false
    });

    const { navHeight, windowWidth } = useContext(WelcomeContext);

    const handleLogin = async (email, pass, rememberMe) => {
        const data = {
            email: email,
            password: pass,
            rememberMe: rememberMe,
        };

        setstate({ ...state, loginIn: true, statusMsg: "", loginFailed: false });
        const response = await useFetch('/super/login', JSON.stringify(data), "POST", false);

        if (response.ok) {
            let result = await response.json();
            if (result == true) {
                window.location.href = `${location.origin}/super/dashboard`;
            } else {
                setstate({
                    ...state,
                    loginIn: false, loginFailed: true,
                    statusMsg: "Wrong credentials!"
                });
            }
        } else {
            setstate({
                ...state,
                loginIn: false,
                statusMsg: "Something not right!",
                loginFailed: true
            });

        }
    };

    var width = windowWidth < 801 ? "100%"
        : windowWidth <= 992 ? "750px"
            : windowWidth <= 1200 ? "970px"
                : "1170px";

    return (
        <WelcomeView>
            <LoginCard
                bgc={ "#343a40" }
                padding={ "20px 10px 5px 10px" }
                margin={ "0" }
                width={ "280px" }
                bShadow={ "0px 0px 4px #6c757d" }
                msg={ state.statusMsg }
                loginIn={ state.loginIn }
                animateShake={ state.loginFailed }
                windowWidth={ windowWidth }
                handleLogin={ handleLogin }
            />
        </WelcomeView>
    );
};

export default WelcomeAdmin;

const WelcomeView = styled.div`
    justify-self: center;
    display: grid;
    position: relative;
    top: 10vh;
    .welcom-header{
        box-shadow: 0px 0px 7px 0 black;
        padding: 1.5rem;
        border-radius: 5px;
        .uni-header1{
            text-shadow: 0px 0px 7px black;
            font-size: 3.5rem;
            text-align: center;
            color: #2196F3;
        }
        .uni-header2{
            text-shadow: 0px 0px 7px black;
            font-size: 2rem;
            text-align: center;
            color: whitesmoke;
        }
    }
    .tab-cont{
        display: grid;
        justify-items: center;
        padding: 1rem;
        gap: 2rem;
    }
`;