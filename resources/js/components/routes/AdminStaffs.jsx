import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FieldHasError from '../customHooks/FieldHasError';
import useFetch from '../customHooks/useFetch';
import useViewPort from '../customHooks/useViewPort';
import Column from '../dashboard/Column';
import ColumnCard from '../dashboard/ColumnCard';
import HorizontalMenu from '../includes/HorizontalMenu';
import LoadingDialog from '../includes/LoadingDialog';
import WebView from '../includes/WebView';
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

const AdminStaffs = () => {
    const context = useContext(AllContext);
    const [addNewStaff, setaddNewStaff] = useState(false);
    const { getStaffs, staffs, getDepartments, departments, gettingStaffs, staffsReady, alterStateProps } = context;

    const dialogWidth = useViewPort(["100%", "80%;", "60%", "40%", "40%"]);

    const [state, setstate] = useState({
        addStaffAttempting: false, addStaffFailed: "", message: "",
        assigningRole: false, assignmentRole: "", assigningRoleFailed: "",
        removingRole: true, removingRoleFailed: false,
        deletingStaff: false, assignmentStaff: "", deletingStaffFailed: "",
    });

    const [form, setform] = useState({
        department_id: "", e_mail: "", first_name: "", last_name: "",
        gender: "male", other_name: "", phone_num: "",
        address1: "", address2: "", biography: "", work: "",
        facebook: "", instagram: "", twitter: "", linkedIn: "", website: "",
        institution: "", cert_awarded: "", yr_of_grad: "2018"
    });

    const [errorField, seterrorField] = useState({
        department_id: false, e_mail: false, first_name: false, last_name: false, other_name: false, phone_num: false,
        address1: false, address2: false, biography: false, gender: false,
        institution: false, cert_awarded: false, yr_of_grad: false
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


    const year = () => {
        const yearArr = [];
        let minYear = 1990;
        const maxYear = 2030;

        while (minYear <= maxYear) {
            yearArr.push(minYear++);
        }
        return yearArr;
    };

    const handleNewStaffDialog = () => {
        setaddNewStaff(!addNewStaff);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const str = value.replace(/\s\s+/g, " ");
        setstate({ ...state, message: "" });
        switch (name) {
            case "e_mail":
                setform({ ...form, [name]: value.trim() });
                seterrorField({ ...errorField, [name]: false });
                break;
            case "biography": case "address1": case "address2":
            case "institution": case "cert_awarded": case "work":
                setform({ ...form, [name]: str });
                seterrorField({ ...errorField, [name]: false });
                break;
            case "password":
                setform({ ...form, [name]: value });
                seterrorField({ ...errorField, [name]: false });
                break;
            case "phone_num":
                setform({ ...form, [name]: value.trim().replace(/[-(+)]/gi, "") });
                seterrorField({ ...errorField, [name]: false });
                break;
            default:
                setform({ ...form, [name]: value.trim() });
                seterrorField({ ...errorField, [name]: false });
                break;
        }
    };

    const submitNewStaff = async () => {
        var copyErrorField = errorField;

        for (const key in form) {
            if (key == "e_mail" && !isValidEmail(form[key])) {
                copyErrorField.e_mail = true;
            } else if (
                key == "other_name" ||
                key == "facebook" ||
                key == "instagram" ||
                key == "twitter" ||
                key == "linkedIn" ||
                key == "website"
            ) {
                copyErrorField.other_name = false;
            } else {
                copyErrorField[key] = form[key].trim() == "";
            }
        }
        seterrorField({ ...copyErrorField });

        if (!FieldHasError(copyErrorField)) {
            //send data to backend
            const data = {
                department_id: form.department_id,
                e_mail: form.e_mail,
                first_name: form.first_name,
                last_name: form.last_name,
                other_name: form.other_name,
                gender: form.gender,
                phone_num: form.phone_num,
                address1: form.address1,
                address2: form.address2,
                biography: form.biography,
                institution: form.institution,
                cert_awarded: form.cert_awarded,
                yr_of_grad: form.yr_of_grad,
                work: form.work,
                facebook: form.facebook,
                instagram: form.instagram,
                twitter: form.twitter,
                linkedIn: form.linkedIn,
                website: form.website,
            };

            setstate({ ...state, addStaffAttempting: true, addStaffFailed: "", message: "" });
            const response = await useFetch('/super/new_staff', JSON.stringify(data), "POST", false);

            if (response.ok) {
                let result = await response.json();
                const resetForm = ResetForm(form);
                setform({ ...resetForm });

                setstate({
                    ...state,
                    addStaffAttempting: false, addStaffFailed: false,
                    message: "Staff Succesfully Added"
                });
            } else {
                setstate({
                    ...state, addStaffAttempting: false, addStaffFailed: true,
                    message: "Something not right. Please try again later"
                });

            }
        }
    };

    const assignRole = async (roleId, staffId) => {
        const data = {
            to_do: "Assigning",
            role_id: roleId,
            staff_id: staffId,
        };
        setstate({ ...state, assigningRole: true, assignmentRole: roleId, assigningRoleFailed: false });
        const response = await useFetch('/super/assing_remove_role', JSON.stringify(data), "POST", false);

        if (response.ok) {
            let result = await response.json();
            var initState = JSON.parse(JSON.stringify(context.staffs));
            var staffIndex = initState.findIndex(staff => staff.id == result.id);
            if (staffIndex != -1) {
                initState.splice(staffIndex, 1, result);
            }
            context.setstaffs(initState);
            setstate({ ...state, assigningRole: false, assignmentRole: "" });
        } else {
            setstate({ ...state, assigningRole: false, assignmentRole: "", assigningRoleFailed: false });

        }
    };

    const removeRole = async (roleId, staffId) => {
        const data = {
            to_do: "Removing",
            role_id: roleId,
            staff_id: staffId,
        };
        setstate({ ...state, removingRole: true, assignmentRole: roleId, removingRoleFailed: false });
        const response = await useFetch('/super/assing_remove_role', JSON.stringify(data), "POST", false);

        if (response.ok) {
            let result = await response.json();
            var initState = JSON.parse(JSON.stringify(context.staffs));
            var staffIndex = initState.findIndex(staff => staff.id == result.id);
            if (staffIndex != -1) {
                initState.splice(staffIndex, 1, result);
            }
            context.setstaffs(initState);
            setstate({ ...state, removingRole: false, assignmentRole: "" });
        } else {
            setstate({ ...state, removingRole: false, assignmentRole: "", removingRoleFailed: false });

        }
    };

    const deleteStaff = async (staffId) => {
        const data = {
            staffId: staffId,
        };
        setstate({ ...state, deletingStaff: true, assignmentStaff: staffId, deletingStaffFailed: false });
        const response = await useFetch('/super/delete_staff', JSON.stringify(data), "POST", false);

        if (response.ok) {
            let result = await response.json();
            var initState = JSON.parse(JSON.stringify(staffs));
            const newState = initState.filter(staff => staff.id != staffId);
            setstate({ ...state, deletingStaff: false, closeTooltip: true });

            context.setstaffs(newState);
        } else {
            setstate({ ...state, deletingStaff: false, deletingStaffFailed: false });

        }
    };

    const stylez = {
        display: "grid",
        gap: "3rem",
        color: "black",
        textAlign: "center",
    };
    return (
        <>
            <WebView
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
                                            cardLink={ `/super/staff/${staff.id}` }
                                            fSize={ "" }
                                            lHeight={ 1 }
                                            margin={ "0 10px" }
                                            bShadow={ "0px 0px 3px #296DBB" }
                                        >
                                            <Link to={ `/super/staff/${staff.id}` }>
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
                                            </Link>
                                            <HorizontalMenu
                                                align={ "center" }
                                                justify={ "center" }
                                                gap={ "5px" }
                                            >
                                                <TooltipBtn
                                                    toolTip={ true }
                                                    closeable={ true }
                                                    fontSize={ "small" }
                                                    context={ context }
                                                    btnText={ "Remove role" }
                                                    tooltipBgc={ "white" }
                                                    hoverBgColor={ " " }
                                                    hoverColor={ " " }
                                                    fontWeight={ 200 }
                                                    borderRadius={ "5px" }
                                                    textColor={ "rgb(160 40 37)" }
                                                    backgroundColor={ "white" }
                                                >
                                                    <TooltipContents
                                                        color={ "#343a40" }
                                                        padding={ "0.5rem" }
                                                        justifyItems={ "start" }
                                                        maxWidth={ "320px" }
                                                    // width={ "200px" }
                                                    >
                                                        <ListItems
                                                            gap={ "5px" }
                                                            padding={ "3px 0" }
                                                            margin={ "0" }
                                                        >
                                                            { context.roles.length ?
                                                                context.roles.map((role, index) => {
                                                                    const roleAssigned = Boolean(staff.roles.find(r => r.id == role.id));
                                                                    return (
                                                                        <List
                                                                            key={ index }
                                                                            padding={ "2px" }
                                                                            nthChild={ "odd" }
                                                                            nthChildBgc={ "#e2e2e2" }
                                                                            gtc={ "3fr auto" }
                                                                        >
                                                                            <ScrollerX>
                                                                                <span>{ role.role_name }</span>
                                                                            </ScrollerX>
                                                                            {roleAssigned ?
                                                                                <div style={ { justifySelf: "end" } }>
                                                                                    <ActionBtn
                                                                                        btnClick={ () => removeRole(role.id, staff.id) }
                                                                                        btnText={ "Remove" }
                                                                                        processing={ state.removingRole && role.id == state.assignmentRole }
                                                                                        progressText={ "Removing" }
                                                                                        disabled={ state.removingRole && role.id == state.assignmentRole }
                                                                                        fontSize={ "small" }
                                                                                        fWeight={ 200 }
                                                                                        color={ "rgb(160 40 37)" }
                                                                                        bgc={ "white" }
                                                                                    />
                                                                                </div>
                                                                                : "" }
                                                                        </List>
                                                                    );
                                                                })
                                                                : "No role created!" }
                                                        </ListItems>
                                                    </TooltipContents>

                                                </TooltipBtn>

                                                <TooltipBtn
                                                    toolTip={ true }
                                                    closeable={ true }
                                                    fontSize={ "small" }
                                                    context={ context }
                                                    btnText={ "Assign role" }
                                                    tooltipBgc={ "white" }
                                                    hoverBgColor={ " " }
                                                    hoverColor={ " " }
                                                    fontWeight={ 200 }
                                                    borderRadius={ "5px" }
                                                    textColor={ "rgb(0 173 90)" }
                                                    backgroundColor={ "white" }
                                                >
                                                    <TooltipContents
                                                        color={ "#343a40" }
                                                        padding={ "0.5rem" }
                                                        justifyItems={ "start" }
                                                        maxWidth={ "320px" }
                                                        width={ "" }
                                                    >
                                                        <ListItems
                                                            gap={ "5px" }
                                                            padding={ "3px 0" }
                                                            margin={ "0" }
                                                        >
                                                            { context.roles.length ?
                                                                context.roles.map((role, index) => {
                                                                    const roleAssigned = Boolean(staff.roles.find(r => r.id == role.id));
                                                                    return (
                                                                        <List
                                                                            key={ index }
                                                                            padding={ "2px" }
                                                                            nthChild={ "odd" }
                                                                            nthChildBgc={ "#e2e2e2" }
                                                                            gtc={ "3fr auto" }
                                                                        >
                                                                            <ScrollerX>
                                                                                <span>{ role.role_name }</span>
                                                                            </ScrollerX>
                                                                            {!roleAssigned ?
                                                                                <div style={ { justifySelf: "end" } }>
                                                                                    <ActionBtn
                                                                                        btnClick={ () => assignRole(role.id, staff.id) }
                                                                                        btnText={ "Assign" }
                                                                                        processing={ state.assigningRole && role.id == state.assignmentRole }
                                                                                        progressText={ "Assigning" }
                                                                                        disabled={ state.assigningRole && role.id == state.assignmentRole }
                                                                                        fontSize={ "small" }
                                                                                        fWeight={ 200 }
                                                                                        color={ "rgb(0 173 90)" }
                                                                                        bgc={ "white" }
                                                                                    />
                                                                                </div>
                                                                                : "" }
                                                                        </List>
                                                                    );
                                                                })
                                                                : "No role created!" }
                                                        </ListItems>
                                                    </TooltipContents>
                                                </TooltipBtn>
                                                <TooltipBtn
                                                    toolTip={ true }
                                                    closeable={ true }
                                                    fontSize={ "small" }
                                                    context={ context }
                                                    btnText={ "Delete" }
                                                    tooltipBgc={ "white" }
                                                    hoverBgColor={ " " }
                                                    hoverColor={ " " }
                                                    fontWeight={ 200 }
                                                    borderRadius={ "5px" }
                                                    textColor={ "rgb(255 95 69)" }
                                                    backgroundColor={ "white" }
                                                >
                                                    <>
                                                        <div>This action cannot be reversed. Delete anyway?</div>
                                                        <ActionBtn
                                                            btnClick={ () => deleteStaff(staff.id) }
                                                            btnText={ "Delete role" }
                                                            processing={ state.deletingStaff && staff.id == state.assignmentStaff }
                                                            progressText={ "Deleting" }
                                                            disabled={ state.deletingStaff && staff.id == state.assignmentStaff }
                                                            fontSize={ "small" }
                                                            fWeight={ 200 }
                                                            color={ "rgb(255 95 69)" }
                                                            bgc={ "white" }
                                                        />
                                                    </>
                                                </TooltipBtn>

                                            </HorizontalMenu>
                                        </HorizontalUserCard>
                                    );
                                })
                                : "" }
                        </Response>
                    </ColumnCard>
                </Column>
                <FixedBottomRight
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
                </FixedBottomRight>
                { addNewStaff ?
                    <Dialog
                        // dialogMounted={ dialogMounted }
                        handleClose={ handleNewStaffDialog }
                    >
                        <DialogContent
                            bgc={ "white" }
                            width={ dialogWidth }
                            closeDialog={ handleNewStaffDialog }
                        >
                            <div className="content-inner" style={ stylez }>
                                <h4 >Add new staff</h4>
                                <Form
                                    gap={ "10px" }
                                    processing={ state.addStaffAttempting }
                                    progressText={ "Please wait" }
                                    btnSubmitText={ "Create staff" }
                                    handleSubmit={ submitNewStaff }
                                    disabled={ state.addStaffAttempting }
                                    submitBtnBgc={ "rgb(41, 109, 173)" }
                                    submitBtnColor={ "whitesmoke" }
                                >
                                    <Column
                                        color={ "#5a6269" }
                                        bgc={ "rgb(245 245 245)" }
                                        fontSize={ columnHeadFontSize }
                                        iconClass={ "" }
                                        header={ "Basic data" }
                                    >
                                        <ColumnCard
                                            // color={ "#296dad" }
                                            bgc={ "rgb(245 245 245)" }
                                            fontSize={ "" }
                                            viewable={ false }
                                            margin={ "7px auto" }
                                            bgc={ "white" }
                                        >
                                            <FormSelInput
                                                type={ "text" }
                                                thisValue={ form.department_id }
                                                handleChange={ handleChange }
                                                label={ "Which department?" }
                                                disabled={ false }
                                                nameUniq={ "department_id" }
                                                height={ "1.9rem" }
                                                selectText={ "-- select department --" }
                                            >
                                                { departments.length ?
                                                    departments.map((department, index) => {
                                                        return <option key={ department.id } value={ department.id }>{ department.d_name }</option>;
                                                    })
                                                    : "" }
                                            </FormSelInput>
                                            <FormInput
                                                type={ "text" }
                                                inputTextColor={ "#2196F3" }
                                                thisValue={ form.first_name }
                                                handleChange={ handleChange }
                                                handleKeypress={ () => { } }
                                                handleKeyUp={ () => { } }
                                                label={ "First name" }
                                                disabled={ false }
                                                nameUniq={ "first_name" }
                                                placeholder={ "Alabura..." }
                                                error={ errorField.first_name }
                                                compulsory={ true }
                                                height={ "1.9rem" }
                                            />
                                            <FormInput
                                                type={ "text" }
                                                inputTextColor={ "#2196F3" }
                                                thisValue={ form.last_name }
                                                handleChange={ handleChange }
                                                handleKeypress={ () => { } }
                                                handleKeyUp={ () => { } }
                                                label={ "Last name" }
                                                disabled={ false }
                                                nameUniq={ "last_name" }
                                                placeholder={ "Enyoojo..." }
                                                error={ errorField.last_name }
                                                compulsory={ true }
                                                height={ "1.9rem" }
                                            />
                                            <FormInput
                                                type={ "text" }
                                                inputTextColor={ "#2196F3" }
                                                thisValue={ form.other_name }
                                                handleChange={ handleChange }
                                                handleKeypress={ () => { } }
                                                handleKeyUp={ () => { } }
                                                label={ "Other name" }
                                                disabled={ false }
                                                nameUniq={ "other_name" }
                                                placeholder={ "Judith..." }
                                                error={ errorField.other_name }
                                                compulsory={ false }
                                                height={ "1.9rem" }
                                            />
                                            <FormSelInput
                                                type={ "year" }
                                                thisValue={ form.gender }
                                                handleChange={ handleChange }
                                                label={ "Gender" }
                                                disabled={ false }
                                                nameUniq={ "gender" }
                                                error={ errorField.gender }
                                                height={ "1.9rem" }
                                            >
                                                <option value={ "male" }>Male</option>
                                                <option value={ "female" }>Female</option>
                                            </FormSelInput>
                                            <FormInput
                                                type={ "text" }
                                                inputTextColor={ "#2196F3" }
                                                thisValue={ form.phone_num }
                                                handleChange={ handleChange }
                                                handleKeypress={ () => { } }
                                                handleKeyUp={ () => { } }
                                                label={ "Phone number" }
                                                disabled={ false }
                                                nameUniq={ "phone_num" }
                                                placeholder={ "09066331761" }
                                                error={ errorField.phone_num }
                                                compulsory={ true }
                                                height={ "1.9rem" }
                                            />
                                            <FormInput
                                                type={ "text" }
                                                inputTextColor={ "#2196F3" }
                                                thisValue={ form.e_mail }
                                                handleChange={ handleChange }
                                                handleKeypress={ () => { } }
                                                handleKeyUp={ () => { } }
                                                label={ "E-mail address" }
                                                disabled={ false }
                                                nameUniq={ "e_mail" }
                                                placeholder={ "example@gmail.com...." }
                                                error={ errorField.e_mail }
                                                compulsory={ true }
                                                height={ "1.9rem" }
                                            />
                                        </ColumnCard>
                                    </Column>
                                    <Column
                                        color={ "#5a6269" }
                                        bgc={ "rgb(245 245 245)" }
                                        fontSize={ columnHeadFontSize }
                                        iconClass={ "" }
                                        header={ "Addresses" }
                                    >
                                        <ColumnCard
                                            // color={ "#296dad" }
                                            bgc={ "rgb(245 245 245)" }
                                            fontSize={ "" }
                                            viewable={ false }
                                            margin={ "7px auto" }
                                            bgc={ "white" }
                                        >
                                            <FormInput
                                                type={ "textarea" }
                                                inputTextColor={ "#2196F3" }
                                                thisValue={ form.address1 }
                                                handleChange={ handleChange }
                                                handleKeypress={ () => { } }
                                                handleKeyUp={ () => { } }
                                                label={ "Address 1" }
                                                disabled={ false }
                                                nameUniq={ "address1" }
                                                placeholder={ "e.g Behind gombe united camp, near office of Surveyor general, bubashongo..." }
                                                error={ errorField.address1 }
                                                compulsory={ true }
                                                textarea={ true }
                                                inputHeight={ "4rem" }
                                            />
                                            <FormInput
                                                type={ "textarea" }
                                                inputTextColor={ "#2196F3" }
                                                thisValue={ form.address2 }
                                                handleChange={ handleChange }
                                                handleKeypress={ () => { } }
                                                handleKeyUp={ () => { } }
                                                label={ "Address 2" }
                                                disabled={ false }
                                                nameUniq={ "address2" }
                                                placeholder={ "e.g No 66, block 28 Alabura street, GRA Gombe..." }
                                                error={ errorField.address2 }
                                                compulsory={ true }
                                                textarea={ true }
                                                inputHeight={ "4rem" }
                                            />
                                        </ColumnCard>
                                    </Column>
                                    <Column
                                        color={ "#5a6269" }
                                        bgc={ "rgb(245 245 245)" }
                                        fontSize={ columnHeadFontSize }
                                        iconClass={ "" }
                                        header={ "Biography" }
                                    >
                                        <ColumnCard
                                            // color={ "#296dad" }
                                            bgc={ "rgb(245 245 245)" }
                                            fontSize={ "" }
                                            viewable={ false }
                                            margin={ "7px auto" }
                                            bgc={ "white" }
                                        >
                                            <FormInput
                                                type={ "textarea" }
                                                inputTextColor={ "#2196F3" }
                                                thisValue={ form.biography }
                                                handleChange={ handleChange }
                                                handleKeypress={ () => { } }
                                                handleKeyUp={ () => { } }
                                                label={ "Biography" }
                                                disabled={ false }
                                                nameUniq={ "biography" }
                                                placeholder={ "Everything about the staff..." }
                                                error={ errorField.biography }
                                                compulsory={ true }
                                                textarea={ true }
                                                inputHeight={ "5rem" }
                                            />
                                        </ColumnCard>
                                    </Column>
                                    <Column
                                        color={ "#5a6269" }
                                        bgc={ "rgb(245 245 245)" }
                                        fontSize={ columnHeadFontSize }
                                        iconClass={ "" }
                                        header={ "Social links" }
                                    >
                                        <ColumnCard
                                            // color={ "#296dad" }
                                            bgc={ "rgb(245 245 245)" }
                                            fontSize={ "" }
                                            viewable={ false }
                                            margin={ "7px auto" }
                                            bgc={ "white" }
                                        >
                                            <FormInput
                                                type={ "text" }
                                                inputTextColor={ "#2196F3" }
                                                thisValue={ form.facebook }
                                                handleChange={ handleChange }
                                                handleKeypress={ () => { } }
                                                handleKeyUp={ () => { } }
                                                label={ "Facebook" }
                                                disabled={ false }
                                                nameUniq={ "facebook" }
                                                placeholder={ "Facebook page link..." }
                                            />
                                            <FormInput
                                                type={ "text" }
                                                inputTextColor={ "#2196F3" }
                                                thisValue={ form.instagram }
                                                handleChange={ handleChange }
                                                handleKeypress={ () => { } }
                                                handleKeyUp={ () => { } }
                                                label={ "Instagram" }
                                                disabled={ false }
                                                nameUniq={ "instagram" }
                                                placeholder={ "Instgram page link..." }
                                            />
                                            <FormInput
                                                type={ "text" }
                                                inputTextColor={ "#2196F3" }
                                                thisValue={ form.twitter }
                                                handleChange={ handleChange }
                                                handleKeypress={ () => { } }
                                                handleKeyUp={ () => { } }
                                                label={ "Twitter" }
                                                disabled={ false }
                                                nameUniq={ "twitter" }
                                                placeholder={ "Twitter page link..." }
                                            />
                                            <FormInput
                                                type={ "text" }
                                                inputTextColor={ "#2196F3" }
                                                thisValue={ form.linkedIn }
                                                handleChange={ handleChange }
                                                handleKeypress={ () => { } }
                                                handleKeyUp={ () => { } }
                                                label={ "LinkedIn" }
                                                disabled={ false }
                                                nameUniq={ "linkedIn" }
                                                placeholder={ "LinkedIn page link..." }
                                            />
                                            <FormInput
                                                type={ "text" }
                                                inputTextColor={ "#2196F3" }
                                                thisValue={ form.website }
                                                handleChange={ handleChange }
                                                handleKeypress={ () => { } }
                                                handleKeyUp={ () => { } }
                                                label={ "Website" }
                                                disabled={ false }
                                                nameUniq={ "website" }
                                                placeholder={ "Your web address or URL..." }
                                            />
                                        </ColumnCard>
                                    </Column>
                                    <Column
                                        color={ "#5a6269" }
                                        bgc={ "rgb(245 245 245)" }
                                        fontSize={ columnHeadFontSize }
                                        iconClass={ "" }
                                        header={ "Work" }
                                    >
                                        <ColumnCard
                                            // color={ "#296dad" }
                                            bgc={ "rgb(245 245 245)" }
                                            fontSize={ "" }
                                            viewable={ false }
                                            margin={ "7px auto" }
                                            bgc={ "white" }
                                        >
                                            <FormInput
                                                type={ "textarea" }
                                                inputTextColor={ "#2196F3" }
                                                thisValue={ form.work }
                                                handleChange={ handleChange }
                                                handleKeypress={ () => { } }
                                                handleKeyUp={ () => { } }
                                                label={ "Work experience" }
                                                disabled={ false }
                                                nameUniq={ "work" }
                                                placeholder={ "Everything about your working experience..." }
                                                error={ errorField.work }
                                                compulsory={ true }
                                                textarea={ true }
                                                inputHeight={ "4rem" }
                                            />
                                        </ColumnCard>
                                    </Column>
                                    <Column
                                        color={ "#5a6269" }
                                        bgc={ "rgb(245 245 245)" }
                                        fontSize={ columnHeadFontSize }
                                        iconClass={ "" }
                                        header={ "Education" }
                                    >
                                        <ColumnCard
                                            // color={ "#296dad" }
                                            bgc={ "rgb(245 245 245)" }
                                            fontSize={ "" }
                                            viewable={ false }
                                            margin={ "7px auto" }
                                            bgc={ "white" }
                                        >
                                            <FormInput
                                                type={ "text" }
                                                inputTextColor={ "#2196F3" }
                                                thisValue={ form.institution }
                                                handleChange={ handleChange }
                                                handleKeypress={ () => { } }
                                                handleKeyUp={ () => { } }
                                                label={ "Name of institution" }
                                                disabled={ false }
                                                nameUniq={ "institution" }
                                                placeholder={ "Gombe state university..." }
                                                error={ errorField.institution }
                                                compulsory={ true }
                                                height={ "1.9rem" }
                                            />
                                            <FormInput
                                                type={ "text" }
                                                inputTextColor={ "#2196F3" }
                                                thisValue={ form.cert_awarded }
                                                handleChange={ handleChange }
                                                handleKeypress={ () => { } }
                                                handleKeyUp={ () => { } }
                                                label={ "Certificate awarded" }
                                                disabled={ false }
                                                nameUniq={ "cert_awarded" }
                                                placeholder={ "e.g Bachelor of Engineering..." }
                                                error={ errorField.cert_awarded }
                                                compulsory={ true }
                                                height={ "1.9rem" }
                                            />
                                            <FormSelInput
                                                type={ "year" }
                                                thisValue={ form.yr_of_grad }
                                                handleChange={ handleChange }
                                                label={ "Year of graduation" }
                                                disabled={ false }
                                                nameUniq={ "yr_of_grad" }
                                                error={ errorField.yr_of_grad }
                                                height={ "1.9rem" }
                                            >
                                                { year().map((year, key) => {
                                                    return <option key={ key } value={ year }>{ year }</option>;
                                                }) }
                                            </FormSelInput>
                                        </ColumnCard>
                                    </Column>
                                    { state.message != "" && !state.addStaffFailed ?
                                        <div style={ { color: "green", fontSize: "small" } }>
                                            <h4>{ state.message }</h4>
                                        </div>
                                        : ""
                                    }
                                    { state.message != "" && state.addStaffFailed ?
                                        <div style={ { color: "red", fontSize: "small" } }>
                                            <h4>{ state.message }</h4>
                                        </div>
                                        : ""
                                    }
                                </Form>
                            </div>
                        </DialogContent>
                    </Dialog>
                    : "" }
            </WebView>
            {state.assigningRole ? <LoadingDialog bgc={ "transparent" } /> : "" }
        </>
    );
};

export default AdminStaffs;
