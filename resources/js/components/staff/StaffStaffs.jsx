import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FieldHasError from '../customHooks/FieldHasError';
import useFetch from '../customHooks/useFetch';
import useViewPort from '../customHooks/useViewPort';
import Column from '../dashboard/Column';
import ColumnCard from '../dashboard/ColumnCard';
import HorizontalMenu from '../includes/HorizontalMenu';
import LoadingDialog from '../includes/LoadingDialog';
import StaffWebView from '../includes/StaffWebView';
import { AdminContext } from '../index/AdminContext';
import { AllContext } from '../index/AllContext';
import ActionBtn from '../reuseable/ActionBtn';
import Dialog from '../reuseable/Dialog';
import DialogContent from '../reuseable/DialogContent';
import FixedBottomRight from '../reuseable/FixedBottomRight';
import Form from '../reuseable/Form';
import FormInput from '../reuseable/FormInput';
import FormSelInput from '../reuseable/FormSelInput';
import HorizontalUserCard from '../reuseable/HorizontalUserCard';
import isValidEmail from '../reuseable/isValidEmail';
import List from '../reuseable/List';
import ListItems from '../reuseable/ListItems';
import ResetForm from '../reuseable/ResetForm';
import Response from '../reuseable/Response';
import ScrollerX from '../reuseable/ScrollerX';
import SQLDateToJSDate from '../reuseable/SQLDateToJSDate';
import TooltipBtn from '../reuseable/TooltipBtn';
import TooltipContents from '../reuseable/TooltipContents';

const StaffStaffs = () => {
    const context = useContext(AllContext);
    const { getStaffs, staffs, getDepartments, departments, gettingStaffs, staffsReady, alterStateProps } = context;

    const [state, setstate] = useState({
        addStaffAttempting: false, addStaffFailed: "", message: "",
        assigningRole: false, assignmentRole: "", assigningRoleFailed: "",
        removingRole: true, removingRoleFailed: false,
        deletingStaff: false, assignmentStaff: "", deletingStaffFailed: "",
    });


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
        if (!departments.length) {
            getDepartments();
        }
        if (!staffs.length) {
            getStaffs();
        } else {
            alterStateProps('staffsReady', true);
        }
    }, []);

    return (
        <>
            <StaffWebView
                view={ "staffs" }
                context={ context }
            >
                <Column
                    color={ "#5a6269" }
                    bgc={ "rgb(245 245 245)" }
                    fontSize={ columnHeadFontSize }
                    iconClass={ "" }
                    header={ "Staffs" }
                >
                    <ColumnCard
                        // color={ "#296dad" }
                        bgc={ "rgb(245 245 245)" }
                        fontSize={ "" }
                        viewable={ false }
                        margin={ "2px auto" }
                        bgc={ "white" }
                    >
                        <Response
                            dataReady={ staffsReady }
                            // datas={ !a_context.sortedAnnouncement ? announcements : sortedAnnouncements }
                            datas={ staffs }
                            background={ "transparent" }
                            gettingData={ gettingStaffs }
                            noRecordText={ "No record found!" }
                        >
                            { staffs.length ?
                                staffs.map((staff, index) => {
                                    return (
                                        <HorizontalUserCard
                                            key={ index }
                                            cardBgc={ "whitesmoke" }
                                            cardElemBgc={ "whitesmoke" }
                                            gtc={ "100px auto" }
                                            cardImgUrl={ `/storage/image/${staff.profile.dp}` }
                                            fSize={ "" }
                                            lHeight={ 1 }
                                            margin={ "0 10px" }
                                            bShadow={ "0px 0px 3px #296DBB" }
                                        >
                                            <h3 style={ { color: "#296dad" } }>{ staff.first_name }{ " " } { staff.last_name }{ " " }{ staff.other_name }</h3>
                                            <div>{ staff.department.d_name }{ " " } department</div>
                                            <div>{ staff.email }</div>
                                            <div>{ staff.phone_no }</div>
                                            <div style={ {
                                                display: "grid",
                                                gridAutoFlow: "column",
                                                gridTemplateColumns: "max-content",
                                                color: "gray",
                                                fontFamily: "serif"
                                            } }>
                                                <span>Role (s):{ " " }</span>
                                                { staff.roles.length ?
                                                    <ScrollerX>
                                                        { staff.roles.map((role, index) => {
                                                            var last = staff.roles[staff.roles.length - 1];
                                                            return <span key={ index }>{ role.role_name }{ last.id != role.id ? ", " : "" }</span>;
                                                        }) }
                                                    </ScrollerX>
                                                    : ""
                                                }
                                            </div>
                                            <div>{ `Staff since: ${SQLDateToJSDate(staff.created_at, true)} ` }</div>
                                        </HorizontalUserCard>
                                    );
                                })
                                : "" }
                        </Response>
                    </ColumnCard>
                </Column>
                {/* <FixedBottomRight
                    bottom={ "10px" }
                    right={ "10px" }
                    bRadius={ "5px" }
                >
                    <ActionBtn
                        btnText={ "+ New staff" }
                        bgc={ "#296dad" }
                        color={ "whitesmoke" }
                        btnClick={ () => handleNewStaffDialog() }
                    />
                </FixedBottomRight> */}

            </StaffWebView>
            {/* {state.assigningRole ? <LoadingDialog bgc={ "transparent" } /> : "" } */ }
        </>
    );
};

export default StaffStaffs;
