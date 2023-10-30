import React, { useContext, useEffect, useState } from 'react';
import useFetch from '../customHooks/useFetch';
import useViewPort from '../customHooks/useViewPort';
import Column from '../dashboard/Column';
import ColumnCard from '../dashboard/ColumnCard';
import ListItem from '../includes/ListItem';
import WebView from '../includes/WebView';
import { AllContext } from '../index/AllContext';
import Loading from '../reuseable/Loading';
import SQLDateToJSDate from '../reuseable/SQLDateToJSDate';
import VerticalUserCard from '../reuseable/VerticalUserCard';

const Staff = (props) => {
    const context = useContext(AllContext);
    const { staffs, isAdmin } = context;

    const [state, setstate] = useState({
        gettingStaff: false
    });
    const [staff, setstaff] = useState({});

    const { id } = props.match.params;
    const columnHeadFontSize = useViewPort(["18px", "18px", "20px", "25px"]);

    useEffect(() => {
        const path_names = location.pathname.split('/');
        if (path_names.includes('super')) {
            context.handleAuthUser("admin");
        } else {
            context.handleAuthUser("staff");
        }
        return () => { };
    }, []);

    useEffect(() => {
        var staff = staffs.find(staff => staff.id == id);
        if (staff != undefined && staff.hasOwnProperty("id")) {
            setstaff(staff);
        } else {
            getStaff();
        }
    }, [staffs]);

    const getStaff = async () => {
        const data = { id };

        setstate({ ...state, gettingStaff: true });
        const response = await useFetch("/get_staff", JSON.stringify(data), "POST", false);
        if (response.ok) {
            let result = await response.json();
            setstaff(result);
            setstate({ ...state, gettingStaff: false });
        } else {
            setstate({ ...state, gettingStaff: false });
        }
    };
    return (
        <WebView
            view={ "staffs" }
            context={ context }
        >
            {staff.hasOwnProperty("id") ?
                <VerticalUserCard
                    bShadow={ "" }
                    cardBgc={ "white" }
                    cardElemBgc={ "white" }
                    cardElemGap={ "1rem" }
                    gtr={ "" }
                    cardImgUrl={ `/storage/image/${staff.profile.dp}` }
                    fSize={ "" }
                    lHeight={ 1 }
                    margin={ "0 10px" }
                // handleClick={()=>{}}
                >
                    <Column
                        color={ "#5a6269" }
                        padding={ "3px" }
                        bgc={ "rgb(225 225 225)" }
                        fontSize={ columnHeadFontSize }
                        iconClass={ "" }
                        header={ "" }
                    >
                        <ColumnCard
                            // color={ "#296dad" }
                            fontSize={ columnHeadFontSize }
                            viewable={ false }
                            margin={ "2px auto" }
                            bgc={ "#f9f9f9" }
                        >
                            <h3 style={ { color: "#296dad" } }>{ staff.first_name }{ ' ' }{ staff.last_name }{ ' ' }{ staff.other_name }</h3>
                            <div><strong>E-mail:{ " " }</strong>{ staff.email }</div>
                            <div><strong>Phone number:{ " " }</strong>{ staff.phone_no }</div>
                            <div><strong>Department:</strong>{ " " }{ staff.department.d_name }</div>
                            <div>{ `Staff since: ${SQLDateToJSDate(staff.created_at, true)} ` }</div>
                        </ColumnCard>
                    </Column>
                    <Column
                        color={ "#5a6269" }
                        padding={ "3px" }
                        bgc={ "rgb(225 225 225)" }
                        fontSize={ columnHeadFontSize }
                        iconClass={ "" }
                        header={ "Address(es)" }
                    >
                        <ColumnCard
                            // color={ "#296dad" }
                            fontSize={ columnHeadFontSize }
                            viewable={ false }
                            margin={ "2px auto" }
                            bgc={ "#f9f9f9" }
                        >
                            { staff.addresses.length ?
                                staff.addresses.map((address, index) => {
                                    return (
                                        <ListItem
                                            gtc={ "1fr 8fr" }
                                            padding={ "1rem" }
                                            key={ index }
                                        >
                                            <div style={ { justifySelf: "center" } }>{ index + 1 }</div>
                                            <div>{ address.description }</div>
                                        </ListItem>
                                    );
                                })
                                : "" }
                        </ColumnCard>
                    </Column>
                    <Column
                        color={ "#5a6269" }
                        padding={ "3px" }
                        bgc={ "rgb(225 225 225)" }
                        fontSize={ columnHeadFontSize }
                        iconClass={ "" }
                        header={ "Education" }
                    >
                        <ColumnCard
                            // color={ "#296dad" }
                            bgc={ "rgb(245 245 245)" }
                            fontSize={ columnHeadFontSize }
                            viewable={ false }
                            margin={ "2px auto" }
                            bgc={ "#f9f9f9" }
                        >
                            { staff.educations.length ?
                                staff.educations.map((education, index) => {
                                    return (
                                        <ListItem
                                            gtc={ "1fr 8fr" }
                                            padding={ "0 1rem" }
                                            key={ index }
                                        >
                                            <div style={ { justifySelf: "center" } }>{ index + 1 }</div>
                                            <div>
                                                <div className="address">
                                                    <span>{ education.institution }</span>
                                                </div>
                                                <div className="address">
                                                    <span>{ education.cert_awarded }</span>
                                                </div>
                                                <div className="address">
                                                    <span><strong>Year of Graduation:</strong>{ " " }{ education.yr_of_grad }</span>
                                                </div>
                                            </div>
                                        </ListItem>
                                    );
                                })
                                : "" }
                        </ColumnCard>
                    </Column>
                    <Column
                        color={ "#5a6269" }
                        padding={ "3px" }
                        bgc={ "rgb(225 225 225)" }
                        fontSize={ columnHeadFontSize }
                        iconClass={ "" }
                        header={ "Biography" }
                    >
                        <ColumnCard
                            // color={ "#296dad" }
                            bgc={ "rgb(245 245 245)" }
                            fontSize={ columnHeadFontSize }
                            viewable={ false }
                            margin={ "2px auto" }
                            bgc={ "#f9f9f9" }
                        >
                            <span>{ staff.profile.biography }</span>
                        </ColumnCard>
                    </Column>
                    <Column
                        color={ "#5a6269" }
                        padding={ "3px" }
                        bgc={ "rgb(225 225 225)" }
                        fontSize={ columnHeadFontSize }
                        iconClass={ "" }
                        header={ "Work" }
                    >
                        <ColumnCard
                            // color={ "#296dad" }
                            bgc={ "rgb(245 245 245)" }
                            fontSize={ columnHeadFontSize }
                            viewable={ false }
                            margin={ "2px auto" }
                            bgc={ "#f9f9f9" }
                        >
                            <span>{ staff.profile.work }</span>
                        </ColumnCard>
                    </Column>
                    <Column
                        color={ "#5a6269" }
                        padding={ "3px" }
                        bgc={ "rgb(225 225 225)" }
                        fontSize={ columnHeadFontSize }
                        iconClass={ "" }
                        header={ "Social links" }
                    >
                        <ColumnCard
                            color={ "#296dad" }
                            bgc={ "rgb(245 245 245)" }
                            fontSize={ columnHeadFontSize }
                            viewable={ false }
                            margin={ "2px auto" }
                            bgc={ "#f9f9f9" }
                        >
                            { staff.links.length ?
                                staff.links.map((link, index) => {
                                    return (
                                        <React.Fragment key={ index }>
                                            {
                                                link.description == "facebook" ?

                                                    <div><a href={ `http://${link.url}` }><i className="fab fa-facebook"></i><span>{ "  " }Facebook</span></a></div>
                                                    : link.description == "instagram" ?
                                                        <div><a href={ `http://${link.url}` }><i className="fab fa-instagram"></i><span>{ "  " }Instagram</span></a></div>
                                                        : link.description == "twitter" ?
                                                            <div><a href={ `http://${link.url}` }><i className="fab fa-twitter"></i><span>{ "  " }Twitter</span></a></div>
                                                            : link.description == "linkedIn" ?
                                                                <div><a href={ `http://${link.url}` }><i className="fab fa-linkedin-in"></i><span>{ "  " }LinkedIn</span></a></div>
                                                                :
                                                                <div><a href={ `http://${link.url}` }><i className="fas fa-globe-africa"></i><span>{ "  " }{ link.url }</span></a></div>
                                            }
                                        </React.Fragment>
                                    );
                                })
                                : "" }
                        </ColumnCard>
                    </Column>
                </VerticalUserCard>
                : state.gettingStaff ?
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
                    : "" }
        </WebView>
    );
};

export default Staff;
