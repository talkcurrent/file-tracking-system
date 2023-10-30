import React, { useContext } from 'react';
import styled from 'styled-components';
import { WelcomeContext } from '../index/WelcomeContext';

const ApplicationForm = (props) => {
    const { navHeight, windowWidth } = useContext(WelcomeContext);
    return (
        <ApplicationFormStyle
            width={ props.width }
            windowWidth={ windowWidth }
            padding={ props.padding }
        >
            {props.children }
        </ApplicationFormStyle>
    );
};

export default ApplicationForm;
const ApplicationFormStyle = styled.div`
    margin: 0 auto;
    width: ${props => props.width};
    padding: ${props => props.windowWidth < 768 ? "20px" : "60px"} 15px;
`;