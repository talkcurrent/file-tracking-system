import React, { useContext, useEffect, useRef, useState } from 'react';
import FieldHasError from '../customHooks/FieldHasError';
import useFetch from '../customHooks/useFetch';
import useViewPort from '../customHooks/useViewPort';
import Column from '../dashboard/Column';
import ColumnCard from '../dashboard/ColumnCard';
import HorizontalMenu from '../includes/HorizontalMenu';
import WebView from '../includes/WebView';
import { AllContext } from '../index/AllContext';
import ActionBtn from '../reuseable/ActionBtn';
import Form from '../reuseable/Form';
import FormInput from '../reuseable/FormInput';
import List from '../reuseable/List';
import ListItems from '../reuseable/ListItems';
import ResetForm from '../reuseable/ResetForm';
import ScrollerX from '../reuseable/ScrollerX';
import TooltipBtn from '../reuseable/TooltipBtn';
import TooltipContents from '../reuseable/TooltipContents';

const AdminSettings = (props) => {
    const context = useContext(AllContext);
    // const { deletedFiles, gettingDeletedFiles } = context;

    const [expanded, setexpanded] = useState(false);
    const [roleListHeight, setroleListHeight] = useState(0);

    const [state, setstate] = useState({
        addingRole: false, addingRoleFailed: "", message: "",
        deletingRole: false, deletingRoleFailed: "",
    });
    const [editState, seteditState] = useState({
        addingRole: false, addingRoleFailed: "", message: "",
    });

    const [form, setform] = useState({
        role_name: "", role_desc: "",
    });
    const [errorField, seterrorField] = useState({
        role_name: false, role_desc: false
    });

    const [editRoleForm, seteditRoleForm] = useState({
        role_name: "", role_desc: "",
    });
    const [editErrorField, seteditErrorField] = useState({
        role_name: false, role_desc: false
    });

    const roleListCont = useRef(null);
    var roleContTimer = useRef(null);
    var initHeight = useRef(null);

    const columnHeadFontSize = useViewPort(["18px", "18px", "20px", "25px"]);

    useEffect(() => {
        const path_names = location.pathname.split('/');
        if (path_names.includes('super')) {
            context.handleAuthUser("admin");
        } else {
            context.handleAuthUser("staff");
        }
        context.getDeletedFiles();
        return () => { };
    }, []);

    const editTooltipMountd = (roleId) => {
        const { roles } = context;
        const role = roles.find(role => role.id == roleId);
        seteditRoleForm({ ...editRoleForm, role_name: role.role_name, role_desc: role.role_desc });
        seteditState({ ...editState, addingRole: false, addingRoleFailed: "", message: "" });
    };

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

        seteditState({ ...editState, message: "" });
        seteditRoleForm({ ...editRoleForm, [name]: str });
        seteditErrorField({ ...editErrorField, [name]: false });
    };

    const submitNewRole = async () => {
        var copyErrorField = errorField;

        for (const key in form) {
            copyErrorField[key] = form[key].trim() == "";
        }
        seterrorField({ ...copyErrorField });

        if (!FieldHasError(copyErrorField)) {
            const data = {
                role_name: form.role_name,
                role_desc: form.role_desc,
            };
            setstate({ ...state, addingRole: true, addingRoleFailed: "", message: "" });
            const response = await useFetch('/super/new_role', JSON.stringify(data), "POST", false);

            if (response.ok) {
                let result = await response.json();
                context.getRoles();
                const resetForm = ResetForm(form);
                setform({ ...resetForm });

                setstate({
                    ...state,
                    addingRole: false, addingRoleFailed: false,
                    message: "Role succesfully created"
                });
            } else {
                setstate({
                    ...state, addingRole: false, addingRoleFailed: true,
                    message: "Something not right. Please try again later"
                });

            }
        }
    };

    const submitEditedRole = async (roleId) => {
        var copyErrorField = editErrorField;

        for (const key in editRoleForm) {
            copyErrorField[key] = editRoleForm[key].trim() == "";
        }
        seteditErrorField({ ...copyErrorField });

        if (!FieldHasError(copyErrorField)) {
            const data = {
                role_id: roleId,
                role_name: editRoleForm.role_name,
                role_desc: editRoleForm.role_desc,
            };
            seteditState({ ...editState, addingRole: true, addingRoleFailed: "", message: "" });
            const response = await useFetch('/super/edit_role', JSON.stringify(data), "POST", false);

            if (response.ok) {
                let result = await response.json();

                seteditState({
                    ...editState,
                    addingRole: false, addingRoleFailed: false,
                    message: "Role succesfully updated"
                });
                context.getRoles();
            } else {
                seteditState({
                    ...editState, addingRole: false, addingRoleFailed: true,
                    message: "Something not right. Please try again later"
                });
            }
        }
    };

    const deleteRole = async (roleId) => {
        const data = {
            role_id: roleId,
        };
        setstate({ ...state, deletingRole: true, deletingRoleFailed: "" });
        const response = await useFetch('/super/delete_role', JSON.stringify(data), "POST", false);

        if (response.ok) {
            let result = await response.json();

            setstate({
                ...state,
                deletingRole: false, deletingRoleFailed: false,
            });
            context.getRoles();
        } else {
            setstate({
                ...state, deletingRole: false, deletingRoleFailed: true,
            });
        }
    };

    const handleExpand = async () => {
        if (expanded) {
            setexpanded(false);
            roleListCont.current.style.height = 0;
            initHeight.current = 0;
        } else {
            setexpanded(true);
            roleContTimer.current = setInterval(() => {
                if (initHeight.current >= 200) {
                    clearInterval(roleContTimer.current);
                } else {
                    var height = roleListCont.current.offsetHeight;
                    roleListCont.current.style.height += "10";
                    var newHeight = height + 10;
                    initHeight.current = newHeight;
                    roleListCont.current.style.height = newHeight + 'px';
                }
            }, 30);
        }


    };

    return (
        <WebView
            view={ "settings" }
            context={ context }

        >
            <Column
                color={ "#5a6269" }
                bgc={ "rgb(245 245 245)" }
                fontSize={ useViewPort(["18px", "18px", "20px", "25px"]) }
                iconClass={ "fas fa-tools" }
                header={ "Roles settings" }
            >
                <ColumnCard
                    color={ "#296dad" }
                    bgc={ "white" }
                    fontSize={ useViewPort(["18px", "18px", "20px", "x-large"]) }
                    textShadow={ "1px 1px 2px whitesmoke" }
                    labelShadow={ "1px 1px 2px whitesmoke" }
                    iconClass={ "" }
                    iconColor={ "" }
                    viewable={ false }
                    cardLink={ " " }
                    cardLabel={ "" }
                    labelColor={ "#174320" }
                    cardCount={ "" }
                >
                    <div>
                        <ul>
                            <li>
                                <TooltipBtn
                                    toolTip={ true }
                                    closeable={ true }
                                    fontSize={ "small" }
                                    context={ context }
                                    btnText={ "Add roles" }
                                    tooltipBgc={ "white" }
                                    hoverBgColor={ " " }
                                    hoverColor={ " " }
                                    fontWeight={ 200 }
                                    borderRadius={ "5px" }
                                    textColor={ "black" }
                                    backgroundColor={ "white" }
                                    border={ "unset" }
                                >
                                    <div className="content-inner" style={ { padding: "1rem 8px 0 8px" } }>
                                        <Form
                                            gap={ "10px" }
                                            width={ "250px" }
                                            processing={ state.addingRole }
                                            progressText={ "Please wait" }
                                            btnSubmitText={ "Create role" }
                                            handleSubmit={ submitNewRole }
                                            disabled={ state.addingRole }
                                            submitBtnBgc={ "rgb(41, 109, 173)" }
                                            submitBtnColor={ "whitesmoke" }
                                        >
                                            <Column
                                                color={ "#5a6269" }
                                                bgc={ "rgb(245 245 245)" }
                                                fontSize={ columnHeadFontSize }
                                                iconClass={ "" }
                                                padding={ "12px 3px" }
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
                                                        thisValue={ form.role_name }
                                                        handleChange={ handleChange }
                                                        handleKeypress={ () => { } }
                                                        handleKeyUp={ () => { } }
                                                        label={ "Role name" }
                                                        disabled={ false }
                                                        nameUniq={ "role_name" }
                                                        placeholder={ "H.O.D..." }
                                                        error={ errorField.role_name }
                                                        compulsory={ true }
                                                        inputHeight={ "1.9rem" }
                                                    />
                                                    <FormInput
                                                        type={ "text" }
                                                        inputTextColor={ "#2196F3" }
                                                        thisValue={ form.role_desc }
                                                        handleChange={ handleChange }
                                                        handleKeypress={ () => { } }
                                                        handleKeyUp={ () => { } }
                                                        label={ "Role description" }
                                                        disabled={ false }
                                                        nameUniq={ "role_desc" }
                                                        placeholder={ "Head of department..." }
                                                        error={ errorField.role_desc }
                                                        compulsory={ true }
                                                        inputHeight={ "1.9rem" }
                                                    />
                                                </ColumnCard>
                                            </Column>
                                            { state.message != "" && !state.addingRoleFailed ?
                                                <div style={ { color: "green", fontSize: "small" } }>
                                                    <small>{ state.message }</small>
                                                </div>
                                                : ""
                                            }
                                            { state.message != "" && state.addingRoleFailed ?
                                                <div style={ { color: "red", fontSize: "small" } }>
                                                    <small>{ state.message }</small>
                                                </div>
                                                : ""
                                            }
                                        </Form>
                                    </div>
                                </TooltipBtn>
                            </li>
                            <li>
                                <div>
                                    <TooltipBtn
                                        fontSize={ "small" }
                                        context={ context }
                                        btnText={ expanded ? "Manage roles -" : "Manage roles +" }
                                        tooltipBgc={ "white" }
                                        fontWeight={ 200 }
                                        borderRadius={ "5px" }
                                        textColor={ "black" }
                                        backgroundColor={ "white" }
                                        border={ "unset" }
                                        handleClick={ () => handleExpand() }
                                    />
                                    {/* { expanded ? */ }
                                    <div
                                        ref={ roleListCont }
                                        className="role-lists"
                                        style={ {
                                            background: "whitesmoke",
                                            height: 0,
                                            maxHeight: 201,
                                            overflowY: "auto",
                                        } }
                                    >
                                        <ListItems
                                            gap={ "5px" }
                                            padding={ "3px 0" }
                                            margin={ "1rem" }
                                        >
                                            { context.roles.length ?
                                                context.roles.map((role, index) => {
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
                                                            <div style={ { justifySelf: "end" } }>
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
                                                                        btnText={ "Delete" }
                                                                        tooltipBgc={ "white" }
                                                                        hoverBgColor={ " " }
                                                                        hoverColor={ " " }
                                                                        fontWeight={ 200 }
                                                                        borderRadius={ "5px" }
                                                                        textColor={ "rgb(255 95 69)" }
                                                                        backgroundColor={ "white" }
                                                                    >
                                                                        <TooltipContents
                                                                            color={ "#343a40" }
                                                                            padding={ "1rem" }
                                                                            justifyItems={ "center" }
                                                                        >
                                                                            <div>This role would be deleted permanently. Delete anyway?</div>
                                                                            <ActionBtn
                                                                                btnClick={ () => deleteRole(role.id) }
                                                                                btnText={ "Delete role" }
                                                                                processing={ state.deletingRole }
                                                                                progressText={ "Deleting" }
                                                                                disabled={ state.deletingRole }
                                                                                fontSize={ "small" }
                                                                                fWeight={ 200 }
                                                                                color={ "rgb(255 95 69)" }
                                                                                bgc={ "white" }
                                                                            />
                                                                        </TooltipContents>
                                                                    </TooltipBtn>
                                                                    <TooltipBtn
                                                                        tooltipMounted={ () => editTooltipMountd(role.id) }
                                                                        toolTip={ true }
                                                                        closeable={ true }
                                                                        fontSize={ "small" }
                                                                        context={ context }
                                                                        btnText={ "Edit" }
                                                                        tooltipBgc={ "white" }
                                                                        hoverBgColor={ " " }
                                                                        hoverColor={ " " }
                                                                        fontWeight={ 200 }
                                                                        borderRadius={ "5px" }
                                                                        textColor={ "gray" }
                                                                        backgroundColor={ "white" }
                                                                    >
                                                                        <Form
                                                                            gap={ "10px" }
                                                                            width={ "250px" }
                                                                            processing={ editState.addingRole }
                                                                            progressText={ "Please wait" }
                                                                            btnSubmitText={ "Update role" }
                                                                            handleSubmit={ () => submitEditedRole(role.id) }
                                                                            disabled={ editState.addingRole }
                                                                            submitBtnBgc={ "rgb(41, 109, 173)" }
                                                                            submitBtnColor={ "whitesmoke" }
                                                                        >
                                                                            <Column
                                                                                color={ "#5a6269" }
                                                                                bgc={ "rgb(245 245 245)" }
                                                                                fontSize={ columnHeadFontSize }
                                                                                iconClass={ "" }
                                                                                padding={ "12px 3px" }
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
                                                                                        thisValue={ editRoleForm.role_name }
                                                                                        handleChange={ handleEditChange }
                                                                                        handleKeypress={ () => { } }
                                                                                        handleKeyUp={ () => { } }
                                                                                        label={ "Role name" }
                                                                                        disabled={ false }
                                                                                        nameUniq={ "role_name" }
                                                                                        placeholder={ "H.O.D..." }
                                                                                        error={ errorField.role_name }
                                                                                        compulsory={ true }
                                                                                        inputHeight={ "1.9rem" }
                                                                                    />
                                                                                    <FormInput
                                                                                        type={ "text" }
                                                                                        inputTextColor={ "#2196F3" }
                                                                                        thisValue={ editRoleForm.role_desc }
                                                                                        handleChange={ handleEditChange }
                                                                                        handleKeypress={ () => { } }
                                                                                        handleKeyUp={ () => { } }
                                                                                        label={ "Role description" }
                                                                                        disabled={ false }
                                                                                        nameUniq={ "role_desc" }
                                                                                        placeholder={ "Head of department..." }
                                                                                        error={ errorField.role_desc }
                                                                                        compulsory={ true }
                                                                                        inputHeight={ "1.9rem" }
                                                                                    />
                                                                                </ColumnCard>
                                                                            </Column>
                                                                            { editState.message != "" && !editState.addingRoleFailed ?
                                                                                <div style={ { color: "green", fontSize: "small" } }>
                                                                                    <small>{ editState.message }</small>
                                                                                </div>
                                                                                : ""
                                                                            }
                                                                            { editState.message != "" && editState.addingRoleFailed ?
                                                                                <div style={ { color: "red", fontSize: "small" } }>
                                                                                    <small>{ editState.message }</small>
                                                                                </div>
                                                                                : ""
                                                                            }
                                                                        </Form>
                                                                    </TooltipBtn>
                                                                </HorizontalMenu>
                                                            </div>
                                                        </List>
                                                    );
                                                })
                                                : "No role created!" }
                                        </ListItems>
                                    </div>
                                    {/* : "" } */ }
                                </div>
                            </li>
                        </ul>
                    </div>
                </ColumnCard>
            </Column>
        </WebView>
    );
};

export default AdminSettings;
