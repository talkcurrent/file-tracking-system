import React, { useContext, useEffect, useState } from 'react';
import useViewPort from '../customHooks/useViewPort';
import Column from '../dashboard/Column';
import ColumnCard from '../dashboard/ColumnCard';
import ListItem from '../includes/ListItem';
import StaffWebView from '../includes/StaffWebView';
import { AllContext } from '../index/AllContext';
import ActionBtn from '../reuseable/ActionBtn';
import Dialog from '../reuseable/Dialog';
import DialogContent from '../reuseable/DialogContent';
import FixedBottomRight from '../reuseable/FixedBottomRight';
import isValidEmail from '../reuseable/isValidEmail';
import Form from '../reuseable/Form';
import FormInput from '../reuseable/FormInput';
import FormSelInput from '../reuseable/FormSelInput';
import Loading from '../reuseable/Loading';
import SQLDateToJSDate from '../reuseable/SQLDateToJSDate';
import VerticalUserCard from '../reuseable/VerticalUserCard';
import FieldHasError from '../customHooks/FieldHasError';
import useFetch from '../customHooks/useFetch';

const StaffProfile = () => {
    const context = useContext(AllContext);
    const { authUser } = context;

    const [editInfo, seteditInfo] = useState(false);
    const dialogWidth = useViewPort(["100%", "80%;", "60%", "40%", "40%"]);

    const [state, setstate] = useState({
        updatingStaff: false, updatingStaffFailed: "", message: "",
    });

    const [form, setform] = useState({
        e_mail: "", first_name: "", last_name: "",
        gender: "male", other_name: "", phone_num: "",
        biography: "", work: "",
    });

    const [errorField, seterrorField] = useState({
        e_mail: false, first_name: false, last_name: false,
        other_name: false, phone_num: false,
        biography: false, gender: false,
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

    const year = () => {
        const yearArr = [];
        let minYear = 1990;
        const maxYear = 2030;

        while (minYear <= maxYear) {
            yearArr.push(minYear++);
        }
        return yearArr;
    };

    const handleStaffEditDialog = () => {
        seteditInfo(!editInfo);
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

    const dialogMounted = () => {
        setform({
            ...form,
            e_mail: authUser.email, first_name: authUser.first_name, last_name: authUser.last_name,
            gender: authUser.gender, other_name: authUser.other_name, phone_num: authUser.phone_no,
            biography: authUser.profile.biography, work: authUser.profile.work,
        });
    };

    const submitStaffUpdate = async () => {
        var copyErrorField = errorField;

        for (const key in form) {
            if (key == "e_mail" && !isValidEmail(form[key])) {
                copyErrorField.e_mail = true;
            } else if (
                key == "other_name"
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
                guard: context.isAdmin ? "admin" : "staff",
                e_mail: form.e_mail,
                first_name: form.first_name,
                last_name: form.last_name,
                other_name: form.other_name,
                gender: form.gender,
                phone_num: form.phone_num,
                biography: form.biography,
                work: form.work,
            };

            setstate({ ...state, updatingStaff: true, updatingStaffFailed: "", message: "" });
            const response = await useFetch('/edit_staff', JSON.stringify(data), "POST", false);

            if (response.ok) {
                let result = await response.json();
                context.handleAuthUser(state.isAdmin ? "admin" : "staff");
                setstate({
                    ...state,
                    updatingStaff: false, updatingStaffFailed: false,
                    message: "Staff Succesfully Added"
                });
            } else {
                setstate({
                    ...state, updatingStaff: false, updatingStaffFailed: true,
                    message: "Something not right. Please try again later"
                });

            }
        }
    };

    const stylez = {
        display: "grid",
        gap: "1rem",
        color: "black",
        textAlign: "center",
    };

    return (
        <StaffWebView
            view={ "profile" }
            context={ context }
        >
            {authUser.hasOwnProperty("id") ?
                <VerticalUserCard
                    bShadow={ "" }
                    cardBgc={ "white" }
                    cardElemBgc={ "white" }
                    cardElemGap={ "1rem" }
                    gtr={ "" }
                    cardImgUrl={ `/storage/image/${authUser.profile.dp}` }
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
                            <h3 style={ { color: "#296dad" } }>{ authUser.first_name }{ ' ' }{ authUser.last_name }{ ' ' }{ authUser.other_name }</h3>
                            <div><strong>E-mail:{ " " }</strong>{ authUser.email }</div>
                            <div><strong>Phone number:{ " " }</strong>{ authUser.phone_no }</div>
                            <div><strong>Department:</strong>{ " " }{ authUser.department.d_name }</div>
                            <div>{ `Staff since: ${SQLDateToJSDate(authUser.created_at, true)} ` }</div>
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
                            { authUser.addresses.length ?
                                authUser.addresses.map((address, index) => {
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
                            { authUser.educations.length ?
                                authUser.educations.map((education, index) => {
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
                            <span>{ authUser.profile.biography }</span>
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
                            <span>{ authUser.profile.work }</span>
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
                            { authUser.links.length ?
                                authUser.links.map((link, index) => {
                                    return (
                                        <React.Fragment key={ index }>
                                            {
                                                link.description == "facebook" && link.url ?
                                                    <div><a href={ `http://${link.url}` }><i className="fab fa-facebook"></i><span>{ "  " }Facebook</span></a></div>
                                                    : link.description == "instagram" && link.url ?
                                                        <div><a href={ `http://${link.url}` }><i className="fab fa-instagram"></i><span>{ "  " }Instagram</span></a></div>
                                                        : link.description == "twitter" && link.url ?
                                                            <div><a href={ `http://${link.url}` }><i className="fab fa-twitter"></i><span>{ "  " }Twitter</span></a></div>
                                                            : link.description == "linkedIn" && link.url ?
                                                                <div><a href={ `http://${link.url}` }><i className="fab fa-linkedin-in"></i><span>{ "  " }LinkedIn</span></a></div>
                                                                : link.description == "website" && link.url ?
                                                                    <div><a href={ `http://${link.url}` }><i className="fas fa-globe-africa"></i><span>{ "  " }{ link.url }</span></a></div>
                                                                    : ""
                                            }
                                        </React.Fragment>
                                    );
                                })
                                : "" }
                        </ColumnCard>
                    </Column>
                </VerticalUserCard>
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
            <FixedBottomRight
                bottom={ "10px" }
                right={ "10px" }
                bRadius={ "5px" }
            >
                <ActionBtn
                    btnText={ "Edit profile" }
                    bgc={ "#296dad" }
                    color={ "whitesmoke" }
                    btnClick={ () => handleStaffEditDialog() }
                />
            </FixedBottomRight>

            { editInfo ?
                <Dialog
                    dialogMounted={ dialogMounted }
                    handleClose={ handleStaffEditDialog }
                >
                    <DialogContent
                        bgc={ "white" }
                        width={ dialogWidth }
                        closeDialog={ handleStaffEditDialog }
                    >
                        <div className="content-inner" style={ stylez }>
                            <h4 >Edit personal information</h4>
                            <Form
                                gap={ "10px" }
                                processing={ state.updatingStaff }
                                progressText={ "Updating" }
                                btnSubmitText={ "Update record" }
                                handleSubmit={ submitStaffUpdate }
                                disabled={ state.updatingStaff }
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
                                            value={ form.gender }
                                            handleChange={ handleChange }
                                            label={ "Gender" }
                                            disabled={ false }
                                            nameUniq={ "gender" }
                                            error={ errorField.gender }
                                            height={ "1.9rem" }
                                        >
                                            <option value={ "male" }>Male</option>;
                                            <option value={ "female" }>Female</option>;
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

                                { state.message != "" && !state.updatingStaffFailed ?
                                    <div style={ { color: "green", fontSize: "small" } }>
                                        <h6>{ state.message }</h6>
                                    </div>
                                    : ""
                                }
                                { state.message != "" && state.updatingStaffFailed ?
                                    <div style={ { color: "red", fontSize: "small" } }>
                                        <h6>{ state.message }</h6>
                                    </div>
                                    : ""
                                }
                            </Form>
                        </div>
                    </DialogContent>
                </Dialog>
                : "" }
        </StaffWebView>
    );
};

export default StaffProfile;
