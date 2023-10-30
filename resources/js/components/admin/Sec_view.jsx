import React, { useContext, useEffect } from 'react';
import useViewPort from '../customHooks/useViewPort';
import Column from '../dashboard/Column';
import ToggleNav from '../includes/ToggleNav';
import { AdminContext } from '../index/AdminContext';
import SQLDateToJSDate from '../reuseable/SQLDateToJSDate';
import VerticalUserCard from '../reuseable/VerticalUserCard';
import { AdminPage } from '../routes/AdminDashboard';
import AdminControlLeft from './AdminControlLeft';
import { DashboardStyle } from './Dashboard';

const Sec_view = (props) => {
    const a_context = useContext(AdminContext);
    const { secretary } = a_context;

    useEffect(() => {
        a_context.get_vc_sec();
        return () => { };
    }, []);

    return (
        <React.Fragment>
            <AdminPage windowWidth={ a_context.windowWidth }>
                { a_context.windowWidth > 600 ?
                    <AdminControlLeft activeClass="secretary" />
                    : ""
                }
                <DashboardStyle>
                    <div className="dashboard-stats">
                        <Column
                            color={ "white" }
                            bgc={ "#3f8eab" }
                            fontSize={ useViewPort(["18px", "18px", "20px", "25px"]) }
                            iconClass={ "fas fa-user" }
                            header={ "V.C Secretary" }

                        >
                            <VerticalUserCard
                                cardImgUrl={ `/storage/image/imageboy.jpg` }
                                bShadow={ "0px 0px 4px #212529" }
                                cardBgc={ "white" }
                                cardElemBgc={ "white" }
                                gtc={ "auto" }
                                fSize={ "" }
                                lHeight={ "" }
                            >
                                {/* labels here */ }
                                <div className="stats">
                                    <div className={ 'card-label' } style={ { color: "#3f8eab" } }>
                                        <h3>{ `${secretary.first_name} ${secretary.last_name} ${secretary.other_name}` }</h3>
                                    </div>
                                </div>
                                <div className="stats">
                                    <div className={ 'card-label' }>{ `${secretary.email}` }</div>
                                </div>
                                <div className="stats">
                                    <div className={ 'card-label' }>{ `${secretary.phone_num}` }</div>
                                </div>
                                <div className="stats">
                                    <div className={ 'card-label' }>{ SQLDateToJSDate(secretary.created_at) }</div>
                                </div>

                            </VerticalUserCard>
                        </Column>
                    </div>
                </DashboardStyle>

            </AdminPage>
            { a_context.windowWidth < 600 ?
                <ToggleNav>
                    <AdminControlLeft activeClass="secretary" />
                </ToggleNav>
                : "" }
        </React.Fragment>
    );
};

export default Sec_view;
