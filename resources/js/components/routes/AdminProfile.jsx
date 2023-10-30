import React, { useContext, useEffect } from 'react';
import useViewPort from '../customHooks/useViewPort';
import Column from '../dashboard/Column';
import ColumnCard from '../dashboard/ColumnCard';
import WebView from '../includes/WebView';
import { AdminContext } from '../index/AdminContext';
import { AllContext } from '../index/AllContext';
import Loading from '../reuseable/Loading';
import SQLDateToJSDate from '../reuseable/SQLDateToJSDate';
import VerticalUserCard from '../reuseable/VerticalUserCard';

const AdminProfile = () => {
    const context = useContext(AllContext);
    const { authUser } = context;

    useEffect(() => {
        const path_names = location.pathname.split('/');
        if (path_names.includes('super')) {
            context.handleAuthUser("admin");
        } else {
            context.handleAuthUser("staff");
        }
        return () => { };
    }, []);

    return (
        <WebView
            view={ "profile" }
            context={ context }
        >
            <VerticalUserCard
                bShadow={ "" }
                cardBgc={ "whitesmoke" }
                cardElemBgc={ "whitesmoke" }
                gtr={ "" }
                cardImgUrl={ `/storage/image/${authUser.hasOwnProperty("id") ? authUser.profile.dp : "imageboy.jpg"}` }
                fSize={ "" }
                lHeight={ 1 }
                margin={ "0 10px" }
            // handleClick={()=>{}}
            >
                <Column
                    color={ "#5a6269" }
                    bgc={ "rgb(245 245 245)" }
                    fontSize={ useViewPort(["18px", "18px", "20px", "25px"]) }
                    iconClass={ "" }
                    header={ "Biography" }
                >
                    <ColumnCard
                        // color={ "#296dad" }
                        bgc={ "rgb(245 245 245)" }
                        fontSize={ useViewPort(["18px", "18px", "20px", "x-large"]) }
                        viewable={ false }
                        margin={ "2px auto" }
                        bgc={ "#f9f9f9" }
                    >
                        { authUser.hasOwnProperty("id") ?
                            <>
                                <h3 style={ { color: "#296dad" } }>{ authUser.first_name }{ ' ' }{ authUser.last_name }{ ' ' }{ authUser.other_name }</h3>
                                <div><strong>E-mail:{ " " }</strong>{ authUser.email }</div>
                                <div><strong>Phone number:{ " " }</strong>{ authUser.phone_no }</div>
                                <div>{ `Admin since: ${SQLDateToJSDate(authUser.created_at, true)} ` }</div>
                            </>
                            :
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
                        }
                    </ColumnCard>
                </Column>

            </VerticalUserCard>
        </WebView>
    );
};

export default AdminProfile;
