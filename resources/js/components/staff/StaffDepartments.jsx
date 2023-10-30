import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../customHooks/useFetch';
import useViewPort from '../customHooks/useViewPort';
import Column from '../dashboard/Column';
import ColumnCard from '../dashboard/ColumnCard';
import HorizontalMenu from '../includes/HorizontalMenu';
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
import Loading from '../reuseable/Loading';
import ResetForm from '../reuseable/ResetForm';
import Response from '../reuseable/Response';
import SQLDateToJSDate from '../reuseable/SQLDateToJSDate';
import TooltipBtn from '../reuseable/TooltipBtn';
import TooltipContents from '../reuseable/TooltipContents';

const StaffDepartments = () => {
    const context = useContext(AllContext);
    const [form, setform] = useState({
        name: "", motto: "", faculty_id: ""
    });

    const [form2, setform2] = useState({
        name: "", motto: "", faculty_id: ""
    });

    const [state, setstate] = useState({
        addDepartmentAttempting: false, addDepartmentFailed: "",
        message: "", editMsg: "",
        gettingStaff: false, gettingStaffFailed: "",
        deletingDept: false, assignmentDept: "", deletingDeptFailed: "",
        editingDept: false, editingDeptFailed: ""
    });
    const {
        getDepartments, getFaculties, faculties, departments,
        gettingDepartments, departmentsReady, alterStateProps
    } = context;

    const columnHeadFontSize = useViewPort(["18px", "18px", "20px", "25px"]);
    const dialogWidth = useViewPort(["100%", "80%;", "60%", "40%", "40%"]);

    const [departmentDialog, setdepartmentDialog] = useState(false);
    const [staffs, setstaffs] = useState([]);

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
        } else { alterStateProps("departmentsReady", true); }

        if (!faculties.length) {
            getFaculties();
        }
    }, []);

    useEffect(() => {
        if (state.closeTooltip) {
            setTimeout(() => {
                setstate({ ...state, closeTooltip: false });
            }, 500);
        }
    }, [state]);


    const [errorField, seterrorField] = useState({
        name: false, motto: false, faculty_id: false
    });
    const [editerrorField, setediterrorField] = useState({
        name: false, motto: false, faculty_id: false
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        const str = value.replace(/\s\s+/g, " ");

        setstate({ ...state, message: "" });
        setform({ ...form, [name]: str });
        seterrorField({ ...errorField, [name]: false });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        const str = value.replace(/\s\s+/g, " ");

        setstate({ ...state, message: "" });
        setform2({ ...form2, [name]: str });
        setediterrorField({ ...editerrorField, [name]: false });
    };

    const handleNewDepartmentDialog = () => {
        setdepartmentDialog(!departmentDialog);
    };


    const submitNewDepartment = async () => {
        var submitable = true;
        var copyErrorField = errorField;

        for (const key in form) {
            if (key == "e_mail" && !isValidEmail(form[key])) {
                copyErrorField.e_mail = true;
            } else {
                copyErrorField[key] = form[key].trim() == "";
            }
            if (form[key].trim() == "") {
                submitable = false;
            }
        }
        seterrorField({ ...copyErrorField });

        if (submitable) {
            //send data to backend
            const data = {
                name: form.name,
                motto: form.motto,
                faculty_id: form.faculty_id,
            };

            setstate({ ...state, addDepartmentAttempting: true, addDepartmentFailed: "", message: "" });
            const response = await useFetch('/super/new_department', JSON.stringify(data), "POST", false);

            if (response.ok) {
                let result = await response.json();
                getDepartments();
                const resetForm = ResetForm(form);
                setform({ ...resetForm });

                setstate({
                    ...state,
                    addDepartmentAttempting: false, addDepartmentFailed: false,
                    message: "Department Succesfully Created!"
                });
            } else {
                setstate({
                    ...state, addDepartmentAttempting: false, addDepartmentFailed: true,
                    message: "Something not right. Please try again later"
                });

            }
        }
    };

    const deleteDept = async (deptId) => {
        const data = {
            deptId: deptId,
        };
        setstate({ ...state, deletingDept: true, assignmentDept: deptId, deletingDeptFailed: false });
        const response = await useFetch('/super/delete_dept', JSON.stringify(data), "POST", false);

        if (response.ok) {
            let result = await response.json();
            var initState = JSON.parse(JSON.stringify(departments));
            const newState = initState.filter(dept => dept.id != deptId);
            setstate({ ...state, deletingDept: false, closeTooltip: true });

            context.setdepartments(newState);
        } else {
            setstate({ ...state, deletingDept: false, deletingDeptFailed: false });

        }
    };

    const updateDept = async (deptId) => {
        var submitable = true;
        var copyErrorField = editerrorField;
        for (const key in form2) {
            copyErrorField[key] = form2[key].toString().trim() == "";

            if (form2[key].toString().trim() == "") {
                submitable = false;
            }
        }
        setediterrorField({ ...copyErrorField });

        if (submitable) {

            const data = {
                deptId: deptId,
                name: form2.name,
                motto: form2.motto,
                faculty_id: form2.faculty_id,
            };

            setstate({
                ...state,
                editingDept: true, assignmentDept: deptId,
                editingDeptFailed: false,
                editMsg: "",
            });
            const response = await useFetch('/super/update_dept', JSON.stringify(data), "POST", false);

            if (response.ok) {
                let result = await response.json();
                var initState = JSON.parse(JSON.stringify(departments));
                var deptIndex = initState.findIndex(dept => dept.id == result.id);
                if (deptIndex != -1) {
                    initState.splice(deptIndex, 1, result);
                }
                context.setdepartments(initState);
                setstate({ ...state, editingDept: false, editMsg: "Department updated!" });
            } else {
                setstate({
                    ...state, editingDept: false, editingDeptFailed: false,
                    editMsg: "Something not right. Please try again later"
                });

            }
        }
    };

    const handleEditForm = (dept) => {
        setform2({
            ...form2,
            faculty_id: dept.faculty.id,
            name: dept.d_name,
            motto: dept.motto,
        });
        setstate({ ...state, editMsg: "" });
    };
    const stylez = {
        display: "grid",
        gap: "3rem",
        color: "black",
        textAlign: "center",
    };

    return (
        <StaffWebView
            view={ "departments" }
            context={ context }
        >
            <Column
                color={ "#5a6269" }
                bgc={ "rgb(245 245 245)" }
                fontSize={ columnHeadFontSize }
                iconClass={ "" }
                header={ "Departments" }
            >
                <ColumnCard
                    // color={ "#296dad" }
                    bgc={ "rgb(245 245 245)" }
                    fontSize={ "" }
                    viewable={ false }
                    margin={ "2px auto" }
                    bgc={ "white" }
                >
                    { departments.length ?
                        departments.map((department, index) => {
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
                                        <div style={ { opacity: 0.7 } }>Faculty:{ " " }{ department.faculty.f_name }</div>
                                        <div style={ { opacity: 0.7, fontFamily: "cursive" } }>Total staffs:{ " " }{ department.staffs_count }</div>
                                        <div>{ `Department created since: ${SQLDateToJSDate(department.created_at, true)} ` }</div>
                                    </Link>
                                </HorizontalUserCard>
                            );
                        })
                        : gettingDepartments ?
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
                            : "No record found!" }
                </ColumnCard>
            </Column>
            {/* {departmentDialog ?
                <Dialog
                    // dialogMounted={ dialogMounted }
                    handleClose={ handleNewDepartmentDialog }
                >
                    <DialogContent
                        bgc={ "white" }
                        width={ dialogWidth }
                        closeDialog={ handleNewDepartmentDialog }
                    >
                        <div className="content-inner" style={ stylez }>
                            <Form
                                gap={ "10px" }
                                processing={ state.addDepartmentAttempting }
                                progressText={ "Please wait" }
                                btnSubmitText={ "Create staff" }
                                handleSubmit={ submitNewDepartment }
                                disabled={ state.addDepartmentAttempting }
                                submitBtnBgc={ "rgb(41, 109, 173)" }
                                submitBtnColor={ "whitesmoke" }
                            >
                                <Column
                                    color={ "#5a6269" }
                                    bgc={ "rgb(245 245 245)" }
                                    fontSize={ columnHeadFontSize }
                                    iconClass={ "" }
                                    header={ "Add new staff" }
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
                                            type={ "year" }
                                            thisValue={ form.faculty_id }
                                            handleChange={ handleChange }
                                            label={ "Choose faculty" }
                                            disabled={ false }
                                            nameUniq={ "faculty_id" }
                                            error={ errorField.faculty_id }
                                            height={ "1.9rem" }
                                            selectText={ "-- select --" }
                                        >
                                            { faculties.length ?
                                                faculties.map((faculty, index) => {
                                                    return <option key={ faculty.id } value={ faculty.id }>{ faculty.f_name }</option>;
                                                })
                                                : "" }
                                        </FormSelInput>
                                        <FormInput
                                            type={ "text" }
                                            inputTextColor={ "#2196F3" }
                                            thisValue={ form.name }
                                            handleChange={ handleChange }
                                            handleKeypress={ () => { } }
                                            handleKeyUp={ () => { } }
                                            label={ "Department name" }
                                            disabled={ false }
                                            nameUniq={ "name" }
                                            placeholder={ "Computer science..." }
                                            error={ errorField.name }
                                            compulsory={ true }
                                            height={ "1.9rem" }
                                        />
                                        <FormInput
                                            type={ "text" }
                                            inputTextColor={ "#2196F3" }
                                            thisValue={ form.motto }
                                            handleChange={ handleChange }
                                            handleKeypress={ () => { } }
                                            handleKeyUp={ () => { } }
                                            label={ "Department motto" }
                                            disabled={ false }
                                            nameUniq={ "motto" }
                                            placeholder={ "Department slogan..." }
                                            error={ errorField.motto }
                                            compulsory={ true }
                                            height={ "1.9rem" }
                                        />
                                    </ColumnCard>
                                </Column>
                                { state.message != "" && !state.addDepartmentFailed ?
                                    <div style={ { color: "green", fontSize: "small" } }>
                                        <h4>{ state.message }</h4>
                                    </div>
                                    : ""
                                }
                                { state.message != "" && state.addDepartmentFailed ?
                                    <div style={ { color: "red", fontSize: "small" } }>
                                        <h4>{ state.message }</h4>
                                    </div>
                                    : ""
                                }
                            </Form>
                        </div>
                    </DialogContent>
                </Dialog>
                : "" } */}
            {/* <FixedBottomRight
                bottom={ "10px" }
                right={ "10px" }
                bRadius={ "5px" }
            >
                <ActionBtn
                    btnText={ "+ New Department" }
                    bgc={ "#296dad" }
                    color={ "whitesmoke" }
                    btnClick={ () => handleNewDepartmentDialog() }
                />
            </FixedBottomRight> */}

        </StaffWebView>
    );
};

export default StaffDepartments;
