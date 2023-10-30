import React, { useContext } from 'react';
import ToggleNav from '../includes/ToggleNav';
import { AdminContext } from '../index/AdminContext';
import AdminControlLeft from "../admin/AdminControlLeft";
import styled from 'styled-components';
import Applicants from './Applicants';

const Applications = (props) => {
    const a_context = useContext(AdminContext);
    const { windowWidth } = a_context;

    return (
        <React.Fragment>
            <ApplicationsStyle windowWidth={ windowWidth }>
                { windowWidth > 600 ?
                    <AdminControlLeft activeClass="applications" />
                    : ""
                }
                <React.Fragment>
                    <Applicants />
                </React.Fragment>

            </ApplicationsStyle>
            { windowWidth < 600 ?
                <ToggleNav>
                    <AdminControlLeft activeClass="applications" />
                </ToggleNav>
                : "" }
        </React.Fragment>
    );
};

export default Applications;
export const ApplicationsStyle = styled.div`
    display: grid;
    grid-gap: ${props => props.windowWidth >= 800 ? "10px" : "2px"};
    grid-template-columns: ${props =>
        props.windowWidth <= 600 ? "100%" : "25% 75%"};
    width: ${props => props.windowWidth >= 800 ? "85%" : "99%"};
    margin-top: 5px;
    margin-right: auto;
    margin-left: auto;
    align-items: stretch;
`;