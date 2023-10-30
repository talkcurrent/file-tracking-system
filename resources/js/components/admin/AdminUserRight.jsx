import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { AdminContext } from '../index/AdminContext';
import LoadingBtn from '../reuseable/LoadingBtn';
import NoRecord from '../reuseable/NoRecord';
import Loading from '../reuseable/Loading';

const AdminUserRight = (props) => {
    const a_context = useContext(AdminContext);
    const { employeeInView } = a_context;
    const { profile_img, nickname, id } = employeeInView;

    const authLoaded = employeeInView.hasOwnProperty("nickname");

    const { params } = props;
    const activeClass = location.pathname.split("/").pop();
    return (
        <ToggleableBar className="sticky">
            <div className="h-nav-elem">
                <div className="employee-head">
                    <h5>Staff Info Links</h5>
                </div>
                <div className="toggleable-dp h-card">
                    { authLoaded ?
                        <div className="admin-dp">
                            <img
                                style={ {
                                    minHeight: "30vh",
                                    width: "100%",
                                    objectFit: "cover",
                                } }
                                src={ `/storage/image/${profile_img}` }
                                alt="Employee"
                            />
                        </div>
                        :
                        <div className="admin-dp" style={ { minHeight: "20vh", position: "relative" } }>
                            <NoRecord>
                                <Loading
                                    fixed={ false }
                                    loaderPos={ `30%` }
                                    borderRadius={ `3px / 6px` }
                                    contBorderRadius={ "10px" }
                                    transformOrigin={ `1px 10px` }
                                    width={ `1px` }
                                    height={ `6px` }
                                    background={ false }
                                    loaderColor={ "#6b757d" }
                                />
                            </NoRecord>
                        </div>

                    }
                    <div
                        style={ {
                            color: "navy", textAlign: "center", position: "relative",
                            backgroundColor: "white", border: "1px solid silver"
                        } }>
                        { !authLoaded ?
                            <LoadingBtn text={ "" } lineHeight={ "unset" }
                                fontSize={ "small" } fontWeight={ 400 } />
                            :
                            <strong>{ `
                            ${employeeInView.firstname} 
                            ${employeeInView.middlename}
                            ${employeeInView.lastname} ` }</strong>
                        }
                    </div>
                </div>
                <div className="toggleable-cntrl-menu h-card">
                    <Link
                        to={ authLoaded ? `/super/emp/${id}/personal` : `#` }
                        className={ activeClass === "personal" ? "active" : "" }
                    >
                        <span >Employee Info</span>
                    </Link>
                    <Link
                        to={ authLoaded ? `/super/emp/${id}/employment` : `#` }
                        className={ activeClass === "employment" ? "active" : "" }
                    >
                        <span >Employment Info</span>
                    </Link>
                    <Link
                        to={ authLoaded ? `/super/emp/${id}/taxLines` : `#` }
                        className={ activeClass === "taxLines" ? "active" : "" }
                    >
                        <span >Tax Info</span>
                    </Link>
                    <Link
                        to={ authLoaded ? `/super/emp/${id}/bankDetails` : `#` }
                        className={ activeClass === "bankDetails" ? "active" : "" }
                    >
                        <span >Banking</span>
                    </Link>
                </div>
            </div>
        </ToggleableBar>
    );
};

export default AdminUserRight;
export const ToggleableBar = styled.div`
    .h-nav-elem{
        display: grid; 
        grid-gap: 10px;
        padding: 5px 0;
        .employee-head{
            text-align: center;
            background: white;
            color: #3f5c75;
        }
        .toggleable-dp{
            .admin-dp{
                display:grid;
                img{
                    justify-self: center;
                    max-width: 100%;
                }
            }
        }
        .toggleable-cntrl-menu{
            display: grid;
            grid-gap: 5px;
            padding: 5px 2px;
        }
        .h-card{
            background: white;
            a{
                color: #545b62;
                text-decoration: none;
                position: relative;
                &.active{
                    background: #6b757d;
                    color: white;
                    text-align: center;
                }
                &:hover{
                    background: rgba(0, 0, 0, 0.1);
                    color: black;
                }
                .unread{
                    position: absolute;
                    top: 0;
                    right: 0;
                    border-radius: 50%;
                    height: 15px;
                    width: 15px;
                    display: grid;
                    align-content: center;
                    justify-content: center;
                    font-size: smaller;
                    color: white;
                    background: red;
                }
            }
        }
    }
`;