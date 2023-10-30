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
import ResetForm from '../reuseable/ResetForm';
import Response from '../reuseable/Response';
import SQLDateToJSDate from '../reuseable/SQLDateToJSDate';
import TooltipBtn from '../reuseable/TooltipBtn';
import TooltipContents from '../reuseable/TooltipContents';

const StaffFaculties = (props) => {
    const context = useContext(AllContext);
    const { getFaculties, faculties, gettingFaculties, facultiesReady, alterStateProps } = context;
    const columnHeadFontSize = useViewPort(["18px", "18px", "20px", "25px"]);
    const dialogWidth = useViewPort(["100%", "80%;", "60%", "40%", "40%"]);
    const [facultyDialog, setfacultyDialog] = useState(false);

    const [state, setstate] = useState({
        addFacultyAttempting: false, addFacultyFailed: "", message: "",
        deletingFaculty: false, assignmentFaculty: "", deletingFacultyFailed: "",
        editingFaculty: false, editingFacultyFailed: ""
    });

    const [form, setform] = useState({
        name: "", motto: ""
    });
    const [form2, setform2] = useState({
        name: "", motto: ""
    });

    const [errorField, seterrorField] = useState({
        name: false, motto: false,
    });

    const [editerrorField, setediterrorField] = useState({
        name: false, motto: false
    });

    useEffect(() => {
        if (!faculties.length) {
            getFaculties();
        } else { alterStateProps("facultiesReady", true); }

        const path_names = location.pathname.split('/');
        if (path_names.includes('super')) {
            context.handleAuthUser("admin");
        } else {
            context.handleAuthUser("staff");
        }
    }, []);

    useEffect(() => {
        if (state.closeTooltip) {
            setTimeout(() => {
                setstate({ ...state, closeTooltip: false });
            }, 500);
        }
    }, [state]);

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

    const handleNewFacultyDialog = () => {
        setfacultyDialog(!facultyDialog);
    };

    const stylez = {
        display: "grid",
        gap: "3rem",
        color: "black",
        textAlign: "center",
    };

    const submitNewFaculty = async () => {
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
            };

            setstate({
                ...state, addFacultyAttempting: true,
                addFacultyFailed: "", message: ""
            });
            const response = await useFetch('/super/new_faculty', JSON.stringify(data), "POST", false);

            if (response.ok) {
                let result = await response.json();
                getFaculties();
                const resetForm = ResetForm(form);
                setform({ ...resetForm });

                setstate({
                    ...state,
                    addFacultyAttempting: false, addFacultyFailed: false,
                    message: "Faculty Succesfully Created!"
                });
            } else {
                setstate({
                    ...state, addFacultyAttempting: false, addFacultyFailed: true,
                    message: "Something not right. Please try again later"
                });

            }
        }
    };

    const deleteFaculty = async (facultyId) => {
        const data = {
            facultyId: facultyId,
        };
        setstate({ ...state, deletingFaculty: true, assignmentFaculty: facultyId, deletingFacultyFailed: false });
        const response = await useFetch('/super/delete_faculty', JSON.stringify(data), "POST", false);

        if (response.ok) {
            let result = await response.json();
            var initState = JSON.parse(JSON.stringify(faculties));
            const newState = initState.filter(dept => dept.id != facultyId);
            setstate({ ...state, deletingFaculty: false, closeTooltip: true });

            context.setfaculties(newState);
        } else {
            setstate({ ...state, deletingFaculty: false, deletingFacultyFailed: false });

        }
    };

    const updateDept = async (facultyId) => {
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
                facultyId: facultyId,
                name: form2.name,
                motto: form2.motto,
            };

            setstate({
                ...state,
                editingFaculty: true, assignmentFaculty: facultyId,
                editingFacultyFailed: false,
                editMsg: "",
            });
            const response = await useFetch('/super/update_faculty', JSON.stringify(data), "POST", false);

            if (response.ok) {
                let result = await response.json();
                var initState = JSON.parse(JSON.stringify(faculties));
                var facIndex = initState.findIndex(fac => fac.id == result.id);
                if (facIndex != -1) {
                    initState.splice(facIndex, 1, result);
                }
                context.setfaculties(initState);
                setstate({ ...state, editingFaculty: false, editMsg: "Faculty updated!" });
            } else {
                setstate({
                    ...state, editingFaculty: false, editingFacultyFailed: false,
                    editMsg: "Something not right. Please try again later"
                });

            }
        }
    };

    const handleEditForm = (faculty) => {
        setform2({
            ...form2,
            name: faculty.f_name,
            motto: faculty.motto,
        });
        setstate({ ...state, editMsg: "" });
    };

    return (
        <StaffWebView
            view={ "faculties" }
            context={ context }
        >
            <Column
                color={ "#5a6269" }
                bgc={ "rgb(245 245 245)" }
                fontSize={ columnHeadFontSize }
                iconClass={ "" }
                header={ "Faculties" }
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
                        dataReady={ facultiesReady }
                        datas={ faculties }
                        background={ "transparent" }
                        gettingData={ gettingFaculties }
                        noRecordText={ "No record found!" }
                    >
                        { faculties.length ?
                            faculties.map((faculty, index) => {
                                return (
                                    <HorizontalUserCard
                                        key={ index }
                                        cardBgc={ "whitesmoke" }
                                        cardElemBgc={ "whitesmoke" }
                                        gtc={ "100px auto" }
                                        cardImgUrl={ "/storage/image/house.png" }
                                        cardLink={ `/faculty/${faculty.id}` }
                                        fSize={ "" }
                                        lHeight={ 1 }
                                        margin={ "0 10px" }
                                        bShadow={ "0px 0px 3px #296DBB" }
                                    >
                                        <Link to={ `/faculty/${faculty.id}` }>
                                            <h5 style={ { color: "#296dad" } }>{ faculty.f_name }</h5>
                                            <div>{ faculty.motto }</div>
                                            <div style={ { opacity: 0.7, fontFamily: "cursive" } }>Departments:{ " " }{ faculty.departments_count }</div>
                                            <div>{ `Faculty created since: ${SQLDateToJSDate(faculty.created_at, true)} ` }</div>
                                        </Link>
                                    </HorizontalUserCard>
                                );
                            })
                            : "" }
                    </Response>
                </ColumnCard>
            </Column>
        </StaffWebView>
    );
};

export default StaffFaculties;
