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

const Faculty = (props) => {
    const context = useContext(AllContext);
    const { faculties } = context;

    const [state, setstate] = useState({
        gettingFaculty: false
    });
    const [faculty, setfaculty] = useState({});

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
        getFaculty();
    }, []);

    const getFaculty = async () => {
        const data = { id };

        setstate({ ...state, gettingFaculty: true });
        const response = await useFetch("/get_faculty", JSON.stringify(data), "POST", false);
        if (response.ok) {
            let result = await response.json();
            setfaculty(result);
            setstate({ ...state, gettingFaculty: false });
        } else {
            setstate({ ...state, gettingFaculty: false });
        }
    };

    return (
        <WebView
            view={ "faculties" }
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
                        { faculty.hasOwnProperty("id") ?
                            <>
                                <h5 style={ { color: "#296dad" } }>{ faculty.f_name }</h5>
                                <div>{ faculty.motto }</div>
                                <div style={ { opacity: 0.7, fontFamily: "cursive" } }>Departments:{ " " }{ faculty.departments_count }</div>
                                <div>{ `faculty since: ${SQLDateToJSDate(faculty.created_at, true)} ` }</div>
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
                    header={ "Departments In This Faculty" }
                >
                    <ColumnCard
                        // color={ "#296dad" }
                        bgc={ "rgb(245 245 245)" }
                        fontSize={ "" }
                        viewable={ false }
                        margin={ "2px auto" }
                        bgc={ "white" }
                    >
                        { faculty.hasOwnProperty("id") ?
                            <>
                                { faculty.departments.length ?
                                    faculty.departments.map((department, index) => {
                                        return (
                                            <HorizontalUserCard
                                                key={ index }
                                                cardBgc={ "whitesmoke" }
                                                cardElemBgc={ "whitesmoke" }
                                                gtc={ "100px auto" }
                                                cardImgUrl={ "/storage/image/house.png" }
                                                cardLink={ `/department/${department.id}` }
                                                fSize={ "" }
                                                lHeight={ 1 }
                                                margin={ "0 10px" }
                                                bShadow={ "0px 0px 3px #296DBB" }
                                            >
                                                <Link to={ `/department/${department.id}` }>
                                                    <h5 style={ { color: "#296dad" } }>Department of{ " " }{ department.d_name }</h5>
                                                    <div><strong>Motto:{ " " }</strong>{ department.motto }</div>
                                                    <div style={ { opacity: 0.7, fontFamily: "cursive" } }>Total staffs:{ " " }{ department.staffs_count }</div>
                                                    <div>{ `Department created since: ${SQLDateToJSDate(department.created_at, true)} ` }</div>
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

export default Faculty;
