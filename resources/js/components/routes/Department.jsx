import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../customHooks/useFetch';
import useViewPort from '../customHooks/useViewPort';
import Column from '../dashboard/Column';
import ColumnCard from '../dashboard/ColumnCard';
import ListItem from '../includes/ListItem';
import WebView from '../includes/WebView';
import { AllContext } from '../index/AllContext';
import HorizontalUserCard from '../reuseable/HorizontalUserCard';
import Loading from '../reuseable/Loading';
import SQLDateToJSDate from '../reuseable/SQLDateToJSDate';
import VerticalUserCard from '../reuseable/VerticalUserCard';

const Department = (props) => {
    const context = useContext(AllContext);

    const [state, setstate] = useState({
        gettingDepartment: false
    });
    const [department, setdepartment] = useState({});

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
        getDepartment();
    }, []);

    const getDepartment = async () => {
        const data = { id };

        setstate({ ...state, gettingDepartment: true });
        const response = await useFetch("/get_department", JSON.stringify(data), "POST", false);
        if (response.ok) {
            let result = await response.json();
            setdepartment(result);
            setstate({ ...state, gettingDepartment: false });
        } else {
            setstate({ ...state, gettingDepartment: false });
        }
    };

    return (
        <WebView
            view={ "departments" }
            context={ context }
        >
            <VerticalUserCard
                bShadow={ "" }
                cardBgc={ "white" }
                cardElemBgc={ "white" }
                cardElemGap={ "1rem" }
                gtr={ "" }
                cardImgUrl={ "/storage/image/house.png" }
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
                        { department.hasOwnProperty("id") ?
                            <>
                                <h5 style={ { color: "#296dad" } }>Department of{ " " }{ department.d_name }</h5>
                                <div><strong>Motto:{ " " }</strong>{ department.motto }</div>
                                <div style={ { opacity: 0.7 } }>Faculty:{ " " }{ department.faculty.f_name }</div>
                                <div style={ { opacity: 0.7, fontFamily: "cursive" } }>Total staffs:{ " " }{ department.staffs_count }</div>
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
                <Column
                    color={ "#5a6269" }
                    bgc={ "rgb(245 245 245)" }
                    fontSize={ columnHeadFontSize }
                    iconClass={ "" }
                    header={ "Staffs In This Department" }
                >
                    <ColumnCard
                        // color={ "#296dad" }
                        fontSize={ "" }
                        viewable={ false }
                        margin={ "2px auto" }
                        bgc={ "white" }
                    >
                        { department.hasOwnProperty("id") ?
                            <>
                                { department.staffs.length ?
                                    department.staffs.map((staff, index) => {
                                        return (
                                            <HorizontalUserCard
                                                key={ index }
                                                cardBgc={ "whitesmoke" }
                                                cardElemBgc={ "whitesmoke" }
                                                gtc={ "100px auto" }
                                                cardImgUrl={ "/storage/image/imageboy.jpg" }
                                                cardLink={ `/staff/${staff.id}` }
                                                fSize={ "" }
                                                lHeight={ 1 }
                                                margin={ "0 10px" }
                                                bShadow={ "0px 0px 3px #296DBB" }
                                            >
                                                <Link to={ `/staff/${staff.id}` }>
                                                    <h3 style={ { color: "#296dad" } }>{ staff.first_name }{ " " } { staff.last_name }{ " " }{ staff.other_name }</h3>
                                                    <div>{ staff.email }</div>
                                                    <div>{ staff.phone_no }</div>
                                                    <div>{ `Staff since: ${SQLDateToJSDate(staff.created_at, true)} ` }</div>
                                                </Link>

                                            </HorizontalUserCard>
                                        );
                                    })
                                    : "" }
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

export default Department;
