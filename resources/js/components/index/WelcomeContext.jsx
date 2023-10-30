import { map, trim } from 'lodash';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import FormatPhoneNumber from '../customHooks/formatPhoneNumber';
import MapToArray from '../customHooks/MapToArray';
import useFetch from '../customHooks/useFetch';
import useStrCapitalize from '../customHooks/useStrCapitalize';
import isAmericanNum from '../customHooks/isAmericanNum';

export const WelcomeContext = React.createContext();

export const WelcomeProvider = (props) => {
    const [state, setState] = useState({
        uploadErrorReport: "",
    });

    const [filesFor, setfilesFor] = useState("");
    const [windowWidth, setwindowWidth] = useState("");
    const [windowHeight, setwindowHeight] = useState("");
    const [navHeight, setnavHeight] = useState("");
    const [klass, setklass] = useState([]);
    const [files, setfiles] = useState({
        imgCollections: new Map(),
        imgTemplate: new Map(),
    });

    const [form, setform] = useState({
        firstName: "", lastName: "",
        email: "", phone: "", city: "", state: "", street: "",
        zipCode: "", dob: "", ssn: "", resumes: "",
        driverLicenseFront: "", driverLicenseBack: ""
    });

    const controller = React.useRef();
    //keep up with latest state while await requests
    useEffect(() => {
        updateDimensions();
        window.addEventListener("resize", updateDimensions);
        return () => {
            window.removeEventListener("resize", updateDimensions);
        };
    }, []);

    const updateDimensions = () => {
        setwindowHeight(window.innerHeight);
        setwindowWidth(window.innerWidth);
    };

    const handleCancelReq = () => {
        controller.abort();
    };

    const resetSourceMedia = () => {
        setState({
            ...files,
            imgCollections: new Map(),
            imgTemplate: new Map(),
        });
    };
    const updateNavHeight = (height) => {
        setnavHeight(height);
    };
    const handleResetField = (obj) => {
        var newSate = JSON.parse(JSON.stringify(state));

        for (const key in obj) {
            if (Object.hasOwnProperty.call(obj, key)) {
                const val = obj[key];
                newSate[key] = obj[key];
            }
        }
        setState(newSate);
    };

    const alterField = (field, data) => {
        setState({ ...state, [field]: data });
    };
    //function to process all files
    const handleFile = async (event, allowedSize, filesFor) => {
        const target = event.target;
        const imgs = target.files;
        const { imgCollections, imgTemplate } = files;
        //check to ensure total files not > allowedSize
        if (imgs.length + imgCollections.size <= allowedSize) {
            setfilesFor(filesFor);
            Array.from(imgs).forEach(file => {
                var fileName = file.name.split(".")[0];
                var reader = new FileReader();
                setfiles({
                    ...files,
                    imgCollections: files.imgCollections.set(fileName, file),
                });
                reader.onload = (e) => handleOnload(e, fileName);
                reader.readAsDataURL(file);
            });
        } else {
            setState({
                ...state,
                uploadErrorReport: `You are not allowed over ${allowedSize} files`
            });
        }
    };

    const handleOnload = (e, fileName) => {
        setfiles({
            ...files,
            imgTemplate: files.imgTemplate.set(fileName, e.target.result),
        });
        setState({ ...state, uploadErrorReport: "" });
    };

    const handleDelPreview = index => {
        const imgTemplate = new Map(files.imgTemplate);
        const imgCollections = new Map(files.imgCollections);
        imgTemplate.delete(index);
        imgCollections.delete(index);
        setfiles({
            ...files,
            imgTemplate: imgTemplate,
            imgCollections: imgCollections
        });
    };

    const handleIconMouseEnter = (elem) => {
        setklass(Array.from(elem.classList));
    };
    const handleIconMouseLeave = () => {
        setklass([]);
    };
    const handleApplicationChange = (e) => {
        const { name, value, files } = e.target;
        const str = value.replace(/\s\s+/g, " ");
        switch (name) {
            case "firstName": case "lastName": case "middleName": case "state":
                setform({ ...form, [name]: useStrCapitalize(str) });
                break;
            case "email":
                setform({ ...form, [name]: trim(str) });
                break;
            case "phone":
                // console.info(filterNum);
                    setform({ ...form, [name]: isAmericanNum(trim(str)) });
                break;
            case "ssn":
                if (trim(str).length <= 9) {
                    setform({ ...form, [name]: trim(str) });
                }
                break;
            case "driverLicenseFront": case "driverLicenseBack": case "resumes":
                setform({ ...form, [name]: files[0] });
                break;
            default:
                setform({ ...form, [name]: str });
                break;
        }
    };
    const submitApplication = async () => {
        setState(prev => {
            return { ...prev, applying: true, applicationErrorText: "", applicationSuccess: false };
        });
        var dataCollections = new FormData();

        dataCollections.append("firstName", form.firstName);
        dataCollections.append("lastName", form.lastName);
        dataCollections.append("email", form.email);
        dataCollections.append("phone", form.phone);
        dataCollections.append("state", form.state);
        dataCollections.append("city", form.city);
        dataCollections.append("street", form.street);
        dataCollections.append("zipCode", form.zipCode);
        dataCollections.append("dob", form.dob);
        dataCollections.append("ssn", form.ssn);
        dataCollections.append("resumes[]", form.resumes);
        dataCollections.append("driverLicenseFront[]", form.driverLicenseFront);
        dataCollections.append("driverLicenseBack[]", form.driverLicenseBack);

        const response = await useFetch("/put_application", dataCollections, "POST", true);
        if (response.ok) {
            let result = await response.json();
            var newForm = {};
            for (const property in form) {
                newForm[property] = '';
            }
            setform(newForm);
            setState(prev => {
                return { ...prev, applying: false, applicationSuccess: true };
            });
            // history.go(-1);
        } else {
            setState(prev => {
                return {
                    ...prev,
                    applying: false,
                    applicationSuccess: false,
                    applicationErrorText: "Some went wrong. Please try again."
                };
            });
        }
    };
    return (
        <React.Fragment>
            <WelcomeContext.Provider
                value={ {
                    ...state, ...files, form, klass, windowWidth, windowHeight,
                    handleResetField, handleFile, handleDelPreview, updateNavHeight,
                    handleIconMouseEnter, handleIconMouseLeave, handleApplicationChange,
                    submitApplication,
                } }
            >
                { props.children }
            </WelcomeContext.Provider>
        </React.Fragment>
    );
};
export default WelcomeProvider;
