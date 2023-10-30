import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ActionBtn from '../reuseable/ActionBtn';

const EachApplication = (props) => {
    const { application } = props;
    return (
        <EachApplicationStyle>
            <table>
                <tbody>
                    <tr>
                        <td className={ "user-icon" }><i className="fas fa-user"></i></td>
                        <td>
                            <div className="application-data">
                                <table>
                                    <thead><tr><td>{ `${application.firstname} ${application.lastname}` }</td></tr></thead>
                                    <tbody>
                                        <tr>
                                            <td className={ "app-label" }>State: </td>
                                            <td>{ application.state }</td>
                                        </tr>
                                        <tr>
                                            <td className={ "app-label" }>City:</td>
                                            <td>{ application.city }</td>
                                        </tr>
                                        <tr>
                                            <td className={ "app-label" }>Street:</td>
                                            <td>{ application.street }</td>
                                        </tr>
                                        <tr>
                                            <td className={ "app-label" } colSpan={ 2 }>
                                                <Link to={ `/super/applications/${application.id}` }>
                                                    <ActionBtn
                                                        btnText={ "See detail" }
                                                        justify={ "" }
                                                        bgc={ "#3f8eab" }
                                                        color={ "white" }
                                                        width={ "100%" }
                                                    />
                                                </Link>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </EachApplicationStyle>
    );
};

export default EachApplication;
const EachApplicationStyle = styled.div`
    border-radius: 10px;
    margin-top: 13px;
    box-shadow: 0px 0px 5px 1px silver;
    table{
        width: 100%;
    }
    .user-icon{
        font-size: 80px;
        color: #b5b5b5;
        line-height: normal;
        text-align: center;
    }
    .application-data{
        font-size: small;
        line-height: normal;
        thead{
            font-size: large;
            font-weight: 500;
            text-align: center;
        }
        .app-label{
            font-weight: 700;
        }
        tbody>tr{
            &:nth-child(odd){
                background: rgba(0, 0, 0, 0.1);
            }
        }
    }
    a{
        text-decoration: none;
    }
`;