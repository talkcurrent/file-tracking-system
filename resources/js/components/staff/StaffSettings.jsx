import React, { useContext, useEffect, useRef, useState } from 'react';
import FieldHasError from '../customHooks/FieldHasError';
import useFetch from '../customHooks/useFetch';
import useViewPort from '../customHooks/useViewPort';
import Column from '../dashboard/Column';
import ColumnCard from '../dashboard/ColumnCard';
import HorizontalMenu from '../includes/HorizontalMenu';
import StaffWebView from '../includes/StaffWebView';
import { AllContext } from '../index/AllContext';
import Accordion from '../reuseable/Accordion';
import ActionBtn from '../reuseable/ActionBtn';
import Dialog from '../reuseable/Dialog';
import DialogContent from '../reuseable/DialogContent';
import Form from '../reuseable/Form';
import FormInput from '../reuseable/FormInput';
import FormSelInput from '../reuseable/FormSelInput';
import List from '../reuseable/List';
import ListItems from '../reuseable/ListItems';
import ResetForm from '../reuseable/ResetForm';
import ScrollerX from '../reuseable/ScrollerX';
import TooltipBtn from '../reuseable/TooltipBtn';
import TooltipContents from '../reuseable/TooltipContents';

const StaffSettings = (props) => {
    const context = useContext(AllContext);
    const { authUser } = context;

    const [linkDialogOpened, setlinkDialogOpened] = useState(false);
    const [certDialogOpened, setcertDialogOpened] = useState(false);
    const [newCertDialogOpened, setnewCertDialogOpened] = useState(false);
    const [roleListHeight, setroleListHeight] = useState(0);

    const [state, setstate] = useState({
        addingRole: false, addingRoleFailed: "", message: "",
        deletingRole: false, deletingRoleFailed: "",
    });
    const [addressState, setaddressState] = useState({
        addressUpdating: false, addressUpdatingFailed: "", message: "",
    });

    const [linkState, setlinkState] = useState({
        linkUpdating: false, linkUpdatingFailed: "", message: "",
    });

    const [addressForm, setaddressForm] = useState({ description: "" });
    const [linkForm, setlinkForm] = useState({ id: "", url: "", description: "" });
    //
    const [certState, setcertState] = useState({
        certUpdating: false, certUpdatingFailed: "", message: "",
    });

    const [certForm, setcertForm] = useState({
        id: "", institution: "", cert_awarded: "", yr_of_grad: ""
    });
    const [errorCertField, seterrorCertField] = useState({
        id: false, institution: false, cert_awarded: false, yr_of_grad: false
    });

    const [errorAddressField, seterrorAddressField] = useState({
        description: false
    });

    const columnHeadFontSize = useViewPort(["18px", "18px", "20px", "25px"]);
    const dialogWidth = useViewPort(["100%", "80%;", "60%", "40%", "40%"]);

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

    const addressTooltipMountd = (addressId) => {
        const { authUser } = context;
        const address = authUser.addresses.find(address => address.id == addressId);
        setaddressForm({ ...addressForm, description: address.description });
        setaddressState({ ...addressState, addressUpdating: false, addressUpdatingFailed: "", message: "" });
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        const str = value.replace(/\s\s+/g, " ");

        setaddressState({ ...addressState, message: "" });
        setaddressForm({ ...addressForm, [name]: str });
        seterrorAddressField({ ...errorAddressField, [name]: false });
    };

    const handleLinkChange = (e) => {
        const { name, value } = e.target;
        const str = value.replace(/\s\s+/g, " ");

        setlinkState({ ...linkState, message: "" });
        setlinkForm({ ...linkForm, [name]: str });
    };

    const handleCertChange = (e) => {
        const { name, value } = e.target;
        const str = value.replace(/\s\s+/g, " ");

        setcertState({ ...certState, message: "" });
        setcertForm({ ...certForm, [name]: str });
        seterrorCertField({ ...errorCertField, [name]: false });
    };

    const submitEditedLink = async () => {
        const { id, url } = linkForm;

        const data = {
            id: id,
            url: url,
        };
        setlinkState({ ...linkState, linkUpdating: true, linkUpdatingFailed: "", message: "" });
        const response = await useFetch('/update_link', JSON.stringify(data), "POST", false);

        if (response.ok) {
            let result = await response.json();
            context.handleAuthUser("staff");

            setlinkState({
                ...linkState,
                linkUpdating: false, linkUpdatingFailed: false,
                message: "Link succesfully updated"
            });
        } else {
            setlinkState({
                ...linkState, linkUpdating: false, linkUpdatingFailed: true,
                message: "Something not right. Please try again later"
            });

        }
    };
    const submitEditedCert = async (todo) => {
        const { id, institution, cert_awarded, yr_of_grad } = certForm;
        var copyErrorField = errorCertField;

        for (const key in certForm) {
            copyErrorField[key] = certForm[key].toString().trim() == "";
        }

        seterrorCertField({ ...copyErrorField });

        if (!FieldHasError(copyErrorField)) {
            const data = {
                todo: todo, //edit or new
                id: id,
                institution: institution,
                cert_awarded: cert_awarded,
                yr_of_grad: yr_of_grad,
            };
            setcertState({ ...certState, certUpdating: true, certUpdatingFailed: "", message: "" });
            const response = await useFetch('/update_cert', JSON.stringify(data), "POST", false);

            if (response.ok) {
                let result = await response.json();
                context.handleAuthUser("staff");

                setcertState({
                    ...certState,
                    certUpdating: false, certUpdatingFailed: false,
                    message: "Cert succesfully updated"
                });
            } else {
                setcertState({
                    ...certState, certUpdating: false, certUpdatingFailed: true,
                    message: "Something not right. Please try again later"
                });
            }
        }

    };

    const submitEditedAddress = async (addressId) => {
        var copyErrorField = errorAddressField;

        for (const key in addressForm) {
            copyErrorField[key] = addressForm[key].trim() == "";
        }
        seterrorAddressField({ ...copyErrorField });

        if (!FieldHasError(copyErrorField)) {
            const data = {
                addressId: addressId,
                description: addressForm.description,
            };
            setaddressState({ ...addressState, addressUpdating: true, addressUpdatingFailed: "", message: "" });
            const response = await useFetch('/update_address', JSON.stringify(data), "POST", false);

            if (response.ok) {
                let result = await response.json();
                context.handleAuthUser("staff");

                setaddressState({
                    ...addressState,
                    addressUpdating: false, addressUpdatingFailed: false,
                    message: "Address succesfully updated"
                });
            } else {
                setaddressState({
                    ...addressState, addressUpdating: false, addressUpdatingFailed: true,
                    message: "Something not right. Please try again later"
                });

            }
        }
    };

    const linkEditDialog = (link) => {
        const { id, url, description } = link;
        setlinkForm({ ...linkForm, url: url, id: id, description: description });
        setlinkDialogOpened(!linkDialogOpened);
    };

    const eduEditDialog = (cert) => {
        const { id, institution, cert_awarded, yr_of_grad } = cert;
        setcertForm({ ...certForm, institution: institution, id: id, cert_awarded: cert_awarded, yr_of_grad: yr_of_grad });
        setcertDialogOpened(!certDialogOpened);
    };


    const addEduDialog = () => {
        setnewCertDialogOpened(!newCertDialogOpened);
    };

    const newCertDalogMounted = () => {
        setcertForm({ ...certForm, institution: "", id: "1", cert_awarded: "", yr_of_grad: "2017" });
    };

    const year = () => {
        const yearArr = [];
        let minYear = 1990;
        const maxYear = 2030;

        while (minYear <= maxYear) {
            yearArr.push(minYear++);
        }
        return yearArr;
    };
    return (
        <StaffWebView
            view={ "settings" }
            context={ context }

        >
            <Column
                color={ "#5a6269" }
                bgc={ "rgb(245 245 245)" }
                fontSize={ useViewPort(["18px", "18px", "20px", "25px"]) }
                iconClass={ "fas fa-tools" }
                header={ "Profile settings" }
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
                    <Accordion
                        maxHeight={ 200 }
                        bgc={ "white" }
                        color={ "#212529" }
                        h_text={ <>Manage addresses{ " " }<i className="far fa-address-card"></i></> }
                        h_fontSize={ "medium" }
                        h_color={ "rgb(41, 109, 173)" }
                        h_bgc={ "whitesmoke" }
                        fontFamily={ "serif" }
                        h_fontWeight={ "300" }
                        pad={ "0.5rem" }
                        h_pad={ "3px" }
                    >
                        <ListItems
                            gap={ "5px" }
                            bgc={ "#f8f9fa" }
                            padding={ "3px 0" }
                            margin={ "0 1rem" }
                        >
                            { authUser.hasOwnProperty('id') && authUser.addresses.length ?
                                authUser.addresses.map((address, index) => {
                                    return (
                                        <List
                                            key={ index }
                                            padding={ "2px" }
                                            gap={ "5px" }
                                            nthChild={ "odd" }
                                            nthChildBgc={ "#e2e2e2" }
                                            gtc={ "1fr 8fr auto" }
                                        >
                                            <div style={ { width: "100%", textAlign: "center" } }
                                                className={ 'light-seperator' }
                                            >{ index + 1 }</div>
                                            <div className={ 'light-seperator' }>{ address.description }</div>
                                            <HorizontalMenu
                                                align={ "center" }
                                                justify={ "center" }
                                                gap={ "5px" }
                                            >
                                                <TooltipBtn
                                                    tooltipMounted={ () => addressTooltipMountd(address.id) }
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
                                                        processing={ addressState.addressUpdating }
                                                        progressText={ "Please wait" }
                                                        btnSubmitText={ "Update address" }
                                                        handleSubmit={ () => submitEditedAddress(address.id) }
                                                        disabled={ addressState.addressUpdating }
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
                                                                    fSize={ "medium" }
                                                                    inputTextColor={ "rgb(45 89 125)" }
                                                                    thisValue={ addressForm.description }
                                                                    handleChange={ handleAddressChange }
                                                                    handleKeypress={ () => { } }
                                                                    handleKeyUp={ () => { } }
                                                                    label={ "Description" }
                                                                    disabled={ false }
                                                                    nameUniq={ "description" }
                                                                    placeholder={ "Enter address here..." }
                                                                    error={ errorAddressField.description }
                                                                    compulsory={ true }
                                                                    textarea={ true }
                                                                />
                                                            </ColumnCard>
                                                        </Column>
                                                        { addressState.message != "" && !addressState.addressUpdating && !addressState.addressUpdatingFailed ?
                                                            <div style={ { color: "green", fontSize: "small" } }>
                                                                <small>{ addressState.message }</small>
                                                            </div>
                                                            : ""
                                                        }
                                                        { addressState.message != "" && addressState.addressUpdatingFailed ?
                                                            <div style={ { color: "red", fontSize: "small" } }>
                                                                <small>{ addressState.message }</small>
                                                            </div>
                                                            : ""
                                                        }
                                                    </Form>
                                                </TooltipBtn>
                                            </HorizontalMenu>
                                        </List>
                                    );
                                })
                                : "" }
                        </ListItems>
                    </Accordion>
                    <Accordion
                        maxHeight={ 200 }
                        bgc={ "white" }
                        color={ "#212529" }
                        h_text={ <>Manage links{ " " }<i className="fas fa-link"></i></> }
                        h_fontSize={ "medium" }
                        h_color={ "rgb(41, 109, 173)" }
                        h_bgc={ "whitesmoke" }
                        fontFamily={ "serif" }
                        h_fontWeight={ "300" }
                        pad={ "0.5rem" }
                        h_pad={ "3px" }
                    >
                        <ListItems
                            gap={ "5px" }
                            bgc={ "#f8f9fa" }
                            padding={ "3px 0" }
                            margin={ "0 1rem" }
                        >
                            { authUser.hasOwnProperty('id') && authUser.links.length ?
                                authUser.links.map((link, index) => {
                                    return (
                                        link.description == "facebook" ?
                                            <List
                                                key={ index }
                                                padding={ "2px" }
                                                gap={ "5px" }
                                                nthChild={ "odd" }
                                                nthChildBgc={ "#e2e2e2" }
                                                gtc={ "2fr 6fr auto" }
                                            >
                                                <div className="link-description light-seperator">Facebook: </div>
                                                <div className="link-url light-seperator">{ link.url }</div>
                                                <ActionBtn
                                                    btnText={ "Edit" }
                                                    bgc={ "#757a7d" }
                                                    color={ "whitesmoke" }
                                                    btnClick={ () => linkEditDialog(link) }
                                                    fontSize={ "small" }
                                                />
                                            </List>
                                            : link.description == "instagram" ?
                                                <List
                                                    key={ index }
                                                    padding={ "2px" }
                                                    gap={ "5px" }
                                                    nthChild={ "odd" }
                                                    nthChildBgc={ "#e2e2e2" }
                                                    gtc={ "2fr 6fr auto" }
                                                >
                                                    <div className="link-description light-seperator">Instagram: </div>
                                                    <div className="link-url light-seperator">{ link.url }</div>
                                                    <ActionBtn
                                                        btnText={ "Edit" }
                                                        bgc={ "#757a7d" }
                                                        color={ "whitesmoke" }
                                                        btnClick={ () => linkEditDialog(link) }
                                                        fontSize={ "small" }
                                                    />
                                                </List>
                                                : link.description == "twitter" ?
                                                    <List
                                                        key={ index }
                                                        padding={ "2px" }
                                                        gap={ "5px" }
                                                        nthChild={ "odd" }
                                                        nthChildBgc={ "#e2e2e2" }
                                                        gtc={ "2fr 6fr auto" }
                                                    >
                                                        <div className="link-description light-seperator">Twitter: </div>
                                                        <div className="link-url light-seperator">{ link.url }</div>
                                                        <ActionBtn
                                                            btnText={ "Edit" }
                                                            bgc={ "#757a7d" }
                                                            color={ "whitesmoke" }
                                                            btnClick={ () => linkEditDialog(link) }
                                                            fontSize={ "small" }
                                                        />
                                                    </List>
                                                    : link.description == "linkedIn" ?
                                                        <List
                                                            key={ index }
                                                            padding={ "2px" }
                                                            gap={ "5px" }
                                                            nthChild={ "odd" }
                                                            nthChildBgc={ "#e2e2e2" }
                                                            gtc={ "2fr 6fr auto" }
                                                        >
                                                            <div className="link-description light-seperator">Linked In: </div>
                                                            <div className="link-url light-seperator">{ link.url }</div>
                                                            <ActionBtn
                                                                btnText={ "Edit" }
                                                                bgc={ "#757a7d" }
                                                                color={ "whitesmoke" }
                                                                btnClick={ () => linkEditDialog(link) }
                                                                fontSize={ "small" }
                                                            />
                                                        </List> :
                                                        <List
                                                            key={ index }
                                                            padding={ "2px" }
                                                            gap={ "5px" }
                                                            nthChild={ "odd" }
                                                            nthChildBgc={ "#e2e2e2" }
                                                            gtc={ "2fr 6fr auto" }
                                                        >
                                                            <div className="link-description light-seperator">Website: </div>
                                                            <div className="link-url light-seperator">{ link.url }</div>
                                                            <ActionBtn
                                                                btnText={ "Edit" }
                                                                bgc={ "#757a7d" }
                                                                color={ "whitesmoke" }
                                                                btnClick={ () => linkEditDialog(link) }
                                                                fontSize={ "small" }
                                                            />
                                                        </List>);
                                })
                                : "" }
                        </ListItems>
                    </Accordion>
                    <Accordion
                        maxHeight={ 200 }
                        bgc={ "white" }
                        color={ "#212529" }
                        h_text={ <>Manage education{ " " }<i className="fas fa-graduation-cap"></i></> }
                        h_fontSize={ "medium" }
                        h_color={ "rgb(41, 109, 173)" }
                        h_bgc={ "whitesmoke" }
                        fontFamily={ "serif" }
                        h_fontWeight={ "300" }
                        pad={ "0.5rem" }
                        h_pad={ "3px" }
                    >
                        <ListItems
                            gap={ "5px" }
                            bgc={ "#f8f9fa" }
                            padding={ "3px 0" }
                            margin={ "0 1rem" }
                        >
                            { authUser.hasOwnProperty('id') && authUser.educations.length ?
                                authUser.educations.map((education, index) => {
                                    return (
                                        <List
                                            key={ index }
                                            padding={ "2px" }
                                            gap={ "5px" }
                                            nthChild={ "odd" }
                                            nthChildBgc={ "#e2e2e2" }
                                            gtc={ "1fr 8fr auto" }
                                        >

                                            <div style={ { width: "100%", textAlign: "center" } }
                                                className={ 'light-seperator' }
                                            >{ index + 1 }</div>
                                            <div className={ 'light-seperator' }>
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
                                            <ActionBtn
                                                btnText={ "Edit" }
                                                bgc={ "#757a7d" }
                                                color={ "whitesmoke" }
                                                btnClick={ () => eduEditDialog(education) }
                                                fontSize={ "small" }
                                            />
                                        </List>
                                    );
                                })
                                : "" }
                            <ActionBtn
                                btnText={ <>+ Add certificate</> }
                                justify={ "center" }
                                bgc={ "#757a7d" }
                                color={ "whitesmoke" }
                                btnClick={ () => addEduDialog() }
                                fontSize={ "small" }
                            />
                        </ListItems>
                    </Accordion>
                </ColumnCard>
            </Column>
            {linkDialogOpened ?
                <Dialog
                    // dialogMounted={ dialogMounted }
                    handleClose={ linkEditDialog }
                >
                    <DialogContent
                        bgc={ "white" }
                        width={ dialogWidth }
                        closeDialog={ linkEditDialog }
                    >
                        <Form
                            gap={ "10px" }
                            width={ "100%" }
                            processing={ linkState.linkUpdating }
                            progressText={ "Please wait" }
                            btnSubmitText={ "Update link" }
                            handleSubmit={ () => submitEditedLink() }
                            disabled={ linkState.linkUpdating }
                            submitBtnBgc={ "rgb(41, 109, 173)" }
                            submitBtnColor={ "whitesmoke" }
                        >
                            <div style={ { textAlign: "center", fontSize: "15px", color: "black" } }>{ linkForm.description.toUpperCase() }</div>
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
                                        fSize={ "medium" }
                                        inputTextColor={ "rgb(45 89 125)" }
                                        thisValue={ linkForm.url }
                                        handleChange={ handleLinkChange }
                                        handleKeypress={ () => { } }
                                        handleKeyUp={ () => { } }
                                        label={ "Link url" }
                                        disabled={ false }
                                        nameUniq={ "url" }
                                        placeholder={ "e.g www.mywebsite.com/username..." }
                                        error={ false }
                                    />
                                </ColumnCard>
                            </Column>
                            { linkState.message != "" && !linkState.linkUpdating && !linkState.linkUpdatingFailed ?
                                <div style={ { color: "green", fontSize: "small" } }>
                                    <small>{ linkState.message }</small>
                                </div>
                                : ""
                            }
                            { linkState.message != "" && linkState.linkUpdatingFailed ?
                                <div style={ { color: "red", fontSize: "small" } }>
                                    <small>{ linkState.message }</small>
                                </div>
                                : ""
                            }
                        </Form>
                    </DialogContent>

                </Dialog>
                : "" }
            {certDialogOpened ?
                <Dialog
                    // dialogMounted={ dialogMounted }
                    handleClose={ eduEditDialog }
                >
                    <DialogContent
                        bgc={ "white" }
                        width={ dialogWidth }
                        closeDialog={ eduEditDialog }
                    >
                        <Form
                            gap={ "10px" }
                            width={ "100%" }
                            processing={ certState.certUpdating }
                            progressText={ "Please wait" }
                            btnSubmitText={ "Update certificate" }
                            handleSubmit={ () => submitEditedCert("edit") }
                            disabled={ certState.certUpdating }
                            submitBtnBgc={ "rgb(41, 109, 173)" }
                            submitBtnColor={ "whitesmoke" }
                        >
                            <div style={ { textAlign: "center", fontSize: "15px", color: "black" } }>{ "Certificate update" }</div>
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
                                        thisValue={ certForm.institution }
                                        handleChange={ handleCertChange }
                                        handleKeypress={ () => { } }
                                        handleKeyUp={ () => { } }
                                        label={ "Name of institution" }
                                        disabled={ false }
                                        nameUniq={ "institution" }
                                        placeholder={ "Gombe state university..." }
                                        error={ errorCertField.institution }
                                        compulsory={ true }
                                        height={ "1.9rem" }
                                    />
                                    <FormInput
                                        type={ "text" }
                                        inputTextColor={ "#2196F3" }
                                        thisValue={ certForm.cert_awarded }
                                        handleChange={ handleCertChange }
                                        handleKeypress={ () => { } }
                                        handleKeyUp={ () => { } }
                                        label={ "Certificate awarded" }
                                        disabled={ false }
                                        nameUniq={ "cert_awarded" }
                                        placeholder={ "e.g Bachelor of Engineering..." }
                                        error={ errorCertField.cert_awarded }
                                        compulsory={ true }
                                        height={ "1.9rem" }
                                    />

                                    <FormSelInput
                                        type={ "year" }
                                        value={ certForm.yr_of_grad }
                                        handleChange={ handleCertChange }
                                        label={ "Year of graduation" }
                                        disabled={ false }
                                        nameUniq={ "yr_of_grad" }
                                        error={ errorCertField.yr_of_grad }
                                        height={ "1.9rem" }
                                    >
                                        { year().map((year, key) => {
                                            return <option key={ key } value={ year }>{ year }</option>;
                                        }) }
                                    </FormSelInput>
                                </ColumnCard>
                            </Column>
                            { certState.message != "" && !certState.certUpdating && !certState.certUpdatingFailed ?
                                <div style={ { color: "green", fontSize: "small" } }>
                                    <small>{ certState.message }</small>
                                </div>
                                : ""
                            }
                            { certState.message != "" && certState.certUpdatingFailed ?
                                <div style={ { color: "red", fontSize: "small" } }>
                                    <small>{ certState.message }</small>
                                </div>
                                : ""
                            }
                        </Form>
                    </DialogContent>

                </Dialog>
                : "" }
            {newCertDialogOpened ?
                <Dialog
                    dialogMounted={ newCertDalogMounted }
                    handleClose={ addEduDialog }
                >
                    <DialogContent
                        bgc={ "white" }
                        width={ dialogWidth }
                        closeDialog={ addEduDialog }
                    >
                        <Form
                            gap={ "10px" }
                            width={ "100%" }
                            processing={ certState.certUpdating }
                            progressText={ "Please wait" }
                            btnSubmitText={ "Add certificate" }
                            handleSubmit={ () => submitEditedCert("new") }
                            disabled={ certState.certUpdating }
                            submitBtnBgc={ "rgb(41, 109, 173)" }
                            submitBtnColor={ "whitesmoke" }
                        >
                            <div style={ { textAlign: "center", fontSize: "15px", color: "black" } }>{ "Certificate update" }</div>
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
                                        thisValue={ certForm.institution }
                                        handleChange={ handleCertChange }
                                        handleKeypress={ () => { } }
                                        handleKeyUp={ () => { } }
                                        label={ "Name of institution" }
                                        disabled={ false }
                                        nameUniq={ "institution" }
                                        placeholder={ "Gombe state university..." }
                                        error={ errorCertField.institution }
                                        compulsory={ true }
                                        height={ "1.9rem" }
                                    />
                                    <FormInput
                                        type={ "text" }
                                        inputTextColor={ "#2196F3" }
                                        thisValue={ certForm.cert_awarded }
                                        handleChange={ handleCertChange }
                                        handleKeypress={ () => { } }
                                        handleKeyUp={ () => { } }
                                        label={ "Certificate awarded" }
                                        disabled={ false }
                                        nameUniq={ "cert_awarded" }
                                        placeholder={ "e.g Bachelor of Engineering..." }
                                        error={ errorCertField.cert_awarded }
                                        compulsory={ true }
                                        height={ "1.9rem" }
                                    />

                                    <FormSelInput
                                        type={ "year" }
                                        value={ certForm.yr_of_grad }
                                        handleChange={ handleCertChange }
                                        label={ "Year of graduation" }
                                        disabled={ false }
                                        nameUniq={ "yr_of_grad" }
                                        error={ errorCertField.yr_of_grad }
                                        height={ "1.9rem" }
                                    >
                                        { year().map((year, key) => {
                                            return <option key={ key } value={ year }>{ year }</option>;
                                        }) }
                                    </FormSelInput>
                                </ColumnCard>
                            </Column>
                            { certState.message != "" && !certState.certUpdating && !certState.certUpdatingFailed ?
                                <div style={ { color: "green", fontSize: "small" } }>
                                    <small>{ certState.message }</small>
                                </div>
                                : ""
                            }
                            { certState.message != "" && certState.certUpdatingFailed ?
                                <div style={ { color: "red", fontSize: "small" } }>
                                    <small>{ certState.message }</small>
                                </div>
                                : ""
                            }
                        </Form>
                    </DialogContent>

                </Dialog>
                : "" }
        </StaffWebView>
    );
};

export default StaffSettings;
